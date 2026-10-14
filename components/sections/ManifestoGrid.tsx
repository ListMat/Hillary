'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface WordPlacement {
  row: number;
  col: number; // 1-indexed column in a 9-column grid
  text: string;
  isItalic?: boolean;
}

const manifestoWords: WordPlacement[] = [
  { row: 0, col: 2, text: 'ENTRE' },
  { row: 1, col: 3, text: 'O INSTANTE' },
  { row: 2, col: 4, text: 'E O MOVIMENTO' },
  { row: 3, col: 5, text: 'EXISTE' },
  { row: 4, col: 6, text: 'UMA HISTÓRIA', isItalic: true },
];

export function ManifestoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 30%'],
  });

  const columns = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

  return (
    <section
      id="manifesto-grid"
      ref={containerRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-white/15 overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-black"
      aria-label="Manifesto Editorial em Grid"
    >
      <div className="max-w-[1550px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 md:mb-20 pb-4 border-b border-white/15">
          <div className="text-eyebrow text-neutral-400 font-mono font-bold">
            [ 00 — SISTEMA & MANIFESTO VISUAL ]
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-2 sm:mt-0 font-bold">
            ESTUDO DE COORDENADAS / 9 COLUNAS
          </span>
        </div>

        {/* 9-Column Architectural Grid Container */}
        <div className="relative min-h-[520px] md:min-h-[660px] w-full border border-white/15 bg-white/[0.02]">
          {/* Vertical Grid Columns with Numbers 01–09 */}
          <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 pointer-events-none divide-x divide-white/10">
            {columns.map((colNum, i) => (
              <div
                key={colNum}
                className={`relative h-full flex flex-col justify-between p-2.5 sm:p-3 ${
                  i >= 4 ? 'hidden sm:flex' : ''
                } ${i >= 6 ? 'hidden md:flex' : ''}`}
              >
                <span className="font-mono text-[11px] md:text-xs text-neutral-400 font-bold select-none">
                  {colNum}
                </span>
                <span className="font-mono text-[10px] text-neutral-400 font-bold select-none">
                  +
                </span>
              </div>
            ))}
          </div>

          {/* Spatial Words Distribution across Rows */}
          <div className="relative z-10 w-full h-full flex flex-col justify-around py-8 md:py-12 space-y-4 md:space-y-6">
            {manifestoWords.map((item, idx) => {
              const startThreshold = 0.08 + idx * 0.14;
              const endThreshold = Math.min(1, startThreshold + 0.2);

              return (
                <ManifestoRow
                  key={item.text}
                  item={item}
                  idx={idx}
                  scrollYProgress={scrollYProgress}
                  startThreshold={startThreshold}
                  endThreshold={endThreshold}
                  shouldReduceMotion={shouldReduceMotion}
                />
              );
            })}
          </div>
        </div>

        {/* Sub-grid Manifesto Narrative Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 md:pt-16 border-t border-white/15 items-start mt-8">
          <div className="md:col-span-4 lg:col-span-4 space-y-2">
            <div className="text-eyebrow text-neutral-400 font-mono font-bold">
              [ POSICIONAMENTO ]
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
              SÃO PAULO · BRASIL · 2026
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-8">
            <p className="text-xl md:text-3xl font-normal leading-relaxed text-neutral-200 font-sans tracking-tight max-w-3xl">
              Hillary Heidy opera entre os limites do cinema, da fotografia, da direção e da produção.
              Cada plano é concebido como uma arquitetura de luz e silêncio — onde o rigor técnico serve
              à autenticidade da narrativa humana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoRow({
  item,
  idx,
  scrollYProgress,
  startThreshold,
  endThreshold,
  shouldReduceMotion,
}: {
  item: WordPlacement;
  idx: number;
  scrollYProgress: any;
  startThreshold: number;
  endThreshold: number;
  shouldReduceMotion: boolean | null;
}) {
  const y = useTransform(
    scrollYProgress,
    [startThreshold, endThreshold],
    [50, 0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [startThreshold, endThreshold],
    [0, 1]
  );
  const dotScale = useTransform(
    scrollYProgress,
    [startThreshold, endThreshold],
    [0, 1]
  );

  const colOffsetPercent = Math.min(65, (item.col - 1) * 11);

  return (
    <div className="w-full px-4 sm:px-8">
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                marginLeft: `${colOffsetPercent}%`,
                y,
                opacity,
              }
        }
        className="inline-flex items-center gap-3 md:gap-4 overflow-hidden"
      >
        {/* Pulsing Grid Alignment Dot */}
        <motion.span
          style={shouldReduceMotion ? {} : { scale: dotScale }}
          className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-white flex-shrink-0"
        />

        {/* Monumental Word with Extreme Contrast */}
        <h2
          className={`font-editorial text-[clamp(2.5rem,7vw,7.5rem)] font-light tracking-tight text-white leading-none select-none uppercase ${
            item.isItalic ? 'italic font-normal text-neutral-300' : ''
          }`}
        >
          {item.text}
        </h2>
      </motion.div>
    </div>
  );
}
