'use client';

import Layout from '@/components/dashboard/Layout';
import { Table } from '@/components/dashboard/Table';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, Calendar } from 'lucide-react';
import Link from 'next/link';

const appointments = [
  {
    id: 1,
    patient: 'Fatima Zahra',
    date: '2025-01-13',
    time: '10:00',
    type: 'Consultation',
    status: 'Confirmé',
    phone: '+212 6 12 34 56 78',
  },
  {
    id: 2,
    patient: 'Ahmed Benali',
    date: '2025-01-13',
    time: '11:30',
    type: 'Suivi',
    status: 'Confirmé',
    phone: '+212 6 23 45 67 89',
  },
  {
    id: 3,
    patient: 'Aicha Alami',
    date: '2025-01-13',
    time: '14:00',
    type: 'Consultation',
    status: 'En attente',
    phone: '+212 6 34 56 78 90',
  },
  {
    id: 4,
    patient: 'Mohamed Tazi',
    date: '2025-01-13',
    time: '15:30',
    type: 'Contrôle',
    status: 'Confirmé',
    phone: '+212 6 45 67 89 01',
  },
];

const columns = [
  { key: 'patient', header: 'Patient' },
  { key: 'date', header: 'Date' },
  { key: 'time', header: 'Heure' },
  { key: 'type', header: 'Type' },
  {
    key: 'status',
    header: 'Statut',
    render: (item: any) => {
      const statusColors: Record<string, 'success' | 'warning' | 'danger'> = {
        Confirmé: 'success',
        'En attente': 'warning',
        Annulé: 'danger',
      };
      return (
        <Badge variant={statusColors[item.status] || 'default'} size="sm">
          {item.status}
        </Badge>
      );
    },
  },
];

export default function RendezVousPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Rendez-vous', href: '/dashboard/rendezvous' }, { label: "Aujourd'hui" }]} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Rendez-vous d'aujourd'hui
            </h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Gérez votre planning et vos rendez-vous
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/rendezvous/calendrier">
              <Button variant="outline">
                <Calendar size={18} className="mr-2" />
                Vue calendrier
              </Button>
            </Link>
            <Link href="/dashboard/rendezvous/new">
              <Button>
                <Plus size={18} className="mr-2" />
                Nouveau rendez-vous
              </Button>
            </Link>
          </div>
        </div>

        <Table data={appointments} columns={columns} />
      </div>
    </Layout>
  );
}

