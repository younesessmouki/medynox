'use client';

import Layout from '@/components/dashboard/Layout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { Table } from '@/components/dashboard/Table';
import { TrendingUp, DollarSign, Calendar, ArrowUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const dailyRevenue = [
  { day: 'Lun', revenus: 8500 },
  { day: 'Mar', revenus: 10200 },
  { day: 'Mer', revenus: 9800 },
  { day: 'Jeu', revenus: 11200 },
  { day: 'Ven', revenus: 12450 },
  { day: 'Sam', revenus: 9800 },
  { day: 'Dim', revenus: 7200 },
];

const monthlyRevenue = [
  { month: 'Jan', revenus: 285000 },
  { month: 'Fév', revenus: 312000 },
  { month: 'Mar', revenus: 298000 },
  { month: 'Avr', revenus: 325000 },
  { month: 'Mai', revenus: 340000 },
  { month: 'Juin', revenus: 365000 },
];

const recentTransactions = [
  {
    id: 'TXN-001',
    date: '2025-01-12',
    patient: 'Fatima Zahra',
    amount: 450,
    type: 'Consultation',
    method: 'Espèces',
  },
  {
    id: 'TXN-002',
    date: '2025-01-12',
    patient: 'Ahmed Benali',
    amount: 600,
    type: 'Suivi',
    method: 'Carte bancaire',
  },
  {
    id: 'TXN-003',
    date: '2025-01-11',
    patient: 'Aicha Alami',
    amount: 350,
    type: 'Consultation',
    method: 'Espèces',
  },
  {
    id: 'TXN-004',
    date: '2025-01-11',
    patient: 'Mohamed Tazi',
    amount: 800,
    type: 'Spécialisé',
    method: 'Chèque',
  },
  {
    id: 'TXN-005',
    date: '2025-01-10',
    patient: 'Sanae Idrissi',
    amount: 500,
    type: 'Consultation',
    method: 'Espèces',
  },
];

const columns = [
  { key: 'id', header: 'ID Transaction' },
  { key: 'date', header: 'Date' },
  { key: 'patient', header: 'Patient' },
  {
    key: 'amount',
    header: 'Montant',
    render: (item: any) => (
      <span className="font-semibold text-[#24abe0]">{item.amount} MAD</span>
    ),
  },
  { key: 'type', header: 'Type' },
  { key: 'method', header: 'Méthode' },
];

const stats = [
  {
    title: 'Revenus du jour',
    value: '12,450 MAD',
    icon: DollarSign,
    trend: { value: 15, isPositive: true },
    color: '#24abe0',
  },
  {
    title: 'Revenus du mois',
    value: '365,000 MAD',
    icon: Calendar,
    trend: { value: 12, isPositive: true },
    color: '#24abe0',
  },
  {
    title: 'Croissance',
    value: '+12.5%',
    icon: TrendingUp,
    trend: { value: 12.5, isPositive: true },
    color: '#24abe0',
  },
];

export default function RecettesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Recettes Journalières
          </h1>
          <p className="text-white/60">
            Suivez vos revenus et transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              color={stat.color}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Revenus journaliers (7 jours)"
            description="Évolution des revenus de la semaine"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="day"
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
                <Legend
                  wrapperStyle={{ color: '#ffffff80', fontSize: '12px' }}
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
            title="Revenus mensuels (6 mois)"
            description="Tendance des revenus mensuels"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
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
                <Legend
                  wrapperStyle={{ color: '#ffffff80', fontSize: '12px' }}
                />
                <Bar dataKey="revenus" fill="#24abe0" name="Revenus (MAD)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Transactions */}
        <Table
          data={recentTransactions}
          columns={columns}
          title="Transactions récentes"
        />
      </div>
    </Layout>
  );
}

