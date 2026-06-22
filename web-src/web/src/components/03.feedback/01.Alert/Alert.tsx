// src/components/feedback/Alert/Alert.tsx
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Surface } from '@/components/02.surface/01.Surface/Surface';
import styles from './Alert.module.scss';
import clsx from 'clsx';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  variant?:  AlertVariant;
  title?:    string;
  icon?:     ReactNode;
  onClose?:  () => void;
  className?: string;
}

export function Alert({
  variant   = 'info',
  title,
  icon,
  onClose,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <Surface
      role="alert"
      aria-live="polite"
      className={clsx(
        styles.alert,
        styles[`alert--${variant}`],
        className
      )}
      {...rest}
    >
      {icon && (
        <span className={styles.alert__icon} aria-hidden="true">
          {icon}
        </span>
      )}

      <div className={styles.alert__body}>
        {title && (
          <p className={styles.alert__title}>{title}</p>
        )}
        {children && (
          <p className={styles.alert__message}>{children}</p>
        )}
      </div>

      {onClose && (
        <button
          className={styles.alert__close}
          onClick={onClose}
          aria-label="閉じる"
        >
          ✕
        </button>
      )}
    </Surface>
  );
}
