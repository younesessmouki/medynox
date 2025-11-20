'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Building2, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockCabinets = [
  {
    name: 'Agadir',
    revenus: 125000,
    patients: 450,
    activite: 85,
    performance: 'excellent',
  },
  {
    name: 'Marrakech',
    revenus: 98000,
    patients: 380,
    activite: 72,
    performance: 'bon',
  },
  {
    name: 'Casablanca',
    revenus: 152000,
    patients: 620,
    activite: 92,
    performance: 'excellent',
  },
  {
    name: 'Tanger',
    revenus: 87000,
    patients: 320,
    activite: 68,
    performance: 'moyen',
  },
];

export default function MultiCabinetsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Multi-Cabinets' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Multi-Cabinets</h1>
          <Badge variant="info" size="sm">
            Cabinet actuel: Casablanca
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockCabinets.map((cabinet, index) => (
            <Card
              key={index}
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${
                isDark ? 'border-white/10' : 'border-gray-200'
              } hover:border-[#24abe0]/50 transition-colors cursor-pointer`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="text-[#24abe0]" size={24} />
                    <h3 className="font-semibold text-lg">{cabinet.name}</h3>
                  </div>
                  <Badge
                    variant={
                      cabinet.performance === 'excellent'
                        ? 'success'
                        : cabinet.performance === 'bon'
                          ? 'info'
                          : 'warning'
                    }
                    size="sm"
                  >
                    {cabinet.performance}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      Revenus
                    </span>
                    <span className="font-semibold flex items-center gap-1">
                      <DollarSign size={16} className="text-[#24abe0]" />
                      {cabinet.revenus.toLocaleString()} MAD
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      Patients
                    </span>
                    <span className="font-semibold flex items-center gap-1">
                      <Users size={16} className="text-[#24abe0]" />
                      {cabinet.patients}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      Activité
                    </span>
                    <span className="font-semibold flex items-center gap-1">
                      <TrendingUp size={16} className="text-[#24abe0]" />
                      {cabinet.activite}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Best Performance Card */}
        <Card
          className={`${
            isDark ? 'bg-gradient-to-r from-[#24abe0]/20 to-[#D32C2C]/20' : 'bg-gradient-to-r from-blue-50 to-red-50'
          } border ${isDark ? 'border-[#24abe0]/30' : 'border-blue-200'}`}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-[#24abe0]/20">
                <TrendingUp className="text-[#24abe0]" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Meilleure performance du mois</h2>
                <p className={isDark ? 'text-white/70' : 'text-gray-700'}>
                  Cabinet de Casablanca
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Revenus
                </p>
                <p className="text-2xl font-bold">152,000 MAD</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Patients
                </p>
                <p className="text-2xl font-bold">620</p>
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Activité
                </p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

