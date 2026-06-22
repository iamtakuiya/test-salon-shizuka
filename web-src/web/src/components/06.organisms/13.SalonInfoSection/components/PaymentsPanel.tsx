import styles from '../SalonInfoSection.module.scss';
import { PAYMENT_METHODS } from '../constants';

export function PaymentsPanel() {
  return (
    <div className={styles.payments}>
      <h3 className={styles.payments__title}>お支払方法</h3>

      <div className={styles.payments__grid}>
        {PAYMENT_METHODS.map((method) => (
          <img
            key={method.alt}
            src={method.src}
            alt={method.alt}
            className={styles.payments__logo}
          />
        ))}
      </div>

      <a href="#reservation" className={styles.payments__cta}>
        ご予約はこちら (BOOK NOW)
      </a>
    </div>
  );
}
