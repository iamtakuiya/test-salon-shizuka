import type { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service';
import { logger } from '../services/logger.service';

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await bookingService.create(req.body);
    res.status(200).json({ success: true, id: booking.id });
  } catch (err) {
    logger.error('createBooking controller error', { error: String(err) });
    next(err);
  }
};
