'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MedynoxLogoProps {
  collapsed?: boolean;
}

export function MedynoxLogo({ collapsed = false }: MedynoxLogoProps) {
  // Compact icon version when collapsed
  if (collapsed) {
    return (
      <Link
        href="/dashboard"
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#24abe0]/25 via-[#24abe0]/15 to-[#24abe0]/10 border border-[#24abe0]/30 hover:border-[#24abe0]/50 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-[#24abe0]/20 group overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#24abe0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Icon with professional styling */}
        <div className="relative z-10 w-10 h-10 flex items-center justify-center">
          <Image
            src="/images/Medynox_ICON.png"
            alt="Medynox Icon"
            width={40}
            height={40}
            className="object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-lg"
            priority
            unoptimized={false}
          />
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-[#24abe0]/40 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    );
  }

  // Full logo version when expanded
  return (
    <Link
      href="/dashboard"
      className="flex items-center group relative"
    >
      <div className="relative flex items-center gap-4">
        {/* Premium icon badge with Medynox icon */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#24abe0]/25 via-[#24abe0]/15 to-[#24abe0]/10 border border-[#24abe0]/30 group-hover:border-[#24abe0]/50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#24abe0]/20 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#24abe0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Icon */}
          <div className="relative z-10 w-8 h-8 flex items-center justify-center">
            <Image
              src="/images/Medynox_ICON.png"
              alt="Medynox Icon"
              width={32}
              height={32}
              className="object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-md"
              priority
              unoptimized={false}
            />
          </div>
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-gradient-to-br from-[#24abe0]/50 to-transparent rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Logo text/image with premium effects */}
        <div className="relative">
          {/* Main logo */}
          <div className="relative z-10">
            <Image
              src="/images/Medynox_LOGO_dark_mode.png"
              alt="Medynox Logo"
              width={150}
              height={54}
              className="object-contain transition-all duration-500 group-hover:opacity-95 drop-shadow-sm"
              priority
              unoptimized={false}
            />
          </div>
          
          {/* Multi-layer glow effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[#24abe0] blur-2xl -z-10" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[#24abe0] blur-xl -z-10 translate-x-2" />
          
          {/* Shine sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
          
          {/* Bottom accent line */}
          <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#24abe0] to-transparent group-hover:w-full transition-all duration-500 rounded-full" />
        </div>
        
        {/* Premium badge indicator */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="w-2 h-2 rounded-full bg-[#24abe0] shadow-lg shadow-[#24abe0]/50 animate-pulse" />
        </div>
      </div>
    </Link>
  );
}

