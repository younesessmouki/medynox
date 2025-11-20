'use client';

import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-colors ${
        isDark
          ? 'bg-[#0A0A0A]/80 border-white/10'
          : 'bg-white/80 border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between p-4 lg:p-6">
        {/* Welcome text */}
        <div className="hidden md:block">
          <h2
            className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Bonjour Dr. Younes 👋
          </h2>
          <p
            className={`text-sm ${
              isDark ? 'text-white/60' : 'text-gray-600'
            }`}
          >
            Bienvenue sur votre tableau de bord
          </p>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-white/40' : 'text-gray-400'
              }`}
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 focus:border-[#24abe0]/50 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-white/40'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60 hover:text-white'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
            }`}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button
            className={`relative p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60 hover:text-white'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D32C2C] rounded-full"></span>
          </button>

          {/* User avatar */}
          <button
            className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#24abe0] to-[#D32C2C] flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <span
              className={`hidden md:block text-sm font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Dr. Younes
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
