import React from 'react';
import styles from '../../ReservationSection.module.scss';
import type { MenuCategory, MenuItem } from '@/utils/constants';

/** Focus panel: menu items for the active category */
import { formatPrice } from '@/utils/formatPrice'

export default function CategoryFocusPanel({
  category,
  selectedItems,
  onItemSelect,
}: {
  category: MenuCategory;
  selectedItems: Record<string, MenuItem>;
  onItemSelect: (catId: string, item: MenuItem) => void;
}) {
  return (
    <div className={styles.focusPanel}>
      {/* Category description */}
      {category.categoryDescription && (
        <p className={styles.focusPanel__desc}>{category.categoryDescription}</p>
      )}

      {/* Includes note */}
      {category.includes && (
        <p className={styles.focusPanel__includes}>［{category.includes}］</p>
      )}

      {/* Radio menu items */}
      <div className={styles.menuList} role="radiogroup" aria-label={`${category.category} メニュー選択`}>
        {category.items.map((item, idx) => {
          const inputId = `menu-${category.id}-${idx}`;
          const checked = selectedItems[category.id]?.name === item.name;
          return (
            <label key={inputId} htmlFor={inputId} className={[styles.menuList__item, checked ? styles['menuList__item--selected'] : ''].join(' ')}>
              <input
                type="radio"
                id={inputId}
                name={`menu-group-${category.id}`}
                checked={checked}
                onChange={() => onItemSelect(category.id, item)}
                className={styles.menuList__radio}
              />
              <span className={styles.menuList__name}>
                {item.name}
                {item.includes && <span className={styles.menuList__includes}> [{item.includes}]</span>}
              </span>
              {item.duration && <span className={styles.menuList__duration}>{item.duration}</span>}
              <span className={styles.menuList__price}>{formatPrice(item)}</span>
            </label>
          );
        })}
      </div>

      {/* Category note */}
      {category.notes && <p className={styles.focusPanel__note}>＊{category.notes}</p>}
    </div>
  );
}
