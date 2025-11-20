'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const contrats = [
  {
    employee: 'Dr. Younes Alami',
    type: 'CDI',
    startDate: '2020-01-15',
    status: 'Actif',
  },
  {
    employee: 'Nadia Benali',
    type: 'CDI',
    startDate: '2021-03-20',
    status: 'Actif',
  },
];

const columns = [
  { key: 'employee', header: 'Employé' },
  { key: 'type', header: 'Type' },
  { key: 'startDate', header: 'Date de début' },
  {
    key: 'status',
    header: 'Statut',
    render: (item: any) => (
      <Badge variant="success" size="sm">
        {item.status}
      </Badge>
    ),
  },
];

export default function ContratsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'RH', href: '/dashboard/rh' },
            { label: 'Contrats' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Contrats
          </h1>
        </div>
        <Table data={contrats} columns={columns} />
      </div>
    </Layout>
  );
}

