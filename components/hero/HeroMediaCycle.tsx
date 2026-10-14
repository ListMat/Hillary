'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { easeCinema } from '@/lib/motion';

interface HeroMediaCycleProps {
  onHover?: () => void;
  onLeave?: () => void;
  className?: string;
}

const frames = [
  {
    src: '/images/hillary-1.jpg',
    label: 'STILL 01',
    aspect: '35mm Film Still',
  },
  {
    src: '/images/hillary-2.jpg',
    label: 'STILL 02',
    aspect: 'Retrato em Luz Natural',
  },
  {
    src: '/images/hillary-3.jpg',
    label: 'STILL 03',
    aspect: 'Direção de Cena',
  },
  {
    src: '/images/hillary-4.jpg',
    label: 'STILL 04',
    aspect: 'Estudo de Luz & Sombra',
  },
];

export function HeroMediaCycle({ onHover, onLeave, className = '' }: HeroMediaCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frames.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentFrame = frames[currentIndex];

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-neutral-950 border border-black/25 select-none shadow-2xl ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.05, clipPath: 'inset(15% 0% 15% 0%)' }
          }
          animate={{
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 1.15,
            ease: easeCinema,
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={currentFrame.src}
            alt={`Hillary Heidy — ${currentFrame.aspect}`}
            fill
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover grayscale contrast-110 brightness-95"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
