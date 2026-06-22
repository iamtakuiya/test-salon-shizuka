import rateLimit from 'express-rate-limit';

export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '予約の送信が多すぎます。しばらくしてからもう一度お試しください。' },
});

export const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '登録の試行が多すぎます。' },
});
