'use client';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useTheme } from '@/contexts/ThemeContext';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { OfflineBanner, OnlineBanner } from '@/components/offline/OfflineBanner';
import { SyncStatusPanel } from '@/components/offline/SyncStatusPanel';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex min-h-screen transition-colors ${
        isDark ? 'bg-[#0A0A0A]' : 'bg-gray-50'
      }`}
    >
      <OfflineBanner />
      <OnlineBanner />
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <Topbar />
        <main
          className={`flex-1 p-4 lg:p-6 overflow-auto transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {children}
        </main>
      </div>
      <SyncStatusPanel />
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
