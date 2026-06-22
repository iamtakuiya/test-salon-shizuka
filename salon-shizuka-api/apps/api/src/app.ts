import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './services/logger.service';
import bookingRoutes from './routes/booking.routes';
import newsletterRoutes from './routes/newsletter.routes';

const app = express();

// ─── Middleware ───────────────────────────────────────
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10kb' })); // Limit payload size

// ─── Health check ────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────
app.use('/api/booking',    bookingRoutes);
app.use('/api/newsletter', newsletterRoutes);

// ─── Global error handler (must be last) ─────────────
app.use(errorHandler);

// ─── Start ───────────────────────────────────────────
app.listen(Number(env.PORT), () => {
  logger.info(`API running on http://localhost:${env.PORT}`);
});

export default app;
