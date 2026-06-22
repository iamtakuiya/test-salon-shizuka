import { useScrollReveal } from "@/animations/hooks/useScrollReveal";
import { Stack } from "@/components/01.primitives/Stack/Stack";
import styles from '../../ReservationForm.module.scss'

export function ReservationHeader() {
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    // {/* Section header */}
    <Stack gap="xs" align="center">
      <span ref={labelRef} className="section-label">ご予約</span>
      <h2 ref={headingRef} className={styles.heading}>Reservation</h2>
    </Stack>
  );
}