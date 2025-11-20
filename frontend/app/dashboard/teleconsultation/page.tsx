'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, Phone, PhoneOff, MessageSquare, User, Clock, Pill, FileText } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockRooms = [
  { id: 1, patient: 'Fatima Zahra', status: 'active', duration: '15:32' },
  { id: 2, patient: 'Ahmed Benali', status: 'waiting', duration: null },
];

export default function TeleconsultationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [isInCall, setIsInCall] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Téléconsultation' },
          ]}
        />

        {!isInCall ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Téléconsultation</h1>
              <Button className="gap-2">
                <Video size={20} />
                Nouvelle consultation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRooms.map((room) => (
                <Card
                  key={room.id}
                  className={`${
                    isDark ? 'bg-white/5' : 'bg-white'
                  } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <User className="text-[#24abe0]" size={24} />
                        <div>
                          <p className="font-semibold">{room.patient}</p>
                          <Badge
                            variant={room.status === 'active' ? 'success' : 'warning'}
                            size="sm"
                            className="mt-1"
                          >
                            {room.status === 'active' ? 'En cours' : 'En attente'}
                          </Badge>
                        </div>
                      </div>
                      {room.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="text-[#24abe0]" size={18} />
                          <span className="font-semibold">{room.duration}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      className="w-full gap-2"
                      onClick={() => {
                        setIsInCall(true);
                        router.push(`/dashboard/teleconsultation/${room.id}`);
                      }}
                    >
                      <Video size={16} />
                      Rejoindre
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Video Frame */}
                <div className="lg:col-span-3">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                    <Video className="text-white/40" size={64} />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Button variant="outline" size="lg" className="gap-2">
                      <Phone size={20} />
                      Audio
                    </Button>
                    <Button variant="danger" size="lg" className="gap-2">
                      <PhoneOff size={20} />
                      Terminer
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2">
                      <MessageSquare size={20} />
                      Chat
                    </Button>
                  </div>
                </div>

                {/* Patient Info & Chat */}
                <div className="space-y-4">
                  <Card
                    className={`${
                      isDark ? 'bg-white/5' : 'bg-white'
                    } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold mb-3">Patient</h3>
                      <div className="space-y-2">
                        <p className="font-semibold">Fatima Zahra</p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          32 ans
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          CIN: AB123456
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className={`${
                      isDark ? 'bg-white/5' : 'bg-white'
                    } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold mb-3">Actions rapides</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full gap-2" size="sm">
                          <Pill size={16} />
                          Créer ordonnance
                        </Button>
                        <Button variant="outline" className="w-full gap-2" size="sm">
                          <FileText size={16} />
                          Notes consultation
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

