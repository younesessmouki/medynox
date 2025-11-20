'use client';

import { ReactNode } from 'react';

interface HydrationBoundaryProps {
  children: ReactNode;
}

/**
 * Wrapper component to suppress hydration warnings from browser extensions
 * Browser extensions (like Bitdefender, password managers) inject attributes
 * into the DOM before React hydrates, causing hydration mismatches.
 */
export function HydrationBoundary({ children }: HydrationBoundaryProps) {
  return <div suppressHydrationWarning>{children}</div>;
}

