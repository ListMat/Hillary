'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { MediaReveal } from './MediaReveal';
import { easeCinema, fadeIn, modalTransition } from '@/lib/motion';

export function About() {
  const [trajectoryModalOpen, setTrajectoryModalOpen] = useState(false);

  const disciplines = [
    { name: 'Fotografia', desc: 'Retratos, Moda Autoral & Fine Art' },
    { name: 'Cinema', desc: 'Direção de Fotografia, Montagem & Cor' },
    { name: 'Direção', desc: 'Concepção Visual & Direção de Elenco' },
    { name: 'Produção', desc: 'Produção Executiva & Set Management' },
  ];

  return (
    <section
      id="sobre"
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14] bg-[#f7f4ed] dark:bg-[#0c0c0b]"
      aria-label="Sobre Hillary Heidy"
    >
      <div className="max-w-[1550px] mx-auto">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeCinema }}
          className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block mb-16 md:mb-24 font-bold"
        >
          [ 07 — SOBRE HILLARY HEIDY ]
        </motion.span>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <MediaReveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 shadow-cinema border border-black/20 dark:border-white/20">
                <Image
                  src="/images/hillary-1.jpg"
                  alt="Retrato de Hillary Heidy"
                  fill
                  className="object-cover grayscale contrast-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/85 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-widest flex justify-between border border-white/20 font-bold">
                  <span>HILLARY HEIDY</span>
                  <span>DIREÇÃO & FOTO</span>
                </div>
              </div>
            </MediaReveal>
          </div>

          {/* Right Column: Bio & Core Disciplines */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light text-neutral-900 dark:text-neutral-50 tracking-tight leading-[0.9]">
                Hillary Heidy
              </h2>
              <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono font-bold">
                CRIADORA AUDIOVISUAL & DIRETORA DE FOTOGRAFIA
              </p>
            </div>

            <div className="space-y-6 text-lg md:text-2xl font-light leading-relaxed text-neutral-900 dark:text-neutral-100 font-sans">
              <p>
                Hillary Heidy é uma criadora audiovisual que transita entre
                fotografia, cinema, direção e produção.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-xl">
                Seu trabalho parte da observação atenta das pessoas, dos espaços
                e das histórias que existem por trás de cada imagem. Entre projetos
                autorais e colaborações com marcas e produtoras, busca construir
                narrativas com forte identidade visual, sensibilidade cromática
                e intenção cinematográfica.
              </p>
            </div>

            {/* Disciplines table */}
            <div className="pt-8 border-t border-black/[0.14] dark:border-white/[0.16] space-y-4">
              <h3 className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono font-bold">
                [ ATUAÇÃO & ESPECIALIDADES ]
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {disciplines.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 space-y-1.5 shadow-subtle"
                  >
                    <div className="font-editorial text-xl text-neutral-950 dark:text-neutral-50 font-normal">
                      {item.name}
                    </div>
                    <div className="text-xs text-neutral-700 dark:text-neutral-300 font-mono font-medium">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trajectory CTA */}
            <div className="pt-2">
              <button
                onClick={() => setTrajectoryModalOpen(true)}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono font-bold text-neutral-950 dark:text-neutral-50 hover:opacity-75 transition-opacity focus-visible:outline-none border-b-2 border-neutral-950 dark:border-neutral-50 pb-1"
              >
                <span>Conhecer minha trajetória & premiações</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Trajectory Modal */}
      <AnimatePresence>
        {trajectoryModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/92 backdrop-blur-md">
            {/* Backdrop */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setTrajectoryModalOpen(false)}
              className="fixed inset-0"
            />

            <motion.div
              variants={modalTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-3xl bg-[#fbf9f5] dark:bg-[#121211] text-neutral-900 dark:text-neutral-50 p-8 md:p-12 shadow-cinema border border-black/20 dark:border-white/20 max-h-[85vh] overflow-y-auto z-10"
              role="dialog"
              aria-modal="true"
              aria-label="Trajetória de Hillary Heidy"
            >
              <div className="flex justify-between items-start pb-6 border-b border-black/[0.14] dark:border-white/[0.16]">
                <div>
                  <span className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block mb-1 font-bold">
                    [ BIOGRAFIA & PERCURSO ]
                  </span>
                  <h3 className="font-editorial text-3xl md:text-5xl font-light">
                    Trajetória Artística
                  </h3>
                </div>
                <button
                  onClick={() => setTrajectoryModalOpen(false)}
                  className="p-2.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus-visible:outline-none border border-black/15 dark:border-white/15"
                  aria-label="Fechar trajetória"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 pt-6 text-base md:text-lg leading-relaxed text-neutral-800 dark:text-neutral-100 font-sans font-light">
                <p>
                  Com formação multidisciplinar em Artes Visuais e Cinema, Hillary
                  iniciou seu percurso na fotografia analógica documental,
                  investigando a luz natural e o registro poético de figuras urbanas.
                </p>
                <p>
                  Ao longo de sua carreira, expandiu sua linguagem para a direção de
                  fotografia em curtas-metragens, fashion films e videoclipes,
                  combinando rigor técnico com experimentação plástica.
                </p>
                <div className="p-6 bg-neutral-200/70 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-950 dark:text-neutral-50 font-bold">
                    [ PRINCIPAIS MARCOS & FESTIVAIS ]
                  </h4>
                  <ul className="text-xs space-y-2 text-neutral-800 dark:text-neutral-200 font-mono font-medium">
                    <li>• 2025: Prêmio de Melhor Fotografia — Festival Ver & Olhar</li>
                    <li>• 2024: Direção do fashion film oficial para a São Paulo Fashion Week</li>
                    <li>• 2023: Residência Artística em Linguagens Visuais Contemporâneas</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

