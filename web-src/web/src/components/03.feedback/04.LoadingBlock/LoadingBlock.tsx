import type { CSSProperties } from 'react';
import styles from './LoadingBlock.module.scss';
import clsx from 'clsx';

// LoadingBlock renders a skeleton placeholder.
// Use while async content is loading — gallery, menu items, reviews.

type LoadingVariant = 'block' | 'text' | 'circle' | 'image';

interface LoadingBlockProps {
  variant?:   LoadingVariant;
  width?:     string | number;
  height?:    string | number;
  lines?:     number;          // for variant="text" — number of skeleton lines
  className?: string;
}

export function LoadingBlock({
  variant   = 'block',
  width,
  height,
  lines     = 3,
  className,
}: LoadingBlockProps) {
  const style: CSSProperties = {
    ...(width  && { width:  typeof width  === 'number' ? `${width}px`  : width  }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  if (variant === 'text') {
    return (
      <div
        className={clsx(styles.loadingBlock, styles['loadingBlock--text'], className)}
        aria-busy="true"
        aria-label="読み込み中"
        role="status"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={styles.loadingBlock__line}
            // Last line is shorter — mimics real text layout
            style={{ width: i === lines - 1 ? '65%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={clsx(
        styles.loadingBlock,
        styles[`loadingBlock--${variant}`],
        className
      )}
      style={style}
      aria-busy="true"
      aria-label="読み込み中"
      role="status"
    />
  );
}
