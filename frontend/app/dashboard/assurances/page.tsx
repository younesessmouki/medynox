'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockAssurances = [
  {
    id: 1,
    patient: 'Fatima Zahra',
    company: 'CNSS',
    numero: 'CNSS-2024-001',
    date: '2025-01-12',
    status: 'validated',
    montant: 450,
  },
  {
    id: 2,
    patient: 'Ahmed Benali',
    company: 'Wafa Assurance',
    numero: 'WAFA-2025-002',
    date: '2025-01-11',
    status: 'pending',
    montant: 600,
  },
  {
    id: 3,
    patient: 'Aicha Alami',
    company: 'RMA',
    numero: 'RMA-2025-003',
    date: '2025-01-10',
    status: 'rejected',
    montant: 350,
  },
];

export default function AssurancesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const columns = [
    { key: 'patient', header: 'Patient' },
    { key: 'company', header: 'Assurance' },
    { key: 'numero', header: 'Numéro dossier' },
    { key: 'date', header: 'Date' },
    {
      key: 'status',
      header: 'Statut',
      render: (item: any) => {
        const statusConfig = {
          validated: { variant: 'success' as const, label: 'Validé', icon: CheckCircle },
          pending: { variant: 'warning' as const, label: 'En attente', icon: Clock },
          rejected: { variant: 'danger' as const, label: 'Rejeté', icon: XCircle },
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
    {
      key: 'montant',
      header: 'Montant',
      render: (item: any) => <span className="font-semibold">{item.montant} MAD</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/dashboard/assurances/${item.id}`)}
        >
          Voir
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Assurances' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assurances & Prise en Charge</h1>
          <Button onClick={() => router.push('/dashboard/assurances/new')} className="gap-2">
            <Plus size={20} />
            Nouveau dossier
          </Button>
        </div>

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <div className="mb-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-white/40' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <Input
                  placeholder="Rechercher par patient, assurance, numéro..."
                  className={`pl-10 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                />
              </div>
            </div>

            <Table data={mockAssurances} columns={columns} />
          </div>
        </Card>
      </div>
    </Layout>
  );
}

