import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function PKLifeWorks() {
  return (
    <section id="journey" className="relative w-full min-h-screen flex flex-col justify-between bg-white text-black overflow-hidden selection:bg-black selection:text-white">
      {/* Top Text Content Overlay */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-8 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-black/10 gap-4">
          <div className="section-top__start text-black">
            <div className="square bg-black" />
            <h3 className="u-text-caps text-black font-bold">Life Works & Journey</h3>
          </div>
          <div className="text-neutral-800 font-sans text-base md:text-lg max-w-2xl leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-l"
            >
              Hillary Heidy é uma diretora de fotografia e cineasta brasileira cuja linguagem visual é forjada no estudo da luz analógica, na geometria espacial e no silêncio entre os corpos. Com trajetória em curtas-metragens, ensaios autorais e campanhas cinematográficas, investiga a fronteira onde o rigor técnico encontra a vulnerabilidade humana.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Full-bleed Parallax Media with Monumental Year Counter */}
      <div className="relative w-full flex-1 min-h-[360px] bg-neutral-900 border-y border-black/10 overflow-hidden flex flex-col justify-end group">
        <Image
          src="/images/hillary-5.jpg"
          alt="Hillary Heidy — Trajetória e Obras"
          fill
          className="object-cover grayscale contrast-110 opacity-80 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

        {/* Monumental Year Number */}
        <div className="relative z-10 p-6 md:p-12 flex items-end justify-between w-full max-w-[1600px] mx-auto">
          <div className="overflow-hidden inline-block">
            <motion.span
              initial={{ y: '110%', rotate: 2 }}
              whileInView={{ y: '0%', rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-[clamp(4.5rem,15vw,17rem)] font-light leading-none text-white select-none tracking-tight block"
            >
              2026
            </motion.span>
          </div>
          <span className="font-mono text-xs text-white uppercase tracking-widest bg-black/80 px-3 py-1.5 border border-white/20 mb-4 hidden sm:inline">
            [ SÃO PAULO · BRASIL · 10+ ANOS DE CINEMA ]
          </span>
        </div>
      </div>
    </section>
  );
}
