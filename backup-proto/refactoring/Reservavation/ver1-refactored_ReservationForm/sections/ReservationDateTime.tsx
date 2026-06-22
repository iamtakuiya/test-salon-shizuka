// sections/ReservationDateTime.tsx

// import styles from './ReservationDateTime.module.scss';
import styles from '../ReservationForm.module.scss';


import { FormLabel } from '@/components/04.atoms/FormLabel/FormLabel';

import { CalendarPicker } from '../components/calendar/CalendarPicker/CalendarPicker';
import { TimeSlotPicker } from '../components/calendar/TimeSlotPicker/TimeSlotPicker';
import {
  isClosedDay,
  isPastDay,
} from '@/utils/calendar';

type Props = {
  year: number;
  month: number;
  selectedDate: string;
  selectedTime: string;

  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDayClick: (day: number) => void;
  onTimeSelect: (time: string) => void;
};

export function ReservationDateTime({
  year,
  month,
  selectedDate,
  selectedTime,
  onPrevMonth,
  onNextMonth,
  onDayClick,
  onTimeSelect,
}: Props) {


  return (
    <div className={styles.dateTime}>
      <div className={styles.dateTime__cal}>
        <FormLabel>ご希望日程</FormLabel>

        <CalendarPicker
          year={year}
          month={month}
          selectedDate={selectedDate}
          isDayDisabled={(day) =>
            isClosedDay(year, month, day) ||
            isPastDay(year, month, day)
          }
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          onDayClick={onDayClick}
        />
      </div>

      <div className={styles.dateTime__time}>
        <FormLabel>ご希望時間</FormLabel>

        <TimeSlotPicker
          selectedTime={selectedTime}
          onSelect={onTimeSelect}
        />
      </div>
    </div>
  );
}