import { z } from 'zod';
// ─── Zod schema (contact step only; booking data lives in Redux) ──────────────

export const contactSchema = z.object({
  name:  z.string().min(1, 'お名前を入力してください').max(100),
  email: z.string().email('有効なメールアドレスを入力してください'),
});

export type ContactData = z.infer<typeof contactSchema>;