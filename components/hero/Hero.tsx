'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useCursor } from '@/components/motion/ContextCursor';
import { HeroMediaCycle } from './HeroMediaCycle';
import { CinematicParticleField } from '@/components/three/CinematicParticleField';
import { easeCinema } from '@/lib/motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setContextCursor, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY1 = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const textY2 = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center pt-24 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden select-none bg-[#050505] text-white border-b border-white/[0.14]"
      aria-label="Introdução — Hillary Heidy"
    >
      {/* Three.js Interactive WebGL Particle Field */}
      <CinematicParticleField />
      {/* Main Hero Monumental Composition */}
      <motion.div
        style={shouldReduceMotion ? {} : { opacity }}
        className="relative w-full max-w-[1600px] flex flex-col items-center justify-center my-auto will-change-transform"
      >
        {/* Row 1: HILLARY */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: textY1 }}
          className="w-full flex justify-start overflow-hidden will-change-transform border-b border-white/[0.12] pb-2 md:pb-4"
        >
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 1.0,
              ease: easeCinema,
            }}
            className="font-editorial text-[clamp(4.5rem,15vw,18rem)] font-normal tracking-tightest uppercase text-white leading-[0.80] select-none"
          >
            Hillary
          </motion.h1>
        </motion.div>

        {/* Center Intersecting Cinematic Aperture & Technical Data Bar */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-8 my-6 md:my-8">
          {/* Left Metadata */}
          <div className="hidden md:block md:col-span-3 lg:col-span-3 text-xs uppercase tracking-widest text-neutral-300 font-mono leading-relaxed font-bold">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="space-y-2 p-4 border border-white/[0.12] bg-neutral-950/60 backdrop-blur-md"
            >
              <div className="text-[10px] text-neutral-400 font-mono tracking-widest font-bold">[ LOCALIZAÇÃO // COORD ]</div>
              <div className="text-white font-bold text-sm">23°33′S · 46°38′W</div>
              <div className="text-[11px] text-neutral-400 font-medium">São Paulo · Brasil</div>
            </motion.div>
          </div>

          {/* Center Image Aperture Cycle */}
          <div className="md:col-span-6 lg:col-span-6 flex justify-center">
            <motion.div
              style={shouldReduceMotion ? {} : { y: mediaY }}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { clipPath: 'inset(25% 6% 25% 6%)', opacity: 0 }
              }
              animate={{
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
              }}
              transition={{
                delay: 0.45,
                duration: 1.15,
                ease: easeCinema,
              }}
              className="w-full max-w-xl border border-white/20 shadow-2xl p-1 bg-black"
            >
              <HeroMediaCycle
                onHover={() => setContextCursor('VER', 'gallery')}
                onLeave={resetCursor}
              />
            </motion.div>
          </div>

          {/* Right Metadata */}
          <div className="hidden md:flex md:col-span-3 lg:col-span-3 justify-end text-right text-xs uppercase tracking-widest text-neutral-300 font-mono leading-relaxed font-bold">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="space-y-2 p-4 border border-white/[0.12] bg-neutral-950/60 backdrop-blur-md text-right w-full"
            >
              <div className="text-[10px] text-neutral-400 font-mono tracking-widest font-bold">[ DISPOSITIVO // SCAN ]</div>
              <div className="text-white font-bold text-sm">35mm & 4K RAW</div>
              <div className="text-[11px] text-neutral-400 font-medium">Lentes Anamórficas Vintage</div>
            </motion.div>
          </div>
        </div>

        {/* Row 2: HEIDY */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: textY2 }}
          className="w-full flex justify-end overflow-hidden will-change-transform border-t border-white/[0.12] pt-2 md:pt-4"
        >
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 1.0,
              ease: easeCinema,
            }}
            className="font-editorial text-[clamp(4.5rem,15vw,18rem)] font-normal tracking-tightest uppercase text-white leading-[0.80] select-none"
          >
            Heidy
          </motion.h1>
        </motion.div>
      </motion.div>
    </section>
  );
}
