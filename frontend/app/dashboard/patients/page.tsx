'use client';

import Layout from '@/components/dashboard/Layout';
import { Table } from '@/components/dashboard/Table';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

// Mock data
const patients = [
  {
    id: 1,
    name: 'Fatima Zahra',
    age: 32,
    phone: '+212 6 12 34 56 78',
    email: 'fatima.zahra@example.com',
    lastVisit: '2025-01-12',
    status: 'Actif',
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    age: 45,
    phone: '+212 6 23 45 67 89',
    email: 'ahmed.benali@example.com',
    lastVisit: '2025-01-11',
    status: 'Actif',
  },
  {
    id: 3,
    name: 'Aicha Alami',
    age: 28,
    phone: '+212 6 34 56 78 90',
    email: 'aicha.alami@example.com',
    lastVisit: '2025-01-10',
    status: 'Actif',
  },
  {
    id: 4,
    name: 'Mohamed Tazi',
    age: 55,
    phone: '+212 6 45 67 89 01',
    email: 'mohamed.tazi@example.com',
    lastVisit: '2025-01-09',
    status: 'Actif',
  },
  {
    id: 5,
    name: 'Sanae Idrissi',
    age: 38,
    phone: '+212 6 56 78 90 12',
    email: 'sanae.idrissi@example.com',
    lastVisit: '2025-01-08',
    status: 'Actif',
  },
  {
    id: 6,
    name: 'Youssef Alaoui',
    age: 42,
    phone: '+212 6 67 89 01 23',
    email: 'youssef.alaoui@example.com',
    lastVisit: '2024-12-20',
    status: 'Inactif',
  },
];

const columns = [
  { key: 'name', header: 'Nom complet' },
  { key: 'age', header: 'Âge' },
  { key: 'phone', header: 'Téléphone' },
  { key: 'email', header: 'Email' },
  { key: 'lastVisit', header: 'Dernière visite' },
  {
    key: 'status',
    header: 'Statut',
    render: (item: any) => (
      <Badge variant={item.status === 'Actif' ? 'success' : 'default'} size="sm">
        {item.status}
      </Badge>
    ),
  },
];

export default function PatientsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Patients' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Tous les patients
            </h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Gérez vos patients et leurs dossiers médicaux
            </p>
          </div>
          <Link href="/dashboard/patients/new">
            <Button>
              <Plus size={18} className="mr-2" />
              Nouveau patient
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div
          className={`rounded-xl backdrop-blur-xl border p-4 ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-white/40' : 'text-gray-400'
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher un patient..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 focus:border-[#24abe0]/50 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder-white/40'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <Table data={patients} columns={columns} />
      </div>
    </Layout>
  );
}

