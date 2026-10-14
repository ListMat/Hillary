'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

/**
 * Execute a state change or navigation inside document.startViewTransition()
 * with automatic fallback for browsers without support or with prefers-reduced-motion.
 */
export function startViewTransition(callback: () => void | Promise<void>) {
  if (typeof window === 'undefined') {
    callback();
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'startViewTransition' in document) {
    (document as any).startViewTransition(callback);
  } else {
    callback();
  }
}

/**
 * Hook to navigate between pages using View Transition API
 */
export function useViewTransitionRouter() {
  const router = useRouter();

  const navigateWithTransition = (href: string) => {
    startViewTransition(() => {
      router.push(href);
    });
  };

  return {
    ...router,
    push: navigateWithTransition,
  };
}

/**
 * Component for links that navigate using the View Transition API
 */
export function TransitionLink({
  href,
  children,
  className = '',
  'aria-label': ariaLabel,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
}) {
  const router = useViewTransitionRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    if (onClick) onClick();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
