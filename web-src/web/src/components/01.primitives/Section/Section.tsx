// src/components/primitives/Section/Section.tsx
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './Section.module.scss';
import clsx from 'clsx';

// The props fully generic based on the element type passed to 'as'
type SectionProps<T extends ElementType> = {
  as?: T;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'spacing' | 'className' >;

export function Section<T extends ElementType = 'section'>({
  as,
  spacing = 'lg',
  className,
  children,
  ...rest
}: SectionProps<T>) {
  const Comp = (as ?? 'section') as ElementType;

  return (
    <Comp
      className={clsx(styles.section, styles[`spacing--${spacing}`], className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}