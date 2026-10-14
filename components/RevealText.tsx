'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  type?: 'mask' | 'fade' | 'lines';
}

export function RevealText({
  children,
  className = '',
  delay = 0,
  as = 'div',
  type = 'mask',
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  if (shouldReduceMotion) {
    const RawTag = as;
    return <RawTag className={className}>{children}</RawTag>;
  }

  if (type === 'fade') {
    return (
      <Component
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  return (
    <div className="overflow-hidden inline-block align-bottom w-full">
      <Component
        initial={{ y: '105%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 0.95,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}
