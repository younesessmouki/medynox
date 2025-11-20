'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  title,
}: TableProps<T>) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xl backdrop-blur-xl border shadow-md overflow-hidden ${
        isDark
          ? 'bg-white/5 border-white/10 shadow-black/30'
          : 'bg-white border-gray-200 shadow-gray-200/50'
      }`}
    >
      {title && (
        <div
          className={`p-4 border-b ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-gray-600'
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDark ? 'divide-white/10' : 'divide-gray-200'
            }`}
          >
            {data.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200 ${
                  isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-4 py-3 text-sm ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key] || '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div
          className={`p-8 text-center ${
            isDark ? 'text-white/40' : 'text-gray-400'
          }`}
        >
          Aucune donnée disponible
        </div>
      )}
    </div>
  );
}
