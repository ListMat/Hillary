'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeCinema } from '@/lib/motion';

export function ImpactQuote() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full py-36 md:py-56 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14] bg-[#fbf9f5] dark:bg-[#070706] overflow-hidden"
      aria-label="Citação e Visão Artística"
    >
      <div className="max-w-[1500px] mx-auto text-center">
        {/* Index indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeCinema }}
          className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono mb-16 md:mb-24 block font-bold"
        >
          [ 06 — NARRATIVA, LUZ & FORMA ]
        </motion.div>

        {/* Large Scale Typography with Serif/Sans Interplay */}
        <div className="space-y-3 md:space-y-6 max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: easeCinema }}
              className="font-editorial text-fluid-quote font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-[0.92]"
            >
              “Toda <span className="font-sans font-light italic tracking-normal text-neutral-950 dark:text-white">imagem</span>
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease: easeCinema }}
              className="font-editorial text-fluid-quote font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-[0.92]"
            >
              pode ser o <span className="font-editorial italic font-normal text-neutral-950 dark:text-white">começo</span>
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.24, ease: easeCinema }}
              className="font-editorial text-fluid-quote font-normal tracking-tight text-neutral-900 dark:text-neutral-50 leading-[0.92]"
            >
              de uma história.”
            </motion.h2>
          </div>
        </div>

        {/* Coordinate stamp */}
        <div className="pt-20 md:pt-28 text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-mono font-bold">
          SÃO PAULO · BRASIL — DIREÇÃO DE FOTOGRAFIA & IMAGEM AUTORAL
        </div>
      </div>
    </section>
  );
}

