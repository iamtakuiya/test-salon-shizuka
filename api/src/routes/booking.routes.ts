import { Router } from 'express';
import { createBooking } from '../controllers/booking.controller';
import { validateBooking } from '../middleware/validateBooking';
import { bookingLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', bookingLimiter, validateBooking, createBooking);

export default router;