'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string().min(6, 'La confirmation est requise'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordTokenPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('Token de réinitialisation manquant');
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await authApi.resetPassword(
        token,
        data.newPassword,
        data.confirmPassword
      );

      setSuccess(response.message || 'Mot de passe réinitialisé avec succès !');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la réinitialisation';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12" suppressHydrationWarning>
        <div className="w-full max-w-md" suppressHydrationWarning>
          <Card
            title="Réinitialisation du mot de passe"
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
          title="Réinitialisation du mot de passe"
          description="Entrez votre nouveau mot de passe"
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

          {!token ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Token de réinitialisation invalide ou manquant.
              </p>
              <Link
                href="/auth/forgot-password"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Demander un nouveau lien
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
              <Input
                label="Nouveau mot de passe"
                type="password"
                placeholder="••••••••"
                registration={register('newPassword')}
                error={errors.newPassword?.message}
                required
              />

              <Input
                label="Confirmer le mot de passe"
                type="password"
                placeholder="••••••••"
                registration={register('confirmPassword')}
                error={errors.confirmPassword?.message}
                required
              />

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Réinitialiser le mot de passe
              </Button>
            </form>
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

