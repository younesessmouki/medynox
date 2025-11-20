'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { authApi } from '@/lib/api/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Checkbox } from '@/components/ui/Checkbox';

// ----------------------------
// VALIDATION SCHEMA
// ----------------------------
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ----------------------------
  // FIX HYDRATION
  // ----------------------------
  useEffect(() => {
    setMounted(true);
  }, []); // Empty dependency array - only run once on mount

  // ----------------------------
  // FORM
  // ----------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  // ----------------------------
  // SUBMIT
  // ----------------------------
  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setIsLoading(true);

    try {
      await authApi.login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      router.replace('/dashboard');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Erreur de connexion';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------
  // RENDER
  // ----------------------------
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Chargement...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12" suppressHydrationWarning>
      <div className="w-full max-w-md">
        <Card
          title="Connexion"
          description="Connectez-vous à votre compte Medynox"
        >
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="medecin@email.com"
              registration={register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              registration={register('password')}
              error={errors.password?.message}
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="Se souvenir de moi"
                registration={register('rememberMe')}
              />

              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pas encore de compte ?{' '}
              <Link
                href="/auth/register"
                className="text-blue-600 font-medium hover:underline dark:text-blue-400"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
