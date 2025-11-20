'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

