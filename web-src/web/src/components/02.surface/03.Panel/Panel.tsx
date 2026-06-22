import type { ElementType, ComponentPropsWithoutRef } from 'react';
import { Surface } from '../01.Surface/Surface';
import styles from './Panel.module.scss';
import clsx from 'clsx';

// Panel is a full-width horizontal band — used inside sections for
// visually distinct content blocks (e.g. info callout, price summary,
// reservation confirmation). Always full-width of its parent.

type PanelVariant = 'muted' | 'bordered' | 'dark' | 'accent';

type PanelProps<T extends ElementType = 'div'> = {
  as?:      T;
  variant?: PanelVariant;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Panel<T extends ElementType = 'div'>({
  as,
  variant = 'muted',
  padding = 'md',
  className,
  children,
  ...rest
}: PanelProps<T>) {
  const surfaceVariant = variant === 'accent' ? 'default' : variant;

  return (
    <Surface
      as={as}
      variant={surfaceVariant}
      padding={padding}
      radius="md"
      className={clsx(
        styles.panel,
        styles[`panel--${variant}`],
        className
      )}
      {...rest}
    >
      {children}
    </Surface>
  );
}
