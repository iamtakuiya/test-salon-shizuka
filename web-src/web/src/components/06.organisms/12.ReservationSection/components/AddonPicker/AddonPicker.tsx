import React from 'react';
import styles from '../../ReservationSection.module.scss';
import { ADDONS } from '@/utils/constants';
import type { MenuItem } from '@/utils/constants';

/** Addon checkbox list */
export default function AddonPicker({
  selectedAddonIds,
  onToggle,
}: {
  selectedAddonIds: Set<string>;
  onToggle: (addon: (typeof ADDONS)[number]) => void;
}) {
  return (
    <div className={styles.addonList} role="group" aria-label="追加オプション選択">
      {ADDONS.map((addon) => {
        const checked = selectedAddonIds.has(addon.id);
        return (
          <label
            key={addon.id}
            htmlFor={`addon-${addon.id}`}
            className={[styles.addonList__item, checked ? styles['addonList__item--selected'] : ''].join(' ')}
          >
            <input
              type="checkbox"
              id={`addon-${addon.id}`}
              checked={checked}
              onChange={() => onToggle(addon)}
              className={styles.addonList__checkbox}
            />
            <span className={styles.addonList__name}>{addon.nameJa}</span>
            <span className={styles.addonList__duration}>{addon.duration}</span>
            <span className={styles.addonList__price}>¥{addon.price.toLocaleString()}</span>
          </label>
        );
      })}
    </div>
  );
}
