/**
 * SliderGrid
 * ──────────
 * Renders one slide's worth of items in one of two layouts:
 *
 *  "uniform"  — equal-width columns, all same aspect-ratio.
 *               Used by: StyleGuideTeaser
 *
 *  "varied"   — 4-col grid where items can span 1 or 2 columns.
 *               Used by: GallerySlider
 *
 * Each item carries a `data-slider-item` attribute so the parent
 * <ImageSlider> can target them for GSAP stagger animations.
 *
 * This component owns:
 *  - grid layout
 *  - image placeholder (swap for <img> once assets are ready)
 *  - overlay label on hover
 *  - item caption below image
 *
 * This component does NOT own:
 *  - slider state, navigation, dots, or arrows  →  <ImageSlider>
 *  - section padding, headings, or background   →  section component
 */
import {
  forwardRef,
} from 'react';

import clsx from 'clsx';

import styles from './SliderGrid.module.scss';

// ── Types ───────────────────────────────────────────────────────────────────

export interface SliderItem {
  id: string;
  image: string;
  alt: string;
  label: string;
}

interface SliderGridProps {
  items: SliderItem[];
  currentIndex: number;
  variant?: 'default' | 'gallery';
  onSelect?: (index: number) => void;
}

// ── Component ───────────────────────────────────────────────────────────────

export const SliderGrid = forwardRef<
  HTMLDivElement,
  SliderGridProps
>(
  (
    {
      items,
      currentIndex,
      variant = 'default',
      onSelect,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.grid,
          variant === 'gallery' &&
            styles.gallery
        )}
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            data-gallery-item
            onClick={() => onSelect?.(index)}
            className={clsx(
              styles.item,
              index === currentIndex &&
                styles.active
            )}
          >
            <img
              src={item.image}
              alt={item.alt}
              className={styles.image}
            />

            <div className={styles.overlay}>
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>
    );
  }
);

SliderGrid.displayName =
  'SliderGrid';