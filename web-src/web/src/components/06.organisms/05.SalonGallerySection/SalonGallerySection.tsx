/**
 * GallerySlider
 * ─────────────
 * Salon gallery section. Uses <ImageSlider> + <SliderGrid variant="varied">
 * for mixed-span images.
 *
 * Layout:
 *  ┌────────────────────────────────────────┐
 *  │  sub-label + heading      [ ← ] [ → ] │  ← header row
 *  │  ┌──────────────────────────────────┐  │
 *  │  │  mixed-size image grid           │  │  ← viewport (overflow: hidden)
 *  │  └──────────────────────────────────┘  │
 *  │           ●  ○  ○  ○  ○  ○            │  ← dots
 *  └────────────────────────────────────────┘
 */

import {
  useLayoutEffect,
  useRef,
} from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { useSlider } from '@/animations/hooks/useSlider';

import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import { Row } from '@/components/01.primitives/Row/Row';
import { Box } from '@/components/01.primitives/Box/Box';

import { ImageSlider } from '@/components/05.molecules/ImageSlider/ImageSlider';
import { SliderGrid } from '@/components/05.molecules/SliderGrid/SliderGrid';

import styles from './SalonGallerySection.module.scss';

// Constants
import { GALLERY_SECTION_ID, GALLERY_HEADING, GALLERY_SUBHEADING } from '@/features/gallery/constants/gallery.constants';
import { GALLERY_ITEMS } from '@/features/gallery/data/gallery.data';

// ── Component ───────────────────────────────────────────────────────────────

export function SalonGallerySection() {;

  const {
    current,
    next,
    prev,
    goTo,
    // totalSteps,
  } = useSlider({
    totalItems: GALLERY_ITEMS.length,
    visibleItems: 3,
  });

  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;

    if (!track) return;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(
        '[data-gallery-item]'
      )
    );

    const activeItem = items[current];

    if (!activeItem) return;

    const mm = gsap.matchMedia(trackRef);

    // Mobile & Small Screen Rules (< 768px)
    mm.add("(max-width: 767px)", () => {

      gsap.to(items, {
        width: 150,
        height: 180,
        opacity: 0.6,
        duration: 0.8,
        ease: 'power3.out',
      });
  
      gsap.to(activeItem, {
        width: 220,
        height: 260,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });

    })

    // Tablet & Desktop Rules (>= 768px)
    mm.add("(min-width: 768px)", () => {
      gsap.to(items, {
        width: 250,
        height: 330,
        opacity: 0.6,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to(activeItem, {
        width: 361,   // Applied from your max-width target
        height: 426,  // Applied from your max-height target
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    // Shared Centering Logic (Runs on all screen sizes)
    const parentWidth = track.parentElement?.clientWidth ?? 0;
    const offset = activeItem.offsetLeft - parentWidth / 2 + activeItem.clientWidth / 1.67;

    // Centering Logic
    // const offset =
    //   activeItem.offsetLeft -
    //   track.parentElement!.clientWidth / 2 +
    //   activeItem.clientWidth / 1.67;

    // const ITEM_WIDTH = 166;  // OPTION 1
    // const target = items[current]?.offsetLeft ?? 0;  // OPTION 2

    gsap.to(track, {
      x: -offset,
      // x: -(current * ITEM_WIDTH),  // OPTION 1
      // x: -target,  // OPTION 2
      duration: 0.8,
      ease: 'power3.out',
    });

      // mm.revert() is automatically called by useGSAP when dependencies change
  }, {dependencies: [current], scope: trackRef });

  return (
    <Section
      id={GALLERY_SECTION_ID}
      spacing="lg"
      className={styles.gallery}
    >
      <Container as="header" className={styles.gallery__header}>
        <Stack gap="xs">
          <span className={styles.gallery__label}>
            {GALLERY_SUBHEADING}
          </span>

          <h2 className={styles.gallery__heading}>
            {GALLERY_HEADING}
          </h2>
        </Stack>

        <Row className={styles.gallery__controls}>
          <button
            onClick={prev}
            className={styles.gallery__arrow}
            aria-label="Previous Slide"
          >
            ←
          </button>

          <button
            onClick={next}
            className={styles.gallery__arrow}
            aria-label="Next Slide"
          >
            →
          </button>
        </Row>
      </Container>

      <ImageSlider>
        <SliderGrid
          ref={trackRef}
          items={GALLERY_ITEMS}
          currentIndex={current}
          variant="gallery"
          onSelect={goTo}
        />
      </ImageSlider>

      <Box className={styles.gallery__pagination}>
        {GALLERY_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={
              current === index
                ? styles.activeDot
                : styles.dot
            }
          />
        ))}
      </Box>
    </Section>
  );
}