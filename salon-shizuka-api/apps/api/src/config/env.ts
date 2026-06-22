import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const envSchema = z.object({
  PORT:                      z.string().default('4000'),
  CORS_ORIGIN:               z.string().default('http://localhost:5173'),
  DATABASE_URL:              z.string(),
  GMAIL_USER:                z.string(),
  GMAIL_CLIENT_ID:           z.string(),
  GMAIL_CLIENT_SECRET:       z.string(),
  GMAIL_REFRESH_TOKEN:       z.string(),
  OWNER_EMAIL:               z.string().email(),
  LINE_CHANNEL_ACCESS_TOKEN: z.string(),
  LINE_OWNER_USER_ID:        z.string(),
  NEWSLETTER_NOTIFY_EMAIL:   z.string().email(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1); // Fail fast at startup — not at runtime
}

export const env = parsed.data;
