'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface ParallaxMediaProps {
  src: string;
  alt: string;
  start?: number; // e.g. -8
  end?: number;   // e.g. 8
  aspectRatio?: string; // e.g. 'aspect-[16/9]', 'aspect-[21/9]'
  priority?: boolean;
  className?: string;
  overlayText?: string;
}

export function ParallaxMedia({
  src,
  alt,
  start = -8,
  end = 8,
  aspectRatio = 'aspect-[16/9]',
  priority = false,
  className = '',
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${start}%`, `${end}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-neutral-950 ${aspectRatio} ${className}`}
    >
      <motion.div
        style={shouldReduceMotion ? {} : { y: translateY, scale: 1.14 }}
        className="relative w-full h-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1500px"
          className="object-cover grayscale contrast-105 brightness-95"
        />
        {/* Subtle Analogue Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      </motion.div>
    </div>
  );
}
