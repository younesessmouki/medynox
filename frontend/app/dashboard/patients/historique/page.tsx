'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const visitHistory = [
  {
    date: '2025-01-12',
    patient: 'Fatima Zahra',
    type: 'Consultation',
    doctor: 'Dr. Younes',
    status: 'Terminé',
  },
  {
    date: '2024-12-20',
    patient: 'Ahmed Benali',
    type: 'Suivi',
    doctor: 'Dr. Younes',
    status: 'Terminé',
  },
  {
    date: '2024-11-15',
    patient: 'Aicha Alami',
    type: 'Consultation',
    doctor: 'Dr. Younes',
    status: 'Terminé',
  },
  {
    date: '2024-10-10',
    patient: 'Mohamed Tazi',
    type: 'Contrôle',
    doctor: 'Dr. Younes',
    status: 'Terminé',
  },
];

const columns = [
  { key: 'date', header: 'Date' },
  { key: 'patient', header: 'Patient' },
  { key: 'type', header: 'Type' },
  { key: 'doctor', header: 'Médecin' },
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

export default function HistoriquePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Patients', href: '/dashboard/patients' },
            { label: 'Historique des visites' },
          ]}
        />

        <div className="flex items-center gap-4">
          <Link href="/dashboard/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft size={18} className="mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Historique des visites
            </h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Liste complète des visites de tous les patients
            </p>
          </div>
        </div>

        <Table data={visitHistory} columns={columns} />
      </div>
    </Layout>
  );
}

