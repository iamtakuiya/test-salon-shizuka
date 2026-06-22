import type { MenuCategory, MenuItem } from '@/utils/constants';
import styles from './MenuItem.module.scss';

// ─── Price formatter ─────────────────────────────────
// Inlined here until @/utils/formatPrice.ts is created.
// Move to that file and replace this import when ready.
function formatPrice(item: MenuItem): string {
  const base = `¥${item.price.toLocaleString('ja-JP')}`;
  if (item.isAdditionalFee) return `+${base}${item.isStartingPrice ? '〜' : ''}`;
  if (item.isStartingPrice) return `${base}〜`;
  return base;
}

interface MenuListProps {
  category: MenuCategory;
}

export function MenuList({ category }: MenuListProps) {
  return (
    <div className={styles.itemList}>
      {category.items.map((item, itemIdx) => (
        <div
          key={`${category.id}-item-${itemIdx}`}
          className={styles.row}
          style={{ '--row-index': itemIdx } as React.CSSProperties}
        >
          <div className={styles.rowLeft}>
            {/* Fix: was <h4> — wrong heading level inside an <article> with <h3> */}
            <span className={styles.rowName}>{item.name}</span>
            {item.includes && (
              <span className={styles.rowIncludes}>[{item.includes}]</span>
            )}
            {item.description && (
              <span className={styles.rowDesc}>{item.description}</span>
            )}
          </div>
          <div className={styles.rowRight}>
            {/* Fix: duration was below price — design shows duration above price */}
            {item.duration && (
              <span className={styles.rowDuration}>{item.duration}</span>
            )}
            <data className={styles.rowPrice} value={item.price}>
              {formatPrice(item)}
            </data>
          </div>
        </div>
      ))}
    </div>
  );
}
