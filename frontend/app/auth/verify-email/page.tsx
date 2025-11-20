'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '@/lib/api/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

// Validation schema
const verifyEmailSchema = z.object({
  code: z.string().length(6, 'Le code doit contenir 6 chiffres'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTokenVerification = async (verifyToken: string) => {
    try {
      const response = await authApi.verifyEmail(verifyToken);
      setSuccess(response.message || 'Email vérifié avec succès !');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.response?.data || err.message || 'Erreur lors de la vérification';
      setError(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-verify if token is in URL
  useEffect(() => {
    if (mounted && token && !email) {
      setIsVerifying(true);
      handleTokenVerification(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, token, email]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // If we have a token from URL, use it; otherwise use the code
      if (token) {
        await handleTokenVerification(token);
      } else {
        // If backend accepts code-based verification
        setError('Veuillez utiliser le lien de vérification envoyé par email');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de la vérification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Email non disponible. Veuillez vous réinscrire.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.requestVerificationEmail(email);
      setSuccess(response.message || 'Email de vérification renvoyé avec succès !');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de l\'envoi de l\'email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying && mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4" suppressHydrationWarning>
        <Card>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Vérification en cours...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12" suppressHydrationWarning>
        <div className="w-full max-w-md" suppressHydrationWarning>
          <Card
            title="Vérification de l'email"
            description="Chargement..."
          >
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12" suppressHydrationWarning>
      <div className="w-full max-w-md" suppressHydrationWarning>
        <Card
          title="Vérification de l'email"
          description={token ? 'Vérification automatique en cours...' : 'Entrez le code de vérification envoyé à votre email'}
        >
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}

          {success && (
            <Alert
              type="success"
              message={success}
            />
          )}

          {token ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Votre email est en cours de vérification...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
              <Input
                label="Code de vérification"
                placeholder="000000"
                maxLength={6}
                registration={register('code')}
                error={errors.code?.message}
                required
              />

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Vérifier
              </Button>
            </form>
          )}

          {email && (
            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleResendVerification}
                disabled={isLoading}
              >
                Renvoyer l'email de vérification
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/auth/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Retour à la connexion
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

