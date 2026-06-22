import { useEffect, useRef } from 'react';
import { fadeInUp } from '../gsap/fade';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Attach a GSAP fadeInUp scroll-reveal to an element.
 * Returns a ref — attach it to the element you want to animate.
 *
 * @example
 * const ref = useScrollReveal<HTMLDivElement>();
 * return <div ref={ref}>...</div>;
 */
export const useScrollReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = fadeInUp(el);

    return () => {
      anim.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return ref;
};