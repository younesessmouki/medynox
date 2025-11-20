'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';

interface WithAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { redirectTo = '/auth/login', requireAuth = true } = options;

  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      setMounted(true);
      checkAuth();
    }, []);

    const checkAuth = async () => {
      try {
        const { authenticated } = await authApi.checkAuth();
        setIsAuthenticated(authenticated);
        
        if (requireAuth && !authenticated) {
          router.push(redirectTo);
        } else if (!requireAuth && authenticated) {
          router.push('/dashboard');
        }
      } catch {
        setIsAuthenticated(false);
        if (requireAuth) {
          router.push(redirectTo);
        }
      }
    };

    if (!mounted || isAuthenticated === null) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (requireAuth && !isAuthenticated) {
      return null;
    }

    if (!requireAuth && isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

