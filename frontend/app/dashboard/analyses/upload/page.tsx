'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockExtractedValues = {
  globules_blancs: { value: 7.2, unit: '10³/μL', normal: '4.0-11.0', status: 'normal' },
  tension: { systolique: 130, diastolique: 85, status: 'elevated' },
  hba1c: { value: 5.8, unit: '%', normal: '<6.0', status: 'normal' },
  ferritine: { value: 45, unit: 'ng/mL', normal: '15-200', status: 'normal' },
  cholesterol_total: { value: 5.2, unit: 'mmol/L', normal: '<5.2', status: 'borderline' },
};

const mockAIDiagnosis = [
  {
    type: 'warning',
    message: 'Tension légèrement élevée - Surveillance recommandée',
  },
  {
    type: 'info',
    message: 'Cholestérol à la limite - Contrôle dans 3 mois',
  },
];

export default function AnalysesUploadPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [file, setFile] = useState<File | null>(null);
  const [extracted, setExtracted] = useState(false);

  const handleExtract = () => {
    setTimeout(() => setExtracted(true), 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Analyses IA', href: '/dashboard/analyses' },
            { label: 'Upload analyse' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Zone */}
          <div className="lg:col-span-2 space-y-6">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Upload Analyse Médicale</h1>
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center ${
                    isDark
                      ? 'border-white/20 hover:border-[#24abe0]/50 bg-white/5'
                      : 'border-gray-300 hover:border-[#24abe0] bg-gray-50'
                  }`}
                >
                  {file ? (
                    <div className="space-y-4">
                      <CheckCircle className="mx-auto text-green-500" size={48} />
                      <div>
                        <p className="font-semibold">{file.name}</p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button onClick={handleExtract} disabled={extracted}>
                        {extracted ? 'Extraction terminée' : 'Extraire les données'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className={`mx-auto ${isDark ? 'text-white/40' : 'text-gray-400'}`} size={48} />
                      <div>
                        <p className="font-semibold mb-2">Glissez-déposez votre fichier</p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          ou cliquez pour sélectionner
                        </p>
                      </div>
                      <label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
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
            </Card>

            {/* Extracted Values */}
            {extracted && (
              <Card
                className={`${
                  isDark ? 'bg-white/5' : 'bg-white'
                } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Valeurs extraites</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(mockExtractedValues).map(([key, value]: [string, any]) => (
                      <div
                        key={key}
                        className={`p-4 rounded-lg border ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold capitalize">{key.replace('_', ' ')}</span>
                          <Badge
                            variant={
                              value.status === 'normal'
                                ? 'success'
                                : value.status === 'elevated' || value.status === 'borderline'
                                  ? 'warning'
                                  : 'danger'
                            }
                            size="sm"
                          >
                            {value.status}
                          </Badge>
                        </div>
                        {key === 'tension' ? (
                          <div>
                            <p className="text-2xl font-bold">
                              {value.systolique}/{value.diastolique} mmHg
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-2xl font-bold">
                              {value.value} {value.unit}
                            </p>
                            {value.normal && (
                              <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                Normal: {value.normal}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* AI Diagnosis Panel */}
          <div>
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="text-[#24abe0]" size={20} />
                  Diagnostic IA
                </h3>
                {extracted ? (
                  <div className="space-y-3">
                    {mockAIDiagnosis.map((diag, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          diag.type === 'warning'
                            ? isDark
                              ? 'bg-yellow-900/20 border-yellow-500/30'
                              : 'bg-yellow-50 border-yellow-200'
                            : isDark
                              ? 'bg-blue-900/20 border-blue-500/30'
                              : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {diag.type === 'warning' ? (
                            <AlertCircle className="text-yellow-500 mt-0.5" size={16} />
                          ) : (
                            <CheckCircle className="text-blue-500 mt-0.5" size={16} />
                          )}
                          <p className="text-sm">{diag.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                    Le diagnostic apparaîtra après extraction
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

