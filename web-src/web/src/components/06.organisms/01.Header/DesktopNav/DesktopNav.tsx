import styles from './DesktopNav.module.scss';
import { Row } from '@/components/01.primitives/Row/Row';
import { NavLinks } from '@/components/05.molecules/NavLink/NavLinks';

interface DesktopNavProps {
  isScrolling: boolean;
}

export default function DesktopNav({ isScrolling }: DesktopNavProps) {
  // Dynamically attach an active class to the link wrapper or pass it down
  const linkClassName = `${styles.nav__link} ${isScrolling ? styles['nav__link--active'] : ''}`;

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Row as="ul" className={styles.nav__list}>
        <NavLinks 
          itemClassName={styles.nav__item}
          linkClassName={linkClassName} // Injected active state class here
        />
      </Row>
    </nav>
  );
}