import React, {
  forwardRef,
  ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from 'react';
import { Surface } from '../01.Surface/Surface';
import styles from './Card.module.scss';
import clsx from 'clsx';

// Card is an opinionated Surface — always elevated, always has radius.
// Use Surface directly when you need full variant control.
// Use Card when the content is clearly a grouped, elevated unit.

// Polymorphic types
type CardVariant = 'default' | 'interactive';

// Switch to ComponentPropsWithRef so 'ref' is included in the types
type CardOwnProps = {
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
  children?: React.ReactNode;
};

// type CardProps<T extends ElementType> =
//   CardOwnProps & {
//     as?: T;
//   } & Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps | 'as'>;

// Polymorphic component type
// type CardComponent = <T extends ElementType = 'div'>(
//   props: CardProps<T> & {
//     ref?: ComponentPropsWithRef<T>['ref'];
//   }
// ) => React.ReactElement | null;


// Define the inner component with forwardRef
export const Card = forwardRef<HTMLDivElement, CardOwnProps>((
    {
      variant = 'default',
      padding = 'md',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <Surface
        ref={ref}
        variant=""
        padding={padding}
        radius="md"
        className={clsx(
          styles.card,
          styles[`card--${variant}`],
          className
        )}
        {...rest}
      >
        {children}
      </Surface>
    );
  }
)