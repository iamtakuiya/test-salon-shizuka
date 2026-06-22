// import { useState, useRef, useEffect, useCallback } from 'react';

// export function useReservationCalendar() {

//   // Calendar
//   // const today = new Date();
//   // const [calYear, setCalYear]   = useState(today.getFullYear());
//   // const [calMonth, setCalMonth] = useState(today.getMonth());


//   // ── Handlers ──
//   // function handlePrevMonth() {
//   //   if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
//   //   else setCalMonth((m) => m - 1);
//   // }
//   // function handleNextMonth() {
//   //   if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
//   //   else setCalMonth((m) => m + 1);
//   // }

//   // function handleDayClick(day: number) {
//   //   dispatch(setDate(formatDateISO(calYear, calMonth, day)));
//   // }

//   return (
//     calYear,
//     calMonth,
//     handlePrevMonth,
//     handleNextMonth,
//     handleDayClick
//   );
// }

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



