'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Users,
  Search,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Droplet,
  Thermometer,
  Scale,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Mock data - Patients avec DME
const patients = [
  {
    id: 1,
    name: 'Fatima Zahra',
    age: 32,
    cin: 'AB123456',
    lastVisit: '2025-01-12',
    status: 'Actif',
    alerts: 2,
    avatar: '👩',
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    age: 45,
    cin: 'CD789012',
    lastVisit: '2025-01-11',
    status: 'Actif',
    alerts: 1,
    avatar: '👨',
  },
  {
    id: 3,
    name: 'Aicha Alami',
    age: 28,
    cin: 'EF345678',
    lastVisit: '2025-01-10',
    status: 'Actif',
    alerts: 3,
    avatar: '👩',
  },
  {
    id: 4,
    name: 'Mohamed Tazi',
    age: 55,
    cin: 'GH901234',
    lastVisit: '2025-01-09',
    status: 'Actif',
    alerts: 0,
    avatar: '👨',
  },
];

export default function DMEPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cin.includes(searchQuery)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'DME Intelligent' },
          ]}
        />

        {/* Header */}
        <div
          className={`rounded-xl ${
            isDark ? 'bg-white/5' : 'bg-white'
          } backdrop-blur-xl border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          } p-6 shadow-md shadow-black/30`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">DME Intelligent</h1>
              <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                Dossier Médical Électronique avec analyse intelligente
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-white/40' : 'text-gray-400'
                }`}
                size={20}
              />
              <Input
                placeholder="Rechercher un patient (nom, CIN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
              />
            </div>
          </div>
        </Card>

        {/* Patients List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${
                isDark ? 'border-white/10' : 'border-gray-200'
              } hover:border-[#24abe0]/50 transition-colors cursor-pointer`}
              onClick={() => {
                window.location.href = `/dashboard/dme/${patient.id}`;
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{patient.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {patient.age} ans • CIN: {patient.cin}
                      </p>
                    </div>
                  </div>
                  {patient.alerts > 0 && (
                    <Badge variant="warning" size="sm" className="gap-1">
                      <AlertTriangle size={12} />
                      {patient.alerts}
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                      Dernière visite:
                    </span>
                    <span className="font-medium">{patient.lastVisit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Statut:</span>
                    <Badge variant="success" size="sm">
                      {patient.status}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/dashboard/dme/${patient.id}`;
                  }}
                >
                  Voir le dossier
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

