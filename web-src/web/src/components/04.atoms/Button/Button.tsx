import { 
  ElementType, 
  ComponentPropsWithoutRef, 
  ComponentPropsWithRef, 
  ReactNode, 
  forwardRef, 
  ForwardedRef 
} from 'react';

import clsx from 'clsx';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'nav' | 'outline' | 'ghost' | 'disabled' | 'unstyled';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'none';

// Define the props that belong exclusively to Button design system
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: ReactNode;
  "data-testid"?: string;
}

// Combine them with the dynamic HTML attributes based on the 'as' prop
export type ButtonProps<T extends ElementType = 'button'> = BaseButtonProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseButtonProps | 'as'>;

// The inner function straightforward
function InnerButton<T extends ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    size = 'md',
    loading = false,
    className,
    children,
    "data-testid": testId,
    ...rest
  }: ButtonProps<T>,
  ref: ForwardedRef<any>
) {
  // Auto-detect anchor tag if 'href' is supplied without an 'as' override
  const Comp = as ?? ('href' in rest ? 'a' : 'button');
  // Apply native type="button" only for genuine HTML buttons to prevent form submit bugs
  const defaultProps = Comp === 'button' ? { type: 'button' } as const : {};

  return (
    <Comp
      {...defaultProps}
      {...rest}
      ref={ref}
      data-testid={testId || `button-${variant}`}
      disabled={loading || (rest as any).disabled}
      aria-disabled={loading || undefined}
      className={clsx(
        variant !== 'unstyled' && styles.button,
        variant !== 'unstyled' && styles[`button--${variant}`],
        size !== 'none' && styles[`button--${size}`],
        { [styles['button--loading']]: loading },
        className
      )}
    >
      {loading ? (
        <>
          <span className={styles.button__spinner} aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
        ) : (
          children
        )}
    </Comp>
  );
}
 
export const Button = forwardRef(InnerButton) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> & { ref?: ComponentPropsWithRef<T>['ref'] }
) => ReactNode;