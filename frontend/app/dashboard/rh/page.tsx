'use client';

import Layout from '@/components/dashboard/Layout';
import { Table } from '@/components/dashboard/Table';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/Button';
import { Plus, Users, UserCheck, Clock } from 'lucide-react';

// Mock data
const employees = [
  {
    id: 1,
    name: 'Dr. Younes Alami',
    role: 'Médecin',
    department: 'Consultation',
    email: 'younes.alami@medynox.ma',
    phone: '+212 6 12 34 56 78',
    status: 'Actif',
    joinDate: '2020-01-15',
  },
  {
    id: 2,
    name: 'Nadia Benali',
    role: 'Infirmière',
    department: 'Soins',
    email: 'nadia.benali@medynox.ma',
    phone: '+212 6 23 45 67 89',
    status: 'Actif',
    joinDate: '2021-03-20',
  },
  {
    id: 3,
    name: 'Karim Tazi',
    role: 'Secrétaire médical',
    department: 'Administration',
    email: 'karim.tazi@medynox.ma',
    phone: '+212 6 34 56 78 90',
    status: 'Actif',
    joinDate: '2019-06-10',
  },
  {
    id: 4,
    name: 'Sara Idrissi',
    role: 'Infirmière',
    department: 'Soins',
    email: 'sara.idrissi@medynox.ma',
    phone: '+212 6 45 67 89 01',
    status: 'Actif',
    joinDate: '2022-02-14',
  },
  {
    id: 5,
    name: 'Mehdi Alaoui',
    role: 'Comptable',
    department: 'Finance',
    email: 'mehdi.alaoui@medynox.ma',
    phone: '+212 6 56 78 90 12',
    status: 'Actif',
    joinDate: '2021-09-05',
  },
];

const columns = [
  { key: 'name', header: 'Nom' },
  { key: 'role', header: 'Poste' },
  { key: 'department', header: 'Département' },
  { key: 'email', header: 'Email' },
  { key: 'phone', header: 'Téléphone' },
  {
    key: 'status',
    header: 'Statut',
    render: (item: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Actif'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-gray-500/20 text-gray-400'
        }`}
      >
        {item.status}
      </span>
    ),
  },
  { key: 'joinDate', header: 'Date d\'embauche' },
];

const stats = [
  {
    title: 'Total employés',
    value: 12,
    icon: Users,
    color: '#24abe0',
  },
  {
    title: 'Employés actifs',
    value: 11,
    icon: UserCheck,
    color: '#24abe0',
  },
  {
    title: 'En congé',
    value: 1,
    icon: Clock,
    color: '#D32C2C',
  },
];

export default function RHPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Ressources humaines
            </h1>
            <p className="text-white/60">
              Gérez votre équipe et vos employés
            </p>
          </div>
          <Button>
            <Plus size={18} className="mr-2" />
            Nouvel employé
          </Button>
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

        {/* Employees Table */}
        <Table data={employees} columns={columns} />
      </div>
    </Layout>
  );
}

