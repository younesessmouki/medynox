'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

const performanceData = [
  { month: 'Jan', Agadir: 120, Marrakech: 95, Casa: 150, Tanger: 85 },
  { month: 'Fév', Agadir: 125, Marrakech: 98, Casa: 152, Tanger: 87 },
  { month: 'Mar', Agadir: 130, Marrakech: 100, Casa: 155, Tanger: 90 },
];

export default function CabinetsPerformancePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Multi-Cabinets', href: '/dashboard/cabinets' },
            { label: 'Performance' },
          ]}
        />

        <h1 className="text-3xl font-bold">Performance des cabinets</h1>

        <ChartCard
          title="Revenus par cabinet (3 derniers mois)"
          description="Évolution des revenus en milliers MAD"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
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
              <Legend
                wrapperStyle={{
                  color: isDark ? '#ffffff80' : '#00000080',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="Agadir" fill="#24abe0" />
              <Bar dataKey="Marrakech" fill="#10B981" />
              <Bar dataKey="Casa" fill="#D32C2C" />
              <Bar dataKey="Tanger" fill="#FFA500" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
}

