# Mobile Menu Overlay Animation

This document explains the GSAP‑based animation used for the mobile navigation menu.

## Files Involved
- **`src/animations/gsap/mobileMenu.module.ts`** – Implements the actual GSAP timelines:
  - `menuOverlayIn(overlay, navItems, social)` creates a timeline that:
    1. Fades the overlay container in (autoAlpha → 1).
    2. Staggers the navigation list items, animating them from `opacity: 0, y: 20` to fully visible.
    3. Optionally animates the social‑icon block.
  - `menuOverlayOut(overlay)` fades the overlay out.
- **`src/animations/gsap/mobileMenu.ts`** – A thin re‑export that allows components to import the two functions from a stable path (`@/animations/gsap/mobileMenu`).
- **`src/components/organisms/Header/MobileMenu/MobileMenu.tsx`** – React component that:
  1. Holds refs for the overlay element, navigation items, and social icons.
  2. On `isOpen` changes, calls `menuOverlayIn` or `menuOverlayOut` and stores the returned `gsap.core.Timeline`.
  3. Sets `pointerEvents` so the overlay only captures clicks when open.

## How It Works
1. **Initial Setup** – When the component mounts, the overlay is set to `autoAlpha: 0` (invisible).
2. **Opening** – `isOpen` becomes `true`:
   - `pointerEvents` is set to `'all'` so the overlay can be interacted with.
   - `menuOverlayIn` is called with the overlay element, an array of navigation `<li>` items, and the optional social icons element.
   - The GSAP timeline fades the overlay, then animates the nav items with a 0.055 s stagger, and finally the social icons.
3. **Closing** – `isOpen` becomes `false`:
   - `pointerEvents` is set to `'none'` to prevent interaction.
   - `menuOverlayOut` fades the overlay back out.

The re‑export file (`mobileMenu.ts`) exists solely for a clean import path; it does not contain any logic itself.
