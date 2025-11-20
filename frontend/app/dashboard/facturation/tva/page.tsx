'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
import { Download, FileText } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const tvaData = [
  { month: 'Jan', tva: 8500 },
  { month: 'Fév', tva: 9200 },
  { month: 'Mar', tva: 8800 },
  { month: 'Avr', tva: 10200 },
  { month: 'Mai', tva: 9800 },
  { month: 'Juin', tva: 11200 },
];

export default function TVAPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Facturation', href: '/dashboard/facturation' },
            { label: 'TVA' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion TVA</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export CSV
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText size={16} />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                Chiffre d'affaires HT
              </p>
              <p className="text-2xl font-bold">485,200 MAD</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                TVA collectée
              </p>
              <p className="text-2xl font-bold">97,040 MAD</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                TVA déductible
              </p>
              <p className="text-2xl font-bold">12,500 MAD</p>
            </div>
          </Card>
        </div>

        <ChartCard
          title="TVA mensuelle"
          description="Évolution de la TVA collectée"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tvaData}>
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
                dataKey="tva"
                stroke="#24abe0"
                strokeWidth={2}
                name="TVA (MAD)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
}

