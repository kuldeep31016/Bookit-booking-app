import { useLocation, useNavigate, Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2">
          <Link to={`/experiences/${booking.experienceId}`} className="text-2xl hover:opacity-60">←</Link>
          <div className="flex items-center gap-3">
            <svg width="35" height="40" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5 0C13.94 0 7 6.94 7 15.5C7 26.875 22.5 50 22.5 50C22.5 50 38 26.875 38 15.5C38 6.94 31.06 0 22.5 0Z" fill="#4A5568"/>
              <text x="22.5" y="20" fontSize="14" fontWeight="bold" fill="#ECC94B" textAnchor="middle">hd</text>
            </svg>
            <div>
              <span className="block text-lg font-bold text-slate-800">highway delite</span>
              <span className="block text-xs text-slate-600">Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span>👤</span> Your Details
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit(submit)}>
                <Input 
                  label="First Name" 
                  placeholder="Enter first name" 
                  {...register('firstName')} 
                  error={errors.firstName?.message} 
                />
                <Input 
                  label="Last Name" 
                  placeholder="Enter last name" 
                  {...register('lastName')} 
                  error={errors.lastName?.message} 
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="Enter email" 
                  {...register('email')} 
                  error={errors.email?.message} 
                />
                <Input 
                  label="Phone Number" 
                  placeholder="10-digit phone number" 
                  {...register('phone')} 
                  error={errors.phone?.message} 
                />
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎟️</span> Have a Promo Code?
              </h3>
              <div className="flex gap-2">
                <input 
                  className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent uppercase" 
                  placeholder="Enter promo code" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())} 
                />
                <button 
                  type="button" 
                  disabled={loading || !promoCode} 
                  onClick={applyPromo} 
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {discount > 0 && (
                <div className="mt-3 bg-green-50 border-2 border-green-200 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-green-700 font-semibold">Promo code applied! You saved ₹{discount}</span>
                </div>
              )}
              <div className="mt-3 text-sm text-slate-600">
                Try: <span className="font-mono bg-slate-100 px-2 py-1 rounded">SAVE10</span>, 
                <span className="font-mono bg-slate-100 px-2 py-1 rounded ml-2">FLAT100</span>, 
                <span className="font-mono bg-slate-100 px-2 py-1 rounded ml-2">WELCOME20</span>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span>📋</span> Booking Summary
              </h2>
              
              <div className="space-y-4">
                {/* Experience Image */}
                {experience.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img 
                      src={experience.imageUrl} 
                      alt={experience.title} 
                      className="w-full h-40 object-cover"
                      onError={(img) => {
                        (img.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop';
                      }}
                    />
                  </div>
                )}
                
                {/* Experience Info */}
                <div className="pb-4 border-b-2 border-slate-100">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{experience.title}</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span>{booking.participants} {booking.participants === 1 ? 'participant' : 'participants'}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Price per person</span>
                    <span className="font-semibold text-slate-800">₹{experience.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Number of participants</span>
                    <span className="font-semibold text-slate-800">× {booking.participants}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <span className="text-slate-700 font-medium">Subtotal</span>
                    <span className="font-bold text-slate-800">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span>🎉</span> Discount
                      </span>
                      <span className="font-bold text-green-600">- ₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-slate-200">
                    <span className="text-xl font-bold text-slate-800">Total Amount</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      ₹{total}
                    </span>
                  </div>
                </div>

                <button 
                  disabled={loading} 
                  onClick={handleSubmit(submit)} 
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? 'Processing...' : `Pay ₹${total} & Confirm Booking`}
                </button>

                <p className="text-xs text-center text-slate-500 mt-3">
                  By confirming, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


