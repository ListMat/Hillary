'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CinematicPreloaderProps {
  onComplete?: () => void;
}

const previewImages = [
  '/images/hillary-1.jpg',
  '/images/hillary-2.jpg',
  '/images/hillary-3.jpg',
  '/images/hillary-4.jpg',
];

export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const [phase, setPhase] = useState<'initial' | 'splitting' | 'revealed' | 'complete'>('initial');
  const [imgIdx, setImgIdx] = useState(0);

  // Fast aperture image cycle
  useEffect(() => {
    const cycle = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % previewImages.length);
    }, 400);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    // Step 1: Let the name settle centered
    const t1 = setTimeout(() => {
      setPhase('splitting');
    }, 600);

    // Step 2: Open the aperture frame and reveal photos
    const t2 = setTimeout(() => {
      setPhase('revealed');
    }, 1300);

    // Step 3: Complete and smoothly dismiss curtain into the Hero
    const t3 = setTimeout(() => {
      setPhase('complete');
      onComplete?.();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          key="name-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-white text-black flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 select-none pointer-events-none overflow-hidden"
        >
          {/* Top Spacer matching PKHero */}
          <div className="w-full" />

          {/* Center Stage: Monumental Name with Kinetic Aperture Split */}
          <div className="w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto z-10 py-6">
            <h1 className="h-d flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 text-center select-none text-black">
              {/* Word 1: "Hillary" slides in from bottom */}
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{
                    y: '0%',
                    opacity: 1,
                  }}
                  transition={{
                    y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.6 },
                  }}
                  className="h-d__span inline-block"
                >
                  Hillary
                </motion.span>
              </span>

              {/* Central Aperture Box: Expands and reveals 35mm photos between the names */}
              <motion.span
                initial={{ width: 0, opacity: 0, scale: 0.8 }}
                animate={{
                  width: phase === 'initial' ? 0 : 'clamp(4.5rem, 14vw, 14rem)',
                  opacity: phase === 'initial' ? 0 : 1,
                  scale: phase === 'initial' ? 0.8 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block relative w-[clamp(4.5rem,14vw,14rem)] h-[clamp(2.8rem,9vw,9rem)] align-middle mx-2 md:mx-4 overflow-hidden border border-black/20 bg-neutral-100 shadow-2xl"
              >
                {previewImages.map((src, idx) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: idx === imgIdx ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={src}
                      alt="Hillary Heidy — 35mm Frame"
                      fill
                      className="object-cover grayscale contrast-110"
                      priority={idx === 0}
                    />
                  </motion.div>
                ))}
              </motion.span>

              {/* Word 2: "Heidy" slides in from bottom */}
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{
                    y: '0%',
                    opacity: 1,
                  }}
                  transition={{
                    y: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.6 },
                  }}
                  className="h-d__span inline-block"
                >
                  Heidy
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Bottom Invisible Spacer matching PKHero bottom row */}
          <div className="w-full max-w-[1600px] mx-auto z-10 pt-8 border-t border-transparent opacity-0 pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end justify-between">
              <div className="md:col-span-4 font-mono text-xs">
                <span>[ CINEMA 35MM ]</span>
              </div>
              <div className="md:col-span-5 text-sm md:text-base leading-relaxed">
                <p className="p-l">Spacer</p>
              </div>
              <div className="md:col-span-3 flex md:justify-end">
                <span className="px-5 py-2.5 text-xs">Explore</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
