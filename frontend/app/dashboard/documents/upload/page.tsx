'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Upload, X, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function DocumentsUploadPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    patient: '',
    tag: '',
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Documents', href: '/dashboard/documents' },
            { label: 'Upload' },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Uploader des documents</h1>

            <div className="space-y-4 mb-6">
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
                <label className="block text-sm font-medium mb-2">Tag</label>
                <Select
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                  placeholder="Sélectionner..."
                  options={[
                    { value: 'ordonnance', label: 'Ordonnance' },
                    { value: 'analyse', label: 'Analyse' },
                    { value: 'radio', label: 'Radio' },
                    { value: 'scanner', label: 'Scanner' },
                    { value: 'dossier complet', label: 'Dossier complet' },
                  ]}
                />
              </div>
            </div>

            {/* Upload Zone */}
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center ${
                isDark
                  ? 'border-white/20 bg-white/5 hover:border-[#24abe0]/50'
                  : 'border-gray-300 bg-gray-50 hover:border-[#24abe0]'
              } transition-colors`}
            >
              <Upload className={`mx-auto mb-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} size={48} />
              <p className="font-semibold mb-2">Glissez-déposez vos fichiers</p>
              <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                PDF, JPG, PNG (max 10MB)
              </p>
              <label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button as="span" variant="outline" className="gap-2">
                  <Upload size={16} />
                  Choisir fichiers
                </Button>
              </label>
            </div>

            {/* Files List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="font-semibold mb-2">Fichiers sélectionnés ({files.length})</h3>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    } flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={20} />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className={`p-1 rounded ${
                        isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                      }`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => router.back()}>
                Annuler
              </Button>
              <Button className="flex-1" disabled={files.length === 0}>
                Uploader ({files.length})
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

