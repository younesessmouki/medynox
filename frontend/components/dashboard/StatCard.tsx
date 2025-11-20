'use client';

import { LucideIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = '#24abe0',
}: StatCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xl backdrop-blur-xl border p-6 shadow-md transition-all duration-300 ${
        isDark
          ? 'bg-white/5 border-white/10 shadow-black/30 hover:bg-white/10 hover:border-white/20'
          : 'bg-white border-gray-200 shadow-gray-200/50 hover:bg-gray-50 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-1 ${
              isDark ? 'text-white/60' : 'text-gray-600'
            }`}
          >
            {title}
          </p>
          <p
            className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {value}
          </p>
          {trend && (
            <div
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                trend.isPositive ? 'text-green-400' : 'text-[#D32C2C]'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
}
