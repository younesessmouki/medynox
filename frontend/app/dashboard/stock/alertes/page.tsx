'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';
import { AlertTriangle } from 'lucide-react';

const alertes = [
  {
    product: 'Seringues 5ml',
    quantity: 12,
    minThreshold: 15,
    level: 'Critique',
  },
  {
    product: 'Gants stériles',
    quantity: 8,
    minThreshold: 10,
    level: 'Critique',
  },
];

const columns = [
  { key: 'product', header: 'Produit' },
  {
    key: 'quantity',
    header: 'Quantité actuelle',
    render: (item: any) => (
      <span className="font-semibold text-[#D32C2C]">{item.quantity}</span>
    ),
  },
  {
    key: 'minThreshold',
    header: 'Seuil minimum',
  },
  {
    key: 'level',
    header: 'Niveau',
    render: (item: any) => (
      <Badge variant="danger" size="sm">
        <AlertTriangle size={12} className="mr-1" />
        {item.level}
      </Badge>
    ),
  },
];

export default function AlertesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Stock', href: '/dashboard/stock' },
            { label: 'Alertes de stock' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Alertes de stock
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Produits nécessitant une réapprovisionnement
          </p>
        </div>
        <Table data={alertes} columns={columns} />
      </div>
    </Layout>
  );
}

