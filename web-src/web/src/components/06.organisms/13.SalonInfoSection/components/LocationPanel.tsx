import { Stack } from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import { useOpenNow } from '@/hooks/useOpenNow';
import styles from '../SalonInfoSection.module.scss';
import { HOURS, MAP_QUICK_ACTIONS, LOCATION_INFO } from '../constants';

function EmbeddedMap() {
  return (
    <iframe
      className={styles.salonInfo__mapFrame}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25925.83322846608!2d139.59823360000001!3d35.6836705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f1879027708f%3A0x2a9a3f9590026f6!2sSetagaya%20Literary%20Museum!5e0!3m2!1sen!2sjp!4v1781761228683!5m2!1sen!2sjp"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      title="Salon Shizuka — Map"
    />
  );
}

export function LocationPanel() {
  const wrapRef = useScrollReveal<HTMLDivElement>();
  const isOpen = useOpenNow(HOURS);

  return (
    <div ref={wrapRef} className={styles.salonInfo__location}>
      {/* Map */}
      <div className={styles.salonInfo__mapWrap}>
        <EmbeddedMap />
        <div className={styles.salonInfo__mapActions}>
          {MAP_QUICK_ACTIONS.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.salonInfo__mapActionBtn}
              aria-label={action.label}
            >
              <img src={action.icon} alt="" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Status + access details */}
      <Stack gap="md" align="center" className={styles.salonInfo__meta}>
        <span
          className={`${styles.salonInfo__badge} ${
            !isOpen ? styles['salonInfo__badge--closed'] : ''
          }`}
        >
          <span
            className={`${styles.salonInfo__badgeDot} ${
              !isOpen ? styles['salonInfo__badgeDot--closed'] : ''
            }`}
            aria-hidden="true"
          />
          <span className={styles.salonInfo__badgeJa}>
            {isOpen ? '営業中' : '営業時間外'}
          </span>
          <span className={styles.salonInfo__badgeDivider} aria-hidden="true" />
          <span className={styles.salonInfo__badgeEn}>
            {isOpen ? 'OPEN NOW' : 'CLOSED NOW'}
          </span>
        </span>

        {LOCATION_INFO.map((item) => (
          <div key={item.title} className={styles.salonInfo__metaGroup}>
            <h3 className={styles.salonInfo__metaTitle}>{item.title}</h3>
            <ul className={styles.salonInfo__metaList}>
              {item.info && <li>{item.info}</li>}
              <li>{item.note}</li>
            </ul>
          </div>
        ))}
      </Stack>
    </div>
  );
}
