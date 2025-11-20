'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewFacturePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Facturation', href: '/dashboard/facturation' },
            { label: 'Ajouter une facture' },
          ]}
        />
        <div className="flex items-center gap-4">
          <Link href="/dashboard/facturation">
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
              Ajouter une facture
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
                  Patient *
                </label>
                <Input
                  placeholder="Sélectionner un patient"
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
                  Montant *
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className={
                    isDark
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit">Créer la facture</Button>
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

