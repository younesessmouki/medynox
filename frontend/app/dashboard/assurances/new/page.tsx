'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Upload, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const insuranceCompanies = [
  'CNSS',
  'Wafa Assurance',
  'RMA',
  'Atlanta',
  'Sanad',
  'Autre',
];

export default function NewAssurancePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    patient: '',
    company: '',
    numero: '',
    montant: '',
    notes: '',
  });

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Assurances', href: '/dashboard/assurances' },
            { label: 'Nouveau dossier' },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Nouveau dossier assurance</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Patient</label>
                <Input
                  value={formData.patient}
                  onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  placeholder="Rechercher un patient..."
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Assurance</label>
                <Select
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                  placeholder="Sélectionner..."
                  options={insuranceCompanies.map((comp) => ({ value: comp, label: comp }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Numéro de dossier</label>
                <Input
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                  placeholder="Ex: CNSS-2025-001"
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Montant (MAD)</label>
                <Input
                  type="number"
                  value={formData.montant}
                  onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                  placeholder="0.00"
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Documents</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <Upload className={`mx-auto mb-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`} size={32} />
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Glissez-déposez les documents ou cliquez pour sélectionner
                  </p>
                  <Button variant="outline" className="mt-4 gap-2">
                    <Upload size={16} />
                    Choisir fichiers
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notes supplémentaires..."
                  rows={4}
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => router.back()}>
                Annuler
              </Button>
              <Button className="flex-1 gap-2">
                <CheckCircle size={16} />
                Enregistrer le dossier
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

