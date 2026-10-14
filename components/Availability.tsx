'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeCinema } from '@/lib/motion';

export function Availability() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14] bg-[#fdfcf9] dark:bg-[#0c0c0b]"
      aria-label="Disponibilidade Profissional"
    >
      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
              </span>
              <span className="text-eyebrow text-neutral-900 dark:text-neutral-100 font-mono font-bold tracking-widest">
                [ STATUS: DISPONÍVEL PARA NOVOS PROJETOS ]
              </span>
            </div>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeCinema }}
              className="font-editorial text-fluid-h2 font-light text-neutral-900 dark:text-neutral-50 leading-[0.95]"
            >
              “Projetos audiovisuais,
              <br />
              fotografia e novas
              <br />
              <span className="italic font-normal">colaborações autorais.”</span>
            </motion.h2>

            <p className="text-xs md:text-sm uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono pt-3 font-bold">
              PROJETOS NACIONAIS & INTERNACIONAIS · CINEMA · MODA · ARTE
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="p-8 md:p-10 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 space-y-5 max-w-md w-full shadow-cinema">
              <div className="text-eyebrow text-neutral-900 dark:text-neutral-100 font-mono font-bold">
                [ AGENDA & PRODUÇÃO 2026 ]
              </div>
              <p className="text-base text-neutral-800 dark:text-neutral-200 font-sans font-light leading-relaxed">
                Atualmente aceitando propostas para direções de fotografia, ensaios editoriais, videoclipes e campanhas institucionais.
              </p>
              <div className="text-xs font-mono text-neutral-700 dark:text-neutral-300 pt-4 border-t border-neutral-300 dark:border-neutral-700 font-bold">
                Base: São Paulo / Disponível para deslocamento global
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

