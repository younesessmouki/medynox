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
  // {
  //   icon: Pill,
  //   label: 'Ordonnances AI',
  //   href: '/dashboard/ordonnances',
  //   submenu: [
  //     { label: 'Nouvelle ordonnance', href: '/dashboard/ordonnances/new' },
  //     { label: 'Historique', href: '/dashboard/ordonnances/history' },
  //   ],
  // },
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
  // {
  //   icon: Activity,
  //   label: 'Analyses IA',
  //   href: '/dashboard/analyses',
  //   submenu: [
  //     { label: 'Upload analyse', href: '/dashboard/analyses/upload' },
  //   ],
  // },
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
  // {
  //   icon: Activity,
  //   label: 'Supervision',
  //   href: '/dashboard/supervision',
  //   submenu: [
  //     { label: 'Vue d\'ensemble', href: '/dashboard/supervision' },
  //     { label: 'Salles', href: '/dashboard/supervision/rooms' },
  //     { label: 'Vue Live', href: '/dashboard/supervision/live' },
  //   ],
  // },
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
  // {
  //   icon: Activity,
  //   label: 'Notes vocales',
  //   href: '/dashboard/voice-notes',
  // },
  // {
  //   icon: Video,
  //   label: 'Téléconsultation',
  //   href: '/dashboard/teleconsultation',
  // },
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
  const navRef = React.useRef<HTMLElement>(null);
  const scrollPositionRef = React.useRef<number>(0);
  const isRestoringScrollRef = React.useRef<boolean>(false);

  // Restore open submenus from sessionStorage on mount
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem('sidebar-open-submenus');
      if (saved) {
        const savedSet = new Set<string>(JSON.parse(saved));
        setOpenSubmenus(savedSet);
      }
    } catch (error) {
      // Ignore storage errors
    }
  }, []);

  // Save open submenus to sessionStorage whenever they change
  React.useEffect(() => {
    try {
      sessionStorage.setItem(
        'sidebar-open-submenus',
        JSON.stringify(Array.from(openSubmenus))
      );
    } catch (error) {
      // Ignore storage errors
    }
  }, [openSubmenus]);

  // Save scroll position to sessionStorage
  const handleScroll = React.useCallback(() => {
    if (navRef.current && !isRestoringScrollRef.current) {
      const scrollTop = navRef.current.scrollTop;
      scrollPositionRef.current = scrollTop;
      try {
        sessionStorage.setItem('sidebar-scroll', scrollTop.toString());
      } catch (error) {
        // Handle storage errors (e.g., private mode)
        console.warn('Failed to save sidebar scroll position:', error);
      }
    }
  }, []);

  // Restore scroll position from sessionStorage on mount
  React.useEffect(() => {
    if (navRef.current) {
      isRestoringScrollRef.current = true;
      try {
        const saved = sessionStorage.getItem('sidebar-scroll');
        if (saved) {
          const scrollTop = Number(saved);
          scrollPositionRef.current = scrollTop;
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            if (navRef.current) {
              navRef.current.scrollTop = scrollTop;
            }
            isRestoringScrollRef.current = false;
          });
        } else {
          isRestoringScrollRef.current = false;
        }
      } catch (error) {
        isRestoringScrollRef.current = false;
      }
    }
  }, []);

  // Preserve scroll position on pathname change
  React.useEffect(() => {
    if (navRef.current && !isRestoringScrollRef.current) {
      const savedPosition = scrollPositionRef.current;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (navRef.current && savedPosition > 0) {
            navRef.current.scrollTop = savedPosition;
          }
        });
      });
    }
  }, [pathname]);

  const toggleSubmenu = React.useCallback(
    (label: string, event?: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent default behavior that might cause scroll
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Preserve scroll position before state change
      const navElement = navRef.current;
      const scrollPosition = navElement?.scrollTop || scrollPositionRef.current;

      setOpenSubmenus((prev) => {
        const newOpen = new Set(prev);
        if (newOpen.has(label)) {
          newOpen.delete(label);
        } else {
          newOpen.add(label);
        }
        return newOpen;
      });

      // Restore scroll position after DOM update
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (navElement) {
            isRestoringScrollRef.current = true;
            navElement.scrollTop = scrollPosition;
            scrollPositionRef.current = scrollPosition;
            requestAnimationFrame(() => {
              isRestoringScrollRef.current = false;
            });
          }
        });
      });
    },
    []
  );

  // Memoize isActiveRoute to prevent unnecessary re-renders
  const isActiveRoute = React.useCallback(
    (href?: string) => {
      if (!href) return false;
      if (href === '/dashboard') {
        return pathname === '/dashboard';
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Handle link clicks - preserve scroll
  const handleLinkClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Save current scroll position before navigation
    if (navRef.current) {
      scrollPositionRef.current = navRef.current.scrollTop;
      try {
        sessionStorage.setItem('sidebar-scroll', scrollPositionRef.current.toString());
      } catch (error) {
        // Ignore storage errors
      }
    }
    setIsMobileOpen(false);
    // Don't prevent default - allow navigation
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg backdrop-blur-xl border transition-all duration-200 bg-black/90 border-white/10 text-white hover:bg-black hover:border-white/20 hover:scale-105 active:scale-95 shadow-lg"
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
          transition-all duration-300 ease-in-out
          z-40
          ${isCollapsed ? 'w-28' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-white/10 shadow-2xl
          backdrop-blur-xl
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div
            className={`
              relative
              p-5 lg:p-6 
              border-b border-white/10 
              bg-gradient-to-r from-white/5 to-transparent
              ${isCollapsed ? 'px-3' : ''}
            `}
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
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95 text-white/70 hover:text-white border border-white/5 hover:border-white/10"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav
            ref={navRef}
            onScroll={handleScroll}
            className="flex-1 p-3 lg:p-4 space-y-0.5 overflow-y-auto custom-scrollbar"
          >
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
                        type="button"
                        onClick={(e) => toggleSubmenu(item.label, e)}
                        className={`
                          group w-full flex items-center justify-between gap-3
                          px-4 py-2.5 rounded-lg
                          transition-all duration-200 ease-out
                          font-medium text-sm
                          ${
                            isActive
                              ? 'bg-[#24abe0]/15 text-[#24abe0] border border-[#24abe0]/20 shadow-sm shadow-[#24abe0]/10'
                              : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={18}
                            className={
                              isActive
                                ? 'text-[#24abe0]'
                                : isCollapsed
                                ? 'text-white'
                                : 'text-white/70 group-hover:text-white'
                            }
                            style={
                              isCollapsed && !isActive
                                ? { stroke: '#ffffff', color: '#ffffff', strokeWidth: 2 }
                                : isActive
                                ? { stroke: '#24abe0', color: '#24abe0', strokeWidth: 2.5 }
                                : { strokeWidth: 2 }
                            }
                          />
                          <span className="font-medium tracking-wide">{item.label}</span>
                        </div>
                        {isSubmenuOpen ? (
                          <ChevronDown
                            size={16}
                            className={
                              isActive
                                ? 'text-[#24abe0]'
                                : isCollapsed
                                ? 'text-white'
                                : 'text-white/60 group-hover:text-white'
                            }
                            style={
                              isCollapsed && !isActive
                                ? { stroke: '#ffffff', color: '#ffffff' }
                                : isActive
                                ? { stroke: '#24abe0', color: '#24abe0' }
                                : undefined
                            }
                          />
                        ) : (
                          <ChevronRight
                            size={16}
                            className={
                              isActive
                                ? 'text-[#24abe0]'
                                : isCollapsed
                                ? 'text-white'
                                : 'text-white/60 group-hover:text-white'
                            }
                            style={
                              isCollapsed && !isActive
                                ? { stroke: '#ffffff', color: '#ffffff' }
                                : isActive
                                ? { stroke: '#24abe0', color: '#24abe0' }
                                : undefined
                            }
                          />
                        )}
                      </button>
                      {isSubmenuOpen && (
                        <div className="ml-6 mt-1.5 space-y-0.5 border-l-2 pl-4 border-white/10">
                          {item.submenu?.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(e) => {
                                  handleLinkClick(e);
                                  e.stopPropagation();
                                }}
                                className={`
                                  flex items-center gap-2
                                  px-3 py-1.5 rounded-md
                                  text-xs font-medium
                                  transition-all duration-200
                                  ${
                                    isSubActive
                                      ? 'bg-[#24abe0]/15 text-[#24abe0] border-l-2 border-[#24abe0] ml-[-2px] pl-[14px]'
                                      : 'text-white/60 hover:text-white/90 hover:bg-white/5 hover:pl-3.5'
                                  }
                                `}
                              >
                                <span className="tracking-wide">{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      onClick={(e) => {
                        handleLinkClick(e);
                        e.stopPropagation();
                      }}
                      className={`
                        group flex items-center gap-3
                        ${isCollapsed ? 'justify-center' : ''}
                        px-4 py-2.5 rounded-lg
                        transition-all duration-200 ease-out
                        font-medium text-sm
                        ${
                          isActive
                            ? 'bg-[#24abe0]/15 text-[#24abe0] border border-[#24abe0]/20 shadow-sm shadow-[#24abe0]/10'
                            : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                        }
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? 'text-[#24abe0]'
                            : isCollapsed
                            ? 'text-white'
                            : 'text-white/70 group-hover:text-white'
                        }
                        style={
                          isCollapsed && !isActive
                            ? { stroke: '#ffffff', color: '#ffffff', strokeWidth: 2 }
                            : isActive
                            ? { stroke: '#24abe0', color: '#24abe0', strokeWidth: 2.5 }
                            : { strokeWidth: 2 }
                        }
                      />
                      {!isCollapsed && (
                        <span className="font-medium tracking-wide">{item.label}</span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 lg:p-5 border-t border-white/10 bg-gradient-to-t from-white/5 to-transparent">
            {!isCollapsed && (
              <div className="text-center">
                <p className="text-xs font-medium text-white/50 tracking-wide">
                  © Created by WiyzDev Team
                </p>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white/60">M</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 backdrop-blur-sm z-30 bg-black/20"
        />
      )}
    </>
  );
}
