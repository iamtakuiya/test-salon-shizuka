import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './NewsletterSection.module.scss';
import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import { newsletterService } from '@/services/newsletterService';

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});

type FormData = z.infer<typeof schema>;

// ─── Component ───────────────────────────────────────────────────────────────

export default function NewsletterSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const subRef     = useScrollReveal<HTMLParagraphElement>();

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

          {/* Header */}
          <Stack gap="sm" align="center">
            <span ref={labelRef} className="section-label">Newsletter</span>
            <h2 ref={headingRef} className={styles.newsletter__heading}>
              SHIZUKAからの特別なお便り
            </h2>
            <p ref={subRef} className={styles.newsletter__sub}>
              月に数回、あなたの髪と心を労わるケアのヒントや、<br />
              サロンの最新の空き状況、特別なご案内をそっとお届けします。
            </p>
          </Stack>

          {/* Form / Success */}
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
                  placeholder="メールアドレスを入力してください..."
                  className={`${styles.newsletter__input} ${
                    errors.email ? styles['newsletter__input--error'] : ''
                  }`}
                  aria-label="メールアドレス"
                  aria-invalid={!!errors.email}
                  disabled={status === 'loading'}
                  {...register('email')}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.newsletter__btn}
                >
                  {status === 'loading' ? '送信中…' : 'お便りを受け取る'}
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

          {/* Footnote */}
          <p className={styles.newsletter__footnote}>
            ※ご登録いただくことで、最新情報や限定特典の受け取りに同意したことになります。（いつでも解除できます）
          </p>

        </Stack>
      </Container>
    </Section>
  );
}