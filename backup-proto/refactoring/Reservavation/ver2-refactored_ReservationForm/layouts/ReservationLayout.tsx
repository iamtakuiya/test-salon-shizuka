import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './ReservationLayout.module.scss';

type ReservationLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
};

export function ReservationLayout({
  children,
  sidebar,
  className,
}: ReservationLayoutProps) {
  return (
    <div
      className={clsx(
        styles.layout,
        className
      )}
    >
      <main className={styles.layout__main}>
        {children}
      </main>

      {sidebar && (
        <aside
          className={styles.layout__sidebar}
          aria-label="予約サマリー"
        >
          {sidebar}
        </aside>
      )}
    </div>
  );
}