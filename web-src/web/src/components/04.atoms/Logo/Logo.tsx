import ShizukaLogo from '@/assets/svg/logo/logo.svg?react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo = ({ className, width, height }: LogoProps) => {
  return <ShizukaLogo className={className} width={width} height={height} />
};
