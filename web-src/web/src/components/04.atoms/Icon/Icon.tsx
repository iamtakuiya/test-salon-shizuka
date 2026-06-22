import FaceBookIcon from '@/assets/icons/socials/Facebook.svg?react';
import InstagramIcon from '@/assets/icons/socials/Instagram.svg?react';
import LinkedInIcon from '@/assets/icons/socials/LinkedIn.svg?react';
import XIcon from '@/assets/icons/socials/X.svg?react';
import YouTubeIcon from '@/assets/icons/socials/YouTube.svg?react';

const iconMap = {
  Facebook: FaceBookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
  YouTube: YouTubeIcon,
};

interface IconProps {
  className?: string;
  icon?: keyof typeof iconMap;
  width?: number | string;
  height?: number | string;
}

export const Icon = ({ className, icon, width, height }: IconProps) => {
  const IconComponent = icon ? iconMap[icon] : undefined;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} width={width} height={height} />;
};