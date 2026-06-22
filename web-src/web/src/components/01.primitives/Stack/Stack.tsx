// src/components/primitives/Stack/Stack.tsx
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './Stack.module.scss';
import clsx from 'clsx';

type StackProps<T extends ElementType = 'div'> = {
  as?: T;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Stack<T extends ElementType = 'div'>({
  as,
  gap = 'md',
  align = 'stretch',
  className,
  children,
  ...rest
}: StackProps<T>) {
  const Comp = as ?? 'div';

  return (
    <Comp
      className={clsx(
        styles.stack,
        styles[`gap--${gap}`],
        styles[`align--${align}`],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}