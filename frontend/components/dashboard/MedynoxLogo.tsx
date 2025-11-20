'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface MedynoxLogoProps {
  collapsed?: boolean;
}

export function MedynoxLogo({ collapsed = false }: MedynoxLogoProps) {
  const { theme } = useTheme();
  
  // If collapsed, don't show logo
  if (collapsed) {
    return null;
  }
  
  // If not collapsed, use the logo based on theme
  const logoSrc =
    theme === 'light'
      ? '/images/Medynox_LOGO_light_mode.png'
      : '/images/Medynox_LOGO_dark_mode.png';

  return (
    <div className="flex items-center">
      <Image
        key={theme} // Force re-render when theme changes
        src={logoSrc}
        alt="Medynox Logo"
        width={150}
        height={50}
        className="object-contain transition-opacity duration-300"
        priority
        unoptimized={false}
      />
    </div>
  );
}

