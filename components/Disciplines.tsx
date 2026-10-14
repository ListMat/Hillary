'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { easeCinema } from '@/lib/motion';

interface Discipline {
  number: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const disciplines: Discipline[] = [
  {
    number: '01',
    title: 'Fotografia',
    description: 'Retratos autorais, editoriais de moda e narrativas visuais construídas através da imagem estática, luz natural rigorosa e composição geométrica.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    tags: ['Retratos Autorais', 'Moda Editorial', 'Fine Art'],
  },
  {
    number: '02',
    title: 'Cinema',
    description: 'Histórias contadas através de movimento, ritmo de decupagem, texturas analógicas de 35mm e atmosfera cromática imersiva.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    tags: ['Direção de Fotografia', 'Curta-Metragem', 'Color Grading'],
  },
  {
    number: '03',
    title: 'Direção',
    description: 'Construção de conceito, linguagem visual integral, direção de arte e condução sensível do elenco e ritmo da cena.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    tags: ['Conceito Visual', 'Fashion Film', 'Direção de Elenco'],
  },
  {
    number: '04',
    title: 'Produção',
    description: 'Do planejamento estratégico ao set, conectando ideias, orçamentos, infraestrutura e execução cinematográfica precisa.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Planejamento', 'Set Management', 'Produção Executiva'],
  },
];

export function Disciplines() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="disciplinas"
      className="relative w-full py-32 md:py-44 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14] bg-[#fdfcf9] dark:bg-[#0c0c0b]"
      aria-label="Áreas de Atuação"
    >
      <div className="max-w-[1550px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 md:mb-24 pb-6 border-b border-black/[0.14] dark:border-white/[0.16]">
          <div>
            <span className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block mb-2 font-bold">
              [ 01 — ÁREAS DE ATUAÇÃO ]
            </span>
            <h2 className="font-editorial text-fluid-h2 font-light text-neutral-900 dark:text-neutral-50 leading-none">
              Prática Multidisciplinar
            </h2>
          </div>
          <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 mt-4 sm:mt-0 font-mono font-bold">
            4 PILARES DE LINGUAGEM
          </p>
        </div>

        {/* Disciplines List Container */}
        <div
          className="relative divide-y divide-black/[0.12] dark:divide-white/[0.14]"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {disciplines.map((item, idx) => (
            <div
              key={item.number}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="group relative py-12 md:py-16 transition-colors duration-400 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Number & Huge Title */}
                <div className="lg:col-span-6 flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-bold">
                    [{item.number}]
                  </span>
                  <h3 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:translate-x-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {item.title}
                  </h3>
                </div>

                {/* Description & High-Contrast Tag Chips */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-4 pl-0 lg:pl-8">
                  <p className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 font-light leading-relaxed max-w-xl font-sans">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] uppercase tracking-wider px-3.5 py-1 border border-neutral-400/80 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 font-mono font-bold bg-neutral-200/70 dark:bg-neutral-800 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile preview thumbnail */}
              <div className="mt-6 md:hidden relative w-full h-52 overflow-hidden bg-neutral-900 border border-black/20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale contrast-105"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}

          {/* Desktop Floating Follower Preview */}
          <div className="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden z-20">
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '32px',
                    translateY: '-50%',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: easeCinema }}
                  className="absolute top-0 left-0 w-88 h-56 overflow-hidden shadow-cinema border border-black/30 dark:border-white/30 bg-black"
                >
                  <Image
                    src={disciplines[hoveredIndex].image}
                    alt={disciplines[hoveredIndex].title}
                    fill
                    className="object-cover grayscale contrast-105"
                    sizes="360px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-white font-mono font-bold bg-black/80 px-2.5 py-1 border border-white/20">
                    {disciplines[hoveredIndex].number} · {disciplines[hoveredIndex].title}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

