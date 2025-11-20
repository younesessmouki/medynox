'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowDown, ArrowUp, RefreshCw, Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockMovements = [
  {
    id: 1,
    date: '2025-01-12',
    product: 'Seringues 5ml',
    type: 'entree',
    quantity: 100,
    reason: 'Commande fournisseur',
    user: 'Dr. Younes',
  },
  {
    id: 2,
    date: '2025-01-11',
    product: 'Gants médicaux',
    type: 'sortie',
    quantity: 50,
    reason: 'Utilisation',
    user: 'Secrétaire Sarah',
  },
  {
    id: 3,
    date: '2025-01-10',
    product: 'Pansements',
    type: 'ajustement',
    quantity: -10,
    reason: 'Ajustement inventaire',
    user: 'Dr. Younes',
  },
];

export default function StockMouvementsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'product', header: 'Produit' },
    {
      key: 'type',
      header: 'Type',
      render: (item: any) => {
        const icons = {
          entree: ArrowDown,
          sortie: ArrowUp,
          ajustement: RefreshCw,
        };
        const colors = {
          entree: 'text-green-500',
          sortie: 'text-red-500',
          ajustement: 'text-yellow-500',
        };
        const labels = {
          entree: 'Entrée',
          sortie: 'Sortie',
          ajustement: 'Ajustement',
        };
        const Icon = icons[item.type as keyof typeof icons];
        return (
          <div className="flex items-center gap-2">
            <Icon className={colors[item.type as keyof typeof colors]} size={16} />
            <Badge
              variant={
                item.type === 'entree'
                  ? 'success'
                  : item.type === 'sortie'
                    ? 'danger'
                    : 'warning'
              }
              size="sm"
            >
              {labels[item.type as keyof typeof labels]}
            </Badge>
          </div>
        );
      },
    },
    {
      key: 'quantity',
      header: 'Quantité',
      render: (item: any) => (
        <span
          className={
            item.quantity > 0
              ? 'text-green-500 font-semibold'
              : item.quantity < 0
                ? 'text-red-500 font-semibold'
                : ''
          }
        >
          {item.quantity > 0 ? '+' : ''}
          {item.quantity}
        </span>
      ),
    },
    { key: 'reason', header: 'Motif' },
    { key: 'user', header: 'Utilisateur' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Stock', href: '/dashboard/stock' },
            { label: 'Mouvements' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mouvements de stock</h1>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <Table data={mockMovements} columns={columns} />
          </div>
        </Card>
      </div>
    </Layout>
  );
}

