/**
 * ReservationForm
 *
 * Layout strategy:
 *   Mobile  → single-column vertical flow
 *   Tablet  → calendar + timeslots side-by-side; service slider shows 2 cards/slide
 *   Laptop+ → two-column: [calendar / slider / addons] | [sticky summary + form]
 *             service gallery switches to 2 × 3 grid; slider nav only shown when > 6 items
 *
 * State split (per SALON_SHIZUKA_MASTER_GUIDE):
 *   Redux Toolkit → date, time, selected service items, selected addons   (cross-step persistence)
 *   React Hook Form + Zod → name, email                                   (local form validation)
 *   Local useState → view stage, calendar month/year, slider page         (ephemeral UI)
 *
 * Note: Redux slices are imported from the project's bookingSlice.
 * Replace the stub imports below with your real store paths before use.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './ReservationForm.module.scss';

import { Section }    from '@/components/01.primitives/Section/Section';
import { Container }  from '@/components/01.primitives/Container/Container';
import { Stack }      from '@/components/01.primitives/Stack/Stack';
import { FormLabel } from '@/components/04.atoms/FormLabel/FormLabel';


// Sections
import { ReservationContact } from './sections/ReservationContact';
import { ReservationAddons } from './sections/ReservationAddons';

// ─── Sub-components ───────────────────────────────────────────────────────────
import { CalendarPicker } from './components/CalendarPicker/CalendarPicker';
import { TimeSlotPicker } from './components/TimeSlotPicker/TimeSlotPicker';
import { AddonPicker } from './components/AddonPicker/AddonPicker';
import { ServiceGallery } from './components/ServiceGallery/ServiceGallery';
import { CategoryFocusPanel } from './components/CategoryMenu/CategoryMenu';
import { BookingSummary } from './components/BookingSummary/BookingSummary';
import { ConfirmationView } from './components/ConfirmationView/ConfirmationView';
import { SuccessView } from './components/SuccessView/SuccessView';

// Redux — swap with real store paths
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  setDate,
  setTime,
  toggleService,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';


// ─── Hooks ───────────────────────────────────────────────────────────────
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import { useReservationCalendar } from './hooks/useCalendar';
import { useServiceGallery } from './hooks/useServiceGallery';

// ─── Constants ───────────────────────────────────────────────────────────────
import { MENU_CATEGORIES, ADDONS, TIME_SLOTS } from '@/utils/constants';
import type { MenuCategory, MenuItem } from '@/utils/constants';

// ─── Zod schema (contact step only; booking data lives in Redux) ──────────────
import { contactSchema }  from './schema/contactSchema';
import { type ContactData } from './schema/contactSchema';
// ─── View stages ─────────────────────────────────────────────────────────────


import { formatPrice } from '@/utils/formatPrice';
import { ReservationLayout } from './components/layouts/ReservationLayout';


// ─── Main component ───────────────────────────────────────────────────────────

export default function ReservationForm() {
  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  const dispatch = useAppDispatch();
  const booking  = useAppSelector((s) => s.booking);

  // Derived values from Redux state
  const selectedDate    = booking.selectedDate    ?? '';
  const selectedTime    = booking.selectedTime    ?? '';
  // selectedServices is a flat ServiceItem array; we map back to MenuItem for display
  // selectedAddons likewise — keep as-is from Redux and re-derive below

  // Local category navigation & item selection
  // (items per category are picked locally then synced to Redux on submit)
  const [selectedItems, setSelectedItems] = useState<Record<string, MenuItem>>({});
  const [activeCategoryId, setActiveCategoryId] = useState(MENU_CATEGORIES[0].id);

  const selectedAddonIds = new Set(booking.selectedAddons.map((a) => a.id));
  const selectedAddonsForDisplay = ADDONS.filter((a) => selectedAddonIds.has(a.id));

  // View state
  const [stage, setStage]             = useState<Stage>('form');
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState(false);



  // React Hook Form (contact fields only)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  const {
    year,
    month,
    prevMonth,
    nextMonth,
  } = useReservationCalendar();

  const {
    page,
    perPage,
    isGrid,
    totalPages,
    next,
    prev,
    goTo,
  } = useServiceGallery(...)



  // ── Handlers ──


  function handleTimeSelect(t: string) {
    dispatch(setTime(t));
  }

  function handleItemSelect(catId: string, item: MenuItem) {
    setSelectedItems((prev) => ({ ...prev, [catId]: item }));
  }

  function handleAddonToggle(addon: (typeof ADDONS)[number]) {
    dispatch(toggleAddon({ id: addon.id, name: addon.nameJa, price: addon.price }));
  }


  const activeCategory = MENU_CATEGORIES.find((c) => c.id === activeCategoryId)!;

  // ── Render ──

  return (
    <Section id="reservation" spacing="lg" aria-label="Reservation">
      <Container size="md">
        <Stack gap="xl">

          {/* Section header */}
          <Stack gap="xs" align="center">
            <span ref={labelRef} className="section-label">ご予約</span>
            <h2 ref={headingRef} className={styles.heading}>Reservation</h2>
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
            <ReservationLayout
              sidebar={
                <BookingSummary
                  selectedItems={selectedItems}
                  selectedAddons={selectedAddonsForDisplay}
                  total={total}
                  register={register}
                  errors={errors}
                  onSubmit={handleFormSubmit}
                />
              }
            >
              <DateTimeSection />

              <ServiceGallery />

              <CategoryFocusPanel />

              <AddonPicker />

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
            </ReservationLayout>
          )}


        </Stack>
      </Container>
    </Section>
  );
}