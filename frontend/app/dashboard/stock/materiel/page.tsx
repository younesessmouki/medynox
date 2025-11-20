'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const materiel = [
  {
    name: 'Seringues 5ml',
    quantity: 12,
    status: 'Stock faible',
  },
  {
    name: 'Gants stériles',
    quantity: 8,
    status: 'Stock critique',
  },
];

const columns = [
  { key: 'name', header: 'Matériel' },
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
    render: (item: any) => {
      const variant =
        item.status === 'Stock critique'
          ? 'danger'
          : item.status === 'Stock faible'
          ? 'warning'
          : 'success';
      return (
        <Badge variant={variant} size="sm">
          {item.status}
        </Badge>
      );
    },
  },
];

export default function MaterielPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Stock', href: '/dashboard/stock' },
            { label: 'Matériel médical' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Matériel médical
          </h1>
        </div>
        <Table data={materiel} columns={columns} />
      </div>
    </Layout>
  );
}

