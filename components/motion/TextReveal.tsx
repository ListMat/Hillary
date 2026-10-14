'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.75,
  as: Component = 'div',
}: TextRevealProps) {
  return (
    <div className={`overflow-hidden inline-block ${className}`}>
      <motion.div
        initial={{ y: '115%', rotate: 1.5, opacity: 0 }}
        whileInView={{ y: '0%', rotate: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface SplitWordsRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitWordsReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
}: SplitWordsRevealProps) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-block py-[0.05em]">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              delay: delay + idx * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
