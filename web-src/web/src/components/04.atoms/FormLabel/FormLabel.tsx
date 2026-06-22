import type {
  ElementType,
  ComponentPropsWithoutRef,
} from 'react';

import clsx from 'clsx';
import styles from './FormLabel.module.scss';

type FormLabelProps<T extends ElementType = 'span'> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function FormLabel<T extends ElementType = 'span'>({
  as,
  className,
  children,
  ...rest
}: FormLabelProps<T>) {
  const Comp = as ?? 'span';

  return (
    <Comp
      className={clsx(
        styles.formLabel,
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}