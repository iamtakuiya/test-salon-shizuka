import styles from '../SalonInfoSection.module.scss';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import { salonLogo } from '../constants';

export function SalonInfoHeader() {
  const taglineRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <div className={styles.salonInfo__header}>
      <img
        src={salonLogo}
        alt="SALON SHIZUKA"
        className={styles.salonInfo__logo}
        width={96}
      />
      <p ref={taglineRef} className={styles.salonInfo__tagline}>
        心地よい空間、あなたのペースに合わせて。
      </p>
    </div>
  );
}
