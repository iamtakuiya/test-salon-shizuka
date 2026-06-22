import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import styles from './Slider.module.scss';

/**
 * Generic, reusable slide carousel.
 *
 * ```tsx
 * const slides = [
 *   [{ id: 1, alt: 'A', src: 'a.jpg' }, ...], // first screen
 *   [{ id: 2, alt: 'B', src: 'b.jpg' }, ...], // second screen
 * ];
 *
 * <Slider
 *   slides={slides}
 *   renderItem={(item) => (
 *     <picture>
 *       <source media="(min-width: 768px)" srcSet={item.srcDesktop} />
 *       <img src={item.srcMobile} alt={item.alt} className={styles.image} />
 *     </picture>
 *   )}
 *   headerLabel="Gallery"
 *   headerTitle="Salon Gallery"
 * />
 * ```
 */
export interface SliderProps<T> {
  /**
   * 2‑dimensional array – each top‑level entry represents one "slide"
   * that will be shown at a time.
   */
  slides: T[][];
  /** Render a single item. */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Optional label shown above the title (usually a section tag). */
  headerLabel?: string;
  /** Heading text for the section. */
  headerTitle?: string;
  /** Optional extra class for the root <section>. */
  className?: string;
}

export default function Slider<T extends { id: number; span?: number }>(props: SliderProps<T>) {
  const { slides, renderItem, headerLabel, headerTitle, className } = props;
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (animating || next === current) return;
      setAnimating(true);
      const el = slideRef.current;
      if (!el) {
        setCurrent(next);
        setAnimating(false);
        return;
      }
      const dir = next > current ? 1 : -1;
      gsap
        .timeline({
          onComplete: () => {
            setCurrent(next);
            setAnimating(false);
          },
        })
        .to(el, { opacity: 0, x: -40 * dir, duration: 0.35, ease: 'power2.in' })
        .fromTo(
          el,
          { opacity: 0, x: 40 * dir },
          { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' },
        );
    },
    [animating, current],
  );

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  // keyboard navigation – mirrors original GallerySlider behaviour
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, animating]); // eslint-disable-line react-hooks/exhaustive-deps

  // stagger images on slide change (mount + when current changes)
  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    const imgs = el.querySelectorAll(`.${styles.slider__imgWrap}`);
    gsap.fromTo(
      imgs,
      { opacity: 0, scale: 0.97, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' },
    );
  }, [current]);

  const currentSlide = slides[current];

  return (
    <section className={className} aria-label={headerTitle}>
      <div className={styles.slider__header}>
        <div className={styles.slider__text}> {/* wrapper for label + heading */}
          {headerLabel && (
            <span ref={labelRef} className="section-label">
              {headerLabel}
            </span>
          )}
          {headerTitle && (
            <h2 ref={headingRef} className={styles.slider__heading}>
              {headerTitle}
            </h2>
          )}
        </div>
        <div className={styles.slider__controls} role="group" aria-label="スライダーコントロール">
          <button onClick={prev} disabled={animating} className={styles.slider__arrow} aria-label="前のスライド">
            ←
          </button>
          <button onClick={next} disabled={animating} className={styles.slider__arrow} aria-label="次のスライド">
            →
          </button>
        </div>
      </div>

      <div className={styles.slider__viewport} aria-live="polite">
        <div ref={slideRef} className={styles.slider__slide} aria-label={`スライド ${current + 1} / ${total}`}>
          {currentSlide.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.slider__imgWrap} ${item.span === 2 ? styles['slider__imgWrap--wide'] : ''}`}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.slider__dots} role="tablist" aria-label="スライドナビゲーション">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`スライド ${i + 1}`}
            className={`${styles.slider__dot} ${i === current ? styles['slider__dot--active'] : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
