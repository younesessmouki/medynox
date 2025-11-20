'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Mail, MessageSquare, Phone, Plus, TrendingUp, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockCampaigns = [
  {
    id: 1,
    name: 'Rappel vaccination hiver',
    type: 'sms',
    status: 'sent',
    sent: 150,
    opened: 120,
    clicks: 45,
    date: '2025-01-10',
  },
  {
    id: 2,
    name: 'Promotion consultation',
    type: 'whatsapp',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicks: 0,
    date: '2025-01-15',
  },
  {
    id: 3,
    name: 'Newsletter mensuelle',
    type: 'email',
    status: 'draft',
    sent: 0,
    opened: 0,
    clicks: 0,
    date: null,
  },
];

export default function MarketingPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return Phone;
      case 'whatsapp':
        return MessageSquare;
      case 'email':
        return Mail;
      default:
        return Mail;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Marketing Patients' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Centre Marketing</h1>
          <Button onClick={() => router.push('/dashboard/marketing/new')} className="gap-2">
            <Plus size={20} />
            Nouvelle campagne
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#24abe0]/10">
                  <Users className="text-[#24abe0]" size={24} />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Total envoyés
                  </p>
                  <p className="text-2xl font-bold">150</p>
                </div>
              </div>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <TrendingUp className="text-green-500" size={24} />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Taux d'ouverture
                  </p>
                  <p className="text-2xl font-bold">80%</p>
                </div>
              </div>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <TrendingUp className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Taux de clics
                  </p>
                  <p className="text-2xl font-bold">30%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {mockCampaigns.map((campaign) => {
            const Icon = getTypeIcon(campaign.type);
            return (
              <Card
                key={campaign.id}
                className={`${
                  isDark ? 'bg-white/5' : 'bg-white'
                } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#24abe0]/10">
                        <Icon className="text-[#24abe0]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge
                            variant={
                              campaign.status === 'sent'
                                ? 'success'
                                : campaign.status === 'scheduled'
                                  ? 'warning'
                                  : 'default'
                            }
                            size="sm"
                          >
                            {campaign.status === 'sent'
                              ? 'Envoyé'
                              : campaign.status === 'scheduled'
                                ? 'Programmé'
                                : 'Brouillon'}
                          </Badge>
                          {campaign.date && (
                            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                              {campaign.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{campaign.sent}</p>
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          Envoyés
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{campaign.opened}</p>
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          Ouverts
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{campaign.clicks}</p>
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          Clics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

