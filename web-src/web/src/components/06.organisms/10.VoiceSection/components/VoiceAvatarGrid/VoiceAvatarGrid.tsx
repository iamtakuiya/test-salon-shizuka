import type { TestimonialProps } from '../../data';
import styles               from './VoiceAvatarGrid.module.scss';

interface VoiceAvatarGridProps {
  testimonials: TestimonialProps[];
  activeId:     number;
  activeIndex:  number;
  onSelect:     (id: number) => void;
}

/**
 * Renders testimonial portrait photos in a morphing CSS grid.
 * The active portrait expands to fill a wide slot; the others collapse.
 * Layout shifts are driven entirely by grid-template-areas + CSS transitions —
 * no GSAP, no JS layout reads, no reflows.
 */
export function VoiceAvatarGrid({
  testimonials,
  activeId,
  activeIndex,
  onSelect,
}: VoiceAvatarGridProps) {
  return (
    <div
      className={styles.avatarGrid}
      // CSS class encodes active index → grid-template-areas swap
      data-active={activeIndex}
      role="tablist"
      aria-label="レビュー対象者の切り替え"
    >
      {testimonials.map((t, i) => {
        const isActive = t.id === activeId;

        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`voice-tab-${t.id}`}
            aria-selected={isActive}
            aria-controls={`voice-panel-${t.id}`}
            className={`${styles.avatarBtn} ${isActive ? styles['avatarBtn--active'] : ''}`}
            style={{ gridArea: `img${i}` } as React.CSSProperties}
            onClick={() => onSelect(t.id)}
          >
            <img
              src={t.image}
              alt={`${t.name}様`}
              className={styles.avatarImg}
              loading="lazy"
              decoding="async"
              width={320}
              height={480}
            />
            {/* Subtle name tag visible on inactive portraits */}
            {!isActive && (
              <span className={styles.avatarName} aria-hidden="true">
                {t.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
