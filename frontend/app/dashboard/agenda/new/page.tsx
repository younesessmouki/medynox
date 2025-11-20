'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function NewAppointmentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patient: '',
    type: '',
    date: '',
    time: '',
    medecin: '',
    notes: '',
  });

  const steps = [
    { number: 1, title: 'Patient' },
    { number: 2, title: 'Acte médical' },
    { number: 3, title: 'Date & Heure' },
    { number: 4, title: 'Résumé' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Agenda', href: '/dashboard/agenda' },
            { label: 'Nouveau rendez-vous' },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            {/* Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= s.number
                          ? 'bg-[#24abe0] text-white'
                          : isDark
                            ? 'bg-white/10 text-white/60'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {s.number}
                    </div>
                    <span
                      className={`ml-2 ${
                        step >= s.number
                          ? 'font-semibold'
                          : isDark
                            ? 'text-white/60'
                            : 'text-gray-600'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        step > s.number
                          ? 'bg-[#24abe0]'
                          : isDark
                            ? 'bg-white/10'
                            : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sélectionner le patient</h2>
                  <Input
                    placeholder="Rechercher un patient..."
                    className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Type d'acte médical</h2>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                    placeholder="Sélectionner..."
                    options={[
                      { value: 'consultation', label: 'Consultation' },
                      { value: 'suivi', label: 'Suivi' },
                      { value: 'urgence', label: 'Urgence' },
                      { value: 'controle', label: 'Contrôle' },
                    ]}
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Date & Heure</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                    />
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Résumé</h2>
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p><strong>Patient:</strong> {formData.patient || 'Non sélectionné'}</p>
                    <p><strong>Type:</strong> {formData.type || 'Non sélectionné'}</p>
                    <p><strong>Date:</strong> {formData.date || 'Non sélectionné'}</p>
                    <p><strong>Heure:</strong> {formData.time || 'Non sélectionné'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => (step > 1 ? setStep(step - 1) : router.back())}
              >
                Précédent
              </Button>
              <Button
                onClick={() => (step < 4 ? setStep(step + 1) : router.push('/dashboard/agenda'))}
              >
                {step === 4 ? 'Créer le rendez-vous' : 'Suivant'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

