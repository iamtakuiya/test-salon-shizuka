// src/components/atoms/Link/Link.tsx
import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Link.module.scss';

interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  variant?: 'primary' | 'secondary' | 'nav';
}

export function Link({
  href,
  target,
  rel,
  variant = 'primary',
  className,
  children,
  ...rest
}: LinkProps) {
  const isExternal = 
    href.startsWith('http') ||
    href.startsWith('https');

  // Auto-set target and rel for external links
  // but allow explicit override via props
  const resolvedTarget = target ?? (isExternal ? '_blank' : '_self');
  const resolvedRel    = rel    ?? (isExternal ? 'noopener noreferrer' : undefined);

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={clsx(
        styles.link,
        styles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}