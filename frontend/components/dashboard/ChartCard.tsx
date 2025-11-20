'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
}

export function ChartCard({
  title,
  description,
  children,
  className = '',
  icon: Icon,
}: ChartCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xl backdrop-blur-xl border p-6 shadow-md ${className} ${
        isDark
          ? 'bg-white/5 border-white/10 shadow-black/30'
          : 'bg-white border-gray-200 shadow-gray-200/50'
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="text-[#24abe0]" size={20} />}
          <h3
            className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </h3>
        </div>
        {description && (
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            {description}
          </p>
        )}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}
