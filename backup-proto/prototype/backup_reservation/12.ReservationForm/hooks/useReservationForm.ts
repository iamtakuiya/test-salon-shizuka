// Redux — swap with real store paths
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  setDate,
  setTime,
  toggleService,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';

import { MENU_CATEGORIES } from '@/utils/constants';
import { bookingService }    from '@/services/bookingService';


export function useReservationForm() {
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
  const async function handleConfirm() {
    setSubmitting(true);
    setSubmitError(false);
    const contact = getValues();
    try {
      // Sync local item selections to Redux before submitting
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
  
  const handleReset = () => {
    dispatch(resetBooking());
    setSelectedItems({});
    setActiveCategoryId(MENU_CATEGORIES[0].id);
    setStage('form');
  }

  return (

    handleReset,
  );
}