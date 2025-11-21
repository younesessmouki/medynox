'use client';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { OfflineBanner, OnlineBanner } from '@/components/offline/OfflineBanner';
import { SyncStatusPanel } from '@/components/offline/SyncStatusPanel';
import { ChatWidget } from '@/components/chat/ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen transition-colors bg-gray-50">
      <OfflineBanner />
      <OnlineBanner />
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${
          isCollapsed ? 'lg:ml-28' : 'lg:ml-64'
        }`}
      >
        <Topbar />
        <main className="flex-1 p-4 lg:p-6 overflow-auto transition-colors text-gray-900">
          {children}
        </main>
      </div>
      <SyncStatusPanel />
      <ChatWidget />
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
