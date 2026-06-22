// src/components/primitives/Grid/Grid.tsx
import type { ElementType, ComponentPropsWithoutRef, CSSProperties } from 'react';
import styles from './Grid.module.scss';
import clsx from 'clsx';

type GridCols = 1 | 2 | 3 | 4;
type GridGap  = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type GridProps<T extends ElementType = 'div'> = {
  as?:         T;
  cols?:       GridCols;
  colsTablet?: GridCols;
  colsLaptop?: GridCols;
  gap?:        GridGap;
  className?:  string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Grid<T extends ElementType = 'div'>({
  as,
  cols       = 1,
  colsTablet,
  colsLaptop,
  gap        = 'md',
  className,
  style,
  children,
  ...rest
}: GridProps<T>) {
  const Comp = as ?? 'div';

  // Responsive column counts are passed as CSS custom properties.
  // The SCSS module reads these inside its own media queries —
  // this keeps the actual breakpoint values centralized in SCSS,
  // while still letting each instance configure its own column counts.
  const gridStyle: CSSProperties = {
    '--grid-cols': cols,
    ...(colsTablet && { '--grid-cols-tablet': colsTablet }),
    ...(colsLaptop && { '--grid-cols-laptop': colsLaptop }),
    ...style,
  } as CSSProperties;

  return (
    <Comp
      className={clsx(
        styles.grid,
        styles[`gap--${gap}`],
        className
      )}
      style={gridStyle}
      {...rest}
    >
      {children}
    </Comp>
  );
}
