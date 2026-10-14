'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useCursor } from '@/components/motion/ContextCursor';

export function DisciplinesMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { setContextCursor, resetCursor } = useCursor();

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const disciplinesList = [
    'CINEMA',
    'FOTOGRAFIA',
    'DIREÇÃO',
    'PRODUÇÃO',
    'COLOR GRADING',
    '35MM ANALÓGICO',
    'FASHION FILM',
    'DOCUMENTÁRIO',
  ];

  return (
    <section
      id="disciplinas"
      className="relative w-full py-20 md:py-32 border-t border-white/15 overflow-hidden bg-[#050505] text-white select-none selection:bg-white selection:text-black"
      aria-label="Disciplinas e Áreas de Atuação"
    >
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 lg:px-16 mb-12 flex justify-between items-center pb-4 border-b border-white/15">
        <span className="text-eyebrow text-neutral-400 font-mono font-bold">
          [ 01 — DISCIPLINAS & PRÁTICA CRIATIVA ]
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold hidden sm:inline">
          ARRASTE HORIZONTALMENTE
        </span>
      </div>

      {/* Infinite Draggable Marquee Strip */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          setIsHovered(true);
          setContextCursor('ARRASTE', 'drag');
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          resetCursor();
        }}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-6 border-y border-white/15 bg-white/[0.02]"
      >
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -3200, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex whitespace-nowrap will-change-transform"
        >
          {/* Track 1 */}
          <div className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16 flex-shrink-0">
            {disciplinesList.map((item, i) => (
              <span key={`t1-${i}`} className="inline-flex items-center gap-10 md:gap-16">
                <span className="font-editorial text-4xl sm:text-6xl md:text-8xl font-light uppercase tracking-tight text-white hover:text-neutral-300 transition-colors">
                  {item}
                </span>
                <span className="font-mono text-xl md:text-2xl text-neutral-600 font-bold">
                  —
                </span>
              </span>
            ))}
          </div>

          {/* Track 2 (Clone for infinite seamless loop) */}
          <div
            aria-hidden="true"
            className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16 flex-shrink-0"
          >
            {disciplinesList.map((item, i) => (
              <span key={`t2-${i}`} className="inline-flex items-center gap-10 md:gap-16">
                <span className="font-editorial text-4xl sm:text-6xl md:text-8xl font-light uppercase tracking-tight text-white hover:text-neutral-300 transition-colors">
                  {item}
                </span>
                <span className="font-mono text-xl md:text-2xl text-neutral-600 font-bold">
                  —
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 4 Pillars Technical Grid Below Marquee with High Contrast */}
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 lg:px-16 mt-16 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          <div className="pt-6 sm:pt-0 sm:pr-6">
            <span className="font-mono text-xs text-neutral-400 font-bold block mb-2">[01] FOTOGRAFIA</span>
            <h3 className="font-editorial text-2xl md:text-3xl text-white mb-3 font-normal">
              Imagem Estática
            </h3>
            <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
              Retratos autorais, moda e ensaios orientados pelo estudo formal da luz natural e geometria espacial.
            </p>
          </div>

          <div className="pt-6 sm:pt-0 sm:px-6">
            <span className="font-mono text-xs text-neutral-400 font-bold block mb-2">[02] CINEMA</span>
            <h3 className="font-editorial text-2xl md:text-3xl text-white mb-3 font-normal">
              Direção de Fotografia
            </h3>
            <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
              Decupagem visual, composição temporal, atmosferas densas e granulação de película analógica em 35mm.
            </p>
          </div>

          <div className="pt-6 sm:pt-0 sm:px-6">
            <span className="font-mono text-xs text-neutral-400 font-bold block mb-2">[03] DIREÇÃO</span>
            <h3 className="font-editorial text-2xl md:text-3xl text-white mb-3 font-normal">
              Visão & Elenco
            </h3>
            <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
              Concepção integral de universo, direção de arte rigorosa e condução psicológica de atores e personagens.
            </p>
          </div>

          <div className="pt-6 sm:pt-0 sm:pl-6">
            <span className="font-mono text-xs text-neutral-400 font-bold block mb-2">[04] PRODUÇÃO</span>
            <h3 className="font-editorial text-2xl md:text-3xl text-white mb-3 font-normal">
              Set & Execução
            </h3>
            <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
              Estruturação operacional de set, alinhamento orçamentário e viabilização de visões artísticas complexas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
