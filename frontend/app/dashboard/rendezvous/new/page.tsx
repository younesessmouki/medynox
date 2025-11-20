'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewRendezVousPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Rendez-vous', href: '/dashboard/rendezvous' },
            { label: 'Créer un rendez-vous' },
          ]}
        />

        <div className="flex items-center gap-4">
          <Link href="/dashboard/rendezvous">
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
              Créer un rendez-vous
            </h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Planifier un nouveau rendez-vous
            </p>
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
                  Date *
                </label>
                <Input
                  type="date"
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
                  Heure *
                </label>
                <Input
                  type="time"
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
                  Type *
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option>Consultation</option>
                  <option>Suivi</option>
                  <option>Urgence</option>
                  <option>Contrôle</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white/80' : 'text-gray-700'
                  }`}
                >
                  Notes
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-2 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                  placeholder="Notes additionnelles..."
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit">Créer le rendez-vous</Button>
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

