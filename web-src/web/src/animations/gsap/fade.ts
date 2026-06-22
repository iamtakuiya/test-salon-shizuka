import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade a single element in upward on scroll.
 */
export const fadeInUp = (el: HTMLElement, delay = 0): gsap.core.Tween => {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    }
  );
};

/**
 * Stagger-fade a list of elements in upward on scroll.
 */
export const fadeInStagger = (
  els: HTMLElement[],
  stagger = 0.08
): gsap.core.Tween => {
  return gsap.fromTo(
    els,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger,
      scrollTrigger: { trigger: els[0], start: 'top 85%' },
    }
  );
};