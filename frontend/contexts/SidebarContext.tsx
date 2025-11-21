'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from 'react';

/**
 * Sidebar state and configuration interface
 */
interface SidebarContextType {
  /** Whether the sidebar is currently collapsed */
  isCollapsed: boolean;
  /** Whether the sidebar is in transition/animation state */
  isTransitioning: boolean;
  /** Whether the current viewport is mobile */
  isMobile: boolean;
  /** Toggle sidebar collapsed state */
  toggle: () => void;
  /** Set sidebar collapsed state explicitly */
  setIsCollapsed: (collapsed: boolean) => void;
  /** Expand the sidebar */
  expand: () => void;
  /** Collapse the sidebar */
  collapse: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Storage key for persisting sidebar state
 */
const STORAGE_KEY = 'medynox-sidebar-state';

/**
 * Breakpoint for mobile detection (matches Tailwind's lg breakpoint)
 */
const MOBILE_BREAKPOINT = 1024;

/**
 * Debounce delay for localStorage writes (ms)
 */
const STORAGE_DEBOUNCE = 300;

/**
 * SidebarProvider - Manages sidebar state with persistence and responsive behavior
 *
 * Features:
 * - Persistent state via localStorage
 * - Responsive breakpoint detection
 * - Smooth transition states
 * - Debounced storage writes
 * - Mobile-first auto-collapse
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsedState] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Storage write debounce timer
  const storageTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handle window resize for responsive behavior
   */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      // Auto-collapse on mobile, restore saved state on desktop
      if (mobile) {
        setIsCollapsedState(true);
      } else {
        // Restore saved state on desktop
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'true') {
          setIsCollapsedState(true);
        }
      }
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Initialize state from localStorage on mount
   */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    
    // Only restore if not on mobile
    if (window.innerWidth >= MOBILE_BREAKPOINT && saved === 'true') {
      setIsCollapsedState(true);
    }

    // Cleanup timer on unmount
    return () => {
      if (storageTimerRef.current) {
        clearTimeout(storageTimerRef.current);
      }
    };
  }, []);

  /**
   * Persist state to localStorage with debounce
   */
  const persistState = useCallback((collapsed: boolean) => {
    if (!mounted) return;

    // Clear existing timer
    if (storageTimerRef.current) {
      clearTimeout(storageTimerRef.current);
    }

    // Set new timer
    storageTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, String(collapsed));
      } catch (error) {
        // Handle localStorage errors (e.g., quota exceeded, private mode)
        console.warn('Failed to persist sidebar state:', error);
      }
    }, STORAGE_DEBOUNCE);
  }, [mounted]);

  /**
   * Set collapsed state with transition animation
   */
  const setIsCollapsed = useCallback(
    (collapsed: boolean) => {
      setIsTransitioning(true);
      setIsCollapsedState(collapsed);

      // Persist state (only on desktop)
      if (!isMobile) {
        persistState(collapsed);
      }

      // Clear transition state after animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match CSS transition duration
    },
    [isMobile, persistState]
  );

  /**
   * Toggle sidebar collapsed state
   */
  const toggle = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  /**
   * Expand sidebar
   */
  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, [setIsCollapsed]);

  /**
   * Collapse sidebar
   */
  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, [setIsCollapsed]);

  /**
   * Context value memoized for performance
   */
  const value = useMemo<SidebarContextType>(
    () => ({
      isCollapsed,
      isTransitioning,
      isMobile,
      toggle,
      setIsCollapsed,
      expand,
      collapse,
    }),
    [isCollapsed, isTransitioning, isMobile, toggle, setIsCollapsed, expand, collapse]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

/**
 * Hook to access sidebar context
 *
 * @throws {Error} If used outside of SidebarProvider
 * @returns {SidebarContextType} Sidebar state and methods
 *
 * @example
 * ```tsx
 * const { isCollapsed, toggle } = useSidebar();
 * ```
 */
export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error(
      'useSidebar must be used within a SidebarProvider. ' +
      'Make sure to wrap your component tree with <SidebarProvider>.'
    );
  }
  
  return context;
}

