import { useState } from 'react';

import { useAppDispatch } from '@/app/store/store';

import {
  resetBooking,
} from '@/features/booking/store/bookingSlice';

import { bookingService } from '@/services/bookingService';

import { MENU_CATEGORIES } from '@/utils/constants';

import type { MenuItem } from '@/utils/constants';

type Stage =
  | 'form'
  | 'confirm'
  | 'success';

type Params = {
  selectedDate: string;
  selectedTime: string;

  selectedItems: Record<string, MenuItem>;

  selectedAddons: {
    id: string;
    name: string;
    price: number;
  }[];

  getValues: () => {
    name: string;
    email: string;
  };

  handleSubmit: (
    cb: () => void
  ) => (e?: React.BaseSyntheticEvent) => void;

  setSelectedItems: React.Dispatch<
    React.SetStateAction<Record<string, MenuItem>>
  >;

  setActiveCategoryId: (
    id: string
  ) => void;
};

export function useReservationForm({
  selectedDate,
  selectedTime,

  selectedItems,
  selectedAddons,

  getValues,
  handleSubmit,

  setSelectedItems,
  setActiveCategoryId,
}: Params) {
  const dispatch = useAppDispatch();

  const [stage, setStage] =
    useState<Stage>('form');

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState(false);

  const handleFormSubmit =
    handleSubmit(() => {
      if (!selectedDate || !selectedTime) {
        alert('日程と時間帯を選択してください。');
        return;
      }

      if (
        Object.values(selectedItems)
          .filter(Boolean)
          .length === 0
      ) {
        alert(
          'メニューを1つ以上選択してください。'
        );
        return;
      }

      setStage('confirm');
    });

  const handleConfirm = async () => {
    setSubmitting(true);
    setSubmitError(false);

    try {
      const contact = getValues();

      const servicePayload =
        Object.values(selectedItems)
          .filter(Boolean)
          .map((item) => ({
            id: item.name,
            name: item.name,
            price: item.price,
          }));

      await bookingService.submit({
        name: contact.name,
        email: contact.email,

        date: selectedDate,
        time: selectedTime,

        services: servicePayload,
        addons: selectedAddons,
      });

      dispatch(resetBooking());

      setSelectedItems({});

      setStage('success');
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    dispatch(resetBooking());

    setSelectedItems({});

    setActiveCategoryId(
      MENU_CATEGORIES[0].id
    );

    setStage('form');
  };

  return {
    stage,
    submitting,
    submitError,

    setStage,

    handleFormSubmit,
    handleConfirm,
    handleReset,
  };
}