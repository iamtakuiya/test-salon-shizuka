import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const serviceItemSchema = z.object({
  id:    z.string(),
  name:  z.string(),
  price: z.number().min(0),
});

const bookingSchema = z.object({
  name:     z.string().min(1, '名前は必須です').max(100),
  email:    z.string().email('有効なメールアドレスを入力してください'),
  date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付形式が正しくありません'),
  time:     z.string().regex(/^\d{2}:\d{2}$/, '時間形式が正しくありません'),
  services: z.array(serviceItemSchema).min(1, 'メニューを選択してください'),
  addons:   z.array(serviceItemSchema),
});

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
  const result = bookingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};

const newsletterSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});

export const validateNewsletter = (req: Request, res: Response, next: NextFunction) => {
  const result = newsletterSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};
