'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, User, Plus, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockAppointments = [
  {
    id: 1,
    time: '09:00',
    patient: 'Fatima Zahra',
    type: 'Consultation',
    medecin: 'Dr. Younes',
    status: 'Confirmé',
    duration: 30,
  },
  {
    id: 2,
    time: '10:00',
    patient: 'Ahmed Benali',
    type: 'Suivi',
    medecin: 'Dr. Younes',
    status: 'Confirmé',
    duration: 20,
  },
  {
    id: 3,
    time: '11:00',
    patient: 'Aicha Alami',
    type: 'Urgence',
    medecin: 'Dr. Fatima',
    status: 'En attente',
    duration: 45,
  },
];

export default function AgendaPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Agenda' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Agenda médical</h1>
          <div className="flex gap-3">
            <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
              {(['day', 'week', 'month'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded transition-colors ${
                    view === v
                      ? 'bg-[#24abe0] text-white'
                      : isDark
                        ? 'text-white/60 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {v === 'day' ? 'Jour' : v === 'week' ? 'Semaine' : 'Mois'}
                </button>
              ))}
            </div>
            <Button onClick={() => router.push('/dashboard/agenda/new')} className="gap-2">
              <Plus size={20} />
              Nouveau RDV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar View */}
          <div className="lg:col-span-3 space-y-6">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Aujourd'hui - 13 Janvier 2025</h2>
                <div className="space-y-3">
                  {mockAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10 hover:bg-white/10'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      } transition-colors cursor-pointer`}
                      onClick={() => router.push(`/dashboard/agenda/${apt.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <Clock className="text-[#24abe0]" size={20} />
                            <span className="font-semibold">{apt.time}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="text-white/60" size={16} />
                              <span className="font-semibold">{apt.patient}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="info" size="sm">
                                {apt.type}
                              </Badge>
                              <Badge
                                variant={apt.status === 'Confirmé' ? 'success' : 'warning'}
                                size="sm"
                              >
                                {apt.status}
                              </Badge>
                              <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                {apt.duration} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {apt.medecin}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Smart Suggestions Panel */}
          <div className="space-y-6">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  Suggestions IA
                </h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border ${
                    isDark ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className="text-sm font-medium mb-1">Créneau optimisé disponible</p>
                    <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      14:00 - 14:30 (30 min)
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isDark ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-200'
                  }`}>
                    <p className="text-sm font-medium mb-1">Rendez-vous doublé détecté</p>
                    <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      10:00 - 10:30
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

