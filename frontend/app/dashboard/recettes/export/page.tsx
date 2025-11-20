'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { Download } from 'lucide-react';

export default function ExportPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Recettes', href: '/dashboard/recettes' },
            { label: 'Export PDF' },
          ]}
        />
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Export PDF
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Exporter vos rapports de recettes en PDF
          </p>
        </div>
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Période
              </label>
              <select
                className={`w-full px-4 py-2 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option>Ce mois</option>
                <option>Ce trimestre</option>
                <option>Cette année</option>
              </select>
            </div>
            <Button>
              <Download size={18} className="mr-2" />
              Exporter en PDF
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

