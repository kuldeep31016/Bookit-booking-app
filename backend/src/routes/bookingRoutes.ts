import { Router } from 'express';
import { createBooking, getBookingById } from '../controllers/bookingController.js';

const router = Router();

router.post('/', createBooking);
router.get('/:id', getBookingById);

export default router;


