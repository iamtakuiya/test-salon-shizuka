export interface NavLinkItem {
  readonly label: string;
  readonly href: string;
}

// NAV_LINKS lives here — DesktopNav owns its own data
export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'Home',        href: '#home'        },
  { label: 'Concept',     href: '#concept'     },
  { label: 'Gallery',     href: '#gallery'     },
  { label: 'Style',       href: '#style'       },
  { label: 'Menu',        href: '#menu'        },
  { label: 'Voice',       href: '#voice'       },
  { label: 'Reservation', href: '#reservation' },
  { label: 'Salon Info',  href: '#info'        },
] as const;

// Define the specific literal type
export type SocialIconType = "Facebook" | "Instagram" | "LinkedIn" | "X" | "YouTube";
export interface SocialLinkItem {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIconType;
}

// SOCIAL_LINKS
export const SOCIAL_LINKS: readonly SocialLinkItem[] = [
  { label: 'Facebook',  href: 'https://facebook.com',  icon: 'Facebook'  },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  { label: 'X',         href: 'https://x.com',         icon: 'X'         },
  { label: 'LinkedIn',  href: 'https://linkedin.com',  icon: 'LinkedIn'  },
  { label: 'YouTube',   href: 'https://youtube.com',   icon: 'YouTube'   },
] as const;