'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';

export default function CalendarPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Agenda', href: '/dashboard/agenda' },
            { label: 'Calendrier' },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Vue Calendrier</h1>
            <div className="h-[600px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                Calendrier interactif à implémenter
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

