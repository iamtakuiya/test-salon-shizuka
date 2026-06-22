// ─── Calendar helpers ─────────────────────────────────────────────────────────
export function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export function isClosedDay(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 3; // Wednesdays closed
}

export function isPastDay(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

export function formatDateISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Salon closed every Wednesday
 */
// export function isClosedDay(
//   year: number,
//   month: number,
//   day: number
// ): boolean {
//   const date = new Date(year, month, day);

//   // Sunday = 0
//   // Monday = 1
//   // ...
//   // Wednesday = 3

//   return date.getDay() === 3;
// }