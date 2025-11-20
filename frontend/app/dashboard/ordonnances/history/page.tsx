'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Search, Eye, Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockOrdonnances = [
  {
    id: 1,
    date: '2025-01-12',
    patient: 'Fatima Zahra',
    medecin: 'Dr. Younes',
    medications: 3,
    status: 'Validée',
  },
  {
    id: 2,
    date: '2025-01-11',
    patient: 'Ahmed Benali',
    medecin: 'Dr. Younes',
    medications: 5,
    status: 'Validée',
  },
  {
    id: 3,
    date: '2025-01-10',
    patient: 'Aicha Alami',
    medecin: 'Dr. Fatima',
    medications: 2,
    status: 'Brouillon',
  },
];

export default function OrdonnancesHistoryPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'patient', header: 'Patient' },
    { key: 'medecin', header: 'Médecin' },
    {
      key: 'medications',
      header: 'Médicaments',
      render: (item: any) => <span>{item.medications} médicament(s)</span>,
    },
    {
      key: 'status',
      header: 'Statut',
      render: (item: any) => (
        <Badge variant={item.status === 'Validée' ? 'success' : 'warning'} size="sm">
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/dashboard/ordonnances/${item.id}`)}
            className="gap-1"
          >
            <Eye size={14} />
            Voir
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Download size={14} />
            PDF
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Ordonnances', href: '/dashboard/ordonnances' },
            { label: 'Historique' },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Historique des ordonnances</h1>
              <Button onClick={() => router.push('/dashboard/ordonnances/new')}>
                Nouvelle ordonnance
              </Button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-white/40' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <Input
                  placeholder="Rechercher par patient, médecin..."
                  className={`pl-10 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                />
              </div>
            </div>

            <Table data={mockOrdonnances} columns={columns} />
          </div>
        </Card>
      </div>
    </Layout>
  );
}

