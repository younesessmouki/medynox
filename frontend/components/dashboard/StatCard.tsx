'use client';

import { LucideIcon } from 'lucide-react';

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
  return (
    <div className="rounded-xl border p-6 shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 border-gray-500/40 hover:shadow-xl hover:scale-[1.02] hover:border-gray-400/60">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-1 text-gray-300">
            {title}
          </p>
          <p className="text-2xl font-bold text-white">
            {value}
          </p>
          {trend && (
            <div
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-xl shadow-sm"
          style={{ 
            backgroundColor: `${color}20`,
            border: `1px solid ${color}40`
          }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
}
