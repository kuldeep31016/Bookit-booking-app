import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { promoService } from '../services/promoService.js';

const promoSchema = z.object({
  code: z.string().min(1),
  totalAmount: z.number().nonnegative(),
});

export async function validatePromo(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = promoSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid promo request' });
    const result = await promoService.validate(parsed.data.code, parsed.data.totalAmount);
    res.json(result);
  } catch (err) {
    next(err);
  }
}


