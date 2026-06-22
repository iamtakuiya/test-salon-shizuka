import styles from './CategoryList.module.scss';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import type { MenuCategory } from '@/utils/constants';

interface CategoryListProps {
  menuList: MenuCategory[];
  activeTabIdx: number;
  /**
   * Note: the slice offset of this column within MENU_CATEGORIES.
   * Left column passes 0; right column passes halfLength.
   * Without this, indexOf() on a slice always returns 0–2, so the
   * active-tab check never matches right-column categories on mobile.
   */
  indexOffset: number;
}

export function CategoryList({ menuList, activeTabIdx, indexOffset }: CategoryListProps) {
  return (
    <>
      {menuList.map((cat, localIdx) => {
        const globalIdx = localIdx + indexOffset;
        return (
          <div
            key={cat.id}
            id={`menu-panel-${cat.id}`}
            className={`${styles.panel} ${
              activeTabIdx === globalIdx
                ? styles.panelActiveMobile
                : styles.panelHiddenMobile
            }`}
          >
            <CategoryCard category={cat} globalIndex={globalIdx} />
          </div>
        );
      })}
    </>
  );
}
