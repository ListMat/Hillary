'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

const workImages: Record<string, string> = {
  'w-2026': '/images/hillary-1.jpg',
  'w-2025': '/images/hillary-2.jpg',
  'w-2024': '/images/hillary-3.jpg',
};

const workSlugs: Record<string, string> = {
  'w-2026': 'silencio-das-aguas',
  'w-2025': 'corpo-e-concreto',
  'w-2024': 'aurora-sintetica',
};

export function PKRecordings() {
  const { t } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const works = t.recordings.works;
  const currentWork = works[selectedIdx] || works[0];
  const currentImage = workImages[currentWork.id] || '/images/hillary-1.jpg';
  const currentSlug = workSlugs[currentWork.id] || 'silencio-das-aguas';

  return (
    <section id="recordings" className="relative w-full min-h-screen flex flex-col justify-between py-16 md:py-24 bg-[#9CD2FF] text-black selection:bg-black selection:text-white">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-black/15 gap-4">
          <div className="section-top__start text-black">
            <div className="square bg-black" />
            <h3 className="u-text-caps text-black font-bold">{t.recordings.badge}</h3>
          </div>
          <div className="text-black/80 font-sans text-sm md:text-base max-w-md font-normal">
            <p className="p-l">{t.recordings.subtitle}</p>
          </div>
        </div>

        {/* Year Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between py-6 border-b border-black/15 gap-4">
          <div className="flex items-center space-x-3">
            {works.map((work, idx) => (
              <button
                key={work.year}
                onClick={() => {
                  setSelectedIdx(idx);
                  soundEngine?.playClick();
                }}
                className={`px-5 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 border ${
                  idx === selectedIdx
                    ? 'bg-black text-white border-black font-bold shadow-xl'
                    : 'bg-white/70 text-black border-black/20 hover:bg-black hover:text-white'
                }`}
              >
                <span>{work.year}</span>
              </button>
            ))}
          </div>

          <Link
            href="/work/silencio-das-aguas"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black font-bold hover:opacity-75 transition-opacity"
          >
            <span>{t.recordings.viewAll}</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Split Feature Content (Left Image / Right Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-8 items-center flex-1">
          {/* Left Column: Visual Artwork Frame with Noise */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWork.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 border border-black/25 shadow-2xl"
              >
                <Image
                  src={currentImage}
                  alt={currentWork.title}
                  fill
                  className="object-cover grayscale contrast-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/90 px-3 py-1 text-[11px] font-mono font-bold text-white border border-white/20">
                  [{currentWork.year}] {currentWork.awards}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Work Details & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWork.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <h4 className="h-m text-black font-normal">{currentWork.title}</h4>

                <div className="space-y-1 font-mono text-xs">
                  <span className="text-black/60 block font-bold uppercase tracking-wider">{t.recordings.formatLabel}</span>
                  <p className="text-black font-semibold">{currentWork.format}</p>
                </div>

                <p className="p-l text-black/90 leading-relaxed font-sans font-normal">
                  {currentWork.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    href={`/work/${currentSlug}`}
                    className="px-6 py-3 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xl"
                  >
                    {t.recordings.viewProject}
                  </Link>
                  <a
                    href="#contact"
                    className="px-6 py-3 border border-black/40 hover:border-black text-black font-mono text-xs font-bold uppercase tracking-widest bg-white/40 hover:bg-white transition-all"
                  >
                    {t.recordings.requestDcp}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Format Strip */}
        <div className="flex justify-between items-center pt-4 border-t border-black/15 text-[11px] font-mono text-black/60 uppercase tracking-wider">
          <span>{t.recordings.formatBottom1}</span>
          <span>{t.recordings.formatBottom2}</span>
        </div>
      </div>
    </section>
  );
}
