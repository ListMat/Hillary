'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { easeCinema } from '@/lib/motion';

export function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textScale = useTransform(scrollYProgress, [0.15, 0.55], [0.94, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-neutral-950 text-neutral-50 transition-colors duration-1000"
    >
      <section
        className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 md:px-12 py-36 md:py-52"
        aria-label="Transição de Imagem em Movimento"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCinema }}
            className="inline-block text-eyebrow text-neutral-400 font-mono font-bold tracking-widest border border-white/20 px-3.5 py-1"
          >
            [ 03 — MOVING IMAGE / CINEMA ]
          </motion.div>

          <motion.h2
            style={shouldReduceMotion ? {} : { scale: textScale }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeCinema }}
            className="font-editorial text-fluid-title font-light tracking-tight text-neutral-50 max-w-4xl mx-auto leading-[0.92]"
          >
            “Histórias também
            <br />
            <span className="italic font-normal text-white">existem em movimento.”</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs uppercase tracking-widest text-neutral-300 font-mono max-w-lg mx-auto pt-4 font-bold"
          >
            CINEMA · DIREÇÃO DE FOTOGRAFIA · COR · MONTAGEM
          </motion.p>
        </div>
      </section>
    </div>
  );
}

