import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const { booking, experience } = state || {};
  const schema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/),
  });
  type FormData = z.infer<typeof schema>;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!booking || !experience) {
    return <div className="max-w-4xl mx-auto p-4">Missing booking data</div>;
  }

  const subtotal = experience.price * booking.participants;
  const total = Math.max(0, subtotal - discount);

  const applyPromo = async () => {
    setLoading(true);
    try {
      const res = await api.post('/promo/validate', { code: promoCode, totalAmount: subtotal });
      if (res.data.valid) setDiscount(res.data.discount);
      else setDiscount(0);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (values: FormData) => {
    setLoading(true);
    try {
      const res = await api.post('/bookings', {
        experienceId: booking.experienceId,
        slotId: booking.slotId,
        participants: booking.participants,
        ...values,
        promoCode: promoCode || undefined,
      });
      navigate('/result', { state: { success: true, booking: res.data.booking } });
    } catch (e: any) {
      navigate('/result', { state: { success: false, error: e?.response?.data?.error || 'Failed' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <h2 className="text-xl font-semibold">Your Details</h2>
        <Input placeholder="First name" {...register('firstName')} error={errors.firstName?.message} />
        <Input placeholder="Last name" {...register('lastName')} error={errors.lastName?.message} />
        <Input placeholder="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input placeholder="Phone" {...register('phone')} error={errors.phone?.message} />
        <div className="flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          <Button type="button" disabled={loading} onClick={applyPromo} variant="secondary">Apply</Button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="border rounded p-4 space-y-2">
          <div className="flex justify-between">
            <span>{experience.title}</span>
            <span>₹{experience.price} × {booking.participants}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <Button disabled={loading} onClick={handleSubmit(submit)} className="w-full">
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
}


