'use client';

import Layout from '@/components/dashboard/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  Calendar,
  DollarSign,
  UserPlus,
  AlertTriangle,
  Clock,
  TrendingUp,
  Activity,
  FileText,
  Building2,
  Receipt,
  Sparkles,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

// Mock data - Taux d'absentéisme
const absenteeismData = [
  { month: 'Jan', rate: 3.2 },
  { month: 'Fév', rate: 2.8 },
  { month: 'Mar', rate: 4.1 },
  { month: 'Avr', rate: 3.5 },
  { month: 'Mai', rate: 2.9 },
  { month: 'Juin', rate: 3.8 },
];

// Mock data - Revenus par acte médical
const revenueByActData = [
  { act: 'Consultation', revenus: 45000, count: 120 },
  { act: 'Urgence', revenus: 28000, count: 45 },
  { act: 'Chirurgie mineure', revenus: 65000, count: 18 },
  { act: 'Certificat', revenus: 8500, count: 85 },
  { act: 'Suivi', revenus: 32000, count: 95 },
];

// Mock data - Performances par médecin
const doctorPerformance = [
  {
    name: 'Dr. Younes',
    consultations: 145,
    satisfaction: 4.8,
    revenus: 125000,
    avatar: '👨‍⚕️',
  },
  {
    name: 'Dr. Fatima',
    consultations: 132,
    satisfaction: 4.9,
    revenus: 118000,
    avatar: '👩‍⚕️',
  },
  {
    name: 'Dr. Ahmed',
    consultations: 128,
    satisfaction: 4.7,
    revenus: 112000,
    avatar: '👨‍⚕️',
  },
  {
    name: 'Dr. Aicha',
    consultations: 115,
    satisfaction: 4.6,
    revenus: 98000,
    avatar: '👩‍⚕️',
  },
];

// Mock data - Prévisions IA
const aiForecastData = [
  { day: 'Aujourd\'hui', revenus: 12450, patients: 24, activity: 85 },
  { day: 'Demain', revenus: 13200, patients: 28, activity: 90 },
  { day: 'J+2', revenus: 11800, patients: 26, activity: 88 },
  { day: 'J+3', revenus: 14200, patients: 30, activity: 92 },
  { day: 'J+4', revenus: 12800, patients: 27, activity: 87 },
  { day: 'J+5', revenus: 13500, patients: 29, activity: 91 },
  { day: 'J+6', revenus: 12000, patients: 25, activity: 86 },
];

