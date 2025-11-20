'use client';

import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { WifiOff, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface OfflineOnlyMessageProps {
  message?: string;
  className?: string;
}

export function OfflineOnlyMessage({
  message = 'Cette fonctionnalité nécessite une connexion internet.',
  className = '',
}: OfflineOnlyMessageProps) {
  const { isOffline } = useOfflineStatus();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOffline) return null;

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark
          ? 'bg-yellow-900/20 border-yellow-500/30'
          : 'bg-yellow-50 border-yellow-200'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className={`mt-0.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}
          size={20}
        />
        <div>
          <p className={`font-medium mb-1 ${isDark ? 'text-yellow-200' : 'text-yellow-900'}`}>
            Mode hors-ligne
          </p>
          <p className={`text-sm ${isDark ? 'text-yellow-300/80' : 'text-yellow-800'}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

