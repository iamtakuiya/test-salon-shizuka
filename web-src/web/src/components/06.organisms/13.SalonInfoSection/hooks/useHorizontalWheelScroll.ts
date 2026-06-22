import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Lets a horizontally-scrollable element consume vertical wheel input as
 * horizontal scroll, while transparently handing the event back to the
 * page once the element has reached either scroll boundary.
 *
 * This fixes the "scroll gets stuck inside the container" bug: scrolling
 * past the first or last card now continues the page scroll instead of
 * doing nothing. Two things make that actually work, beyond the boundary
 * check itself:
 *
 * 1. The listener is attached directly to the scrollable element — not a
 *    wrapping card — so hovering over content *outside* the scroll strip
 *    (e.g. the "closed days" note below it) never gets hijacked.
 * 2. At a boundary, we simply return without calling preventDefault().
 *    Because this element has no vertical overflow, the browser's native
 *    scroll-chaining takes the unconsumed wheel delta and scrolls the
 *    nearest scrollable ancestor (the page) for us — no extra JS needed.
 */
export function useHorizontalWheelScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Prefer the dominant axis — supports trackpads that send deltaX directly.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;

      // Nothing to scroll at all — don't intercept anything.
      if (maxScroll <= 0) return;

      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= maxScroll - 1;
      const scrollingBackward = delta < 0;
      const scrollingForward = delta > 0;

      // At a boundary and trying to go further that way — let the event
      // bubble so the window scrolls instead of trapping the gesture.
      if ((atStart && scrollingBackward) || (atEnd && scrollingForward)) {
        return;
      }

      e.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [ref]);
}
