import { useState } from 'react';

export type ReservationStage =
  | 'form'
  | 'confirm'
  | 'success';

export function useReservationStage() {
  const [stage, setStage] =
    useState<ReservationStage>('form');

  return {
    stage,
    setStage,
  };
}