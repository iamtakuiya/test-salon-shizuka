import styles from './SocialLinks.module.scss';
import { Row } from '@/components/01.primitives/Row/Row';
import { Link } from '@/components/04.atoms/Link/Link';
import { Icon } from '@/components/04.atoms/Icon/Icon';

// Props for the component – use the type from config to stay in sync
import type { SocialLinkItem } from '@/config/navigation';

interface SocialLinksProps {
  items: readonly SocialLinkItem[]; // matches the config definition
  className?: string;
}

export function SocialLinks({ items, className }: SocialLinksProps) {
  return (
    <Row gap="none" className={className}>
      {items.map(({ label, href, icon }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          className={styles.social__link}
        >
          <Icon
            icon={icon}
            // width={24}
            // height={24}
            className={styles.social__icon}
            aria-hidden="true"
          />
        </Link>
      ))}
    </Row>
  );
}