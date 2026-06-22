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

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReservationForm } from './hooks/useReservationForm';
import { useReservationCalendar } from './hooks/useReservationCalendar';
import { useReservationController } from './hooks/useReservationController';
import { formatDateISO } from '@/utils/calendar';
import { MENU_CATEGORIES } from '@/utils/constants';

// import styles from './ReservationForm.module.scss';

import { Section }    from '@/components/01.primitives/Section/Section';
import { Container }  from '@/components/01.primitives/Container/Container';


// Sections
import { ReservationContact } from './sections/ReservationContact';
import { ReservationAddons } from './sections/ReservationAddons';
import { ReservationDateTime } from './sections/ReservationDateTime';
import { ReservationServices } from './sections/ReservationServices';

// ─── Sub-components ───────────────────────────────────────────────────────────
import { ConfirmationView } from './components/booking/ConfirmationView/ConfirmationView';
import { SuccessView } from './components/booking/SuccessView/SuccessView';

// Redux — swap with real store paths
import { useAppDispatch, useAppSelector } from '@/app/store/store';

// ─── Zod schema (contact step only; booking data lives in Redux) ──────────────
import { contactSchema }  from './schema/contactSchema';
import { type ContactData } from './schema/contactSchema';
import { bookingService }    from '@/services/bookingService';
import {
  setDate,
  setTime,
  toggleService,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';


import { ReservationLayout } from './layouts/ReservationLayout';


// ─── Main component ───────────────────────────────────────────────────────────
export default function ReservationForm() {

  const dispatch = useAppDispatch();
  const booking = useAppSelector((s) => s.booking);

  // Form handling
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  // Local UI state hooks
  const { selectedItems, setSelectedItems, activeCategoryId, setActiveCategoryId, stage, setStage } = useReservationController();
  const { year, month, prevMonth, nextMonth } = useReservationCalendar();

  // Calendar interactions
  const handleDayClick = (day: number) => {
    dispatch(setDate(formatDateISO(year, month, day)));
  };
  const handleTimeSelect = (time: string) => {
    dispatch(setTime(time));
  };

  // Service selection
  const handleItemSelect = (catId: string, item: any) => {
    dispatch(toggleService(item));
  };

  // Category navigation
  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
  };

  // Compute total price
  const total = (booking.selectedServices ?? []).concat(booking.selectedAddons ?? []).reduce((sum, s) => sum + s.price, 0);

  // Combine with reservation form logic
  const reservationForm = useReservationForm({
    selectedDate: booking.selectedDate ?? '',
    selectedTime: booking.selectedTime ?? '',
    selectedItems,
    selectedAddons: booking.selectedAddons,
    getValues,
    handleSubmit,
    setSelectedItems,
    setActiveCategoryId,
  });

  const handleFormSubmit = handleSubmit(() => reservationForm.handleFormSubmit());

  {reservationForm.stage === 'success' && (
    <SuccessView
      onReset={reservationForm.handleReset}
    />
  )}

  {reservationForm.stage === 'confirm' && (
    <ConfirmationView
      onBack={() => reservationForm.setStage('form')}
      onConfirm={reservationForm.handleConfirm}
    />
  )}

  return (
    <Section id="reservation">
      <Container>
        <ReservationHeader />
        <ReservationLayout
          sidebar={
            <ReservationContact
              selectedItems={selectedItems}
              selectedAddons={booking.selectedAddons}
              total={total}
              register={register}
              errors={errors}
              onSubmit={handleFormSubmit}
            />
          }
        >
          <ReservationDateTime
            year={year}
            month={month}
            selectedDate={booking.selectedDate ?? ''}
            selectedTime={booking.selectedTime ?? ''}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onDayClick={handleDayClick}
            onTimeSelect={handleTimeSelect}
          />
          <ReservationServices
            activeCategory={MENU_CATEGORIES.find(c => c.id === activeCategoryId)!}
            activeCategoryId={activeCategoryId}
            selectedItems={selectedItems}
            onCategorySelect={handleCategorySelect}
            onItemSelect={handleItemSelect}
          />
          <ReservationAddons
            selectedAddonIds={new Set(booking.selectedAddons.map(a => a.id))}
          />
        </ReservationLayout>
      </Container>
    </Section>
  );
}




// export default function ReservationForm() {
//   const labelRef   = useScrollReveal<HTMLSpanElement>();
//   const headingRef = useScrollReveal<HTMLHeadingElement>();

//   const dispatch = useAppDispatch();
//   const booking  = useAppSelector((s) => s.booking);










//   // ── Render ──

//   return (
//     <Section id="reservation" spacing="lg" aria-label="Reservation">
//       <Container size="md">
//         <Stack gap="xl">

//           {/* Section header */}
//           <Stack gap="xs" align="center">
//             <span ref={labelRef} className="section-label">ご予約</span>
//             <h2 ref={headingRef} className={styles.heading}>Reservation</h2>
//           </Stack>

//           {/* ── Success ── */}
//           {stage === 'success' && <SuccessView onReset={handleReset} />}

//           {/* ── Confirmation ── */}
//           {stage === 'confirm' && (
//             <ConfirmationView
//               selectedDate={selectedDate}
//               selectedTime={selectedTime}
//               selectedItems={selectedItems}
//               selectedAddons={selectedAddonsForDisplay}
//               total={total}
//               name={getValues('name')}
//               email={getValues('email')}
//               submitting={submitting}
//               submitError={submitError}
//               onBack={() => setStage('form')}
//               onConfirm={handleConfirm}
//             />
//           )}

//           {/* ── Main form ── */}
//           {stage === 'form' && (
//             <ReservationLayout
//               sidebar={
//                 <BookingSummary
//                   selectedItems={selectedItems}
//                   selectedAddons={selectedAddonsForDisplay}
//                   total={total}
//                   register={register}
//                   errors={errors}
//                   onSubmit={handleFormSubmit}
//                 />
//               }
//             >
//               <DateTimeSection />

//               <ServiceGallery />

//               <CategoryFocusPanel />

//               <AddonPicker />

//               <div className={styles.layout__inlineForm}>
//                 <BookingSummary
//                   selectedItems={selectedItems}
//                   selectedAddons={selectedAddonsForDisplay}
//                   total={total}
//                   register={register}
//                   errors={errors}
//                   onSubmit={handleFormSubmit}
//                 />
//               </div>
//             </ReservationLayout>
//           )}


//         </Stack>
//       </Container>
//     </Section>
//   );
// }