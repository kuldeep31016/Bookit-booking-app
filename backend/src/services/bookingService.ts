import { prisma } from '../config/database.js';

type CreateBookingInput = {
  experienceId: string;
  slotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  promoCode?: string;
};

async function create(input: CreateBookingInput) {
  return prisma.$transaction(async (tx) => {
    const slot = await tx.slot.findUnique({ where: { id: input.slotId } });
    if (!slot || slot.experienceId !== input.experienceId) {
      throw Object.assign(new Error('Invalid slot or experience'), { status: 400 });
    }
    const available = slot.capacity - slot.booked;
    if (available < input.participants) {
      throw Object.assign(new Error('Not enough availability'), { status: 409 });
    }

    const experience = await tx.experience.findUnique({ where: { id: input.experienceId } });
    if (!experience) throw Object.assign(new Error('Experience not found'), { status: 404 });

    const subtotal = experience.price * input.participants;
    // Simple promo handling: apply only if valid and active
    let discount = 0;
    if (input.promoCode) {
      const now = new Date();
      const promo = await tx.promoCode.findUnique({ where: { code: input.promoCode } });
      if (promo && promo.active && promo.validFrom <= now && promo.validUntil >= now) {
        if (!promo.minAmount || subtotal >= promo.minAmount) {
          discount = promo.type === 'percentage' ? (subtotal * promo.value) / 100 : promo.value;
          if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
        }
      }
    }
    const total = Math.max(0, subtotal - discount);

    const booking = await tx.booking.create({
      data: {
        experienceId: input.experienceId,
        slotId: input.slotId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        participants: input.participants,
        totalPrice: total,
        promoCode: input.promoCode,
        discount,
      },
    });

    await tx.slot.update({
      where: { id: input.slotId },
      data: { booked: { increment: input.participants } },
    });

    return { booking, confirmationId: booking.id };
  });
}

async function getById(id: string) {
  return prisma.booking.findUnique({ where: { id } });
}

export const bookingService = { create, getById };


