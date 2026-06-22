import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './NewsletterBanner.module.scss';
import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import { newsletterService } from '@/services/newsletterService';

const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});
type FormData = z.infer<typeof schema>;

export default function NewsletterBanner() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      await newsletterService.subscribe(data.email);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section
      id="newsletter"
      spacing="md"
      aria-label="Newsletter"
      className={styles.newsletter}
    >
      <Container size="sm">
        <Stack gap="lg" align="center" className={styles.newsletter__inner}>
          <Stack gap="xs" align="center">
            <span className="section-label">Newsletter</span>
            <h2 className={styles.newsletter__heading}>
              最新情報をお届けします
            </h2>
            <p className={styles.newsletter__sub}>
              新メニュー・キャンペーン情報をいち早くお届けします。
            </p>
          </Stack>

          {status === 'success' ? (
            <p className={styles.newsletter__success}>
              ご登録ありがとうございます。
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.newsletter__form}
              noValidate
            >
              <div className={styles.newsletter__fieldGroup}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="メールアドレス"
                  className={`${styles.newsletter__input} ${errors.email ? styles['newsletter__input--error'] : ''}`}
                  aria-label="メールアドレス"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.newsletter__btn}
                >
                  {status === 'loading' ? '送信中…' : '登録する'}
                </button>
              </div>
              {errors.email && (
                <p className={styles.newsletter__error} role="alert">
                  {errors.email.message}
                </p>
              )}
              {status === 'error' && (
                <p className={styles.newsletter__error} role="alert">
                  エラーが発生しました。もう一度お試しください。
                </p>
              )}
            </form>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
