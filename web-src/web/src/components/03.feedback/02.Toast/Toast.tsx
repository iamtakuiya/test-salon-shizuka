// src/components/feedback/Toast/Toast.tsx
import type { ReactNode } from 'react';
import { Surface } from '@/components/surfaces/Surface/Surface';
import { Row } from '@/components/primitives/Row/Row';
import styles from './Toast.module.scss';
import clsx from 'clsx';

// Toast is a temporary notification that auto-dismisses.
// State (visible/hidden, message, variant) lives in a feature slice
// or local useState in the parent — never inside Toast itself.
// GSAP handles enter/exit animation from the parent.

type ToastVariant = 'success' | 'error' | 'info';

interface ToastProps {
  variant?:   ToastVariant;
  message:    string;
  icon?:      ReactNode;
  onClose?:   () => void;
  className?: string;
}

export function Toast({
  variant  = 'info',
  message,
  icon,
  onClose,
  className,
}: ToastProps) {
  return (
    <Surface
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={clsx(
        styles.toast,
        styles[`toast--${variant}`],
        className
      )}
    >
      <Row gap="sm" align="center" justify="between">
        <Row gap="sm" align="center">
          {icon && (
            <span className={styles.toast__icon} aria-hidden="true">
              {icon}
            </span>
          )}
          <p className={styles.toast__message}>{message}</p>
        </Row>

        {onClose && (
          <button
            className={styles.toast__close}
            onClick={onClose}
            aria-label="閉じる"
          >
            ✕
          </button>
        )}
      </Row>
    </Surface>
  );
}
