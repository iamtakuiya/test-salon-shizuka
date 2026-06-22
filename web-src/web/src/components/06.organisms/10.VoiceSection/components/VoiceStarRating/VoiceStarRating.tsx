import styles from './VoiceStarRating.module.scss';

interface VoiceStarRatingProps {
  /** Integer 1–5 */
  rating: number;
}

/**
 * Renders a row of five stars, filled up to `rating`.
 * Accessible via aria-label on the wrapper.
 */
export function VoiceStarRating({ rating }: VoiceStarRatingProps) {
  return (
    <div
      className={styles.starRating}
      aria-label={`5点満点中 ${rating}点の評価`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`${styles.star} ${i < rating ? styles['star--filled'] : ''}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}
