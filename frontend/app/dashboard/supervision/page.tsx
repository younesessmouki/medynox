'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Activity, Users, Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockRooms = [
  { id: 1, name: 'Salle 1', status: 'occupied', patient: 'Fatima Zahra', timer: '15:32' },
  { id: 2, name: 'Salle 2', status: 'free', patient: null, timer: null },
  { id: 3, name: 'Salle 3', status: 'cleaning', patient: null, timer: null },
  { id: 4, name: 'Salle 4', status: 'occupied', patient: 'Ahmed Benali', timer: '08:15' },
];

const mockQueue = [
  { id: 1, patient: 'Aicha Alami', priority: 'normal', waitTime: 5 },
  { id: 2, patient: 'Mohamed Tazi', priority: 'urgent', waitTime: 0 },
  { id: 3, patient: 'Sanae Idrissi', priority: 'normal', waitTime: 12 },
];

const mockStaff = [
  { name: 'Dr. Younes', role: 'Médecin', status: 'available', currentRoom: null },
  { name: 'Dr. Fatima', role: 'Médecin', status: 'busy', currentRoom: 'Salle 1' },
  { name: 'Infirmière Sarah', role: 'Infirmière', status: 'busy', currentRoom: 'Salle 4' },
  { name: 'Secrétaire Aicha', role: 'Secrétaire', status: 'available', currentRoom: null },
];

export default function SupervisionPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Supervision' },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supervision Clinique</h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Monitoring en temps réel • {currentTime.toLocaleTimeString('fr-FR')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/dashboard/supervision/rooms')}>
              Voir les salles
            </Button>
            <Button onClick={() => router.push('/dashboard/supervision/live')}>
              Vue Live
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rooms Status */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Statut des salles</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockRooms.map((room) => (
                <Card
                  key={room.id}
                  className={`${
                    isDark ? 'bg-white/5' : 'bg-white'
                  } border ${
                    room.status === 'occupied'
                      ? 'border-red-500/30 bg-red-900/10'
                      : room.status === 'cleaning'
                        ? 'border-yellow-500/30 bg-yellow-900/10'
                        : 'border-green-500/30 bg-green-900/10'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{room.name}</h3>
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
                    {room.patient && (
                      <div className="space-y-2">
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                          Patient: {room.patient}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#24abe0]" />
                          <span className="text-sm font-semibold">{room.timer}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Queue & Staff */}
          <div className="space-y-6">
            {/* Queue */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="text-[#24abe0]" size={20} />
                  File d'attente
                </h3>
                <div className="space-y-2">
                  {mockQueue.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border ${
                        isDark
                          ? item.priority === 'urgent'
                            ? 'bg-red-900/20 border-red-500/30'
                            : 'bg-white/5 border-white/10'
                          : item.priority === 'urgent'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.patient}</p>
                          <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            Attente: ~{item.waitTime} min
                          </p>
                        </div>
                        {item.priority === 'urgent' && (
                          <Badge variant="danger" size="sm">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Staff */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="text-[#24abe0]" size={20} />
                  Personnel
                </h3>
                <div className="space-y-2">
                  {mockStaff.map((person, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{person.name}</p>
                          <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            {person.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {person.currentRoom && (
                            <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                              {person.currentRoom}
                            </span>
                          )}
                          <Badge
                            variant={person.status === 'available' ? 'success' : 'warning'}
                            size="sm"
                          >
                            {person.status === 'available' ? 'Disponible' : 'Occupé'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

