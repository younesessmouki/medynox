'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import {
  Pill,
  Plus,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  X,
  Download,
  Mail,
  QrCode,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

const fakeAIRecommendations = [
  {
    medication: 'Doliprane 1000mg',
    dosage: '1 comprimé',
    frequency: '3 fois par jour',
    duration: '5 jours',
    notes: 'Après les repas',
  },
  {
    medication: 'Omeprazole 20mg',
    dosage: '1 gélule',
    frequency: '1 fois par jour',
    duration: '7 jours',
    notes: 'Le matin à jeun',
  },
  {
    medication: 'Ibuprofen 400mg',
    dosage: '1 comprimé',
    frequency: 'Si douleur',
    duration: 'Selon besoin',
    notes: 'Maximum 3 par jour',
  },
];

const fakeRisks = [
  {
    type: 'interaction',
    severity: 'warning',
    message: 'Interaction potentielle entre Doliprane et Ibuprofen',
  },
  {
    type: 'allergy',
    severity: 'danger',
    message: 'Vérifier allergie à la pénicilline',
  },
];

export default function NewOrdonnancePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showAI, setShowAI] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [notes, setNotes] = useState('');

  const addMedication = (med?: any) => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name: med?.medication || '',
      dosage: med?.dosage || '',
      frequency: med?.frequency || '',
      duration: med?.duration || '',
      notes: med?.notes || '',
    };
    setMedications([...medications, newMed]);
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const applyAIRecommendation = (rec: any) => {
    addMedication(rec);
    setShowAI(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Ordonnances', href: '/dashboard/ordonnances' },
            { label: 'Nouvelle ordonnance' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Nouvelle ordonnance</h1>
                  <Button
                    onClick={() => setShowAI(!showAI)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Sparkles size={20} />
                    Suggestions IA
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Patient</label>
                    <Input
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Nom du patient"
                      className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                    />
                  </div>
                </div>

                {/* Medications List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Médicaments</h2>
                    <Button onClick={() => addMedication()} size="sm" className="gap-2">
                      <Plus size={16} />
                      Ajouter
                    </Button>
                  </div>

                  {medications.map((med) => (
                    <div
                      key={med.id}
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Pill className="text-[#24abe0]" size={20} />
                          <span className="font-semibold">{med.name || 'Nouveau médicament'}</span>
                        </div>
                        <button
                          onClick={() => removeMedication(med.id)}
                          className={`p-1 rounded ${
                            isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                          }`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-white/60 mb-1 block">Médicament</label>
                          <Input
                            value={med.name}
                            onChange={(e) =>
                              setMedications(
                                medications.map((m) =>
                                  m.id === med.id ? { ...m, name: e.target.value } : m
                                )
                              )
                            }
                            placeholder="Nom du médicament"
                            className={isDark ? 'bg-white/5' : 'bg-white'}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/60 mb-1 block">Dosage</label>
                          <Input
                            value={med.dosage}
                            onChange={(e) =>
                              setMedications(
                                medications.map((m) =>
                                  m.id === med.id ? { ...m, dosage: e.target.value } : m
                                )
                              )
                            }
                            placeholder="Ex: 1 comprimé"
                            className={isDark ? 'bg-white/5' : 'bg-white'}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/60 mb-1 block">Fréquence</label>
                          <Input
                            value={med.frequency}
                            onChange={(e) =>
                              setMedications(
                                medications.map((m) =>
                                  m.id === med.id ? { ...m, frequency: e.target.value } : m
                                )
                              )
                            }
                            placeholder="Ex: 3x/jour"
                            className={isDark ? 'bg-white/5' : 'bg-white'}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/60 mb-1 block">Durée</label>
                          <Input
                            value={med.duration}
                            onChange={(e) =>
                              setMedications(
                                medications.map((m) =>
                                  m.id === med.id ? { ...m, duration: e.target.value } : m
                                )
                              )
                            }
                            placeholder="Ex: 7 jours"
                            className={isDark ? 'bg-white/5' : 'bg-white'}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="text-xs text-white/60 mb-1 block">Notes</label>
                        <Textarea
                          value={med.notes}
                          onChange={(e) =>
                            setMedications(
                              medications.map((m) =>
                                m.id === med.id ? { ...m, notes: e.target.value } : m
                              )
                            )
                          }
                          placeholder="Instructions spéciales..."
                          rows={2}
                          className={isDark ? 'bg-white/5' : 'bg-white'}
                        />
                      </div>
                    </div>
                  ))}

                  {medications.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <Pill className="mx-auto mb-2 text-white/40" size={32} />
                      <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                        Aucun médicament ajouté
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Notes générales</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes ou instructions supplémentaires..."
                    rows={3}
                    className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => router.push('/dashboard/ordonnances')}
                    variant="outline"
                  >
                    Annuler
                  </Button>
                  <Button className="flex-1 gap-2">
                    <CheckCircle size={16} />
                    Enregistrer l'ordonnance
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Panel */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            {showAI && (
              <Card
                className={`${
                  isDark ? 'bg-white/5' : 'bg-white'
                } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-[#24abe0]" size={20} />
                    <h3 className="font-semibold">Suggestions IA</h3>
                  </div>
                  <div className="space-y-3">
                    {fakeAIRecommendations.map((rec, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          isDark
                            ? 'bg-white/5 border-white/10 hover:bg-white/10'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        } cursor-pointer transition-colors`}
                        onClick={() => applyAIRecommendation(rec)}
                      >
                        <div className="font-semibold mb-1">{rec.medication}</div>
                        <div className="text-sm text-white/60">
                          {rec.dosage} • {rec.frequency} • {rec.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Risk Detection */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-[#D32C2C]" size={20} />
                  <h3 className="font-semibold">Détection de risques</h3>
                </div>
                {fakeRisks.length > 0 ? (
                  <div className="space-y-3">
                    {fakeRisks.map((risk, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          risk.severity === 'danger'
                            ? isDark
                              ? 'bg-red-900/20 border-red-500/30'
                              : 'bg-red-50 border-red-200'
                            : isDark
                              ? 'bg-yellow-900/20 border-yellow-500/30'
                              : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <Badge
                          variant={risk.severity === 'danger' ? 'danger' : 'warning'}
                          size="sm"
                          className="mb-2"
                        >
                          {risk.type === 'interaction' ? 'Interaction' : 'Allergie'}
                        </Badge>
                        <p className="text-sm">{risk.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="mx-auto mb-2 text-green-500" size={32} />
                    <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                      Aucun risque détecté
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Export Actions */}
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2" disabled={medications.length === 0}>
                    <Download size={16} />
                    Télécharger PDF
                  </Button>
                  <Button variant="outline" className="w-full gap-2" disabled={medications.length === 0}>
                    <Mail size={16} />
                    Envoyer par Email
                  </Button>
                  <Button variant="outline" className="w-full gap-2" disabled={medications.length === 0}>
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

