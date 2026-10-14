'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

const heroImages = [
  '/images/hillary-1.jpg',
  '/images/hillary-2.jpg',
  '/images/hillary-3.jpg',
  '/images/hillary-4.jpg',
  '/images/hillary-5.jpg',
];

interface PKHeroProps {
  isLoaded?: boolean;
}

export function PKHero({ isLoaded = true }: PKHeroProps) {
  const { t } = useLanguage();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Fast image cycle directly inside the H1 (Paul Kalkbrenner signature)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % heroImages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 bg-white text-black overflow-hidden selection:bg-black selection:text-white">
      {/* Top Spacer */}
      <div className="w-full" />

      {/* Main Center Monumental Name with Embedded Aperture */}
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto z-10 py-6">
        <h1 className="h-d flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 text-center select-none text-black">
          {/* Staggered Word 1 */}
          <span className="overflow-hidden inline-block">
            <span className="h-d__span inline-block">
              Hillary
            </span>
          </span>

          {/* Embedded Image Cycle Box */}
          <span className="inline-block relative w-[clamp(4.5rem,14vw,14rem)] h-[clamp(2.8rem,9vw,9rem)] align-middle mx-2 md:mx-4 overflow-hidden border border-black/20 bg-neutral-100 shadow-2xl">
            {heroImages.map((src, idx) => (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentImgIdx ? 1 : 0 }}
                transition={{ duration: 0.6 }}
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
          </span>

          {/* Staggered Word 2 */}
          <span className="overflow-hidden inline-block">
            <span className="h-d__span inline-block">
              Heidy
            </span>
          </span>
        </h1>
      </div>

      {/* Bottom Information Row (Clean Cinema Editorial) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 25,
        }}
        transition={{ duration: 0.9, delay: isLoaded ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1600px] mx-auto z-10 pt-8 border-t border-black/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end justify-between">
          {/* Left: Direction & 35mm metadata */}
          <div className="md:col-span-4 flex flex-col font-mono text-xs space-y-1">
            <span className="text-neutral-500 uppercase tracking-widest font-bold">
              {t.hero.badge}
            </span>
            <span className="text-black font-bold tracking-wide">
              {t.hero.location}
            </span>
          </div>

          {/* Center: Editorial Bio paragraph */}
          <div className="md:col-span-5 text-neutral-700 font-sans text-sm md:text-base leading-relaxed">
            <p className="p-l">
              {t.hero.bio}
            </p>
          </div>

          {/* Right: Scroll to explore indicator */}
          <div className="md:col-span-3 flex md:justify-end">
            <a
              href="#recordings"
              className="px-5 py-2.5 rounded-full border border-black/20 bg-neutral-100 hover:bg-black hover:text-white transition-all duration-300 text-xs font-mono font-bold uppercase tracking-widest text-black shadow-sm focus-visible:outline-none flex items-center gap-2"
            >
              <span>{t.hero.exploreBtn}</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
