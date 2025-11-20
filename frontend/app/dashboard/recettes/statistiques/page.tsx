'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { useTheme } from '@/contexts/ThemeContext';
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

const monthlyData = [
  { month: 'Jan', revenus: 285000 },
  { month: 'Fév', revenus: 312000 },
  { month: 'Mar', revenus: 298000 },
  { month: 'Avr', revenus: 325000 },
  { month: 'Mai', revenus: 340000 },
  { month: 'Juin', revenus: 365000 },
];

export default function StatistiquesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Recettes', href: '/dashboard/recettes' },
            { label: 'Courbes & statistiques' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Courbes & statistiques
          </h1>
        </div>
        <ChartCard
          title="Revenus mensuels (6 mois)"
          description="Tendance des revenus mensuels"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
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
              <Bar dataKey="revenus" fill="#24abe0" name="Revenus (MAD)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
}

