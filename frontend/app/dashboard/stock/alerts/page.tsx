'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Package, Clock, XCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockAlerts = [
  {
    id: 1,
    type: 'low_stock',
    severity: 'warning',
    product: 'Seringues 5ml',
    current: 5,
    minimum: 20,
    message: 'Stock critique - Commande urgente recommandée',
  },
  {
    id: 2,
    type: 'expired',
    severity: 'danger',
    product: 'Gants médicaux lot #2024-001',
    expiryDate: '2025-01-10',
    message: 'Produit expiré - Retirer du stock',
  },
  {
    id: 3,
    type: 'expiring_soon',
    severity: 'warning',
    product: 'Pansements stériles',
    expiryDate: '2025-01-20',
    message: 'Expiration dans 7 jours',
  },
];

export default function StockAlertsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getIcon = (type: string) => {
    switch (type) {
      case 'expired':
        return XCircle;
      case 'expiring_soon':
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Stock', href: '/dashboard/stock' },
            { label: 'Alertes' },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Alertes de stock</h1>
          <Badge variant="warning" size="sm">
            {mockAlerts.length} alerte(s)
          </Badge>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => {
            const Icon = getIcon(alert.type);
            return (
              <Card
                key={alert.id}
                className={`${
                  alert.severity === 'danger'
                    ? isDark
                      ? 'bg-red-900/20 border-red-500/30'
                      : 'bg-red-50 border-red-200'
                    : isDark
                      ? 'bg-yellow-900/20 border-yellow-500/30'
                      : 'bg-yellow-50 border-yellow-200'
                } border`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        alert.severity === 'danger'
                          ? 'bg-red-500/10'
                          : 'bg-yellow-500/10'
                      }`}
                    >
                      <Icon
                        className={
                          alert.severity === 'danger' ? 'text-red-500' : 'text-yellow-500'
                        }
                        size={24}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{alert.product}</h3>
                        <Badge
                          variant={alert.severity === 'danger' ? 'danger' : 'warning'}
                          size="sm"
                        >
                          {alert.type === 'low_stock'
                            ? 'Stock faible'
                            : alert.type === 'expired'
                              ? 'Expiré'
                              : 'Expire bientôt'}
                        </Badge>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'} mb-2`}>
                        {alert.message}
                      </p>
                      {alert.type === 'low_stock' && (
                        <div className="flex items-center gap-4 text-sm">
                          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                            Stock actuel: <strong>{alert.current}</strong>
                          </span>
                          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                            Minimum: <strong>{alert.minimum}</strong>
                          </span>
                        </div>
                      )}
                      {alert.expiryDate && (
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          Date d'expiration: {alert.expiryDate}
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Traiter
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

