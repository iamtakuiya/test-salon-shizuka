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

import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';

// Layout
import { ReservationLayout } from './layouts/ReservationLayout';

// Sections
import { ReservationContact } from './sections/ReservationContact';
import { ReservationAddons } from './sections/ReservationAddons';
import { ReservationDateTime } from './sections/ReservationDateTime';
import { ReservationServices } from './sections/ReservationServices';

// Sub-components
import { ReservationHeader } from './components/ReservationHeader/ReservationHeader';
import { ConfirmationView } from './components/booking/ConfirmationView/ConfirmationView';
import { SuccessView } from './components/booking/SuccessView/SuccessView';

// Redux
import { useAppSelector, useAppDispatch } from '@/app/store/store';
// Import your action creators from your real booking slice path
import {
  setDate,
  setTime,
  toggleService,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';

// Constants / Schemas
import { contactSchema, type ContactData } from './schema/contactSchema';
import { MENU_CATEGORIES } from '@/utils/constants';
import { formatDateISO } from '@/utils/calendar';

// Custom Hooks
import { useReservationForm } from './hooks/useReservationForm';
import { useReservationServices } from './hooks/useReservationServices';
import { useReservationCalendar } from './hooks/useReservationCalendar';

// Services
import { bookingService }    from '@/services/bookingService';


export default function ReservationForm() {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((s) => s.booking);

  // Form handling
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  // --- Ephemeral Calendar UI State ---
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  // --- React Hook Form ---
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  // --- Services Hook ---
  const {
    selectedItems,
    setSelectedItems,
    activeCategoryId,
    setActiveCategoryId,
    stage, 
    setStage 
  } = useReservationServices();
  const { year, month, prevMonth, nextMonth } = useReservationCalendar();

  // Handle category object mapping
  const activeCategory = MENU_CATEGORIES.find((c) => c.id === activeCategoryId) || MENU_CATEGORIES[0];

  // --- Safe Variable Fallbacks (Fixes string | null errors) ---
  const safeDate = booking.selectedDate ?? '';
  const safeTime = booking.selectedTime ?? '';

  // --- Calculate Live Total (Fixes missing total error) ---
  const itemsTotal = Object.values(selectedItems)
    .filter(Boolean)
    .reduce((sum, item) => sum + item.price, 0);
  const addonsTotal = (booking.selectedAddons || [])
    .reduce((sum: number, addon: any) => sum + addon.price, 0);
  const calculatedTotal = itemsTotal + addonsTotal;
  
  // Compute total price
  // const total = (booking.selectedServices ?? []).concat(booking.selectedAddons ?? []).reduce((sum, s) => sum + s.price, 0);

  // --- Master Reservation Form Engine Hook ---
  const reservationForm = useReservationForm({
    selectedDate: safeDate,
    selectedTime: safeTime,
    selectedItems,
    selectedAddons: booking.selectedAddons,
    getValues,
    handleSubmit,
    setSelectedItems,
    setActiveCategoryId,
  });

  // --- Fixed Event Handlers ---
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

  const handleFormSubmit = handleSubmit(() => {
    reservationForm.setStage('confirm');
  });

  //   {reservationForm.stage === 'success' && (
  //   <SuccessView
  //     onReset={reservationForm.handleReset}
  //   />
  // )}

  // {reservationForm.stage === 'confirm' && (
  //   <ConfirmationView
  //     onBack={() => reservationForm.setStage('form')}
  //     onConfirm={reservationForm.handleConfirm}
  //   />
  // )}

  // Convert addons array from Redux state to a lookup Set for the addon picker UI
  const selectedAddonIds = new Set((booking.selectedAddons || []).map((a: any) => a.id));

  return (
    <Section id="reservation">
      <Container>

        {reservationForm.stage === 'success' && (
          <SuccessView onReset={reservationForm.handleReset} />
        )}

        {reservationForm.stage === 'confirm' && (
          <ConfirmationView
            selectedDate={safeDate}
            selectedTime={safeTime}
            selectedItems={selectedItems}
            selectedAddons={booking.selectedAddons || []}
            total={calculatedTotal}
            name={getValues('name')}
            email={getValues('email')}
            submitting={false}   // Swap with hook state if available
            submitError={false}  // Swap with hook state if available
            onBack={() => reservationForm.setStage('form')}
            onConfirm={reservationForm.handleConfirm}
          />
        )}

        <ReservationHeader />

        <ReservationLayout
          sidebar={
            <ReservationContact
              selectedItems={selectedItems}
              selectedAddons={booking.selectedAddons || []}
              total={calculatedTotal}
              register={register}
              errors={errors}
              onSubmit={handleFormSubmit}
            />
          }
        >
          {/* 1. DateTime Section props solved */}
          <ReservationDateTime
            year={currentYear}
            month={currentMonth}
            selectedDate={safeDate}
            selectedTime={safeTime}
            onPrevMonth={() => setCurrentMonth(m => m === 1 ? 12 : m - 1)}
            onNextMonth={() => setCurrentMonth(m => m === 12 ? 1 : m + 1)}
            onDayClick={handleDayClick}
            onTimeSelect={handleTimeSelect}
          />

          {/* 2. Services Section props solved */}
          <ReservationServices
            activeCategory={activeCategory}
            activeCategoryId={activeCategoryId}
            selectedItems={selectedItems}
            onCategorySelect={(id) => setActiveCategoryId(id)}
            onItemSelect={(catId, item) => {
              setSelectedItems(prev => ({ ...prev, [catId]: item }));
            }}
          />

          {/* 3. Addons Section props solved */}
          <ReservationAddons
            selectedAddonIds={selectedAddonIds}
            onToggle={(addon) => dispatch(toggleAddon(addon))}
          />
        </ReservationLayout>
      </Container>
    </Section>
  );
}