// Mock data - Indicateurs business marocains
const businessIndicators = [
  { label: 'ICE', value: '123456789012345', icon: Building2 },
  { label: 'IF', value: '987654321', icon: FileText },
  { label: 'CNSS', value: 'CNSS-2024-001', icon: Building2 },
  { label: 'TVA estimée mensuelle', value: '45,200 MAD', icon: Receipt },
  { label: 'Dépenses cabinet', value: '28,500 MAD', icon: DollarSign },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sparkline data for average consultations per hour
  const consultationsPerHour = [2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3];
  const avgConsultations = 5.2;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Dashboard' }]} />

        {/* Welcome Header */}
        <div
          className={`rounded-xl bg-gradient-to-r from-[#24abe0]/10 to-[#D32C2C]/10 border ${
            isDark ? 'border-[#24abe0]/20' : 'border-[#24abe0]/30'
          } p-6 text-center`}
        >
          <h1 className="text-3xl font-bold mb-2">
            Bonjour Dr. Younes — Bienvenue sur Medynox
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Voici un aperçu de votre activité médicale aujourd'hui
          </p>
        </div>

        {/* Main KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Patients du jour"
            value={24}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            color="#24abe0"
          />
          <StatCard
            title="RDV confirmés"
            value={18}
            icon={Calendar}
            trend={{ value: 8, isPositive: true }}
            color="#24abe0"
          />
          <StatCard
            title="Encaissement du jour"
            value="12,450 MAD"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
            color="#24abe0"
          />
          <StatCard
            title="Nouveaux patients"
            value={5}
            icon={UserPlus}
            trend={{ value: 25, isPositive: true }}
            color="#24abe0"
          />
        </div>

        {/* Taux d'absentéisme + Nombre moyen consultations/heure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Taux d'absentéisme */}
          <ChartCard
            title="Taux d'absentéisme"
            description="Évolution mensuelle du taux d'absentéisme"
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={absenteeismData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="month"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#D32C2C"
                  strokeWidth={2}
                  dot={{ fill: '#D32C2C', r: 4 }}
                  name="Taux (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Nombre moyen consultations/heure */}
          <div
            className={`rounded-xl ${
              isDark ? 'bg-white/5' : 'bg-white'
            } backdrop-blur-xl border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            } p-6 shadow-md shadow-black/30`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Consultations / heure
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Moyenne sur la journée
                </p>
              </div>
              <div className="text-3xl font-bold text-[#24abe0]">
                {avgConsultations}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={consultationsPerHour.map((v, i) => ({ hour: i, value: v }))}>
                <defs>
                  <linearGradient id="consultationsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#24abe0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#24abe0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#24abe0"
                  strokeWidth={2}
                  fill="url(#consultationsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenus par acte médical */}
        <ChartCard
          title="Revenus par acte médical"
          description="Répartition des revenus selon le type d'acte"
        >
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByActData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="act"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Bar dataKey="revenus" fill="#24abe0" name="Revenus (MAD)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {revenueByActData.map((act, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                    {act.act}
                  </p>
                  <p className="text-sm font-semibold">{act.revenus.toLocaleString()} MAD</p>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {act.count} actes
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Performances par médecin */}
        <ChartCard
          title="Performances par médecin"
          description="Classement des médecins selon leurs performances"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctorPerformance.map((doctor, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isDark
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-gray-200'
                } ${
                  index === 0
                    ? 'ring-2 ring-[#24abe0]/50'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{doctor.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{doctor.name}</h4>
                    {index === 0 && (
                      <Badge variant="success" size="sm" className="mt-1">
                        #1
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                      Consultations
                    </span>
                    <span className="font-semibold">{doctor.consultations}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                      Satisfaction
                    </span>
                    <span className="font-semibold flex items-center gap-1">
                      ⭐ {doctor.satisfaction}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                      Revenus
                    </span>
                    <span className="font-semibold text-[#24abe0]">
                      {doctor.revenus.toLocaleString()} MAD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Prévisions IA */}
        <ChartCard
          title="Prévisions IA - 7 prochains jours"
          description="Prédictions basées sur l'analyse des données historiques"
          icon={Sparkles}
        >
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={aiForecastData}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#24abe0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#24abe0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="day"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: isDark ? '#ffffff80' : '#00000080',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenus"
                  stroke="#24abe0"
                  strokeWidth={2}
                  fill="url(#forecastGradient)"
                  name="Revenus (MAD)"
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="#D32C2C"
                  strokeWidth={2}
                  fill="url(#forecastGradient)"
                  name="Patients"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-[#24abe0]" size={20} />
                  <span className="text-sm font-semibold">Revenus prévus</span>
                </div>
                <p className="text-2xl font-bold">
                  {aiForecastData
                    .slice(1)
                    .reduce((sum, d) => sum + d.revenus, 0)
                    .toLocaleString()}{' '}
                  MAD
                </p>
                <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'} mt-1`}>
                  Sur 6 jours
                </p>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-[#D32C2C]" size={20} />
                  <span className="text-sm font-semibold">Patients prévus</span>
                </div>
                <p className="text-2xl font-bold">
                  {aiForecastData.slice(1).reduce((sum, d) => sum + d.patients, 0)}
                </p>
                <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'} mt-1`}>
                  Sur 6 jours
                </p>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="text-[#10B981]" size={20} />
                  <span className="text-sm font-semibold">Pic d'activité</span>
                </div>
                <p className="text-2xl font-bold">
                  {Math.max(...aiForecastData.map((d) => d.activity))}%
                </p>
                <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'} mt-1`}>
                  J+3
                </p>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Indicateurs business marocains */}
        <div
          className={`rounded-xl ${
            isDark ? 'bg-white/5' : 'bg-white'
          } backdrop-blur-xl border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          } p-6 shadow-md shadow-black/30`}
        >
          <h3 className="text-lg font-semibold mb-4">Indicateurs business marocains</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {businessIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="text-[#24abe0]" size={18} />
                    <span className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {indicator.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{indicator.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
