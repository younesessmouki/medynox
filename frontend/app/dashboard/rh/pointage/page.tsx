'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const pointage = [
  {
    employee: 'Dr. Younes Alami',
    date: '2025-01-13',
    arrivee: '08:00',
    depart: '18:00',
    heures: 10,
  },
  {
    employee: 'Nadia Benali',
    date: '2025-01-13',
    arrivee: '09:00',
    depart: '17:00',
    heures: 8,
  },
];

const columns = [
  { key: 'employee', header: 'Employé' },
  { key: 'date', header: 'Date' },
  { key: 'arrivee', header: 'Arrivée' },
  { key: 'depart', header: 'Départ' },
  {
    key: 'heures',
    header: 'Heures',
    render: (item: any) => (
      <Badge variant="info" size="sm">
        {item.heures}h
      </Badge>
    ),
  },
];

export default function PointagePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'RH', href: '/dashboard/rh' },
            { label: 'Pointage' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Pointage
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Suivi des heures de travail
          </p>
        </div>
        <Table data={pointage} columns={columns} />
      </div>
    </Layout>
  );
}

