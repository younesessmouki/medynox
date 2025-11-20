'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Upload,
  FileText,
  FileImage,
  X,
  CheckCircle,
  AlertCircle,
  File,
  Download,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Mock extracted data
const mockExtractedData = {
  ordonnance: {
    medications: [
      { name: 'Paracétamol 500mg', posologie: '1 comprimé', frequence: '3x/jour', duree: '7 jours' },
      { name: 'Amoxicilline 1g', posologie: '1 comprimé', frequence: '2x/jour', duree: '5 jours' },
      { name: 'Ibuprofène 400mg', posologie: '1 comprimé', frequence: '2x/jour', duree: '3 jours' },
    ],
    notes: 'Prendre après les repas. Boire beaucoup d\'eau.',
    date: '2025-01-12',
    medecin: 'Dr. Younes',
  },
  analyse: {
    glycemie: { value: 5.8, unit: 'mmol/L', normal: '3.9-6.1', status: 'normal' },
    tension: { systolique: 130, diastolique: 85, status: 'elevated' },
    cholesterol: { total: 5.2, unit: 'mmol/L', normal: '<5.2', status: 'borderline' },
    creatinine: { value: 88, unit: 'μmol/L', normal: '60-110', status: 'normal' },
    vitamines: { D: 45, unit: 'nmol/L', normal: '50-125', status: 'low' },
    profil_lipidique: {
      HDL: 1.2,
      LDL: 3.1,
      triglycerides: 1.8,
      unit: 'mmol/L',
    },
  },
};

export default function OCRUploadPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'ordonnance' | 'analyse' | 'carte'>('ordonnance');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleExtract = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    // Simulate OCR processing
    setTimeout(() => {
      setExtractedData(
        documentType === 'ordonnance'
          ? mockExtractedData.ordonnance
          : documentType === 'analyse'
            ? mockExtractedData.analyse
            : null
      );
      setIsProcessing(false);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'OCR Extraction', href: '/dashboard/ocr' },
            { label: 'Upload document' },
          ]}
        />

        {/* Header */}
        <div
          className={`rounded-xl ${
            isDark ? 'bg-white/5' : 'bg-white'
          } backdrop-blur-xl border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          } p-6 shadow-md shadow-black/30`}
        >
          <h1 className="text-3xl font-bold mb-2">Upload & Extraction OCR</h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Téléchargez un document médical pour extraction automatique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload Zone */}
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Type de document</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'ordonnance', label: 'Ordonnance', icon: FileText },
                    { value: 'analyse', label: 'Analyse', icon: File },
                    { value: 'carte', label: 'Carte RAMED/CNSS', icon: FileImage },
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setDocumentType(type.value as any)}
                        className={`p-4 rounded-lg border transition-all ${
                          documentType === type.value
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
                            documentType === type.value ? 'text-[#24abe0]' : ''
                          }`}
                          size={32}
                        />
                        <p className="text-sm font-medium">{type.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Upload document</h2>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    isDark
                      ? 'border-white/20 hover:border-[#24abe0]/50 bg-white/5'
                      : 'border-gray-300 hover:border-[#24abe0] bg-gray-50'
                  }`}
                >
                  {selectedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="mx-auto text-[#10B981]" size={48} />
                      <div>
                        <p className="font-semibold">{selectedFile.name}</p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                        className="gap-2"
                      >
                        <X size={16} />
                        Supprimer
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload
                        className={`mx-auto ${isDark ? 'text-white/40' : 'text-gray-400'}`}
                        size={48}
                      />
                      <div>
                        <p className="font-semibold mb-2">
                          Glissez-déposez votre fichier ici
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          ou cliquez pour sélectionner
                        </p>
                      </div>
                      <label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button as="span" variant="outline" className="gap-2">
                          <Upload size={16} />
                          Choisir un fichier
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleExtract}
                disabled={!selectedFile || isProcessing}
                className="w-full gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    Extraire les données
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Right: Extracted Data Preview */}
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Données extraites</h2>
              {extractedData ? (
                <div className="space-y-6">
                  {documentType === 'ordonnance' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-3">Médicaments</h3>
                        <div className="space-y-3">
                          {extractedData.medications.map((med: any, index: number) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border ${
                                isDark
                                  ? 'bg-white/5 border-white/10'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="font-semibold">{med.name}</p>
                                <Badge variant="success" size="sm">
                                  Extrait
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                    Posologie:
                                  </span>
                                  <p className="font-medium">{med.posologie}</p>
                                </div>
                                <div>
                                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                    Fréquence:
                                  </span>
                                  <p className="font-medium">{med.frequence}</p>
                                </div>
                                <div>
                                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                    Durée:
                                  </span>
                                  <p className="font-medium">{med.duree}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {extractedData.notes && (
                        <div>
                          <h3 className="font-semibold mb-2">Notes du médecin</h3>
                          <Input
                            value={extractedData.notes}
                            readOnly
                            className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {documentType === 'analyse' && (
                    <div className="space-y-4">
                      {Object.entries(extractedData).map(([key, value]: [string, any]) => (
                        <div
                          key={key}
                          className={`p-4 rounded-lg border ${
                            isDark
                              ? 'bg-white/5 border-white/10'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold capitalize">
                              {key.replace('_', ' ')}
                            </h3>
                            {value.status && (
                              <Badge
                                variant={
                                  value.status === 'normal'
                                    ? 'success'
                                    : value.status === 'elevated' || value.status === 'borderline'
                                      ? 'warning'
                                      : 'error'
                                }
                                size="sm"
                              >
                                {value.status === 'normal'
                                  ? 'Normal'
                                  : value.status === 'elevated'
                                    ? 'Élevé'
                                    : value.status === 'borderline'
                                      ? 'Limite'
                                      : 'Faible'}
                              </Badge>
                            )}
                          </div>
                          {key === 'tension' ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                  Systolique:
                                </span>
                                <p className="text-lg font-semibold">
                                  {value.systolique} mmHg
                                </p>
                              </div>
                              <div>
                                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                  Diastolique:
                                </span>
                                <p className="text-lg font-semibold">
                                  {value.diastolique} mmHg
                                </p>
                              </div>
                            </div>
                          ) : key === 'profil_lipidique' ? (
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                  HDL:
                                </span>
                                <p className="text-lg font-semibold">
                                  {value.HDL} {value.unit}
                                </p>
                              </div>
                              <div>
                                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                  LDL:
                                </span>
                                <p className="text-lg font-semibold">
                                  {value.LDL} {value.unit}
                                </p>
                              </div>
                              <div>
                                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                  Triglycérides:
                                </span>
                                <p className="text-lg font-semibold">
                                  {value.triglycerides} {value.unit}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-2xl font-bold">
                                {value.value} {value.unit || ''}
                              </p>
                              {value.normal && (
                                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                  Normal: {value.normal}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download size={16} />
                      Exporter JSON
                    </Button>
                    <Button className="flex-1 gap-2">
                      <CheckCircle size={16} />
                      Valider & Enregistrer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText
                    className={`mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`}
                    size={64}
                  />
                  <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                    Les données extraites apparaîtront ici après traitement
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

