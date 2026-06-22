// src/components/primitives/Container/Container.tsx
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './Container.module.scss';
import clsx from 'clsx';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'xl',
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Comp = as ?? 'div';

  return (
    <Comp
      className={clsx(
        styles.container,
        styles[`size--${size}`],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}