'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, Calendar, Monitor, FileText, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockAuditDetail = {
  id: 1,
  action: 'Consultation ouverte',
  user: 'Dr. Younes',
  entity: 'Consultation',
  entityId: 'CONS-001',
  timestamp: '2025-01-13 10:30:00',
  ip: '192.168.1.100',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  changes: [
    { field: 'Date consultation', old: null, new: '2025-01-13' },
    { field: 'Patient', old: null, new: 'Fatima Zahra' },
  ],
};

export default function AuditDetailPage() {
  const params = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Audit Log', href: '/dashboard/audit' },
            { label: `Entrée #${params.id}` },
          ]}
        />

        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Détails de l'audit #{params.id}</h1>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <User className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Utilisateur</p>
                  <p className="font-semibold">{mockAuditDetail.user}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Date/Heure</p>
                  <p className="font-semibold">{mockAuditDetail.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Action</p>
                  <p className="font-semibold">{mockAuditDetail.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Monitor className="text-[#24abe0]" size={24} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>IP</p>
                  <p className="font-semibold">{mockAuditDetail.ip}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-2`}>
                User Agent
              </p>
              <p className={isDark ? 'text-white/80' : 'text-gray-700'}>
                {mockAuditDetail.userAgent}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-[#24abe0]" size={20} />
                Modifications
              </h3>
              <div className="space-y-3">
                {mockAuditDetail.changes.map((change, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <p className="font-semibold mb-2">{change.field}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          Avant
                        </p>
                        <p className={isDark ? 'text-white/80' : 'text-gray-700'}>
                          {change.old || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          Après
                        </p>
                        <p className="font-semibold text-green-500">{change.new}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

