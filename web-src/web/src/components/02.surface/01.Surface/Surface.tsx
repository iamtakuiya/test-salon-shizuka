import { 
  forwardRef, 
  ElementType, 
  ComponentPropsWithoutRef, 
  ComponentPropsWithRef, 
  ReactNode 
} from "react";
import styles from './Surface.module.scss';
import clsx from 'clsx';

export type SurfaceVariant =
  | 'default'
  | 'muted'
  | 'elevated'
  | 'dark'
  | 'overlay'
  | 'glass'
  | 'bordered';

export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type SurfaceRadius  = 'none' | 'sm' | 'md' | 'lg' | 'full';

// Define your base props without the 'as' and 'ref' props
type SurfaceOwnProps<T extends ElementType> = {
  as?: T;
  variant?: string; // Add your actual variant types here
  padding?: string;
  radius?: string;
  className?: string;
  children?: ReactNode;
};

// Combine your custom props with the native HTML attributes of element T
export type SurfaceProps<T extends ElementType> = SurfaceOwnProps<T> & 
  Omit<ComponentPropsWithoutRef<T>, keyof SurfaceOwnProps<T>>;


const SurfaceRender = <T extends ElementType = 'div'>(
{
  as,
  variant  = '',
  padding  = 'none',
  radius   = 'none',
  className,
  children,
  ...rest
}: SurfaceProps<T>,
ref: React.ForwardedRef<any>
) => {
  const Comp = as ?? 'div';

  return (
    <Comp
      ref={ref}
      className={clsx(
        styles.surface,
        styles[`surface--${variant}`],
        padding !== 'none' && styles[`padding--${padding}`],
        radius  !== 'none' && styles[`radius--${radius}`],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// Create a type wrapper that forces forwardRef to support generics
type SurfaceComponent = <T extends ElementType = 'div'>(
  props: SurfaceProps<T> & {
    ref?: ComponentPropsWithRef<T>['ref'];
  }
) => React.ReactElement | null;

export const Surface = forwardRef(SurfaceRender) as SurfaceComponent;

// Surface.displayName = 'Surface';