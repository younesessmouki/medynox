'use client';

import Layout from '@/components/dashboard/Layout';
import { Table } from '@/components/dashboard/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Calendar } from 'lucide-react';

// Mock data
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
  {
    id: 5,
    patient: 'Sanae Idrissi',
    date: '2025-01-14',
    time: '09:00',
    type: 'Consultation',
    status: 'Confirmé',
    phone: '+212 6 56 78 90 12',
  },
  {
    id: 6,
    patient: 'Youssef Alaoui',
    date: '2025-01-14',
    time: '10:30',
    type: 'Urgence',
    status: 'Annulé',
    phone: '+212 6 67 89 01 23',
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
      const statusColors: Record<string, string> = {
        Confirmé: 'bg-[#24abe0]/20 text-[#24abe0]',
        'En attente': 'bg-yellow-500/20 text-yellow-400',
        Annulé: 'bg-[#D32C2C]/20 text-[#D32C2C]',
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[item.status] || 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {item.status}
        </span>
      );
    },
  },
];

export default function RendezVousPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Rendez-vous
            </h1>
            <p className="text-white/60">
              Gérez votre planning et vos rendez-vous
            </p>
          </div>
          <Button>
            <Plus size={18} className="mr-2" />
            Nouveau rendez-vous
          </Button>
        </div>

        {/* Calendar View Toggle */}
        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar size={18} className="mr-2" />
              Vue calendrier
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Aujourd'hui
              </Button>
              <Button variant="ghost" size="sm">
                Cette semaine
              </Button>
              <Button variant="ghost" size="sm">
                Ce mois
              </Button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <Table data={appointments} columns={columns} />
      </div>
    </Layout>
  );
}

