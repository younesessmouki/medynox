'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Paramètres', href: '/dashboard/settings' },
            { label: 'Préférences' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Préférences
          </h1>
        </div>
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette size={20} className="text-[#24abe0]" />
            <h2
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Apparence
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Thème
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                className={`w-full px-4 py-2 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="dark">Sombre</option>
                <option value="light">Clair</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

