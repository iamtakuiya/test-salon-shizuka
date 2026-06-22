import { gsap } from 'gsap';

export function galleryFocusAnimation(
  active: HTMLElement,
  inactive: HTMLElement[]
) {
  gsap.to(active, {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
  });

  gsap.to(inactive, {
    scale: 0.88,
    opacity: 0.7,
    duration: 0.8,
    ease: 'power3.out',
  });
}

export function animateGallery(
  active: HTMLElement,
  inactive: HTMLElement[]
) {
  gsap.to(active, {
    width: 220,
    height: 260,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
  });

  gsap.to(inactive, {
    width: 150,
    height: 180,
    opacity: 0.6,
    duration: 0.8,
    ease: 'power3.out',
  });
}