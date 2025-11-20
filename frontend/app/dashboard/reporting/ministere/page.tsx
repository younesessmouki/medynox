'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
import { Download, FileText, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const reportData = [
  { month: 'Jan', maladies: 45, vaccinations: 120, urgences: 18, deces: 0, infections: 3 },
  { month: 'Fév', maladies: 52, vaccinations: 135, urgences: 22, deces: 1, infections: 5 },
  { month: 'Mar', maladies: 48, vaccinations: 128, urgences: 20, deces: 0, infections: 4 },
];

export default function MinistereReportingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Reporting Ministère' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Reporting Ministère de la Santé</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                Maladies chroniques
              </p>
              <p className="text-2xl font-bold">145</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                Vaccinations
              </p>
              <p className="text-2xl font-bold">383</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                Cas urgences
              </p>
              <p className="text-2xl font-bold">60</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                Infections
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </Card>
        </div>

        <ChartCard
          title="Statistiques mensuelles"
          description="Données pour le Ministère de la Santé"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData}>
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
              <Bar dataKey="maladies" fill="#24abe0" name="Maladies chroniques" />
              <Bar dataKey="vaccinations" fill="#10B981" name="Vaccinations" />
              <Bar dataKey="urgences" fill="#D32C2C" name="Urgences" />
              <Bar dataKey="infections" fill="#FFA500" name="Infections" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
}

