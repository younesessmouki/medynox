'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Table } from '@/components/dashboard/Table';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Search, FileText, User, Calendar, Eye } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockAuditLogs = [
  {
    id: 1,
    action: 'Consultation ouverte',
    user: 'Dr. Younes',
    entity: 'Consultation',
    entityId: 'CONS-001',
    timestamp: '2025-01-13 10:30:00',
    ip: '192.168.1.100',
  },
  {
    id: 2,
    action: 'DME modifié',
    user: 'Dr. Fatima',
    entity: 'DME',
    entityId: 'DME-002',
    timestamp: '2025-01-13 09:15:00',
    ip: '192.168.1.101',
  },
  {
    id: 3,
    action: 'Ordonnance créée',
    user: 'Dr. Younes',
    entity: 'Ordonnance',
    entityId: 'ORD-003',
    timestamp: '2025-01-13 08:45:00',
    ip: '192.168.1.100',
  },
  {
    id: 4,
    action: 'Facture modifiée',
    user: 'Secrétaire Sarah',
    entity: 'Facture',
    entityId: 'INV-004',
    timestamp: '2025-01-12 16:20:00',
    ip: '192.168.1.102',
  },
  {
    id: 5,
    action: 'Patient supprimé',
    user: 'Dr. Younes',
    entity: 'Patient',
    entityId: 'PAT-005',
    timestamp: '2025-01-12 14:10:00',
    ip: '192.168.1.100',
  },
];

export default function AuditPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [filters, setFilters] = useState({
    user: '',
    action: '',
    date: '',
  });

  const columns = [
    {
      key: 'timestamp',
      header: 'Date/Heure',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Calendar className="text-[#24abe0]" size={16} />
          <span>{item.timestamp}</span>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Utilisateur',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <User className="text-[#24abe0]" size={16} />
          <span>{item.user}</span>
        </div>
      ),
    },
    { key: 'action', header: 'Action' },
    {
      key: 'entity',
      header: 'Entité',
      render: (item: any) => (
        <Badge variant="info" size="sm">
          {item.entity}
        </Badge>
      ),
    },
    { key: 'entityId', header: 'ID' },
    {
      key: 'ip',
      header: 'IP',
      render: (item: any) => (
        <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
          {item.ip}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/dashboard/audit/${item.id}`)}
          className="gap-1"
        >
          <Eye size={14} />
          Détails
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
            { label: 'Audit Log' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Journal d'audit</h1>
          <Badge variant="info" size="sm">
            Traçabilité CNDP
          </Badge>
        </div>

        {/* Filters */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-white/40' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <Input
                  placeholder="Rechercher..."
                  className={`pl-10 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                />
              </div>
              <Select
                value={filters.user}
                onChange={(e) => setFilters({ ...filters, user: e.target.value })}
                className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                placeholder="Tous les utilisateurs"
                options={[
                  { value: 'Dr. Younes', label: 'Dr. Younes' },
                  { value: 'Dr. Fatima', label: 'Dr. Fatima' },
                  { value: 'Secrétaire Sarah', label: 'Secrétaire Sarah' },
                ]}
              />
              <Select
                value={filters.action}
                onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                placeholder="Toutes les actions"
                options={[
                  { value: 'Consultation ouverte', label: 'Consultation ouverte' },
                  { value: 'DME modifié', label: 'DME modifié' },
                  { value: 'Ordonnance créée', label: 'Ordonnance créée' },
                  { value: 'Facture modifiée', label: 'Facture modifiée' },
                  { value: 'Patient supprimé', label: 'Patient supprimé' },
                ]}
              />
              <Input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className={isDark ? 'bg-white/5' : 'bg-gray-50'}
              />
            </div>
          </div>
        </Card>

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <Table data={mockAuditLogs} columns={columns} />
          </div>
        </Card>
      </div>
    </Layout>
  );
}

