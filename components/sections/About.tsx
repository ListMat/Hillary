'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { easeCinema, fadeIn, modalReveal } from '@/lib/motion';

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
      className="relative w-full py-28 md:py-44 px-6 md:px-12 lg:px-16 border-t border-white/15 bg-[#070706] text-white selection:bg-white selection:text-black"
      aria-label="Sobre Hillary Heidy"
    >
      <div className="max-w-[1550px] mx-auto">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeCinema }}
          className="text-eyebrow text-neutral-400 font-mono block mb-16 md:mb-24 font-bold"
        >
          [ 05 — SOBRE HILLARY HEIDY ]
        </motion.span>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 shadow-2xl border border-white/15">
              <Image
                src="/images/hillary-1.jpg"
                alt="Retrato de Hillary Heidy"
                fill
                className="object-cover grayscale contrast-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          {/* Right Column: Bio & Core Disciplines */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[0.9]">
                Hillary Heidy
              </h2>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">
                CRIADORA AUDIOVISUAL & DIRETORA DE FOTOGRAFIA
              </p>
            </div>

            <div className="space-y-6 text-lg md:text-2xl font-light leading-relaxed text-neutral-200 font-sans">
              <p>
                Hillary Heidy é uma criadora audiovisual que transita entre
                fotografia, cinema, direção e produção.
              </p>
              <p className="text-neutral-300 text-base md:text-xl font-light leading-relaxed">
                Seu trabalho parte da observação atenta das pessoas, dos espaços
                e das histórias que existem por trás de cada imagem. Entre projetos
                autorais e colaborações com marcas e produtoras, busca construir
                narrativas com forte identidade visual, sensibilidade cromática
                e intenção cinematográfica.
              </p>
            </div>

            {/* Disciplines table */}
            <div className="pt-8 border-t border-white/15 space-y-4">
              <h3 className="text-eyebrow text-neutral-400 font-mono font-bold">
                [ ATUAÇÃO & ESPECIALIDADES ]
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {disciplines.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 bg-white/[0.03] border border-white/15 space-y-1.5 shadow-sm text-white"
                  >
                    <div className="font-editorial text-xl text-white font-normal">
                      {item.name}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono font-bold">
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
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono font-bold text-white hover:text-neutral-300 transition-colors focus-visible:outline-none border-b-2 border-white pb-1"
              >
                <span>Conhecer trajetória & premiações</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Trajectory Modal */}
      <AnimatePresence>
        {trajectoryModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setTrajectoryModalOpen(false)}
              className="fixed inset-0"
            />

            <motion.div
              variants={modalReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-3xl bg-[#0a0a0a] text-white p-8 md:p-12 shadow-2xl border border-white/20 max-h-[85vh] overflow-y-auto z-10"
              role="dialog"
              aria-modal="true"
              aria-label="Trajetória de Hillary Heidy"
            >
              <div className="flex justify-between items-start pb-6 border-b border-white/15">
                <div>
                  <span className="text-eyebrow text-neutral-400 font-mono block mb-1 font-bold">
                    [ BIOGRAFIA & PERCURSO ]
                  </span>
                  <h3 className="font-editorial text-3xl md:text-5xl font-light text-white">
                    Trajetória Artística
                  </h3>
                </div>
                <button
                  onClick={() => setTrajectoryModalOpen(false)}
                  className="p-2.5 hover:bg-white/10 transition-colors focus-visible:outline-none border border-white/20 text-white"
                  aria-label="Fechar trajetória"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 pt-6 text-base md:text-lg leading-relaxed text-neutral-300 font-sans font-normal">
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
                <div className="p-6 bg-white/[0.03] border border-white/15 space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    [ PRINCIPAIS MARCOS & FESTIVAIS ]
                  </h4>
                  <ul className="text-xs space-y-2 text-neutral-200 font-mono font-bold">
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
