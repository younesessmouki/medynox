'use client';

import { Search, Bell, User } from 'lucide-react';

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl border-b transition-colors bg-white/80 border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-4 lg:p-6">
        {/* Welcome text */}
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold text-gray-900">
            Bonjour Dr. Younes 👋
          </h2>
          <p className="text-sm text-gray-600">
            Bienvenue sur votre tableau de bord
          </p>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 focus:border-[#24abe0]/50 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl border transition-all bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600 hover:text-gray-900">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D32C2C] rounded-full"></span>
          </button>

          {/* User avatar */}
          <button className="flex items-center gap-2 p-2 rounded-xl border transition-all bg-gray-100 border-gray-200 hover:bg-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#24abe0] to-[#D32C2C] flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-900">
              Dr. Younes
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
