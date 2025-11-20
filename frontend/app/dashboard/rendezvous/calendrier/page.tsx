'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Calendar } from '@/components/dashboard/Calendar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock } from 'lucide-react';

const todayAppointments = [
  { time: '09:00', patient: 'Sanae Idrissi', type: 'Consultation' },
  { time: '10:00', patient: 'Fatima Zahra', type: 'Consultation' },
  { time: '11:30', patient: 'Ahmed Benali', type: 'Suivi' },
  { time: '14:00', patient: 'Aicha Alami', type: 'Consultation' },
  { time: '15:30', patient: 'Mohamed Tazi', type: 'Contrôle' },
];

export default function CalendrierPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Rendez-vous', href: '/dashboard/rendezvous' },
            { label: 'Calendrier' },
          ]}
        />

        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Calendrier
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Visualisez vos rendez-vous sur le calendrier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Calendar />
          </div>
          <div>
            <Card
              className={
                isDark
                  ? 'bg-white/5 backdrop-blur-xl border-white/10'
                  : 'bg-white border-gray-200'
              }
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-[#24abe0]" />
                <h3
                  className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Rendez-vous aujourd'hui
                </h3>
              </div>
              <div className="space-y-3">
                {todayAppointments.map((apt, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      isDark
                        ? 'bg-white/5 border-white/10'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {apt.time}
                      </span>
                      <Badge variant="info" size="sm">
                        {apt.type}
                      </Badge>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {apt.patient}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

