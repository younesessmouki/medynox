'use client';

import { useState, useEffect } from 'react';
import { db, PendingRequest } from '@/lib/offline/db';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { useLiveQuery } from 'dexie-react-hooks';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RefreshCw, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function SyncStatusPanel() {
  const { isOnline } = useOfflineStatus();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const pendingRequests = useLiveQuery(
    () => db.pending_requests.where('status').anyOf(['pending', 'syncing']).toArray(),
    []
  ) || [];

  const syncedRequests = useLiveQuery(
    () => db.pending_requests.where('status').equals('synced').reverse().limit(5).toArray(),
    []
  ) || [];

  useEffect(() => {
    if (isOnline && pendingRequests.length > 0) {
      handleSync();
    }
  }, [isOnline, pendingRequests.length]);

  useEffect(() => {
    const handleOnlineSync = () => {
      if (isOnline) {
        handleSync();
      }
    };
    window.addEventListener('online-sync', handleOnlineSync);
    return () => window.removeEventListener('online-sync', handleOnlineSync);
  }, [isOnline]);

  const handleSync = async () => {
    if (!isOnline || isSyncing || pendingRequests.length === 0) return;

    setIsSyncing(true);
    const toSync = pendingRequests.filter((r) => r.status === 'pending');

    for (const request of toSync) {
      try {
        // Mark as syncing
        await db.pending_requests.update(request.id!, { status: 'syncing' });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mark as synced
        await db.pending_requests.update(request.id!, { status: 'synced' });

        // Remove after 5 seconds
        setTimeout(async () => {
          await db.pending_requests.delete(request.id!);
        }, 5000);
      } catch (error) {
        await db.pending_requests.update(request.id!, { status: 'error' });
      }
    }

    setIsSyncing(false);
  };

  const getEntityLabel = (entity: string) => {
    const labels: Record<string, string> = {
      patient: 'Patient',
      consultation: 'Consultation',
      appointment: 'Rendez-vous',
      ordonnance: 'Ordonnance',
    };
    return labels[entity] || entity;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      create: 'Création',
      update: 'Modification',
      delete: 'Suppression',
    };
    return labels[type] || type;
  };

  if (!isOpen && pendingRequests.length === 0) return null;

  return (
    <>
      {/* Floating Button */}
      {pendingRequests.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all ${
            isDark
              ? 'bg-[#24abe0] hover:bg-[#24abe0]/80 text-white'
              : 'bg-[#24abe0] hover:bg-[#24abe0]/90 text-white'
          }`}
        >
          <div className="relative">
            <RefreshCw size={24} className={isSyncing ? 'animate-spin' : ''} />
            {pendingRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </div>
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-96 max-h-[600px] rounded-xl shadow-2xl border ${
            isDark
              ? 'bg-[#1E1E1E] border-white/10'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Synchronisation</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                {pendingRequests.length} élément(s) en attente
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
            {/* Pending Items */}
            {pendingRequests.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-yellow-500" />
                  En attente
                </h4>
                <div className="space-y-2">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`p-3 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">
                          {getTypeLabel(request.type)} — {getEntityLabel(request.entity)}
                        </span>
                        <Badge
                          variant={request.status === 'syncing' ? 'warning' : 'default'}
                          size="sm"
                        >
                          {request.status === 'syncing' ? 'Synchronisation...' : 'En attente'}
                        </Badge>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                        {new Date(request.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synced Items */}
            {syncedRequests.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Synchronisé
                </h4>
                <div className="space-y-2">
                  {syncedRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`p-3 rounded-lg border ${
                        isDark
                          ? 'bg-green-900/20 border-green-500/30'
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">
                          {getTypeLabel(request.type)} — {getEntityLabel(request.entity)}
                        </span>
                        <Badge variant="success" size="sm">
                          Synchronisé
                        </Badge>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                        {new Date(request.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pendingRequests.length === 0 && syncedRequests.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle
                  className={`mx-auto mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}
                  size={48}
                />
                <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                  Tout est synchronisé
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          {pendingRequests.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <Button
                onClick={handleSync}
                disabled={!isOnline || isSyncing}
                className="w-full gap-2"
              >
                <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                {isSyncing ? 'Synchronisation...' : 'Synchroniser maintenant'}
              </Button>
              {!isOnline && (
                <p className={`text-xs text-center mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Mode hors-ligne — Synchronisation automatique à la reconnexion
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

