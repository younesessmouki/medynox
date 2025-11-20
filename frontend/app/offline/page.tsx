'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  WifiOff,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Calendar,
  Pill,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

export default function OfflinePage() {
  const { theme } = useTheme();
  const { isOffline } = useOfflineStatus();
  const isDark = theme === 'dark';

  const offlineFeatures = [
    {
      icon: Users,
      title: 'Gestion des patients',
      description: 'Ajouter, modifier et consulter les dossiers patients',
      available: true,
    },
    {
      icon: Calendar,
      title: 'Agenda médical',
      description: 'Créer et gérer les rendez-vous',
      available: true,
    },
    {
      icon: FileText,
      title: 'Consultations',
      description: 'Rédiger des notes de consultation',
      available: true,
    },
    {
      icon: Pill,
      title: 'Ordonnances',
      description: 'Créer et modifier les ordonnances',
      available: true,
    },
    {
      icon: Clock,
      title: 'Synchronisation automatique',
      description: 'Toutes les modifications seront synchronisées à la reconnexion',
      available: true,
    },
  ];

  const troubleshooting = [
    {
      issue: 'Les modifications ne s\'enregistrent pas',
      solution: 'Vérifiez que vous êtes bien en mode hors-ligne. Les données sont sauvegardées localement.',
    },
    {
      issue: 'La synchronisation ne fonctionne pas',
      solution: 'Assurez-vous d\'avoir une connexion internet stable. La synchronisation se fait automatiquement.',
    },
    {
      issue: 'Certaines fonctionnalités ne sont pas disponibles',
      solution: 'Certaines fonctionnalités nécessitent une connexion internet. Elles seront disponibles à la reconnexion.',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Mode hors-ligne' },
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
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`p-4 rounded-lg ${
                isDark ? 'bg-yellow-900/20' : 'bg-yellow-100'
              }`}
            >
              <WifiOff className={isDark ? 'text-yellow-400' : 'text-yellow-600'} size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Mode hors-ligne</h1>
              <Badge variant={isOffline ? 'warning' : 'success'} size="sm" className="gap-2">
                {isOffline ? (
                  <>
                    <WifiOff size={12} />
                    Actuellement hors-ligne
                  </>
                ) : (
                  <>
                    <CheckCircle size={12} />
                    En ligne
                  </>
                )}
              </Badge>
            </div>
          </div>
          <p className={isDark ? 'text-white/70' : 'text-gray-700'}>
            Medynox fonctionne en mode hors-ligne. Toutes vos modifications sont sauvegardées
            localement et seront synchronisées automatiquement lorsque vous serez de nouveau
            connecté.
          </p>
        </div>

        {/* Features Available Offline */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Fonctionnalités disponibles hors-ligne</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offlineFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`${
                    isDark ? 'bg-white/5' : 'bg-white'
                  } border ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-3 rounded-lg ${
                          isDark ? 'bg-[#24abe0]/10' : 'bg-[#24abe0]/10'
                        }`}
                      >
                        <Icon className="text-[#24abe0]" size={24} />
                      </div>
                      {feature.available && (
                        <Badge variant="success" size="sm">
                          Disponible
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="text-[#24abe0]" size={24} />
              Comment ça fonctionne
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#24abe0] text-white flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sauvegarde locale</h3>
                  <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                    Toutes vos modifications sont immédiatement sauvegardées dans votre navigateur
                    (IndexedDB).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#24abe0] text-white flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">File d'attente de synchronisation</h3>
                  <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                    Les modifications sont ajoutées à une file d'attente et marquées comme
                    "en attente de synchronisation".
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#24abe0] text-white flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Synchronisation automatique</h3>
                  <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                    Dès que vous êtes de nouveau en ligne, toutes les modifications sont
                    automatiquement synchronisées avec le serveur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Troubleshooting */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="text-[#D32C2C]" size={24} />
              Dépannage
            </h2>
            <div className="space-y-4">
              {troubleshooting.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <h3 className="font-semibold mb-2">{item.issue}</h3>
                  <p className={isDark ? 'text-white/60' : 'text-gray-600'}>{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

