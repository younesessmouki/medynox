'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Upload, FileText, Image, File, Eye, Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockDocuments = [
  {
    id: 1,
    name: 'Ordonnance_2025_01_12.pdf',
    type: 'ordonnance',
    patient: 'Fatima Zahra',
    date: '2025-01-12',
    size: '245 KB',
    icon: FileText,
  },
  {
    id: 2,
    name: 'Analyse_sang_2025_01_10.pdf',
    type: 'analyse',
    patient: 'Ahmed Benali',
    date: '2025-01-10',
    size: '1.2 MB',
    icon: File,
  },
  {
    id: 3,
    name: 'Radio_poumon_2025_01_08.jpg',
    type: 'radio',
    patient: 'Aicha Alami',
    date: '2025-01-08',
    size: '3.5 MB',
    icon: Image,
  },
];

const tags = ['ordonnance', 'analyse', 'radio', 'scanner', 'dossier complet'];

export default function DocumentsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [selectedTag, setSelectedTag] = useState<string>('');

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Documents médicaux' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des documents</h1>
          <Button
            onClick={() => router.push('/dashboard/documents/upload')}
            className="gap-2"
          >
            <Upload size={20} />
            Uploader
          </Button>
        </div>

        {/* Filters */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-white/40' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <Input
                  placeholder="Rechercher un document..."
                  className={`pl-10 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                />
              </div>
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? 'info' : 'default'}
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDocuments.map((doc) => {
            const Icon = doc.icon;
            return (
              <Card
                key={doc.id}
                className={`${
                  isDark ? 'bg-white/5' : 'bg-white'
                } border ${isDark ? 'border-white/10' : 'border-gray-200'} hover:border-[#24abe0]/50 transition-colors cursor-pointer`}
                onClick={() => router.push(`/dashboard/documents/${doc.id}`)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-[#24abe0]/10">
                      <Icon className="text-[#24abe0]" size={24} />
                    </div>
                    <Badge variant="info" size="sm">
                      {doc.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 truncate">{doc.name}</h3>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                    Patient: {doc.patient}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-4`}>
                    {doc.date} • {doc.size}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Eye size={14} />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Download size={14} />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

