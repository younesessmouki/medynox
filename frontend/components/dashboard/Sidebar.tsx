'use client';

import { useState } from 'react';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Receipt,
  Package,
  TrendingUp,
  UserCog,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Activity,
  BarChart3,
  UserPlus,
  FileText,
  History,
  CalendarDays,
  Plus,
  Clock,
  CreditCard,
  DollarSign,
  FilePlus,
  Shield,
  Stethoscope,
  AlertTriangle,
  Download,
  Briefcase,
  FileCheck,
  UserCircle,
  Building2,
  Bell,
  Palette,
  Pill,
  Video,
} from 'lucide-react';
import { MedynoxLogo } from './MedynoxLogo';
import { useTheme } from '@/contexts/ThemeContext';
import { useSidebar } from '@/contexts/SidebarContext';

interface MenuItem {
  icon: any;
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    submenu: [
      { label: 'Overview', href: '/dashboard' },
      { label: 'Activity', href: '/dashboard/activity' },
      { label: 'Statistics', href: '/dashboard/statistics' },
    ],
  },
  {
    icon: Users,
    label: 'Patients',
    href: '/dashboard/patients',
    submenu: [
      { label: 'Tous les patients', href: '/dashboard/patients' },
      { label: 'Ajouter un patient', href: '/dashboard/patients/new' },
      { label: 'Dossier médical', href: '/dashboard/patients/dossier' },
      { label: 'Historique des visites', href: '/dashboard/patients/historique' },
    ],
  },
  {
    icon: Calendar,
    label: 'Rendez-vous',
    href: '/dashboard/rendezvous',
    submenu: [
      { label: 'Calendrier', href: '/dashboard/rendezvous/calendrier' },
      { label: "Aujourd'hui", href: '/dashboard/rendezvous' },
      { label: 'Créer un rendez-vous', href: '/dashboard/rendezvous/new' },
      { label: 'Historique', href: '/dashboard/rendezvous/historique' },
    ],
  },
  {
    icon: Receipt,
    label: 'Facturation',
    href: '/dashboard/facturation',
    submenu: [
      { label: 'Factures', href: '/dashboard/facturation' },
      { label: 'Paiements', href: '/dashboard/facturation/paiements' },
      { label: 'Ajouter une facture', href: '/dashboard/facturation/new' },
      { label: 'Assurances', href: '/dashboard/facturation/assurances' },
    ],
  },
  {
    icon: Package,
    label: 'Stock',
    href: '/dashboard/stock',
    submenu: [
      { label: 'Liste du stock', href: '/dashboard/stock' },
      { label: 'Médicaments', href: '/dashboard/stock/medicaments' },
      { label: 'Matériel médical', href: '/dashboard/stock/materiel' },
      { label: 'Alertes de stock', href: '/dashboard/stock/alertes' },
    ],
  },
  {
    icon: TrendingUp,
    label: 'Recettes Journalières',
    href: '/dashboard/recettes',
    submenu: [
      { label: 'Résumé jour/semaine/mois', href: '/dashboard/recettes' },
      { label: 'Courbes & statistiques', href: '/dashboard/recettes/statistiques' },
      { label: 'Export PDF', href: '/dashboard/recettes/export' },
    ],
  },
  {
    icon: UserCog,
    label: 'Ressources Humaines',
    href: '/dashboard/rh',
    submenu: [
      { label: 'Employés', href: '/dashboard/rh' },
      { label: 'Ajouter un employé', href: '/dashboard/rh/new' },
      { label: 'Contrats', href: '/dashboard/rh/contrats' },
      { label: 'Pointage', href: '/dashboard/rh/pointage' },
    ],
  },
  {
    icon: Calendar,
    label: 'Agenda',
    href: '/dashboard/agenda',
    submenu: [
      { label: 'Calendrier', href: '/dashboard/agenda/calendar' },
      { label: 'Vue jour', href: '/dashboard/agenda' },
      { label: 'Nouveau RDV', href: '/dashboard/agenda/new' },
    ],
  },
  {
    icon: Pill,
    label: 'Ordonnances AI',
    href: '/dashboard/ordonnances',
    submenu: [
      { label: 'Nouvelle ordonnance', href: '/dashboard/ordonnances/new' },
      { label: 'Historique', href: '/dashboard/ordonnances/history' },
    ],
  },
  {
    icon: FileText,
    label: 'OCR Extraction',
    href: '/dashboard/ocr',
    submenu: [
      { label: 'Extraction', href: '/dashboard/ocr' },
      { label: 'Upload document', href: '/dashboard/ocr/upload' },
    ],
  },
  {
    icon: Stethoscope,
    label: 'DME Intelligent',
    href: '/dashboard/dme',
    submenu: [
      { label: 'Liste des dossiers', href: '/dashboard/dme' },
    ],
  },
  {
    icon: Activity,
    label: 'Analyses IA',
    href: '/dashboard/analyses',
    submenu: [
      { label: 'Upload analyse', href: '/dashboard/analyses/upload' },
    ],
  },
  {
    icon: Building2,
    label: 'Multi-Cabinets',
    href: '/dashboard/cabinets',
    submenu: [
      { label: 'Vue globale', href: '/dashboard/cabinets' },
      { label: 'Performance', href: '/dashboard/cabinets/performance' },
    ],
  },
  {
    icon: Bell,
    label: 'Notifications',
    href: '/dashboard/notifications',
  },
  {
    icon: Activity,
    label: 'Chat Interne',
    href: '/dashboard/chat',
  },
  {
    icon: Activity,
    label: 'Supervision',
    href: '/dashboard/supervision',
    submenu: [
      { label: 'Vue d\'ensemble', href: '/dashboard/supervision' },
      { label: 'Salles', href: '/dashboard/supervision/rooms' },
      { label: 'Vue Live', href: '/dashboard/supervision/live' },
    ],
  },
  {
    icon: Shield,
    label: 'Assurances',
    href: '/dashboard/assurances',
    submenu: [
      { label: 'Liste', href: '/dashboard/assurances' },
      { label: 'Nouveau dossier', href: '/dashboard/assurances/new' },
    ],
  },
  {
    icon: FileText,
    label: 'Reporting Ministère',
    href: '/dashboard/reporting/ministere',
  },
  {
    icon: TrendingUp,
    label: 'Marketing',
    href: '/dashboard/marketing',
    submenu: [
      { label: 'Campagnes', href: '/dashboard/marketing' },
      { label: 'Nouvelle campagne', href: '/dashboard/marketing/new' },
    ],
  },
  {
    icon: FileCheck,
    label: 'Audit Log',
    href: '/dashboard/audit',
  },
  {
    icon: Users,
    label: 'Salle d\'attente',
    href: '/dashboard/waiting-room',
  },
  {
    icon: FileText,
    label: 'Documents',
    href: '/dashboard/documents',
    submenu: [
      { label: 'Liste', href: '/dashboard/documents' },
      { label: 'Upload', href: '/dashboard/documents/upload' },
    ],
  },
  {
    icon: Activity,
    label: 'Notes vocales',
    href: '/dashboard/voice-notes',
  },
  {
    icon: Video,
    label: 'Téléconsultation',
    href: '/dashboard/teleconsultation',
  },
  {
    icon: CreditCard,
    label: 'Paiements',
    href: '/dashboard/payments',
    submenu: [
      { label: 'Historique', href: '/dashboard/payments' },
      { label: 'Nouveau paiement', href: '/dashboard/payments/new' },
    ],
  },
  {
    icon: Settings,
    label: 'Paramètres',
    href: '/dashboard/settings',
    submenu: [
      { label: 'Profil du médecin', href: '/dashboard/settings' },
      { label: 'Configuration cabinet', href: '/dashboard/settings/cabinet' },
      { label: 'Préférences', href: '/dashboard/settings/preferences' },
      { label: 'Notifications', href: '/dashboard/settings/notifications' },
      { label: 'Rôles & Permissions', href: '/dashboard/settings/roles' },
    ],
  },
];

