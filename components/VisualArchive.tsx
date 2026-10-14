'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { archiveItems } from '@/data/archive';
import { useCursor } from './CursorLabel';
import { easeCinema, modalTransition } from '@/lib/motion';

export function VisualArchive() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const { setCursorText, resetCursor } = useCursor();

  const categories = ['Todos', 'Retrato', 'Cinema Still', 'Bastidores', 'Experimentação'];

  const filteredItems = activeFilter === 'Todos'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
    resetCursor();
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextImage = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % filteredItems.length);
  }, [selectedIdx, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedIdx, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdx, nextImage, prevImage]);

  const currentItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  return (
    <section
      id="arquivo"
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14]"
      aria-label="Arquivo Visual e Fragmentos"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 md:pb-24 border-b border-black/[0.14] dark:border-white/[0.16] gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCinema }}
              className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block mb-3 font-bold"
            >
              [ 05 — ARQUIVO VISUAL ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeCinema }}
              className="font-editorial text-fluid-title font-light text-neutral-900 dark:text-neutral-50 leading-[0.88]"
            >
              “Fragmentos,
              <br />
              <span className="italic font-normal">estudos e imagens.”</span>
            </motion.h2>
          </div>

          <div className="space-y-4 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeCinema }}
              className="text-base text-neutral-800 dark:text-neutral-200 font-light leading-relaxed font-sans"
            >
              Fotografias, frames, bastidores e experimentações plásticas que compõem o arquivo vivo de pesquisa visual.
            </motion.p>

            {/* Filter tabs with high contrast */}
            <div className="flex flex-wrap gap-2 pt-2" role="tablist" aria-label="Filtros do Arquivo">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 font-mono border focus-visible:outline-none ${
                    activeFilter === cat
                      ? 'bg-neutral-900 text-neutral-50 border-neutral-900 dark:bg-neutral-50 dark:text-neutral-950 dark:border-white font-bold shadow-sm'
                      : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white border-neutral-400 dark:border-neutral-600 font-bold'
                  }`}
                  role="tab"
                  aria-selected={activeFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 mt-20 md:mt-28 items-start">
          {filteredItems.map((item, idx) => {
            let colSpan = 'md:col-span-6 lg:col-span-4';
            let aspectRatio = 'aspect-[4/5]';
            let marginTop = '';

            if (idx % 5 === 0) {
              colSpan = 'md:col-span-12 lg:col-span-7';
              aspectRatio = 'aspect-[16/10]';
            } else if (idx % 5 === 1) {
              colSpan = 'md:col-span-6 lg:col-span-5';
              aspectRatio = 'aspect-[3/4]';
              marginTop = 'md:mt-20';
            } else if (idx % 5 === 2) {
              colSpan = 'md:col-span-6 lg:col-span-4';
              aspectRatio = 'aspect-[4/5]';
            } else if (idx % 5 === 3) {
              colSpan = 'md:col-span-6 lg:col-span-4';
              aspectRatio = 'aspect-[1/1]';
              marginTop = 'md:-mt-16';
            } else if (idx % 5 === 4) {
              colSpan = 'md:col-span-12 lg:col-span-4';
              aspectRatio = 'aspect-[3/4]';
              marginTop = 'md:mt-10';
            }

            return (
              <div
                key={item.id}
                className={`${colSpan} ${marginTop}`}
                onClick={() => openLightbox(idx)}
                onMouseEnter={() => setCursorText('ABRIR')}
                onMouseLeave={resetCursor}
              >
                <div className="group relative w-full cursor-pointer overflow-hidden bg-neutral-950 shadow-cinema border border-black/20 dark:border-white/20 transition-all duration-500">
                  <div className={`relative w-full ${aspectRatio} overflow-hidden bg-neutral-950`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale contrast-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-104 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 media-scrim opacity-0 group-hover:opacity-100 transition-opacity duration-350 p-6 flex flex-col justify-between text-white pointer-events-none">
                      <div className="flex justify-between items-center font-mono text-xs text-white font-bold bg-black/75 px-3 py-1 w-max border border-white/20">
                        <span>[{item.number}]</span>
                        <span className="ml-3">{item.year}</span>
                      </div>

                      <div className="space-y-1 bg-black/85 p-3.5 border border-white/20">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-300 block font-mono font-bold">
                          {item.category}
                        </span>
                        <h4 className="font-editorial text-2xl font-light text-white">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Caption for mobile view */}
                  <div className="p-3.5 flex justify-between items-center text-xs text-neutral-900 dark:text-neutral-100 font-mono md:hidden bg-neutral-100 dark:bg-neutral-900 border-t border-black/10">
                    <span className="font-bold text-neutral-950 dark:text-neutral-50">{item.title}</span>
                    <span className="font-bold">{item.year}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && currentItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/96 p-4 md:p-12 backdrop-blur-2xl">
            {/* Top Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 text-white font-mono text-xs">
              <div className="flex items-center gap-3 bg-black/85 px-4 py-2 border border-white/20">
                <span className="text-white font-bold">
                  [{String(selectedIdx + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}]
                </span>
                <span className="text-white/40">|</span>
                <span className="uppercase text-neutral-200 font-bold">{currentItem.category}</span>
              </div>

              <button
                onClick={closeLightbox}
                className="p-3 bg-white/15 hover:bg-white/30 text-white transition-colors focus-visible:outline-none border border-white/20"
                aria-label="Fechar galeria"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 md:left-8 z-40 p-4 bg-black/80 hover:bg-black text-white transition-colors hidden sm:flex items-center justify-center focus-visible:outline-none border border-white/25"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-40 p-4 bg-black/80 hover:bg-black text-white transition-colors hidden sm:flex items-center justify-center focus-visible:outline-none border border-white/25"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={24} />
            </button>

            {/* Centered Image */}
            <motion.div
              key={currentItem.id}
              variants={modalTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-5xl max-h-[78vh] aspect-[16/10] flex items-center justify-center"
            >
              <div className="relative w-full h-full shadow-cinema border border-white/20">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-6 left-6 right-6 text-center text-white space-y-1 bg-black/85 py-3 px-5 border border-white/20 max-w-xl mx-auto">
              <h3 className="font-editorial text-xl md:text-2xl font-light text-white">
                {currentItem.title}
              </h3>
              {currentItem.notes && (
                <p className="text-xs text-neutral-300 font-mono font-medium">
                  {currentItem.notes} {currentItem.location && `— [${currentItem.location}]`}
                </p>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

