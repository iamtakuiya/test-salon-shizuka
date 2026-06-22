// ─── Calendar helpers ─────────────────────────────────────────────────────────
export function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export function isClosedDay(year: number, month: number, day: number): boolean {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();

  // Check if it's any Monday (Monday is 1)
  const isMonday = dayOfWeek === 1;

  // Check if it's the 2nd Tuesday
  // Tuesday is 2. The 2nd Tuesday of any month must fall between the 8th and 14th.
  const isSecondTuesday = dayOfWeek === 2 && day >= 8 && day <= 14;

  // Return true if it's either a Monday OR the 2nd Tuesday
  return isMonday || isSecondTuesday;
}

export function isPastDay(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

export function formatDateISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}