export function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  // Auto-open parent section if current route is in a submenu
  // This runs once on mount and when pathname changes
  React.useEffect(() => {
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isInSubmenu = item.submenu.some(
          (subItem) => pathname === subItem.href || pathname.startsWith(subItem.href + '/')
        );
        if (isInSubmenu) {
          setOpenSubmenus((prev) => {
            const newSet = new Set(prev);
            newSet.add(item.label);
            return newSet;
          });
        }
      }
    });
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => {
      const newOpen = new Set(prev);
      if (newOpen.has(label)) {
        newOpen.delete(label);
      } else {
        newOpen.add(label);
      }
      return newOpen;
    });
  };

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg backdrop-blur-xl border transition-colors ${
          isDark
            ? 'bg-white/5 border-white/10 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-900'
        }`}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0 left-0
          h-screen
          border-r
          transition-all duration-300
          z-40
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${
            isDark
              ? 'bg-[#0A0A0A] border-white/10'
              : 'bg-white border-gray-200 shadow-lg'
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`p-4 lg:p-6 border-b ${
              isDark ? 'border-white/10' : 'border-gray-200'
            } ${isCollapsed ? 'relative' : ''}`}
          >
            <div
              className={`flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
            >
              <MedynoxLogo collapsed={isCollapsed} />
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? 'Développer le menu' : 'Réduire le menu'}
                className={`hidden lg:block p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'hover:bg-white/5 text-white/60 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              const isSubmenuOpen = openSubmenus.has(item.label);
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.label}>
                  {hasSubmenu && !isCollapsed ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`
                          w-full flex items-center justify-between gap-3
                          px-4 py-3 rounded-xl
                          transition-all duration-300
                          ${
                            isActive
                              ? isDark
                                ? 'bg-[#24abe0]/20 text-[#24abe0] border border-[#24abe0]/30'
                                : 'bg-[#24abe0]/10 text-[#24abe0] border border-[#24abe0]/20'
                              : isDark
                                ? 'text-white/60 hover:text-white hover:bg-white/5'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {isSubmenuOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                      {isSubmenuOpen && (
                        <div
                          className={`ml-4 mt-1 space-y-1 border-l pl-4 ${
                            isDark ? 'border-white/10' : 'border-gray-200'
                          }`}
                        >
                          {item.submenu?.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsMobileOpen(false)}
                                // Don't close submenu on navigation - keep it open
                                className={`
                                  flex items-center gap-2
                                  px-3 py-2 rounded-lg
                                  text-sm
                                  transition-all duration-300
                                  ${
                                    isSubActive
                                      ? isDark
                                        ? 'bg-[#24abe0]/20 text-[#24abe0]'
                                        : 'bg-[#24abe0]/10 text-[#24abe0]'
                                      : isDark
                                        ? 'text-white/50 hover:text-white hover:bg-white/5'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                  }
                                `}
                              >
                                <span>{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center gap-3
                        px-4 py-3 rounded-xl
                        transition-all duration-300
                        ${
                          isActive
                            ? isDark
                              ? 'bg-[#24abe0]/20 text-[#24abe0] border border-[#24abe0]/30'
                              : 'bg-[#24abe0]/10 text-[#24abe0] border border-[#24abe0]/20'
                            : isDark
                              ? 'text-white/60 hover:text-white hover:bg-white/5'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon size={20} />
                      {!isCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div
            className={`p-4 border-t ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            {!isCollapsed && (
              <p
                className={`text-xs text-center ${
                  isDark ? 'text-white/40' : 'text-gray-400'
                }`}
              >
                © 2025 Medynox
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className={`lg:hidden fixed inset-0 backdrop-blur-sm z-30 ${
            isDark ? 'bg-black/50' : 'bg-black/20'
          }`}
        />
      )}
    </>
  );
}
