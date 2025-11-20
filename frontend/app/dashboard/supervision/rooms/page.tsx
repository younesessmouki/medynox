'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, User, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockRooms = [
  { id: 1, name: 'Salle 1', status: 'occupied', patient: 'Fatima Zahra', timer: '15:32', equipment: 'OK' },
  { id: 2, name: 'Salle 2', status: 'free', patient: null, timer: null, equipment: 'OK' },
  { id: 3, name: 'Salle 3', status: 'cleaning', patient: null, timer: null, equipment: 'Maintenance' },
  { id: 4, name: 'Salle 4', status: 'occupied', patient: 'Ahmed Benali', timer: '08:15', equipment: 'OK' },
  { id: 5, name: 'Salle 5', status: 'free', patient: null, timer: null, equipment: 'OK' },
];

export default function RoomsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Supervision', href: '/dashboard/supervision' },
            { label: 'Salles' },
          ]}
        />

        <h1 className="text-3xl font-bold">Gestion des salles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRooms.map((room) => (
            <Card
              key={room.id}
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${
                room.status === 'occupied'
                  ? 'border-red-500/30'
                  : room.status === 'cleaning'
                    ? 'border-yellow-500/30'
                    : 'border-green-500/30'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{room.name}</h3>
                  <Badge
                    variant={
                      room.status === 'occupied'
                        ? 'danger'
                        : room.status === 'cleaning'
                          ? 'warning'
                          : 'success'
                    }
                    size="sm"
                  >
                    {room.status === 'occupied'
                      ? 'Occupée'
                      : room.status === 'cleaning'
                        ? 'Nettoyage'
                        : 'Libre'}
                  </Badge>
                </div>

                {room.patient ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="text-[#24abe0]" size={20} />
                      <span className="font-semibold">{room.patient}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#24abe0]" size={20} />
                      <span className="font-semibold">{room.timer}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle size={20} />
                    <span>Salle disponible</span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Équipement: <span className="font-semibold">{room.equipment}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

