import { gsap } from 'gsap';

/**
 * Animate the mobile menu overlay in.
 * Called from MobileMenu.tsx when isOpen becomes true.
 */
export const menuOverlayIn = (
  overlay: HTMLElement,
  navItems: HTMLElement[],
  social: HTMLElement | null
): gsap.core.Timeline => {
  const tl = gsap.timeline();

  // 1. Fade in the overlay itself
  tl.to(overlay, {
    autoAlpha: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  // 2. Stagger nav items up
  tl.fromTo(
    navItems,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.055,
    },
    '-=0.15' // overlap with overlay fade
  );

  // 3. Social icons after nav
  if (social) {
    tl.fromTo(
      social,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.1'
    );
  }

  return tl;
};

/**
 * Animate the mobile menu overlay out.
 * Called from MobileMenu.tsx when isOpen becomes false.
 */
export const menuOverlayOut = (overlay: HTMLElement): gsap.core.Timeline => {
  const tl = gsap.timeline();

  tl.to(overlay, {
    autoAlpha: 0,
    duration: 0.25,
    ease: 'power2.in',
  });

  return tl;
};
