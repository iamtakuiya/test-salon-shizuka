import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ReservationSection.module.scss';

import { Section }    from '@/components/01.primitives/Section/Section';
import { Container }  from '@/components/01.primitives/Container/Container';
import { Stack }      from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';

// Redux
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  setDate,
  setTime,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';

import { bookingService }    from '@/services/bookingService';
import { MENU_CATEGORIES, ADDONS, TIME_SLOTS } from '@/utils/constants';
import type { MenuCategory, MenuItem } from '@/utils/constants';

// Shared utilities
import { formatDateISO } from '@/utils/calendar';

// Sub‑components (barrel export)
import {
  CalendarPicker,
  TimeSlotPicker,
  ServiceGallery,
  CategoryFocusPanel,
  AddonPicker,
  BookingSummary,
  ConfirmationView,
  SuccessView,
} from './components';


// ─── Zod schema (contact step only; booking data lives in Redux) ──────────────

const contactSchema = z.object({
  name:  z.string().min(1, 'お名前を入力してください').max(100),
  email: z.string().email('有効なメールアドレスを入力してください'),
});
type ContactData = z.infer<typeof contactSchema>;

// ─── View stages ─────────────────────────────────────────────────────────────

type Stage = 'form' | 'confirm' | 'success';

// Note: Helper functions (calendar, price formatting, etc.) have been moved to utils.ts

export default function ReservationSection() {
  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  const dispatch = useAppDispatch();
  const booking  = useAppSelector((s) => s.booking);

  // Derived values from Redux state
  const selectedDate    = booking.selectedDate    ?? '';
  const selectedTime    = booking.selectedTime    ?? '';

  // Local category navigation & item selection
  const [selectedItems, setSelectedItems] = useState<Record<string, MenuItem>>({});
  const [activeCategoryId, setActiveCategoryId] = useState(MENU_CATEGORIES[0].id);

  const selectedAddonIds = new Set(booking.selectedAddons.map((a) => a.id));
  const selectedAddonsForDisplay = ADDONS.filter((a) => selectedAddonIds.has(a.id));

  // View state
  const [stage, setStage]             = useState<Stage>('form');
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Calendar navigation state
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // React Hook Form (contact fields only)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  // Computed total
  const total =
    Object.values(selectedItems).filter(Boolean).reduce((s, i) => s + i.price, 0) +
    booking.selectedAddons.reduce((s, a) => s + a.price, 0);

  // ── Handlers ──
  function handlePrevMonth() {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  }
  function handleNextMonth() {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  }
  function handleDayClick(day: number) {
    dispatch(setDate(formatDateISO(calYear, calMonth, day)));
  }
  function handleTimeSelect(t: string) {
    dispatch(setTime(t));
  }
  function handleItemSelect(catId: string, item: MenuItem) {
    setSelectedItems((prev) => ({ ...prev, [catId]: item }));
  }
  function handleAddonToggle(addon: (typeof ADDONS)[number]) {
    dispatch(toggleAddon({ id: addon.id, name: addon.nameJa, price: addon.price }));
  }

  // Submit → show confirmation
  const handleFormSubmit = handleSubmit(() => {
    if (!selectedDate || !selectedTime) {
      alert('日程と時間帯を選択してください。');
      return;
    }
    if (Object.values(selectedItems).filter(Boolean).length === 0) {
      alert('メニューを1つ以上選択してください。');
      return;
    }
    setStage('confirm');
  });

  // Final booking POST
  async function handleConfirm() {
    setSubmitting(true);
    setSubmitError(false);
    const contact = getValues();
    try {
      const servicePayload = Object.values(selectedItems)
        .filter(Boolean)
        .map((item) => ({ id: item.name, name: item.name, price: item.price }));

      await bookingService.submit({
        name:     contact.name,
        email:    contact.email,
        date:     selectedDate,
        time:     selectedTime,
        services: servicePayload,
        addons:   booking.selectedAddons,
      });

      dispatch(resetBooking());
      setSelectedItems({});
      setStage('success');
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    dispatch(resetBooking());
    setSelectedItems({});
    setActiveCategoryId(MENU_CATEGORIES[0].id);
    setStage('form');
  }

  const activeCategory = MENU_CATEGORIES.find((c) => c.id === activeCategoryId)!;

  // ── Render ──
  return (
    <Section id="reservation" spacing="lg" aria-label="Reservation">
      <Container size="xl" className={styles.reservation__container}>
        <Stack gap="xl">

          {/* Section header */}
          <Stack gap="xs" align="center">
            <span ref={labelRef} className="section-label">Reservation</span>
            <h2 ref={headingRef} className={styles.heading}>ご予約</h2>
          </Stack>

          {/* ── Success ── */}
          {stage === 'success' && <SuccessView onReset={handleReset} />}

          {/* ── Confirmation ── */}
          {stage === 'confirm' && (
            <ConfirmationView
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedItems={selectedItems}
              selectedAddons={selectedAddonsForDisplay}
              total={total}
              name={getValues('name')}
              email={getValues('email')}
              submitting={submitting}
              submitError={submitError}
              onBack={() => setStage('form')}
              onConfirm={handleConfirm}
            />
          )}

          {/* ── Main form ── */}
          {stage === 'form' && (
            <div className={styles.layout}>

              {/* ── Left column ── */}
              <div className={styles.layout__main}>

                {/* Date + Time (side-by-side on tablet+) */}
                <div className={styles.dateTime}>
                  <div className={styles.dateTime__cal}>
                    <span className={styles.fieldLabel}>日程を選択</span>
                    <CalendarPicker
                      year={calYear}
                      month={calMonth}
                      selectedDate={selectedDate}
                      onPrevMonth={handlePrevMonth}
                      onNextMonth={handleNextMonth}
                      onDayClick={handleDayClick}
                    />
                  </div>

                  <div className={styles.dateTime__time}>
                    <span className={styles.fieldLabel}>時間帯を選択</span>
                    <TimeSlotPicker
                      selectedTime={selectedTime}
                      onSelect={handleTimeSelect}
                    />
                  </div>
                </div>

                {/* Service gallery */}
                <div className={styles.serviceSection}>
                  <span className={styles.fieldLabel}>メニューカテゴリ</span>
                  <ServiceGallery
                    activeCategoryId={activeCategoryId}
                    onCategorySelect={setActiveCategoryId}
                  />
                </div>

                {/* Focus panel for selected category */}
                <div className={styles.serviceSection}>
                  <span className={styles.fieldLabel}>
                    {activeCategory.category} — メニュー
                  </span>
                  <CategoryFocusPanel
                    category={activeCategory}
                    selectedItems={selectedItems}
                    onItemSelect={handleItemSelect}
                  />
                </div>

                {/* Addons */}
                <div className={styles.serviceSection}>
                  <span className={styles.fieldLabel}>追加オプション</span>
                  <AddonPicker
                    selectedAddonIds={selectedAddonIds}
                    onToggle={handleAddonToggle}
                  />
                </div>

                {/* Summary + form visible inline on mobile/tablet; sidebar on desktop */}
                <div className={styles.layout__inlineForm}>
                  <BookingSummary
                    selectedItems={selectedItems}
                    selectedAddons={selectedAddonsForDisplay}
                    total={total}
                    register={register}
                    errors={errors}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              </div>

              {/* ── Right column (desktop only) ── */}
              <aside className={styles.layout__sidebar} aria-label="予約サマリー">
                <BookingSummary
                  selectedItems={selectedItems}
                  selectedAddons={selectedAddonsForDisplay}
                  total={total}
                  register={register}
                  errors={errors}
                  onSubmit={handleFormSubmit}
                />
              </aside>
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
