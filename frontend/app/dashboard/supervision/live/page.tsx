'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, Radio } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function LiveMonitoringPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLive, setIsLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Fake live updates
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Supervision', href: '/dashboard/supervision' },
            { label: 'Vue Live' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Monitoring Live</h1>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="font-semibold">{isLive ? 'En direct' : 'Hors ligne'}</span>
          </div>
        </div>

        {/* Clinic Map Visualization */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Plan de la clinique</h2>
            <div className="grid grid-cols-4 gap-4 h-[400px]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
                <div
                  key={room}
                  className={`rounded-lg border-2 flex items-center justify-center ${
                    room % 3 === 0
                      ? 'border-red-500 bg-red-900/20'
                      : room % 2 === 0
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-yellow-500 bg-yellow-900/20'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-bold">Salle {room}</p>
                    <Badge
                      variant={
                        room % 3 === 0
                          ? 'danger'
                          : room % 2 === 0
                            ? 'success'
                            : 'warning'
                      }
                      size="sm"
                      className="mt-2"
                    >
                      {room % 3 === 0 ? 'Occupée' : room % 2 === 0 ? 'Libre' : 'Nettoyage'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-[#24abe0]" size={20} />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Salles occupées
                </span>
              </div>
              <p className="text-2xl font-bold">3/8</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="text-green-500" size={20} />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  En attente
                </span>
              </div>
              <p className="text-2xl font-bold">5</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-yellow-500" size={20} />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  En nettoyage
                </span>
              </div>
              <p className="text-2xl font-bold">1</p>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-red-500" size={20} />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Urgences
                </span>
              </div>
              <p className="text-2xl font-bold">2</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

