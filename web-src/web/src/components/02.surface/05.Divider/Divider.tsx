import type { ComponentPropsWithoutRef } from 'react';
import styles from './Divider.module.scss';
import clsx from 'clsx';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant     = 'solid' | 'dashed' | 'decorative';

interface DividerProps extends Omit<ComponentPropsWithoutRef<'hr'>, 'className'> {
  orientation?: DividerOrientation;
  variant?:     DividerVariant;
  className?:   string | string[];
}

export function Divider({
  orientation = 'horizontal',
  variant     = 'solid',
  className,
  ...rest
}: DividerProps) {
  return (
    <hr
      className={clsx(
        styles.divider,
        styles[`divider--${orientation}`],
        styles[`divider--${variant}`],
        className
      )}
      aria-hidden="true"
      {...rest}
    />
  );
}
