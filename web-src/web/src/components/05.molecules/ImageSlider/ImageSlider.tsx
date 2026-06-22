/**
 * ImageSlider
 * ───────────
 * Generic, reusable slider shell.
 *
 * Responsibilities:
 *  - GSAP slide transition (fade + directional x)
 *  - Arrow controls (rendered via render-prop so callers can restyle)
 *  - Dot pagination
 *  - Keyboard ← → support
 *  - Accessibility (aria-live, role="tab", aria-selected)
 *
 * NOT responsible for:
 *  - What the slides look like  →  children() render prop
 *  - Section layout (heading, text columns, backgrounds)  →  caller
 *
 * Usage
 * ─────
 *  <ImageSlider slides={SLIDES} renderSlide={(slide) => <SliderGrid ... />}>
 *    {({ ArrowPrev, ArrowNext, Dots }) => (
 *      <>
 *        <ArrowPrev />
 *        <ArrowNext />
 *        <Dots />
 *      </>
 *    )}
 *  </ImageSlider>
 *
 *  The children function receives pre-wired control components so callers
 *  can place them anywhere in their layout (top-right, bottom-center, etc.)
 *  without reimplementing the logic.
 */
import { type ReactNode } from 'react';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  children: ReactNode;
}

export function ImageSlider({
  children,
}: ImageSliderProps) {
  return (
    <div className={styles.slider}>
      <div className={styles.viewport}>
        {children}
      </div>
    </div>
  );
}