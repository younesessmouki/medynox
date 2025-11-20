'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Shield, UserCog, UserCheck, Calculator } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const mockRoles = [
  {
    id: 1,
    name: 'Médecin Admin',
    icon: Shield,
    users: 3,
    permissions: ['all'],
  },
  {
    id: 2,
    name: 'Secrétaire',
    icon: UserCheck,
    users: 5,
    permissions: ['patients', 'appointments', 'billing'],
  },
  {
    id: 3,
    name: 'Assistant médical',
    icon: UserCog,
    users: 2,
    permissions: ['patients', 'dme', 'ordonnances'],
  },
  {
    id: 4,
    name: 'Comptable',
    icon: Calculator,
    users: 1,
    permissions: ['billing', 'reports'],
  },
];

const allPermissions = [
  { key: 'consultations', label: 'Consultations' },
  { key: 'facturation', label: 'Facturation' },
  { key: 'stock', label: 'Stock' },
  { key: 'dme', label: 'DME' },
  { key: 'ordonnances', label: 'Ordonnances' },
  { key: 'agenda', label: 'Agenda' },
  { key: 'patients', label: 'Patients' },
  { key: 'analytics', label: 'Analytics' },
];

export default function RolesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Paramètres', href: '/dashboard/settings' },
            { label: 'Rôles & Permissions' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Rôles & Permissions</h1>
          <Button onClick={() => router.push('/dashboard/settings/roles/new')}>
            Nouveau rôle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRoles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className={`${
                  isDark ? 'bg-white/5' : 'bg-white'
                } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-[#24abe0]/10">
                        <Icon className="text-[#24abe0]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{role.name}</h3>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {role.users} utilisateur(s)
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/settings/roles/${role.id}`)}
                    >
                      Modifier
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      Permissions:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {allPermissions.map((perm) => {
                        const hasPermission =
                          role.permissions.includes('all') ||
                          role.permissions.includes(perm.key);
                        return (
                          <div key={perm.key} className="flex items-center gap-2">
                            <Checkbox checked={hasPermission} disabled />
                            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                              {perm.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
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

