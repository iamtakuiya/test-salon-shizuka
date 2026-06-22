import { Link } from '@/components/04.atoms/Link/Link';
import { NAV_LINKS } from '@/config/navigation';
import { MouseEvent } from 'react';

// Extend standard HTML attributes so things like onClick are explicitly typed
interface NavLinksProps {
  itemClassName?: string;
  linkClassName?: string;
  // Optional ref callback for GSAP animations if you need to track individual `li` elements
  itemRef?: (el: HTMLLIElement | null, index: number) => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavLinks({ 
  itemClassName, 
  linkClassName, 
  itemRef, 
  onClick,
  ...rest
}: NavLinksProps) {
  return (
    <>
      {NAV_LINKS.map(({ label, href }, index) => (
        <li 
          key={label} 
          className={itemClassName}
          ref={(el) => itemRef?.(el, index)}
        >
          <Link 
            href={href}
            className={linkClassName}
            onClick={onClick}
            {...rest}
          >
            {label}
          </Link>
        </li>
      ))}
    </>
  );
}