import { gsap } from 'gsap';

interface HeroRevealTargets {
  // overlay: HTMLDivElement | null;
  logo: HTMLElement | null;
  headline: HTMLElement | null;
  sub: HTMLElement | null;
  cta: HTMLElement | null;
}

export function heroReveal({
  logo,
  headline,
  sub,
  cta,
}: HeroRevealTargets) {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  });

  const animate = (
    target: HTMLElement | null,
    duration: number,
    position?: string,
    ease?: string
  ) => {
    if (!target) return;

    tl.fromTo(
      target,
      {
        autoAlpha: 0,
        y: 24,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease,
      },
      position
    );
  };

  animate(logo, 0.7, undefined, 'power2.out');
  animate(sub, 0.7, '-=0.5');
  animate(headline, 0.9, '-=0.4');
  animate(cta, 0.6, '-=0.4');

  return tl;
}