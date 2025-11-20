'use client';

import Layout from '@/components/dashboard/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/contexts/ThemeContext';
import {
  User,
  Bell,
  Shield,
  Palette,
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        {/* Page Header */}
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Paramètres
          </h1>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
            Gérez vos préférences et configurations
          </p>
        </div>

        {/* Profile Settings */}
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <User size={20} className="text-[#24abe0]" />
            <h2
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Profil
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Nom complet
              </label>
              <Input
                defaultValue="Dr. Younes Alami"
                className={
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Email
              </label>
              <Input
                type="email"
                defaultValue="younes.alami@medynox.ma"
                className={
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Téléphone
              </label>
              <Input
                defaultValue="+212 6 12 34 56 78"
                className={
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              />
            </div>
            <Button className="mt-4">Enregistrer les modifications</Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell size={20} className="text-[#24abe0]" />
            <h2
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Notifications
            </h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className={`w-4 h-4 rounded text-[#24abe0] focus:ring-[#24abe0] ${
                  isDark
                    ? 'border-white/20 bg-white/5'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <span className={isDark ? 'text-white/80' : 'text-gray-700'}>
                Notifications par email
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className={`w-4 h-4 rounded text-[#24abe0] focus:ring-[#24abe0] ${
                  isDark
                    ? 'border-white/20 bg-white/5'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <span className={isDark ? 'text-white/80' : 'text-gray-700'}>
                Rappels de rendez-vous
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className={`w-4 h-4 rounded text-[#24abe0] focus:ring-[#24abe0] ${
                  isDark
                    ? 'border-white/20 bg-white/5'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <span className={isDark ? 'text-white/80' : 'text-gray-700'}>
                Alertes de stock faible
              </span>
            </label>
            <Button className="mt-4">Enregistrer les préférences</Button>
          </div>
        </Card>

        {/* Security */}
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield size={20} className="text-[#24abe0]" />
            <h2
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Sécurité
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Mot de passe actuel
              </label>
              <Input
                type="password"
                className={
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Nouveau mot de passe
              </label>
              <Input
                type="password"
                className={
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Confirmer le mot de passe
              </label>
              <Input
                type="password"
                className={
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              />
            </div>
            <Button className="mt-4">Changer le mot de passe</Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette size={20} className="text-[#24abe0]" />
            <h2
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Apparence
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                Thème
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="dark">Sombre</option>
                <option value="light">Clair</option>
              </select>
            </div>
            <p
              className={`text-sm ${
                isDark ? 'text-white/60' : 'text-gray-600'
              }`}
            >
              Vous pouvez aussi changer le thème depuis le bouton dans la barre
              supérieure.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
