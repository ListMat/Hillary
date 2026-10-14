'use client';

import React from 'react';
import Link from 'next/link';

interface AnimatedLinkProps {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export function AnimatedLink({
  href,
  children,
  className = '',
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
}: AnimatedLinkProps) {
  const isExternal = href.startsWith('http') || target === '_blank';

  const content = (
    <span
      className={`group relative inline-flex flex-col overflow-hidden h-[1.35em] leading-[1.35em] select-none ${className}`}
      aria-label={ariaLabel || children}
    >
      {/* Layer A (Initial, slides up on hover) */}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
      >
        {children}
      </span>

      {/* Layer B (Below, enters from bottom on hover) */}
      <span
        aria-hidden="true"
        className="absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
      >
        {children}
      </span>

      {/* Underline Micro-Line Indicator */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current scale-x-0 origin-right transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:origin-left" />
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        onClick={onClick}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
    >
      {content}
    </Link>
  );
}
