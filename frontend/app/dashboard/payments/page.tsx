'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockPayments = [
  {
    id: 1,
    patient: 'Fatima Zahra',
    amount: 450,
    method: 'Carte bancaire',
    status: 'success',
    date: '2025-01-12',
    transactionId: 'TXN-2025-001',
  },
  {
    id: 2,
    patient: 'Ahmed Benali',
    amount: 600,
    method: 'Stripe',
    status: 'success',
    date: '2025-01-11',
    transactionId: 'TXN-2025-002',
  },
  {
    id: 3,
    patient: 'Aicha Alami',
    amount: 350,
    method: 'MarocPay',
    status: 'pending',
    date: '2025-01-10',
    transactionId: 'TXN-2025-003',
  },
  {
    id: 4,
    patient: 'Mohamed Tazi',
    amount: 800,
    method: 'Carte bancaire',
    status: 'failed',
    date: '2025-01-09',
    transactionId: 'TXN-2025-004',
  },
];

export default function PaymentsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'patient', header: 'Patient' },
    {
      key: 'amount',
      header: 'Montant',
      render: (item: any) => (
        <span className="font-semibold">{item.amount} MAD</span>
      ),
    },
    {
      key: 'method',
      header: 'Méthode',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <CreditCard className="text-[#24abe0]" size={16} />
          <span>{item.method}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Statut',
      render: (item: any) => {
        const statusConfig = {
          success: { variant: 'success' as const, label: 'Réussi', icon: CheckCircle },
          pending: { variant: 'warning' as const, label: 'En attente', icon: Clock },
          failed: { variant: 'danger' as const, label: 'Échoué', icon: XCircle },
        };
        const config = statusConfig[item.status as keyof typeof statusConfig];
        const Icon = config.icon;
        return (
          <Badge variant={config.variant} size="sm" className="gap-1">
            <Icon size={12} />
            {config.label}
          </Badge>
        );
      },
    },
    { key: 'transactionId', header: 'Transaction ID' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Paiements en ligne' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Paiements en ligne</h1>
          <Button onClick={() => router.push('/dashboard/payments/new')}>
            Nouveau paiement
          </Button>
        </div>

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <Table data={mockPayments} columns={columns} />
          </div>
        </Card>
      </div>
    </Layout>
  );
}

