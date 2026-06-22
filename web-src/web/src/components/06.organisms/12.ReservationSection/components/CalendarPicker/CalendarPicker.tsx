import styles from '../../ReservationSection.module.scss';
// import { buildCalendarCells, formatDateISO, isClosedDay, isPastDay, MONTHS_EN, DAYS_JA } from '../../ReservationSection';
import { MONTHS_EN, DAYS_JA } from '@/utils/constants';
import { buildCalendarCells, formatDateISO, isClosedDay, isPastDay } from '@/utils/calendar';


/** Calendar date picker */
export function CalendarPicker({
  year,
  month,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onDayClick,
}: {
  year: number;
  month: number;
  selectedDate: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDayClick: (day: number) => void;
}) {
  const cells = buildCalendarCells(year, month);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__nav}>
        <button type="button" className={styles.calendar__navBtn} onClick={onPrevMonth} aria-label="前月">
          ‹
        </button>
        <span className={styles.calendar__month}>
          {MONTHS_EN[month]} {year}
        </span>
        <button type="button" className={styles.calendar__navBtn} onClick={onNextMonth} aria-label="翌月">
          ›
        </button>
      </div>

      <div className={styles.calendar__divider} aria-hidden="true" />

      <div className={styles.calendar__grid} role="grid" aria-label="日程選択">
        {DAYS_JA.map((d) => (
          <div key={d} className={styles.calendar__dayHeader} role="columnheader">
            {d}
          </div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} role="gridcell" aria-hidden="true" />;

          const dateStr = formatDateISO(year, month, day);
          const disabled = isClosedDay(year, month, day) || isPastDay(year, month, day);
          const selected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              role="gridcell"
              disabled={disabled}
              aria-disabled={disabled}
              aria-pressed={selected}
              aria-label={`${year}年${month + 1}月${day}日${disabled ? ' — 定休日' : ''}`}
              className={[
                styles.calendar__day,
                disabled ? styles['calendar__day--disabled'] : '',
                selected ? styles['calendar__day--selected'] : '',
              ].join(' ')}
              onClick={() => !disabled && onDayClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className={styles.calendar__note}>毎週　月曜日・第2火曜日</p>
    </div>
  );
}
