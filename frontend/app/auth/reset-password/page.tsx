'use client';

import { useState, useEffect } from 'react';
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
const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide').min(1, 'Email requis'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ResetPasswordPage() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await authApi.forgotPassword(data.email);
      setSuccess(response.message || 'Email de réinitialisation envoyé avec succès !');
      setEmailSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de l\'envoi de l\'email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12" suppressHydrationWarning>
        <div className="w-full max-w-md" suppressHydrationWarning>
          <Card
            title="Email envoyé"
            description="Vérifiez votre boîte de réception"
          >
            <Alert
              type="success"
              message={success || 'Nous avons envoyé un email avec les instructions pour réinitialiser votre mot de passe.'}
            />

            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Si vous ne recevez pas l'email, vérifiez votre dossier spam ou réessayez.
              </p>
              <Link
                href="/auth/login"
                className="block text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Retour à la connexion
              </Link>
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
          title="Mot de passe oublié"
          description="Entrez votre email pour recevoir un lien de réinitialisation"
        >
          {error && mounted && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}

          {mounted && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              registration={register('email')}
              error={errors.email?.message}
              required
            />

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Envoyer l'email de réinitialisation
            </Button>
          </form>
          )}

          {!mounted && (
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          )}

          {mounted && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link
                href="/auth/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
          )}
        </Card>
      </div>
    </div>
  );
}

