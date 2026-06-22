import { useEffect, useRef, PropsWithChildren, MouseEvent } from "react";
import { gsap } from "gsap";

import { menuOverlayIn, menuOverlayOut } from '@/animations/gsap/mobileMenu';
import styles from './MobileMenu.module.scss';
import { Box } from "@/components/01.primitives/Box/Box";
import { Row } from "@/components/01.primitives/Row/Row";
import { NavLinks } from "@/components/05.molecules/NavLink/NavLinks";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { SOCIAL_LINKS } from '@/config/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  onClose,
  children,
  ...rest
}: PropsWithChildren<MobileMenuProps>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Set initial hidden state
  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, { autoAlpha: 0 });
  }, []);

  // Animate in/out when isOpen changes
  useEffect(() => {
    if (!overlayRef.current) return;

    // Kill any running timeline
    timelineRef.current?.kill();

    const navEls = navItemsRef.current.filter(Boolean);
    const socialEl = socialRef.current;

    if (isOpen) {
      // Make overlay visible before animating
      overlayRef.current.style.pointerEvents = 'all';
      timelineRef.current = menuOverlayIn(
        overlayRef.current,
        navEls,
        socialEl
      );
    } else {
      overlayRef.current.style.pointerEvents = 'none';
      timelineRef.current = menuOverlayOut(overlayRef.current);
    }

  }, [isOpen]);

  // Close MobileMenu with ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose])

  // Safely capture elements for GSAP animation
  const setNavItemRef = (el: HTMLLIElement | null, index: number) => {
    if (el) {
      navItemsRef.current[index] = el;
    }
  };

  // Check if the element clicked is exactly the backdrop box background
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === mobileMenu.current) {
      console.log(e.target)
      onClose();
    }
  };
  
  return (
    <Box
      ref={overlayRef}
      id="mobile-menu"
      className={styles.menu}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      {...rest}
    > 
      <nav
        className={styles.menu__navbar} 
        aria-label="Mobile navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <Row 
          as="ul" 
          className={styles.menu__list}
          onClick={onClose}
        >
          <NavLinks 
            itemClassName={styles.menu__item}
            linkClassName={styles.menu__link}
            itemRef={setNavItemRef}
            onClick={onClose}
          />
          {children}
        </Row>
        <div ref={socialRef} className={styles.mobile__social}>
          <SocialLinks items={SOCIAL_LINKS} className={styles.mobile__socialWrapper} />
        </div>
      </nav>
    </Box>
  );
};