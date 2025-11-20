'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi, RegisterDoctorRequest } from '@/lib/api/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';

// Validation schema with all required fields
const registerSchema = z
  .object({
    // Personal Information
    firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    phone: z.string().min(10, 'Numéro de téléphone invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string().min(6, 'La confirmation est requise'),
    birthDate: z.string().min(1, 'Date de naissance requise'),
    gender: z.enum(['Male', 'Female'], { message: 'Genre requis' }),

    // Professional Information
    mainSpecialty: z.string().min(1, 'Spécialité principale requise'),
    secondarySpecialties: z.array(z.string()).optional(),
    orderNumber: z.string().min(1, 'Numéro d\'ordre requis'),
    experienceYears: z.number().min(0, 'Années d\'expérience invalides'),
    bio: z.string().min(10, 'La biographie doit contenir au moins 10 caractères'),

    // Cabinet Information
    cabinetName: z.string().min(2, 'Nom du cabinet requis'),
    address: z.string().min(5, 'Adresse requise'),
    city: z.string().min(2, 'Ville requise'),
    postalCode: z.string().min(4, 'Code postal invalide'),
    cabinetPhone: z.string().min(10, 'Téléphone du cabinet invalide'),
    establishmentType: z.enum(['cabinet', 'clinique', 'centre médical'], {
      message: 'Type d\'établissement requis',
    }),
    cabinetLogo: z.instanceof(File).optional(),

    // Administrative Information
    ice: z.string().min(1, 'ICE requis'),
    if: z.string().min(1, 'IF requis'),
    cnss: z.string().optional(),
    rib: z.string().optional(),

    // Preferences
    language: z.string().min(1, 'Langue requise').refine(
      (val) => ['fr', 'ar', 'en'].includes(val),
      { message: 'Langue requise' }
    ),
    timezone: z.string().default('Africa/Casablanca'),
    notifications: z.object({
      email: z.boolean(),
      sms: z.boolean(),
      whatsapp: z.boolean(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// Specialty options
const specialties = [
  { value: 'cardiologie', label: 'Cardiologie' },
  { value: 'dermatologie', label: 'Dermatologie' },
  { value: 'généraliste', label: 'Médecine Générale' },
  { value: 'pédiatrie', label: 'Pédiatrie' },
  { value: 'gynécologie', label: 'Gynécologie' },
  { value: 'orthopédie', label: 'Orthopédie' },
  { value: 'neurologie', label: 'Neurologie' },
  { value: 'ophtalmologie', label: 'Ophtalmologie' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      language: 'fr',
      timezone: 'Africa/Casablanca',
      notifications: {
        email: true,
        sms: false,
        whatsapp: false,
      },
      secondarySpecialties: [],
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Exclude cabinetLogo file from request (handle file upload separately later)
      const { cabinetLogo, ...registrationData } = data;
      
      const request: RegisterDoctorRequest = {
        ...registrationData,
        secondarySpecialties: data.secondarySpecialties || [],
        // cabinetLogo will be handled separately if needed
      };

      const response = await authApi.register(request);

      setSuccess(response.message || 'Inscription réussie ! Vérifiez votre email pour activer votre compte.');

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de l\'inscription';
      setError(errorMessage);
      // Scroll to top to show error
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextSection = () => {
    if (currentSection < 5) {
      setCurrentSection(currentSection + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const selectedSecondarySpecialties = watch('secondarySpecialties') || [];
  const timezoneValue = watch('timezone') || 'Africa/Casablanca';
  const languageValue = watch('language') || 'fr';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4" suppressHydrationWarning>
      <div className="max-w-4xl mx-auto" suppressHydrationWarning>
        <Card
          title="Inscription - Médecin"
          description="Créez votre compte Medynox"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((section) => (
                <div
                  key={section}
                  className={`flex-1 h-2 mx-1 rounded ${
                    section <= currentSection
                      ? 'bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Personnel</span>
              <span>Médical</span>
              <span>Cabinet</span>
              <span>Administratif</span>
              <span>Préférences</span>
            </div>
          </div>

          {error && mounted && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}

          {success && mounted && (
            <Alert
              type="success"
              message={success}
            />
          )}

          {mounted && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
            {/* Section 1: Personal Information */}
            {currentSection === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Informations Personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    registration={registerField('firstName')}
                    error={errors.firstName?.message}
                    required
                  />
                  <Input
                    label="Nom"
                    registration={registerField('lastName')}
                    error={errors.lastName?.message}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="votre@email.com"
                  registration={registerField('email')}
                  error={errors.email?.message}
                  required
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  registration={registerField('phone')}
                  error={errors.phone?.message}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Mot de passe"
                    type="password"
                    autoComplete="new-password"
                    registration={registerField('password')}
                    error={errors.password?.message}
                    required
                  />
                  <Input
                    label="Confirmer le mot de passe"
                    type="password"
                    autoComplete="new-password"
                    registration={registerField('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Date de naissance"
                    type="date"
                    registration={registerField('birthDate')}
                    error={errors.birthDate?.message}
                    required
                  />
                  <Select
                    label="Genre"
                    options={[
                      { value: 'Male', label: 'Homme' },
                      { value: 'Female', label: 'Femme' },
                    ]}
                    placeholder="Sélectionner un genre"
                    registration={registerField('gender')}
                    error={errors.gender?.message}
                    required
                  />
                </div>
              </div>
            )}

            {/* Section 2: Professional Information */}
            {currentSection === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Informations Professionnelles</h3>
                <Select
                  label="Spécialité principale"
                  options={specialties}
                  placeholder="Sélectionner une spécialité"
                  registration={registerField('mainSpecialty')}
                  error={errors.mainSpecialty?.message}
                  required
                />
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Spécialités secondaires (optionnel)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {specialties.map((specialty) => (
                      <Checkbox
                        key={specialty.value}
                        label={specialty.label}
                        checked={selectedSecondarySpecialties.includes(specialty.value)}
                        onChange={(e) => {
                          const current = selectedSecondarySpecialties;
                          if (e.target.checked) {
                            setValue('secondarySpecialties', [...current, specialty.value]);
                          } else {
                            setValue(
                              'secondarySpecialties',
                              current.filter((s: string) => s !== specialty.value)
                            );
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Input
                  label="Numéro d'ordre (Conseil de l'Ordre)"
                  registration={registerField('orderNumber')}
                  error={errors.orderNumber?.message}
                  required
                />
                <Input
                  label="Années d'expérience"
                  type="number"
                  min="0"
                  registration={registerField('experienceYears', { valueAsNumber: true })}
                  error={errors.experienceYears?.message}
                  required
                />
                <Textarea
                  label="Biographie"
                  placeholder="Décrivez votre parcours professionnel..."
                  registration={registerField('bio')}
                  error={errors.bio?.message}
                  required
                />
              </div>
            )}

            {/* Section 3: Cabinet Information */}
            {currentSection === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Informations du Cabinet</h3>
                <Input
                  label="Nom du cabinet"
                  registration={registerField('cabinetName')}
                  error={errors.cabinetName?.message}
                  required
                />
                <Input
                  label="Adresse"
                  registration={registerField('address')}
                  error={errors.address?.message}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Ville"
                    registration={registerField('city')}
                    error={errors.city?.message}
                    required
                  />
                  <Input
                    label="Code postal"
                    registration={registerField('postalCode')}
                    error={errors.postalCode?.message}
                    required
                  />
                </div>
                <Input
                  label="Téléphone du cabinet"
                  type="tel"
                  registration={registerField('cabinetPhone')}
                  error={errors.cabinetPhone?.message}
                  required
                />
                <Select
                  label="Type d'établissement"
                  options={[
                    { value: 'cabinet', label: 'Cabinet privé' },
                    { value: 'clinique', label: 'Clinique' },
                    { value: 'centre médical', label: 'Centre médical' },
                  ]}
                  placeholder="Sélectionner un type"
                  registration={registerField('establishmentType')}
                  error={errors.establishmentType?.message}
                  required
                />
                <div>
                  <label 
                    htmlFor="cabinetLogo"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
                  >
                    Logo du cabinet (optionnel)
                  </label>
                  <input
                    id="cabinetLogo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue('cabinetLogo', file);
                      }
                    }}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  />
                  {errors.cabinetLogo && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.cabinetLogo.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Section 4: Administrative Information */}
            {currentSection === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Informations Administratives</h3>
                <Input
                  label="ICE (Identifiant Commun de l'Entreprise)"
                  registration={registerField('ice')}
                  error={errors.ice?.message}
                  required
                />
                <Input
                  label="IF (Identifiant Fiscal)"
                  registration={registerField('if')}
                  error={errors.if?.message}
                  required
                />
                <Input
                  label="CNSS (optionnel)"
                  registration={registerField('cnss')}
                  error={errors.cnss?.message}
                />
                <Input
                  label="RIB (optionnel)"
                  registration={registerField('rib')}
                  error={errors.rib?.message}
                />
              </div>
            )}

            {/* Section 5: Preferences */}
            {currentSection === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Préférences du Compte</h3>
                <div className="w-full">
                  <label 
                    htmlFor="language"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
                  >
                    Langue
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="language"
                    {...registerField('language', { required: 'Langue requise' })}
                    value={languageValue}
                    className={`
                      w-full px-4 py-2.5 border rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-colors duration-200
                      bg-white dark:bg-gray-800 
                      text-gray-900 dark:text-gray-100
                      border-gray-300 dark:border-gray-700
                      ${errors.language ? 'border-red-500 dark:border-red-500' : ''}
                    `}
                  >
                    <option value="">Sélectionnez une langue</option>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </select>
                  {errors.language && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.language.message}</p>
                  )}
                </div>
                <Input
                  label="Fuseau horaire"
                  registration={registerField('timezone')}
                  value={timezoneValue}
                  disabled
                  helperText="Fuseau horaire par défaut pour le Maroc"
                />
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Préférences de notification
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      label="Notifications par email"
                      defaultChecked={true}
                      onChange={(e) =>
                        setValue('notifications.email', e.target.checked)
                      }
                    />
                    <Checkbox
                      label="Notifications par SMS"
                      onChange={(e) =>
                        setValue('notifications.sms', e.target.checked)
                      }
                    />
                    <Checkbox
                      label="Notifications par WhatsApp"
                      onChange={(e) =>
                        setValue('notifications.whatsapp', e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              {currentSection > 1 ? (
                <Button type="button" variant="outline" onClick={prevSection}>
                  Précédent
                </Button>
              ) : (
                <div />
              )}
              {currentSection < 5 ? (
                <Button type="button" onClick={nextSection}>
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  S'inscrire
                </Button>
              )}
            </div>
          </form>
          )}

          {!mounted && (
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          )}

          {mounted && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Déjà un compte ?{' '}
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

