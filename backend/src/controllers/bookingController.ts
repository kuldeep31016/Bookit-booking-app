import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { bookingService } from '../services/bookingService.js';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id');
const bookingSchema = z.object({
  experienceId: objectId,
  slotId: objectId,
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  participants: z.number().int().min(1),
  promoCode: z.string().optional(),
});

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid booking data' });
    const result = await bookingService.create(parsed.data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getBookingById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const booking = await bookingService.getById(id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
}


