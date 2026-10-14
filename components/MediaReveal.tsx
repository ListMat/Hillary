'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MediaRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  aspectRatio?: string;
}

export function MediaReveal({
  children,
  className = '',
  delay = 0,
  aspectRatio,
}: MediaRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <motion.div
        initial={{
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.08,
          opacity: 0,
        }}
        whileInView={{
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          opacity: 1,
        }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 1.1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
