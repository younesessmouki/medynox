'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Clock, AlertTriangle, User, GripVertical } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockQueue = [
  { id: 1, patient: 'Fatima Zahra', priority: 'normal', waitTime: 5, estimated: 10 },
  { id: 2, patient: 'Ahmed Benali', priority: 'urgent', waitTime: 0, estimated: 5 },
  { id: 3, patient: 'Aicha Alami', priority: 'normal', waitTime: 12, estimated: 15 },
  { id: 4, patient: 'Mohamed Tazi', priority: 'normal', waitTime: 18, estimated: 20 },
];

export default function WaitingRoomPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [queue, setQueue] = useState(mockQueue);

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Salle d\'attente' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion Salle d'Attente</h1>
          <Button className="gap-2">
            <Plus size={20} />
            Ajouter patient
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queue List */}
          <div className="lg:col-span-2 space-y-4">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">File d'attente</h2>
                <div className="space-y-3">
                  {queue.map((item, index) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border ${
                        item.priority === 'urgent'
                          ? isDark
                            ? 'bg-red-900/20 border-red-500/30'
                            : 'bg-red-50 border-red-200'
                          : isDark
                            ? 'bg-white/5 border-white/10 hover:bg-white/10'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      } transition-colors cursor-move`}
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className={`${isDark ? 'text-white/40' : 'text-gray-400'}`} size={20} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="text-[#24abe0]" size={18} />
                            <span className="font-semibold">{item.patient}</span>
                            {item.priority === 'urgent' && (
                              <Badge variant="danger" size="sm">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="text-[#24abe0]" size={14} />
                              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                Attente: {item.waitTime} min
                              </span>
                            </div>
                            <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                              Estimé: {item.estimated} min
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Assigner salle
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4">Statistiques</h3>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                      Patients en attente
                    </p>
                    <p className="text-2xl font-bold">{queue.length}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                      Temps d'attente moyen
                    </p>
                    <p className="text-2xl font-bold">
                      {Math.round(queue.reduce((sum, q) => sum + q.waitTime, 0) / queue.length)} min
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                      Urgences
                    </p>
                    <p className="text-2xl font-bold text-red-500">
                      {queue.filter((q) => q.priority === 'urgent').length}
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

