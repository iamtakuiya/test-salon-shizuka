import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ReservationForm.module.scss';
import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  setDate,
  setTime,
  toggleService,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';
import { SERVICES, ADDONS, TIME_SLOTS } from '@/utils/constants';
import { bookingService } from '@/services/bookingService';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';

// ─── Contact schema ───────────────────────────────────
const contactSchema = z.object({
  name:  z.string().min(1, 'お名前を入力してください').max(100),
  email: z.string().email('有効なメールアドレスを入力してください'),
});
type ContactData = z.infer<typeof contactSchema>;

// ─── Calendar helpers ────────────────────────────────
function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const DAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];
const MONTHS_EN = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

// Closed on Wednesdays (per HOURS)
function isClosed(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 3;
}

function isPast(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

// ─── Step indicator ───────────────────────────────────
const STEPS = ['日時', 'メニュー', '連絡先', '確認'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className={styles.steps}>
      {STEPS.map((label, i) => (
        <div
          key={i}
          className={`${styles.steps__item} ${i === current ? styles['steps__item--active'] : ''} ${i < current ? styles['steps__item--done'] : ''}`}
        >
          <span className={styles.steps__num}>{i + 1}</span>
          <span className={styles.steps__label}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReservationForm() {
  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  const dispatch = useAppDispatch();
  const booking  = useAppSelector((s) => s.booking);
  const total     = useAppSelector((s) =>
    [...s.booking.selectedServices, ...s.booking.selectedAddons]
      .reduce((sum, item) => sum + item.price, 0)
  );

  const [step, setStep]     = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Calendar state
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const cells = buildCalendar(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    const mm = String(calMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    dispatch(setDate(`${calYear}-${mm}-${dd}`));
  };

  // Contact form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  // Step navigation
  const canGoStep1 = !!booking.selectedDate && !!booking.selectedTime;
  const canGoStep2 = booking.selectedServices.length > 0;

  const onFinalSubmit = async (contact: ContactData) => {
    setStatus('loading');
    try {
      await bookingService.submit({
        name:     contact.name,
        email:    contact.email,
        date:     booking.selectedDate!,
        time:     booking.selectedTime!,
        services: booking.selectedServices,
        addons:   booking.selectedAddons,
      });
      setStatus('success');
      dispatch(resetBooking());
      setStep(0);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Section id="reservation" spacing="lg" aria-label="Reservation">
        <Container size="sm">
          <Stack gap="lg" align="center" className={styles.reservation__success}>
            <span className={styles.reservation__successIcon}>✓</span>
            <h3 className={styles.reservation__successHeading}>
              ご予約ありがとうございます
            </h3>
            <p className={styles.reservation__successBody}>
              ご登録のメールアドレスに確認メールをお送りしました。<br />
              24時間以内にご連絡いたします。
            </p>
            <button
              className={styles.reservation__btn}
              onClick={() => setStatus('idle')}
            >
              新しいご予約
            </button>
          </Stack>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="reservation" spacing="lg" aria-label="Reservation">
      <Container size="md">
        <Stack gap="xl">
          {/* Header */}
          <Stack gap="xs" align="center">
            <span ref={labelRef} className="section-label">Reservation</span>
            <h2 ref={headingRef} className={styles.reservation__heading}>
              ご予約
            </h2>
          </Stack>

          <StepIndicator current={step} />

          <div className={styles.reservation__panel}>
            {/* ── Step 0: Date & Time ── */}
            {step === 0 && (
              <Stack gap="lg">
                {/* Calendar */}
                <div className={styles.calendar}>
                  <div className={styles.calendar__nav}>
                    <button
                      onClick={prevMonth}
                      className={styles.calendar__navBtn}
                      aria-label="前月"
                    >‹</button>
                    <span className={styles.calendar__month}>
                      {MONTHS_EN[calMonth]} {calYear}
                    </span>
                    <button
                      onClick={nextMonth}
                      className={styles.calendar__navBtn}
                      aria-label="翌月"
                    >›</button>
                  </div>

                  <div className={styles.calendar__grid}>
                    {DAYS_JA.map((d) => (
                      <div key={d} className={styles.calendar__dayHeader}>{d}</div>
                    ))}
                    {cells.map((day, i) => {
                      if (!day) return <div key={`empty-${i}`} />;
                      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const disabled = isClosed(calYear, calMonth, day) || isPast(calYear, calMonth, day);
                      const selected = booking.selectedDate === dateStr;
                      return (
                        <button
                          key={dateStr}
                          disabled={disabled}
                          onClick={() => handleDayClick(day)}
                          className={`${styles.calendar__day} ${disabled ? styles['calendar__day--disabled'] : ''} ${selected ? styles['calendar__day--selected'] : ''}`}
                          aria-label={`${calYear}年${calMonth + 1}月${day}日${disabled ? ' (定休日)' : ''}`}
                          aria-pressed={selected}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <p className={styles.calendar__note}>水曜定休</p>
                </div>

                {/* Time slots */}
                <div>
                  <p className={styles.reservation__fieldLabel}>時間帯</p>
                  <div className={styles.timeSlots}>
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => dispatch(setTime(t))}
                        className={`${styles.timeSlots__slot} ${booking.selectedTime === t ? styles['timeSlots__slot--selected'] : ''}`}
                        aria-pressed={booking.selectedTime === t}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.reservation__footer}>
                  <button
                    className={styles.reservation__btn}
                    disabled={!canGoStep1}
                    onClick={() => setStep(1)}
                  >
                    次へ →
                  </button>
                </div>
              </Stack>
            )}

            {/* ── Step 1: Services ── */}
            {step === 1 && (
              <Stack gap="lg">
                <div>
                  <p className={styles.reservation__fieldLabel}>メニュー（複数選択可）</p>
                  <div className={styles.serviceGrid}>
                    {SERVICES.map((s) => {
                      const selected = booking.selectedServices.some(x => x.id === s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => dispatch(toggleService({ id: s.id, name: s.nameJa, price: s.price }))}
                          className={`${styles.serviceGrid__card} ${selected ? styles['serviceGrid__card--selected'] : ''}`}
                          aria-pressed={selected}
                        >
                          <span className={styles.serviceGrid__name}>{s.nameJa}</span>
                          <span className={styles.serviceGrid__en}>{s.name}</span>
                          <span className={styles.serviceGrid__price}>¥{s.price.toLocaleString()}</span>
                          <span className={styles.serviceGrid__duration}>{s.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className={styles.reservation__fieldLabel}>オプション</p>
                  <div className={styles.serviceGrid}>
                    {ADDONS.map((a) => {
                      const selected = booking.selectedAddons.some(x => x.id === a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => dispatch(toggleAddon({ id: a.id, name: a.nameJa, price: a.price }))}
                          className={`${styles.serviceGrid__card} ${selected ? styles['serviceGrid__card--selected'] : ''}`}
                          aria-pressed={selected}
                        >
                          <span className={styles.serviceGrid__name}>{a.nameJa}</span>
                          <span className={styles.serviceGrid__en}>{a.name}</span>
                          <span className={styles.serviceGrid__price}>¥{a.price.toLocaleString()}</span>
                          <span className={styles.serviceGrid__duration}>{a.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.reservation__footer}>
                  <button className={styles.reservation__btnGhost} onClick={() => setStep(0)}>
                    ← 戻る
                  </button>
                  <button
                    className={styles.reservation__btn}
                    disabled={!canGoStep2}
                    onClick={() => setStep(2)}
                  >
                    次へ →
                  </button>
                </div>
              </Stack>
            )}

            {/* ── Step 2: Contact ── */}
            {step === 2 && (
              <Stack gap="lg">
                <Stack gap="md">
                  <div className={styles.reservation__field}>
                    <label className={styles.reservation__fieldLabel} htmlFor="res-name">
                      お名前 <span aria-hidden="true" className={styles.reservation__required}>*</span>
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      autoComplete="name"
                      className={`${styles.reservation__input} ${errors.name ? styles['reservation__input--error'] : ''}`}
                      placeholder="山田 花子"
                      aria-invalid={!!errors.name}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className={styles.reservation__errorMsg} role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className={styles.reservation__field}>
                    <label className={styles.reservation__fieldLabel} htmlFor="res-email">
                      メールアドレス <span aria-hidden="true" className={styles.reservation__required}>*</span>
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      autoComplete="email"
                      className={`${styles.reservation__input} ${errors.email ? styles['reservation__input--error'] : ''}`}
                      placeholder="hanako@example.com"
                      aria-invalid={!!errors.email}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className={styles.reservation__errorMsg} role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </Stack>

                <div className={styles.reservation__footer}>
                  <button className={styles.reservation__btnGhost} onClick={() => setStep(1)}>
                    ← 戻る
                  </button>
                  <button
                    className={styles.reservation__btn}
                    onClick={handleSubmit(() => setStep(3))}
                  >
                    確認へ →
                  </button>
                </div>
              </Stack>
            )}

            {/* ── Step 3: Confirm ── */}
            {step === 3 && (
              <Stack gap="lg">
                <div className={styles.confirmation}>
                  <div className={styles.confirmation__row}>
                    <span className={styles.confirmation__label}>日時</span>
                    <span className={styles.confirmation__value}>
                      {booking.selectedDate} {booking.selectedTime}
                    </span>
                  </div>
                  <div className={styles.confirmation__row}>
                    <span className={styles.confirmation__label}>メニュー</span>
                    <span className={styles.confirmation__value}>
                      {booking.selectedServices.map(s => s.name).join('、')}
                    </span>
                  </div>
                  {booking.selectedAddons.length > 0 && (
                    <div className={styles.confirmation__row}>
                      <span className={styles.confirmation__label}>オプション</span>
                      <span className={styles.confirmation__value}>
                        {booking.selectedAddons.map(a => a.name).join('、')}
                      </span>
                    </div>
                  )}
                  <div className={styles.confirmation__row}>
                    <span className={styles.confirmation__label}>お名前</span>
                    <span className={styles.confirmation__value}>{getValues('name')} 様</span>
                  </div>
                  <div className={styles.confirmation__row}>
                    <span className={styles.confirmation__label}>メール</span>
                    <span className={styles.confirmation__value}>{getValues('email')}</span>
                  </div>
                  <div className={`${styles.confirmation__row} ${styles['confirmation__row--total']}`}>
                    <span className={styles.confirmation__label}>合計（目安）</span>
                    <span className={styles.confirmation__total}>
                      ¥{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {status === 'error' && (
                  <p className={styles.reservation__errorMsg} role="alert">
                    エラーが発生しました。もう一度お試しください。
                  </p>
                )}

                <div className={styles.reservation__footer}>
                  <button className={styles.reservation__btnGhost} onClick={() => setStep(2)}>
                    ← 戻る
                  </button>
                  <button
                    className={styles.reservation__btn}
                    disabled={status === 'loading'}
                    onClick={handleSubmit(onFinalSubmit)}
                  >
                    {status === 'loading' ? '送信中…' : '予約を確定する'}
                  </button>
                </div>
              </Stack>
            )}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
