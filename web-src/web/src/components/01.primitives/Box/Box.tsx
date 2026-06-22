// src/components/primitives/Box/Box.tsx
import React, { type ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './Box.module.scss';
import clsx from 'clsx';

// The "as" prop pattern — renders as any HTML element
type BoxProps<T extends ElementType = 'div'> = {
  as?: T;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  paddingBlock?: 'none' | 'sm' | 'md' | 'lg';
  paddingInline?: 'none' | 'sm' | 'md' | 'lg';
  display?: 'block' | 'flex' | 'grid' | 'inline-flex';
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box<T extends ElementType = 'div'>(
  {
    as,
    padding,
    paddingBlock,
    paddingInline,
    display,
    className,
    children,
    ...rest
  }: BoxProps<T>,
  ref: React.Ref<HTMLElement>
) {
  const Comp = (as ?? 'div') as ElementType;
  return (
    <Comp
      ref={ref}
      className={clsx(
        padding && styles[`padding--${padding}`],
        paddingBlock && styles[`paddingBlock--${paddingBlock}`],
        paddingInline && styles[`paddingInline--${paddingInline}`],
        display && styles[`display--${display}`],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
});