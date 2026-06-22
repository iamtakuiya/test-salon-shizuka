import styles from './TimeSlotPicker.module.scss';

import { TIME_SLOTS } from '@/utils/constants';

/** Time slot grid */
export function TimeSlotPicker({
  selectedTime,
  onSelect,
}: {
  selectedTime: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div className={styles.timeSlots} role="group" aria-label="時間帯の選択">
      {TIME_SLOTS.map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={selectedTime === t}
          className={[
            styles.timeSlots__slot,
            selectedTime === t ? styles['timeSlots__slot--selected'] : '',
          ].join(' ')}
          onClick={() => onSelect(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}