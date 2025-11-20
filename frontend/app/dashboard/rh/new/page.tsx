'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewEmployePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'RH', href: '/dashboard/rh' },
            { label: 'Ajouter un employé' },
          ]}
        />
        <div className="flex items-center gap-4">
          <Link href="/dashboard/rh">
            <Button variant="outline" size="sm">
              <ArrowLeft size={18} className="mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Ajouter un employé
            </h1>
          </div>
        </div>
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white/80' : 'text-gray-700'
                  }`}
                >
                  Nom complet *
                </label>
                <Input
                  className={
                    isDark
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white/80' : 'text-gray-700'
                  }`}
                >
                  Poste *
                </label>
                <Input
                  className={
                    isDark
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit">Enregistrer</Button>
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

