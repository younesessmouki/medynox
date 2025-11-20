'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/contexts/ThemeContext';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const stats = [
  {
    title: 'Total patients',
    value: 156,
    icon: Users,
    color: '#24abe0',
  },
  {
    title: 'RDV ce mois',
    value: 342,
    icon: Calendar,
    color: '#24abe0',
  },
  {
    title: 'Revenus totaux',
    value: '2,450,000 MAD',
    icon: DollarSign,
    color: '#24abe0',
  },
  {
    title: 'Croissance',
    value: '+15.2%',
    icon: TrendingUp,
    color: '#24abe0',
  },
];

const monthlyData = [
  { month: 'Jan', revenus: 285000 },
  { month: 'Fév', revenus: 312000 },
  { month: 'Mar', revenus: 298000 },
  { month: 'Avr', revenus: 325000 },
  { month: 'Mai', revenus: 340000 },
  { month: 'Juin', revenus: 365000 },
];

const consultationData = [
  { name: 'Générale', value: 45, color: '#24abe0' },
  { name: 'Spécialisée', value: 30, color: '#D32C2C' },
  { name: 'Urgence', value: 15, color: '#FFA500' },
  { name: 'Suivi', value: 10, color: '#10B981' },
];

export default function StatisticsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Statistics' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Statistiques
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Analyses détaillées et tendances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Revenus mensuels"
            description="Évolution sur 6 mois"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="month"
                  stroke="#ffffff60"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenus"
                  stroke="#24abe0"
                  strokeWidth={2}
                  dot={{ fill: '#24abe0', r: 4 }}
                  name="Revenus (MAD)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Répartition consultations"
            description="Distribution par type"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={consultationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {consultationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
}

