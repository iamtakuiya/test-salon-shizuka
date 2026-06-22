import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/client';
import { logger } from '../services/logger.service';

export const subscribeNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as { email: string };

    await prisma.newsletter.upsert({
      where: { email },
      update: {},        // Already subscribed — no-op
      create: { email },
    });

    logger.info('Newsletter subscription', { email });
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error('subscribeNewsletter error', { error: String(err) });
    next(err);
  }
};