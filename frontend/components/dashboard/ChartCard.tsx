'use client';

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
  return (
    <div
      className={`rounded-xl backdrop-blur-xl border p-6 shadow-md ${className} bg-white border-gray-200 shadow-gray-200/50`}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="text-[#24abe0]" size={20} />}
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        {description && (
          <p className="text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}
