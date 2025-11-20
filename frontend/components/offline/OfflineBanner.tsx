'use client';

import { useState, useEffect } from 'react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { WifiOff, Wifi } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function OfflineBanner() {
  const { isOnline } = useOfflineStatus();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (isOnline) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? 'bg-yellow-900/90' : 'bg-yellow-100'
      } border-b ${
        isDark ? 'border-yellow-700' : 'border-yellow-300'
      } backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <WifiOff className={`${isDark ? 'text-yellow-400' : 'text-yellow-800'}`} size={20} />
          <p className={`font-medium ${isDark ? 'text-yellow-200' : 'text-yellow-900'}`}>
            Mode hors-ligne activé — Vos modifications seront synchronisées automatiquement
          </p>
        </div>
      </div>
    </div>
  );
}

export function OnlineBanner() {
  const { isOnline } = useOfflineStatus();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!show || !isOnline) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? 'bg-green-900/90' : 'bg-green-100'
      } border-b ${
        isDark ? 'border-green-700' : 'border-green-300'
      } backdrop-blur-sm animate-slide-down`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <Wifi className={`${isDark ? 'text-green-400' : 'text-green-800'}`} size={20} />
          <p className={`font-medium ${isDark ? 'text-green-200' : 'text-green-900'}`}>
            Mode en ligne — Synchronisation en cours...
          </p>
        </div>
      </div>
    </div>
  );
}

