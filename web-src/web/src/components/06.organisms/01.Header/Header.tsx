import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/app/store/slices/uiSlice';
import styles from './Header.module.scss';

import { Container } from '@/components/01.primitives/Container/Container';
import { Row } from '@/components/01.primitives/Row/Row';
// import { Box } from '@/components/primitives/Box/Box';
import { Logo } from '@/components/04.atoms/Logo/Logo';
// import { Icon } from '@/components/atoms/Icon/Icon';
import { Link } from '@/components/04.atoms/Link/Link';
import LogoWrapper from './LogoWrapper/LogoWrapper';
import DesktopNav from './DesktopNav/DesktopNav';
import { SocialLinks } from './SocialLinks/SocialLinks';
import MobileMenu from './MobileMenu/MobileMenu';
import { Button } from '@/components/04.atoms/Button/Button';
// Config
import { SOCIAL_LINKS } from '@/config/navigation';

export default function Header() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(false);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if the user is still at the top area
      setIsAtTop(currentScrollY < 50);

      // Mark as actively scrolling immediately
      setIsScrolling(true);

      // Clear previous timeout and set a new one
      clearTimeout(scrollTimeout);

      // When scrolling stops for 1.5s, mark siScrolling as false
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500)
    };

    // Run once on mount to capture initial position if page is reloaded mid-scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(closeMobileMenu());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const headerClass = `
    ${styles.header} 
    ${isScrolling ? styles['header--active'] : ''} 
    ${!isAtTop && ! isScrolling ? styles['header--hidden'] : ''}
  `; 
 

  return (
    <>
      <header className={headerClass}>
        <Container>
          <Row
            justify="between"
            align="center"
            className={styles.header__navbar}
          >
            <LogoWrapper className={styles.header__logoWrapper}>
              <Link href="#home" aria-label="Salon Shizuka - ホームへ" className={styles.logoWrapper__link}>
                <Logo className={`${styles.header__logo} ${isScrolling ? styles['header__logo--active'] : ""}`} width={85} height={32} />
              </Link>
            </LogoWrapper>
            <DesktopNav isScrolling={isScrolling} />
            <div className={`${styles.header__socialWrapper} ${isScrolling ? styles['header__socialWrapper--active'] : ''}`}>
              <SocialLinks items={SOCIAL_LINKS} className={styles.header__social} />
            </div>
            <Button
              ref={hamburgerRef}
              className={`${styles.header__hamburger} ${isOpen ? styles['header__hamburger--open'] : ''}  ${isScrolling ? styles['header__hamburger--active'] : ""}`}
              onClick={() => dispatch(toggleMobileMenu())}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <span className={styles.header__hamburgerBar} />
              <span className={styles.header__hamburgerBar} />
              <span className={styles.header__hamburgerBar} />
            </Button>
          </Row>
        </Container>
      </header>

      <MobileMenu 
        isOpen={isOpen}
        onClose={() => dispatch(closeMobileMenu())}
      />
    </>
  );
}