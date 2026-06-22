import type { ComponentPropsWithoutRef } from 'react';
import styles from './InlineError.module.scss';
import clsx from 'clsx';

// InlineError sits directly below a form field.
// React Hook Form passes the error message as children.

interface InlineErrorProps extends ComponentPropsWithoutRef<'p'> {
  className?: string;
}

export function InlineError({
  className,
  children,
  ...rest
}: InlineErrorProps) {
  if (!children) return null;

  return (
    <p
      role="alert"
      aria-live="polite"
      className={clsx(styles.inlineError, className)}
      {...rest}
    >
      {children}
    </p>
  );
}
