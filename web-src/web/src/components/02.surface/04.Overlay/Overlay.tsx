import type { ComponentPropsWithoutRef } from 'react';
import { Surface } from '../Surface/Surface';
import styles from './Overlay.module.scss';
import clsx from 'clsx';

// Overlay is a fixed full-screen layer — used for mobile menu, modals.
// Always rendered via a portal in production (React.createPortal).
// z-index is controlled via $z-overlay / $z-modal tokens.

type OverlayVariant = 'menu' | 'modal' | 'backdrop';

interface OverlayProps extends ComponentPropsWithoutRef<'div'> {
  variant?:  OverlayVariant;
  isOpen?:   boolean;
  className?: string;
}

export function Overlay({
  variant  = 'menu',
  isOpen   = false,
  className,
  children,
  ...rest
}: OverlayProps) {
  return (
    <Surface
      variant="overlay"
      className={clsx(
        styles.overlay,
        styles[`overlay--${variant}`],
        isOpen && styles['overlay--open'],
        className
      )}
      aria-hidden={!isOpen}
      {...rest}
    >
      {children}
    </Surface>
  );
}
