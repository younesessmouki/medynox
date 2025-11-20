'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link
        href="/dashboard"
        className={`flex items-center gap-1 ${
          isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight
            size={16}
            className={isDark ? 'text-white/40' : 'text-gray-400'}
          />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className={`${
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                isDark ? 'text-white' : 'text-gray-900 font-medium'
              }
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

