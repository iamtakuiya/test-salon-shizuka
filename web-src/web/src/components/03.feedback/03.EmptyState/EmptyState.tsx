import type { ReactNode } from 'react';
import { Stack } from '@/components/primitives/Stack/Stack';
import styles from './EmptyState.module.scss';
import clsx from 'clsx';

// EmptyState renders when a list or section has no content to show.
// Used in: gallery (no images), reviews (no reviews yet), search (no results).

interface EmptyStateProps {
  icon?:        ReactNode;
  title:        string;
  description?: string;
  action?:      ReactNode;    // e.g. a Button to trigger an action
  className?:   string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Stack
      align="center"
      gap="md"
      className={clsx(styles.emptyState, className)}
    >
      {icon && (
        <span className={styles.emptyState__icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <Stack align="center" gap="xs">
        <p className={styles.emptyState__title}>{title}</p>
        {description && (
          <p className={styles.emptyState__description}>{description}</p>
        )}
      </Stack>
      {action && (
        <div className={styles.emptyState__action}>
          {action}
        </div>
      )}
    </Stack>
  );
}
