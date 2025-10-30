import { prisma } from '../config/database.js';

async function validate(code: string, totalAmount: number) {
  const now = new Date();
  const promo = await prisma.promoCode.findUnique({ where: { code } });
  if (!promo || !promo.active || promo.validFrom > now || promo.validUntil < now) {
    return { valid: false, discount: 0, type: 'fixed', message: 'Invalid or expired code' };
  }
  if (promo.minAmount && totalAmount < promo.minAmount) {
    return { valid: false, discount: 0, type: promo.type as any, message: 'Minimum amount not met' };
  }
  let discount = promo.type === 'percentage' ? (totalAmount * promo.value) / 100 : promo.value;
  if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
  return { valid: true, discount, type: promo.type as any };
}

export const promoService = { validate };


