'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Radio } from '@/components/ui/Radio';
import { Mail, MessageSquare, Phone, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function NewCampaignPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [campaignType, setCampaignType] = useState<'sms' | 'whatsapp' | 'email'>('sms');
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    audience: '',
    schedule: 'now',
    date: '',
  });

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Marketing', href: '/dashboard/marketing' },
            { label: 'Nouvelle campagne' },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Créer une campagne</h1>

            {/* Campaign Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Type de campagne</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { type: 'sms', label: 'SMS', icon: Phone },
                  { type: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                  { type: 'email', label: 'Email', icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      onClick={() => setCampaignType(item.type as any)}
                      className={`p-4 rounded-lg border transition-all ${
                        campaignType === item.type
                          ? isDark
                            ? 'bg-[#24abe0]/20 border-[#24abe0]'
                            : 'bg-[#24abe0]/10 border-[#24abe0]'
                          : isDark
                            ? 'bg-white/5 border-white/10 hover:bg-white/10'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`mx-auto mb-2 ${
                          campaignType === item.type ? 'text-[#24abe0]' : ''
                        }`}
                        size={32}
                      />
                      <p className="text-sm font-medium">{item.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom de la campagne</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Rappel vaccination"
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Votre message..."
                  rows={6}
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Audience</label>
                <Select
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                  placeholder="Sélectionner..."
                  options={[
                    { value: 'all', label: 'Tous les patients' },
                    { value: 'active', label: 'Patients actifs' },
                    { value: 'inactive', label: 'Patients inactifs' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Planification</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      value="now"
                      checked={formData.schedule === 'now'}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    />
                    <span>Envoyer maintenant</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      value="later"
                      checked={formData.schedule === 'later'}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    />
                    <span>Programmer</span>
                  </label>
                </div>
                {formData.schedule === 'later' && (
                  <Input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`mt-2 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => router.back()}>
                Annuler
              </Button>
              <Button className="flex-1">Créer la campagne</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

