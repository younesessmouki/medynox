'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Pill, Sparkles, History } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function OrdonnancesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Ordonnances AI' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ordonnances AI</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'} hover:border-[#24abe0]/50 transition-colors cursor-pointer`}
            onClick={() => router.push('/dashboard/ordonnances/new')}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-lg bg-[#24abe0]/10">
                  <Sparkles className="text-[#24abe0]" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Nouvelle ordonnance</h2>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Créer avec suggestions IA
                  </p>
                </div>
              </div>
              <Button className="w-full">Créer maintenant</Button>
            </div>
          </Card>

          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'} hover:border-[#24abe0]/50 transition-colors cursor-pointer`}
            onClick={() => router.push('/dashboard/ordonnances/history')}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-lg bg-[#10B981]/10">
                  <History className="text-[#10B981]" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Historique</h2>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Consulter les ordonnances passées
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Voir l'historique</Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

