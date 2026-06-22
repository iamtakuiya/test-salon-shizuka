import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section label reveal — letter-spacing expands + fades in.
 * Used for uppercase labels like "CONCEPT", "MENU".
 */
export const sectionLabelReveal = (el: HTMLElement): gsap.core.Tween => {
  return gsap.fromTo(
    el,
    { opacity: 0, letterSpacing: '0em' },
    {
      opacity: 1,
      letterSpacing: '0.25em',
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    }
  );
};

/**
 * Image reveal — scale up from slightly smaller + fade in.
 */
export const imageReveal = (el: HTMLElement): gsap.core.Tween => {
  return gsap.fromTo(
    el,
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    }
  );
};
