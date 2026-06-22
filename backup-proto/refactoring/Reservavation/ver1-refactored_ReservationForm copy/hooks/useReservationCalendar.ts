import { useState } from 'react';

export function useReservationCalendar() {
  const today = new Date();

  const [year, setYear] = useState(
    today.getFullYear()
  );

  const [month, setMonth] = useState(
    today.getMonth()
  );

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
      return;
    }

    setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
      return;
    }

    setMonth((m) => m + 1);
  }

  return {
    year,
    month,
    prevMonth,
    nextMonth,
  };
}



