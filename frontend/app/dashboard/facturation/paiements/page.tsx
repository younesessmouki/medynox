'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const payments = [
  {
    id: 'PAY-001',
    date: '2025-01-12',
    patient: 'Fatima Zahra',
    amount: 450,
    method: 'Espèces',
    status: 'Payé',
  },
  {
    id: 'PAY-002',
    date: '2025-01-11',
    patient: 'Ahmed Benali',
    amount: 600,
    method: 'Carte bancaire',
    status: 'Payé',
  },
];

const columns = [
  { key: 'id', header: 'ID Paiement' },
  { key: 'date', header: 'Date' },
  { key: 'patient', header: 'Patient' },
  {
    key: 'amount',
    header: 'Montant',
    render: (item: any) => (
      <span className="font-semibold">{item.amount} MAD</span>
    ),
  },
  { key: 'method', header: 'Méthode' },
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

export default function PaiementsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Facturation', href: '/dashboard/facturation' },
            { label: 'Paiements' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Paiements
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Liste des paiements reçus
          </p>
        </div>
        <Table data={payments} columns={columns} />
      </div>
    </Layout>
  );
}

