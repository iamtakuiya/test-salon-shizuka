// src/components/atoms/Tag/Tag.tsx
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './Tag.module.scss';
import clsx from 'clsx';

// variant="category" → filter buttons (menu categories)
// variant="status"   → open/closed badge (营業中)
// variant="price"    → price badge (¥8,000)
// variant="label"    → section eyebrow ("CONCEPT", "MENU")

type TagVariant = 'category' | 'status' | 'price' | 'label';
type TagSize    = 'sm' | 'md';

type TagProps<T extends ElementType = 'span'> = {
  as?:       T;
  variant?:  TagVariant;
  size?:     TagSize;
  active?:   boolean;      // selected state — e.g. active menu category
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Tag<T extends ElementType = 'span'>({
  as,
  variant  = 'label',
  size     = 'md',
  active   = false,
  className,
  children,
  ...rest
}: TagProps<T>) {
  const Tag = as ?? 'span';

  return (
    <Tag
      className={clsx(
        styles.tag,
        styles[`tag--${variant}`],
        styles[`tag--${size}`],
        active && styles['tag--active'],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}