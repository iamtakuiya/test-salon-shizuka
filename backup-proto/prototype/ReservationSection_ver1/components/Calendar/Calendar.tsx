import { DAYS_JA, MONTHS_EN } from "@/utils/constants"; // reuse constants

// Helper to build calendar cells – identical to original buildCalendar
function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function isClosed(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 3; // Wednesday
}

function isPast(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

interface CalendarProps {
  calYear: number;
  calMonth: number;
  setCalYear: (year: number) => void;
  setCalMonth: (month: number) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export default function Calendar({
  calYear,
  calMonth,
  setCalYear,
  setCalMonth,
  prevMonth,
  nextMonth,
  selectedDate,
  setSelectedDate,
}: CalendarProps) {
  const cells = buildCalendar(calYear, calMonth);

  const handleDayClick = (day: number) => {
    const formatted = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formatted);
  };

  return (
    <div className="calendar">
      <div className="calendar__nav">
        <button type="button" onClick={prevMonth} className="calendar__navBtn" aria-label="前月">
          ‹
        </button>
        <span className="calendar__month">
          {MONTHS_EN[calMonth]} {calYear}
        </span>
        <button type="button" onClick={nextMonth} className="calendar__navBtn" aria-label="翌月">
          ›
        </button>
      </div>
      <div className="divider" />
      <div className="calendar__grid">
        {DAYS_JA.map((d) => (
          <div key={d} className="calendar__dayHeader">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="calendar__dayEmpty" />;
          const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const disabled = isClosed(calYear, calMonth, day) || isPast(calYear, calMonth, day);
          const isSelected = selectedDate === dateStr;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`calendar__day ${disabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
