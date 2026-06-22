import type { MenuCategory } from '@/utils/constants';
import styles from './CategoryCard.module.scss';
import { MenuList } from '../MenuList/MenuList';

interface CategoryCardProps {
  category: MenuCategory;
  /** Index within the full MENU_CATEGORIES array — drives CSS stagger */
  globalIndex: number;
}

export function CategoryCard({ category, globalIndex }: CategoryCardProps) {
  return (
    <article
      className={styles.category}
      style={{ '--cat-index': globalIndex } as React.CSSProperties}
    >
      {/* Category header */}
      <header className={styles.categoryHeader}>
        <div className={styles.categoryTitle}>
          <h3 className={styles.categoryName}>{category.category}</h3>
          {category.includes && (
            <span className={styles.categoryIncludes}>
              ［{category.includes}］
            </span>
          )}
        </div>
        {category.categoryDescription && (
          <p className={styles.categoryDesc}>
            {category.categoryDescription}
          </p>
        )}
      </header>

      <MenuList category={category} />

      {/* Optional notes box */}
      {category.notes && (
        <div className={styles.categoryNote}>
          <p>＊{category.notes}</p>
        </div>
      )}
    </article>
  );
}
