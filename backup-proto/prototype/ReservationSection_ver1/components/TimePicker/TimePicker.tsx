import { TIME_SLOTS } from "@/utils/constants";

interface TimePickerProps {
  selectedTime: string;
  setSelectedTime: (t: string) => void;
}

export default function TimePicker({ selectedTime, setSelectedTime }: TimePickerProps) {
  return (
    <div className="reservation__timeslot">
      <div className="timeslot__labelWrapper">
        <h3 className="timeslot__label">ご希望時間</h3>
      </div>
      <div className="timeSlots">
        {TIME_SLOTS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedTime(t)}
            className={`timeSlots__slot ${selectedTime === t ? "selected" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
