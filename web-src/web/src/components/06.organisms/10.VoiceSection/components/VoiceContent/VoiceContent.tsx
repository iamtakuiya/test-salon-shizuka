import type { TestimonialProps } from '../../data';
import { VoiceStarRating }  from '../VoiceStarRating/VoiceStarRating';
import styles               from './VoiceContent.module.scss';

interface VoiceContentProps {
  testimonial: TestimonialProps;
}

/**
 * Displays the full review content for the currently active testimonial.
 * Receives a single testimonial object — no state, no side effects.
 */
export function VoiceContent({ testimonial }: VoiceContentProps) {
  return (
    <div
      className={styles.voiceContent}
      role="tabpanel"
      id={`voice-panel-${testimonial.id}`}
      aria-labelledby={`voice-tab-${testimonial.id}`}
      // Key forces a remount (and CSS entry animation) on testimonial change
      key={testimonial.id}
    >
      {/* Pull-quote headline */}
      <h3 className={styles.voiceContent__comment}>
        {testimonial.comment}
      </h3>

      {/* Full description */}
      <blockquote className={styles.voiceContent__quote}>
        <p className={styles.voiceContent__desc}>
          {testimonial.description}
        </p>

        <footer className={styles.voiceContent__footer}>
          <div className={styles.voiceContent__metaWrapper}>
            {/* Author */}
            <div className={styles.voiceContent__profile}>
              <cite className={styles.voiceContent__author}>
                <span className={styles.voiceContent__name}>
                  {testimonial.name}
                  {testimonial.age && (
                    <span className={styles.voiceContent__age}>
                      {testimonial.age}代
                    </span>
                  )}
                </span>
                {testimonial.occupation && (
                  <span className={styles.voiceContent__occupation}>
                    {testimonial.occupation}
                  </span>
                )}
              </cite>
            </div>

            {/* Service + date */}
            <div className={styles.voiceContent__meta}>
              <time
                dateTime={testimonial.date}
                className={styles.voiceContent__date}
              >
                {testimonial.date}
              </time>
              <span
                className={styles.voiceContent__service}
                aria-label="施術メニュー"
              >
                {testimonial.service}
              </span>
            </div>
          </div>

          {/* Divider + stars */}
          <div className={styles.voiceContent__ratingRow}>
            <span className={styles.voiceContent__divider} aria-hidden="true" />
            <VoiceStarRating rating={testimonial.rating} />
          </div>
        </footer>
      </blockquote>
    </div>
  );
}
