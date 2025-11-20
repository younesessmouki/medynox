'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, Clock, FileText, Calendar, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockDossier = {
  id: 1,
  patient: 'Fatima Zahra',
  company: 'CNSS',
  numero: 'CNSS-2024-001',
  date: '2025-01-12',
  status: 'validated',
  montant: 450,
  notes: 'Prise en charge validée pour consultation générale',
  timeline: [
    { date: '2025-01-12', action: 'Dossier créé', user: 'Dr. Younes' },
    { date: '2025-01-12', action: 'Documents uploadés', user: 'Secrétaire Sarah' },
    { date: '2025-01-13', action: 'Validation CNSS', user: 'CNSS' },
  ],
};

export default function AssuranceDetailPage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const statusConfig = {
    validated: { variant: 'success' as const, label: 'Validé', icon: CheckCircle },
    pending: { variant: 'warning' as const, label: 'En attente', icon: Clock },
    rejected: { variant: 'danger' as const, label: 'Rejeté', icon: XCircle },
  };

  const config = statusConfig[mockDossier.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Assurances', href: '/dashboard/assurances' },
            { label: `Dossier #${params.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Dossier #{params.id}</h1>
                  <Badge variant={config.variant} size="sm" className="gap-1">
                    <Icon size={12} />
                    {config.label}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <User className="text-[#24abe0]" size={24} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Patient</p>
                      <p className="font-semibold">{mockDossier.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#24abe0]" size={24} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Assurance</p>
                      <p className="font-semibold">{mockDossier.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#24abe0]" size={24} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Numéro</p>
                      <p className="font-semibold">{mockDossier.numero}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#24abe0]" size={24} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Date</p>
                      <p className="font-semibold">{mockDossier.date}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-semibold mb-2">Montant</p>
                  <p className="text-2xl font-bold text-[#24abe0]">{mockDossier.montant} MAD</p>
                </div>

                {mockDossier.notes && (
                  <div className="mt-6">
                    <p className="font-semibold mb-2">Notes</p>
                    <p className={isDark ? 'text-white/70' : 'text-gray-700'}>{mockDossier.notes}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Timeline */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Historique</h2>
                <div className="space-y-4">
                  {mockDossier.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#24abe0]" />
                        {index < mockDossier.timeline.length - 1 && (
                          <div className={`w-0.5 h-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ minHeight: '40px' }} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold">{item.action}</p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {item.user} • {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Valider
                  </Button>
                  <Button variant="outline" className="w-full">
                    Rejeter
                  </Button>
                  <Button variant="outline" className="w-full">
                    Télécharger documents
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

