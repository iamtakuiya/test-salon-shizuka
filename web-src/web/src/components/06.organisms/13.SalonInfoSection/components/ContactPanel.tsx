import styles from '../SalonInfoSection.module.scss';
import { CONTACT_INFO } from '../constants';

export function ContactPanel() {
  return (
    <div className={styles.contact}>
      <h3 className={styles.contact__title}>連絡先</h3>

      <div className={styles.contact__list}>
        {CONTACT_INFO.map((item) => (
          <div key={item.label} className={styles.contact__row}>
            <span className={styles.contact__label}>{item.label}</span>
            <span className={styles.contact__value}>{item.info}</span>
            <a
              href={item.href}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={styles.contact__cta}
            >
              {item.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
