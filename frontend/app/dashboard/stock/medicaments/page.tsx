'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const medicaments = [
  {
    name: 'Paracétamol 500mg',
    quantity: 45,
    minThreshold: 20,
    status: 'En stock',
    expiryDate: '2025-12-31',
  },
  {
    name: 'Ibuprofène 400mg',
    quantity: 78,
    minThreshold: 30,
    status: 'En stock',
    expiryDate: '2025-11-20',
  },
];

const columns = [
  { key: 'name', header: 'Médicament' },
  {
    key: 'quantity',
    header: 'Quantité',
    render: (item: any) => (
      <span className="font-semibold">{item.quantity} unités</span>
    ),
  },
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

export default function MedicamentsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Stock', href: '/dashboard/stock' },
            { label: 'Médicaments' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Médicaments
          </h1>
        </div>
        <Table data={medicaments} columns={columns} />
      </div>
    </Layout>
  );
}

