'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Paramètres', href: '/dashboard/settings' },
            { label: 'Notifications' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Notifications
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
            <Bell size={20} className="text-[#24abe0]" />
            <h2
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Préférences de notification
            </h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className={`w-4 h-4 rounded text-[#24abe0] focus:ring-[#24abe0] ${
                  isDark
                    ? 'border-white/20 bg-white/5'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <span className={isDark ? 'text-white/80' : 'text-gray-700'}>
                Notifications par email
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className={`w-4 h-4 rounded text-[#24abe0] focus:ring-[#24abe0] ${
                  isDark
                    ? 'border-white/20 bg-white/5'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <span className={isDark ? 'text-white/80' : 'text-gray-700'}>
                Rappels de rendez-vous
              </span>
            </label>
            <Button>Enregistrer</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

