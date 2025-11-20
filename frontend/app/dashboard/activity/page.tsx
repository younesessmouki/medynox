'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock } from 'lucide-react';

const activities = [
  {
    type: 'patient',
    action: 'Nouveau patient enregistré',
    name: 'Youssef Alaoui',
    time: 'Il y a 5 min',
    status: 'success',
  },
  {
    type: 'rdv',
    action: 'Rendez-vous confirmé',
    name: 'Fatima Zahra - 10:00',
    time: 'Il y a 15 min',
    status: 'info',
  },
  {
    type: 'facture',
    action: 'Facture générée',
    name: 'INV-2025-001 - 450 MAD',
    time: 'Il y a 1h',
    status: 'info',
  },
  {
    type: 'stock',
    action: 'Alerte stock faible',
    name: 'Seringues 5ml',
    time: 'Il y a 2h',
    status: 'warning',
  },
];

export default function ActivityPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Activity' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Activité
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Historique complet de l'activité
          </p>
        </div>
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  isDark
                    ? 'bg-white/5 border-white/10'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#24abe0] mt-2" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {activity.action}
                    </p>
                    <Badge variant={activity.status as any} size="sm">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    {activity.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'} mt-1`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

