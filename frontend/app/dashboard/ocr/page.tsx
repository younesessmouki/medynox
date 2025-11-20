'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  FileImage,
  File,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Mock data - Documents extraits
const extractedDocuments = [
  {
    id: 1,
    type: 'Ordonnance',
    fileName: 'ordonnance_2025_01_12.pdf',
    uploadDate: '2025-01-12',
    status: 'extracted',
    patient: 'Fatima Zahra',
    medications: 5,
  },
  {
    id: 2,
    type: 'Analyse médicale',
    fileName: 'analyses_sang_2025_01_10.pdf',
    uploadDate: '2025-01-10',
    status: 'pending',
    patient: 'Ahmed Benali',
    medications: 0,
  },
  {
    id: 3,
    type: 'Carte RAMED',
    fileName: 'carte_ramed_scan.jpg',
    uploadDate: '2025-01-09',
    status: 'extracted',
    patient: 'Aicha Alami',
    medications: 0,
  },
  {
    id: 4,
    type: 'Ordonnance',
    fileName: 'ordonnance_ancienne.pdf',
    uploadDate: '2025-01-08',
    status: 'extracted',
    patient: 'Mohamed Tazi',
    medications: 8,
  },
];

export default function OCRPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'OCR Extraction' },
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">OCR Auto-Extraction</h1>
              <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                Extraction automatique de données depuis vos documents médicaux
              </p>
            </div>
            <Link href="/dashboard/ocr/upload">
              <Button className="gap-2">
                <Upload size={20} />
                Uploader un document
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#24abe0]/10">
                <FileText className="text-[#24abe0]" size={24} />
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Documents traités
                </p>
                <p className="text-2xl font-bold">124</p>
              </div>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#10B981]/10">
                <CheckCircle className="text-[#10B981]" size={24} />
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Extraction réussie
                </p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#D32C2C]/10">
                <AlertCircle className="text-[#D32C2C]" size={24} />
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  En attente
                </p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#FFA500]/10">
                <FileImage className="text-[#FFA500]" size={24} />
              </div>
              <div>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Médicaments extraits
                </p>
                <p className="text-2xl font-bold">342</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Documents List */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Documents récents</h2>
            <div className="space-y-3">
              {extractedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`p-3 rounded-lg ${
                          doc.type === 'Ordonnance'
                            ? 'bg-[#24abe0]/10'
                            : doc.type === 'Analyse médicale'
                              ? 'bg-[#10B981]/10'
                              : 'bg-[#FFA500]/10'
                        }`}
                      >
                        {doc.type === 'Ordonnance' ? (
                          <FileText className="text-[#24abe0]" size={24} />
                        ) : doc.type === 'Analyse médicale' ? (
                          <File className="text-[#10B981]" size={24} />
                        ) : (
                          <FileImage className="text-[#FFA500]" size={24} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{doc.fileName}</h3>
                          <Badge
                            variant={
                              doc.status === 'extracted' ? 'success' : 'warning'
                            }
                            size="sm"
                          >
                            {doc.status === 'extracted' ? 'Extrait' : 'En attente'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                            Patient: {doc.patient}
                          </span>
                          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                            {doc.uploadDate}
                          </span>
                          {doc.medications > 0 && (
                            <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                              {doc.medications} médicaments
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          // Navigate to preview
                          window.location.href = `/dashboard/ocr/upload?preview=${doc.id}`;
                        }}
                      >
                        <Eye size={16} />
                        Voir
                      </Button>
                      {doc.status === 'extracted' && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download size={16} />
                          Télécharger
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

