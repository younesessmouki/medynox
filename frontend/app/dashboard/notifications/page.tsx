'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Calendar,
  DollarSign,
  Package,
  FileText,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockNotifications = [
  {
    id: 1,
    type: 'info',
    title: 'Nouveau RDV',
    message: 'Rendez-vous confirmé pour Fatima Zahra à 10:00',
    time: 'Il y a 5 min',
    read: false,
    icon: Calendar,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Stock faible',
    message: 'Seringues 5ml - Stock critique',
    time: 'Il y a 1h',
    read: false,
    icon: Package,
  },
  {
    id: 3,
    type: 'success',
    title: 'Paiement effectué',
    message: 'Facture #2025-001 - 450 MAD',
    time: 'Il y a 2h',
    read: true,
    icon: DollarSign,
  },
  {
    id: 4,
    type: 'info',
    title: 'Résultats ajoutés',
    message: 'Analyse sanguine pour Ahmed Benali',
    time: 'Il y a 3h',
    read: true,
    icon: FileText,
  },
  {
    id: 5,
    type: 'info',
    title: 'Nouveau message',
    message: 'Message de Dr. Fatima dans le chat',
    time: 'Il y a 4h',
    read: false,
    icon: MessageSquare,
  },
];

export default function NotificationsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'danger':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'danger':
        return 'text-red-500';
      default:
        return 'text-[#24abe0]';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Notifications' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Centre de notifications</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Settings size={16} />
              Paramètres
            </Button>
            <Badge variant="info" size="sm">
              {notifications.filter((n) => !n.read).length} non lues
            </Badge>
          </div>
        </div>

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <div className="space-y-3">
              {notifications.map((notif) => {
                const Icon = notif.icon;
                const TypeIcon = getIcon(notif.type);
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      notif.read
                        ? isDark
                          ? 'bg-white/5 border-white/10'
                          : 'bg-gray-50 border-gray-200'
                        : isDark
                          ? 'bg-[#24abe0]/10 border-[#24abe0]/30'
                          : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        notif.type === 'success'
                          ? 'bg-green-500/10'
                          : notif.type === 'warning'
                            ? 'bg-yellow-500/10'
                            : notif.type === 'danger'
                              ? 'bg-red-500/10'
                              : 'bg-[#24abe0]/10'
                      }`}>
                        <Icon className={getColor(notif.type)} size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notif.title}</h3>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-[#24abe0]" />
                          )}
                        </div>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                          {notif.message}
                        </p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          {notif.time}
                        </p>
                      </div>
                      {!notif.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(notif.id)}
                        >
                          Marquer comme lu
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

