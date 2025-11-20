'use client';

import Layout from '@/components/dashboard/Layout';
import { Table } from '@/components/dashboard/Table';
import { StatCard } from '@/components/dashboard/StatCard';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, DollarSign, FileText, Download } from 'lucide-react';
import Link from 'next/link';

// Mock data
const invoices = [
  {
    id: 'INV-2025-001',
    patient: 'Fatima Zahra',
    date: '2025-01-12',
    amount: 450,
    status: 'Payé',
    method: 'Espèces',
  },
  {
    id: 'INV-2025-002',
    patient: 'Ahmed Benali',
    date: '2025-01-11',
    amount: 600,
    status: 'Payé',
    method: 'Carte bancaire',
  },
  {
    id: 'INV-2025-003',
    patient: 'Aicha Alami',
    date: '2025-01-10',
    amount: 350,
    status: 'En attente',
    method: '-',
  },
  {
    id: 'INV-2025-004',
    patient: 'Mohamed Tazi',
    date: '2025-01-09',
    amount: 800,
    status: 'Payé',
    method: 'Chèque',
  },
  {
    id: 'INV-2025-005',
    patient: 'Sanae Idrissi',
    date: '2025-01-08',
    amount: 500,
    status: 'Payé',
    method: 'Espèces',
  },
];

const columns = [
  { key: 'id', header: 'N° Facture' },
  { key: 'patient', header: 'Patient' },
  { key: 'date', header: 'Date' },
  {
    key: 'amount',
    header: 'Montant',
    render: (item: any) => (
      <span className="font-semibold">{item.amount} MAD</span>
    ),
  },
  {
    key: 'status',
    header: 'Statut',
    render: (item: any) => {
      const statusVariants: Record<string, 'success' | 'warning' | 'danger'> = {
        Payé: 'success',
        'En attente': 'warning',
        'En retard': 'danger',
      };
      return (
        <Badge variant={statusVariants[item.status] || 'default'} size="sm">
          {item.status}
        </Badge>
      );
    },
  },
  { key: 'method', header: 'Méthode de paiement' },
];

const stats = [
  {
    title: 'Total du mois',
    value: '45,200 MAD',
    icon: DollarSign,
    color: '#24abe0',
  },
  {
    title: 'Factures payées',
    value: 42,
    icon: FileText,
    color: '#24abe0',
  },
  {
    title: 'En attente',
    value: 8,
    icon: FileText,
    color: '#D32C2C',
  },
];

export default function FacturationPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Facturation' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Factures
            </h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Gérez vos factures et paiements
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download size={18} className="mr-2" />
              Exporter
            </Button>
            <Link href="/dashboard/facturation/new">
              <Button>
                <Plus size={18} className="mr-2" />
                Nouvelle facture
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Invoices Table */}
        <Table data={invoices} columns={columns} />
      </div>
    </Layout>
  );
}

