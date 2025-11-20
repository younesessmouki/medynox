'use client';

import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { Badge } from '@/components/ui/Badge';
import { WifiOff } from 'lucide-react';

interface OfflineBadgeProps {
  className?: string;
}

export function OfflineBadge({ className = '' }: OfflineBadgeProps) {
  const { isOffline } = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <Badge variant="warning" size="sm" className={`gap-1 ${className}`}>
      <WifiOff size={12} />
      Hors-ligne
    </Badge>
  );
}

