'use client';

import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const { isOnline } = useOfflineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-100 border-b border-yellow-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <WifiOff className="text-yellow-800" size={20} />
          <p className="font-medium text-yellow-900">
            Mode hors-ligne activé — Vos modifications seront synchronisées automatiquement
          </p>
        </div>
      </div>
    </div>
  );
}

export function OnlineBanner() {
  // Always return null - banner disabled
  return null;
}

