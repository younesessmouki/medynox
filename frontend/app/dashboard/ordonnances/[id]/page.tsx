'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pill, Download, Mail, QrCode, User, Calendar, UserCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockOrdonnance = {
  id: 1,
  date: '2025-01-12',
  patient: 'Fatima Zahra',
  patientAge: 32,
  patientCIN: 'AB123456',
  medecin: 'Dr. Younes',
  medications: [
    {
      name: 'Doliprane 1000mg',
      dosage: '1 comprimé',
      frequency: '3 fois par jour',
      duration: '5 jours',
      notes: 'Après les repas',
    },
    {
      name: 'Omeprazole 20mg',
      dosage: '1 gélule',
      frequency: '1 fois par jour',
      duration: '7 jours',
      notes: 'Le matin à jeun',
    },
    {
      name: 'Ibuprofen 400mg',
      dosage: '1 comprimé',
      frequency: 'Si douleur',
      duration: 'Selon besoin',
      notes: 'Maximum 3 par jour',
    },
  ],
  notes: 'Repos recommandé. Contrôle dans 7 jours.',
  status: 'Validée',
};

export default function OrdonnanceDetailPage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Ordonnances', href: '/dashboard/ordonnances' },
            { label: `Ordonnance #${params.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Info */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">Ordonnance #{params.id}</h1>
                  <Badge variant="success" size="sm">
                    {mockOrdonnance.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <User className="text-[#24abe0]" size={20} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        Patient
                      </p>
                      <p className="font-semibold">{mockOrdonnance.patient}</p>
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                        {mockOrdonnance.patientAge} ans • CIN: {mockOrdonnance.patientCIN}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCircle className="text-[#24abe0]" size={20} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        Médecin
                      </p>
                      <p className="font-semibold">{mockOrdonnance.medecin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#24abe0]" size={20} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        Date
                      </p>
                      <p className="font-semibold">{mockOrdonnance.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Medications */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Pill className="text-[#24abe0]" size={24} />
                  Médicaments prescrits
                </h2>
                <div className="space-y-4">
                  {mockOrdonnance.medications.map((med, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#24abe0]/10">
                          <Pill className="text-[#24abe0]" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{med.name}</h3>
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                Dosage:
                              </span>
                              <p className="font-medium">{med.dosage}</p>
                            </div>
                            <div>
                              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                Fréquence:
                              </span>
                              <p className="font-medium">{med.frequency}</p>
                            </div>
                            <div>
                              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                Durée:
                              </span>
                              <p className="font-medium">{med.duration}</p>
                            </div>
                          </div>
                          {med.notes && (
                            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                              💡 {med.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Notes */}
            {mockOrdonnance.notes && (
              <Card
                className={`${
                  isDark ? 'bg-white/5' : 'bg-white'
                } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Notes et recommandations</h2>
                  <p className={isDark ? 'text-white/70' : 'text-gray-700'}>
                    {mockOrdonnance.notes}
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2">
                    <Download size={16} />
                    Télécharger PDF
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail size={16} />
                    Envoyer par Email
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <QrCode size={16} />
                    Partager via QR Code
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

