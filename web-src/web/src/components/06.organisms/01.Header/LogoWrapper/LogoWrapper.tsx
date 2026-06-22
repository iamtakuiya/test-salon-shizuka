import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import styles from './LogoWrapper.module.scss';

// Components
import { Box } from '@/components/01.primitives/Box/Box';


interface LogoWrapperProps extends ComponentPropsWithoutRef<typeof Box> {
  variant?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}

const LogoWrapper = forwardRef<HTMLDivElement, LogoWrapperProps>(
  ({ variant = 'light', className, children, ...rest}, ref) => {
  return (
    <Box 
      ref={ref}
      className={clsx(
        styles.logoWrapper, 
        styles[variant],
        className
      )} 
      {...rest}
    >
      {children}
    </Box>
  );
});

// Set a display name for debugging in React DevTools
LogoWrapper.displayName = 'LogoWrapper';

export default LogoWrapper;