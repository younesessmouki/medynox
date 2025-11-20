'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Eye, Calendar, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockDocument = {
  id: 1,
  name: 'Ordonnance_2025_01_12.pdf',
  type: 'ordonnance',
  patient: 'Fatima Zahra',
  date: '2025-01-12',
  size: '245 KB',
  uploadedBy: 'Dr. Younes',
};

export default function DocumentDetailPage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Documents', href: '/dashboard/documents' },
            { label: `Document #${params.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Document #{params.id}</h1>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-6">
                  <FileText className="text-white/40" size={64} />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2">
                    <Eye size={16} />
                    Voir
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download size={16} />
                    Télécharger
                  </Button>
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
                <h3 className="font-semibold mb-4">Informations</h3>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                      Nom
                    </p>
                    <p className="font-semibold">{mockDocument.name}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                      Type
                    </p>
                    <Badge variant="info" size="sm">
                      {mockDocument.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="text-[#24abe0]" size={18} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        Patient
                      </p>
                      <p className="font-semibold">{mockDocument.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-[#24abe0]" size={18} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        Date
                      </p>
                      <p className="font-semibold">{mockDocument.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                      Taille
                    </p>
                    <p className="font-semibold">{mockDocument.size}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

