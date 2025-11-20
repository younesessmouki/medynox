'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Activity, Upload } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function AnalysesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Analyses IA' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analyses Médicales IA</h1>
        </div>

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'} hover:border-[#24abe0]/50 transition-colors cursor-pointer`}
          onClick={() => router.push('/dashboard/analyses/upload')}
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-lg bg-[#24abe0]/10">
                <Upload className="text-[#24abe0]" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Upload Analyse</h2>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Téléchargez une analyse pour extraction automatique et diagnostic IA
                </p>
              </div>
            </div>
            <Button className="w-full">Commencer</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

