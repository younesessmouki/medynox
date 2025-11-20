'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const assurances = [
  {
    name: 'CNSS',
    patient: 'Fatima Zahra',
    coverage: '80%',
    status: 'Actif',
  },
  {
    name: 'RAMED',
    patient: 'Ahmed Benali',
    coverage: '100%',
    status: 'Actif',
  },
];

const columns = [
  { key: 'name', header: 'Assurance' },
  { key: 'patient', header: 'Patient' },
  { key: 'coverage', header: 'Couverture' },
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

export default function AssurancesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Facturation', href: '/dashboard/facturation' },
            { label: 'Assurances' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Assurances
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Gestion des assurances patients
          </p>
        </div>
        <Table data={assurances} columns={columns} />
      </div>
    </Layout>
  );
}

