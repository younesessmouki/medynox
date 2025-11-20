'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';

const history = [
  {
    date: '2025-01-12',
    patient: 'Fatima Zahra',
    time: '10:00',
    type: 'Consultation',
    status: 'Terminé',
  },
  {
    date: '2025-01-11',
    patient: 'Ahmed Benali',
    time: '11:30',
    type: 'Suivi',
    status: 'Terminé',
  },
  {
    date: '2025-01-10',
    patient: 'Aicha Alami',
    time: '14:00',
    type: 'Consultation',
    status: 'Terminé',
  },
];

const columns = [
  { key: 'date', header: 'Date' },
  { key: 'patient', header: 'Patient' },
  { key: 'time', header: 'Heure' },
  { key: 'type', header: 'Type' },
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

export default function HistoriqueRendezVousPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Rendez-vous', href: '/dashboard/rendezvous' },
            { label: 'Historique' },
          ]}
        />

        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Historique des rendez-vous
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Liste complète des rendez-vous passés
          </p>
        </div>

        <Table data={history} columns={columns} />
      </div>
    </Layout>
  );
}

