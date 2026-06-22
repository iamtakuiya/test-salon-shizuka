import { Router } from 'express';
import { subscribeNewsletter } from '../controllers/newsletter.controller';
import { validateNewsletter } from '../middleware/validateBooking';
import { newsletterLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', newsletterLimiter, validateNewsletter, subscribeNewsletter);

export default router;