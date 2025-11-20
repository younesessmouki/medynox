'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, Phone, PhoneOff, MessageSquare, User, Clock, Pill, FileText, Maximize2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockMessages = [
  { id: 1, sender: 'Vous', message: 'Bonjour, comment allez-vous?', time: '10:25' },
  { id: 2, sender: 'Patient', message: 'Bonjour docteur, je vais bien merci', time: '10:26' },
];

export default function TeleconsultationRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [message, setMessage] = useState('');

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Téléconsultation', href: '/dashboard/teleconsultation' },
            { label: `Salle #${params.roomId}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Frame */}
          <div className="lg:col-span-3 space-y-4">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="success" size="sm">
                      En cours
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#24abe0]" size={18} />
                      <span className="font-semibold">15:32</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                  <Video className="text-white/40" size={64} />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Phone size={20} />
                    Audio
                  </Button>
                  <Button variant="danger" size="lg" className="gap-2" onClick={() => router.push('/dashboard/teleconsultation')}>
                    <PhoneOff size={20} />
                    Terminer
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <MessageSquare size={20} />
                    Chat
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Patient Info */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="text-[#24abe0]" size={18} />
                  Patient
                </h3>
                <div className="space-y-2">
                  <p className="font-semibold">Fatima Zahra</p>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    32 ans • CIN: AB123456
                  </p>
                </div>
              </div>
            </Card>

            {/* Chat */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-4">
                <h3 className="font-semibold mb-3">Chat</h3>
                <div className="space-y-2 mb-3 max-h-[200px] overflow-y-auto">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded-lg ${
                        msg.sender === 'Vous'
                          ? isDark
                            ? 'bg-[#24abe0]/20'
                            : 'bg-blue-50'
                          : isDark
                            ? 'bg-white/5'
                            : 'bg-gray-50'
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez un message..."
                    className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    } border`}
                  />
                  <Button size="sm">Envoyer</Button>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
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
    </Layout>
  );
}

