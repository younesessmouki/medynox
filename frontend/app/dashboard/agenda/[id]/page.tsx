'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User, Clock, Calendar, UserCircle, Edit } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockAppointment = {
  id: 1,
  patient: 'Fatima Zahra',
  type: 'Consultation',
  date: '2025-01-13',
  time: '09:00',
  duration: 30,
  medecin: 'Dr. Younes',
  status: 'Confirmé',
  notes: 'Consultation de routine',
};

export default function AppointmentDetailPage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Agenda', href: '/dashboard/agenda' },
            { label: `RDV #${params.id}` },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Rendez-vous #{params.id}</h1>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Edit size={16} />
                  Modifier
                </Button>
                <Badge variant="success" size="sm">
                  {mockAppointment.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Patient</p>
                  <p className="font-semibold">{mockAppointment.patient}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UserCircle className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Médecin</p>
                  <p className="font-semibold">{mockAppointment.medecin}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Date</p>
                  <p className="font-semibold">{mockAppointment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Heure</p>
                  <p className="font-semibold">{mockAppointment.time} ({mockAppointment.duration} min)</p>
                </div>
              </div>
            </div>

            {mockAppointment.notes && (
              <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold mb-2">Notes</p>
                <p className={isDark ? 'text-white/70' : 'text-gray-700'}>{mockAppointment.notes}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

