'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeCinema } from '@/lib/motion';

export function Manifesto() {
  const shouldReduceMotion = useReducedMotion();

  const lines = [
    '“Entre o instante',
    'e o movimento,',
    'existe uma história.”',
  ];

  return (
    <section
      id="manifesto"
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14] overflow-hidden"
      aria-label="Manifesto Artístico"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 md:mb-24 pb-4 border-b border-black/[0.12] dark:border-white/[0.14]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeCinema }}
            className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono font-bold"
          >
            [ 00 — MANIFESTO & VISÃO ]
          </motion.div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-0 font-medium">
            CONCEITO / LUZ / NARRATIVA
          </span>
        </div>

        {/* Large Progressive Typographic Reveal */}
        <div className="space-y-2 md:space-y-4 mb-20 md:mb-28 max-w-5xl">
          {lines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.h2
                initial={shouldReduceMotion ? { opacity: 1 } : { y: '105%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-6% 0px' }}
                transition={{
                  duration: 0.9,
                  delay: 0.12 * idx,
                  ease: easeCinema,
                }}
                className={`font-editorial text-fluid-title font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-[0.92] ${
                  idx === 2 ? 'italic font-normal text-neutral-950 dark:text-white' : ''
                }`}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Asymmetrical Editorial Definition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-black/[0.14] dark:border-white/[0.16] items-start">
          <div className="md:col-span-4 lg:col-span-4 space-y-2">
            <div className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono font-bold">
              [ POSICIONAMENTO & SENSIBILIDADE ]
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
              SÃO PAULO · BRASIL · 2026
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-8">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: easeCinema }}
              className="text-xl md:text-3xl font-light leading-relaxed text-neutral-900 dark:text-neutral-50 font-sans tracking-tight max-w-3xl"
            >
              Hillary Heidy trabalha entre fotografia, cinema, direção e produção,
              explorando diferentes formas de transformar imagens, pessoas e
              momentos em narrativas visuais densas, autênticas e cinematográficas.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

