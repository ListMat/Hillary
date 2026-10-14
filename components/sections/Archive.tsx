'use client';

import React, { useState, useEffect, useCallback, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, X, Layers, SlidersHorizontal, Film, Maximize2, MapPin } from 'lucide-react';
import { archiveItems, ArchiveItem } from '@/data/archive';
import { useCursor } from '@/components/motion/ContextCursor';
import { easeCinema, modalReveal } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Archive() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [activeLayout, setActiveLayout] = useState<'bento' | 'matrix'>('bento');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const { setContextCursor, resetCursor } = useCursor();
  const componentId = useId();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryGridRef = useRef<HTMLDivElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  const categories = ['Todos', 'Retrato', 'Cinema Still', 'Bastidores', 'Experimentação'];

  const filteredItems = activeFilter === 'Todos'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeFilter);

  // GSAP Scrubbed Bento ScrollTrigger logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      if (!containerRef.current || !galleryGridRef.current || activeLayout !== 'bento') return;

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];

      // Master Pinned Scrubbed Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=200%',
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.round(self.progress * 100);
            setScrollProgress(p);

            // Update live cinematic timecode
            if (timecodeRef.current) {
              const totalFrames = Math.round(self.progress * 144);
              const seconds = String(Math.floor(totalFrames / 24)).padStart(2, '0');
              const frames = String(totalFrames % 24).padStart(2, '0');
              timecodeRef.current.innerText = `00:00:${seconds}:${frames}`;
            }

            if (progressTextRef.current) {
              progressTextRef.current.innerText = `${p}%`;
            }

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      if (!isMobile) {
        gsap.set(galleryGridRef.current, {
          perspective: 1200,
          transformStyle: 'preserve-3d',
        });

        // 1. Grid expansion and depth choreography
        tl.fromTo(
          galleryGridRef.current,
          {
            scale: 0.94,
            rotateX: 3.5,
            rotateZ: -0.5,
          },
          {
            scale: 1.05,
            rotateX: 0,
            rotateZ: 0,
            ease: 'power1.inOut',
            duration: 1,
          },
          0
        );

        // 2. Bento cards movement vectors (mimics https://codepen.io/GreenSock/pen/vYMzKZx)
        cards.forEach((card, i) => {
          const img = card.querySelector('.bento-img');
          const badge = card.querySelector('.bento-badge');

          let xOffset = 0;
          let yOffset = 0;
          let rotZ = 0;
          let zOffset = 0;

          if (i === 0) {
            xOffset = 0;
            yOffset = -15;
            zOffset = 40;
          } else if (i === 1) {
            xOffset = -60;
            yOffset = -40;
            rotZ = -2;
            zOffset = -30;
          } else if (i === 2) {
            xOffset = 55;
            yOffset = -50;
            rotZ = 2.5;
            zOffset = -20;
          } else if (i === 3) {
            xOffset = -80;
            yOffset = 30;
            rotZ = -3;
            zOffset = -40;
          } else if (i === 4) {
            xOffset = 70;
            yOffset = 40;
            rotZ = 1.5;
            zOffset = -30;
          } else if (i === 5) {
            xOffset = -40;
            yOffset = 60;
            rotZ = -1.5;
            zOffset = -20;
          } else if (i === 6) {
            xOffset = 60;
            yOffset = 20;
            rotZ = 2;
            zOffset = -25;
          } else if (i === 7) {
            xOffset = 0;
            yOffset = 70;
            rotZ = -1;
            zOffset = -10;
          }

          tl.to(
            card,
            {
              x: xOffset,
              y: yOffset,
              z: zOffset,
              rotateZ: rotZ,
              ease: 'power2.out',
              duration: 1,
            },
            0
          );

          if (img) {
            tl.fromTo(
              img,
              {
                scale: 1.18,
                yPercent: -8,
              },
              {
                scale: 1.02,
                yPercent: 8,
                ease: 'none',
                duration: 1,
              },
              0
            );
          }

          if (badge) {
            tl.fromTo(
              badge,
              { opacity: 0.7 },
              { opacity: 1, duration: 0.5 },
              0.2
            );
          }
        });
      } else {
        cards.forEach((card, i) => {
          const img = card.querySelector('.bento-img');
          tl.to(
            card,
            {
              y: (i % 2 === 0 ? -20 : 20),
              ease: 'power1.out',
              duration: 1,
            },
            0
          );

          if (img) {
            tl.to(
              img,
              {
                scale: 1.05,
                ease: 'none',
                duration: 1,
              },
              0
            );
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [activeLayout, filteredItems]);

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
      className="relative w-full py-20 md:py-32 border-t border-black/[0.14] dark:border-white/[0.16] bg-[#070706] text-white overflow-hidden selection:bg-white selection:text-black"
      aria-label="Arquivo Visual e Fragmentos"
    >
      {/* Top Architectural Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pb-12 border-b border-white/[0.14]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCinema }}
              className="text-eyebrow text-neutral-400 font-mono block mb-3 font-bold"
            >
              [ 04 — ARQUIVO VISUAL · BENTO GALLERY ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeCinema }}
              className="font-editorial text-[clamp(2.8rem,7.5vw,6.5rem)] font-light text-white leading-[0.88]"
            >
              “Fragmentos,
              <br />
              <span className="italic font-normal text-neutral-300">estudos e imagens.”</span>
            </motion.h2>
          </div>

          <div className="space-y-4 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeCinema }}
              className="text-base text-neutral-300 font-normal leading-relaxed font-sans"
            >
              Fotografias, frames, bastidores e experimentações plásticas que compõem o arquivo vivo de pesquisa visual.
            </motion.p>

            {/* Layout Switcher & Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Layout Switcher */}
              <div className="flex items-center bg-neutral-900 border border-white/20 p-1 font-mono text-xs">
                <button
                  onClick={() => setActiveLayout('bento')}
                  className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                    activeLayout === 'bento'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Galeria Bento Scrub"
                >
                  <Layers size={13} />
                  <span>BENTO</span>
                </button>
                <button
                  onClick={() => setActiveLayout('matrix')}
                  className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                    activeLayout === 'matrix'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Matriz Editorial"
                >
                  <SlidersHorizontal size={13} />
                  <span>MATRIZ</span>
                </button>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filtros do Arquivo">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`text-xs uppercase tracking-wider px-3 py-1.5 transition-all duration-300 font-mono border focus-visible:outline-none ${
                      activeFilter === cat
                        ? 'bg-white text-black border-white font-bold shadow-md'
                        : 'bg-neutral-900 text-neutral-300 hover:bg-white hover:text-black border-white/20 font-bold'
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
        </div>
      </div>

      {/* Main Standardized Bento Gallery Display */}
      {activeLayout === 'bento' ? (
        <div
          ref={containerRef}
          className="relative w-full min-h-screen flex flex-col justify-between overflow-visible px-4 md:px-8 lg:px-12 py-8"
        >
          {/* Pinned Viewport Container */}
          <div className="w-full max-w-[1550px] mx-auto my-auto relative">
            <div
              ref={galleryGridRef}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-5 w-full auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[190px] lg:auto-rows-[210px] items-stretch will-change-transform"
            >
              {filteredItems.map((item, idx) => {
                // Standardized Bento Spans
                let colSpan = 'col-span-1 md:col-span-2 lg:col-span-3';
                let rowSpan = 'row-span-1 md:row-span-2';
                let isHero = false;

                if (idx === 0) {
                  colSpan = 'col-span-2 md:col-span-2 lg:col-span-6';
                  rowSpan = 'row-span-2 md:row-span-2 lg:row-span-2';
                  isHero = true;
                } else if (idx === 1) {
                  colSpan = 'col-span-1 md:col-span-2 lg:col-span-3';
                  rowSpan = 'row-span-2 md:row-span-2 lg:row-span-2';
                } else if (idx === 2) {
                  colSpan = 'col-span-1 md:col-span-2 lg:col-span-3';
                  rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1';
                } else if (idx === 3) {
                  colSpan = 'col-span-2 md:col-span-2 lg:col-span-4';
                  rowSpan = 'row-span-1 md:row-span-2 lg:row-span-1';
                } else if (idx === 4) {
                  colSpan = 'col-span-1 md:col-span-2 lg:col-span-4';
                  rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1';
                } else if (idx === 5) {
                  colSpan = 'col-span-1 md:col-span-2 lg:col-span-4';
                  rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1';
                } else if (idx === 6) {
                  colSpan = 'col-span-1 md:col-span-2 lg:col-span-4';
                  rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1';
                } else if (idx === 7) {
                  colSpan = 'col-span-2 md:col-span-2 lg:col-span-8';
                  rowSpan = 'row-span-1 md:row-span-1 lg:row-span-1';
                }

                return (
                  <div
                    key={item.id || `${componentId}-${idx}`}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                      if (isHero) heroCardRef.current = el;
                    }}
                    onClick={() => openLightbox(idx)}
                    onMouseEnter={() => setContextCursor('AMPLIAR', 'gallery')}
                    onMouseLeave={resetCursor}
                    className={`group relative overflow-hidden bg-neutral-950 border border-white/20 hover:border-white/70 transition-colors duration-300 cursor-pointer shadow-2xl rounded-sm ${colSpan} ${rowSpan}`}
                  >
                    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="bento-img object-cover grayscale contrast-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
                        priority={idx < 4}
                      />

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none group-hover:opacity-90 transition-opacity" />

                      {/* Bento Badge */}
                      <div className="bento-badge absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono font-bold tracking-wider text-neutral-300">
                        <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 border border-white/20 uppercase text-white">
                          [{item.number}] {item.category}
                        </span>
                        <span className="bg-black/75 backdrop-blur-md px-2 py-0.5 border border-white/15 text-neutral-300">
                          {item.year}
                        </span>
                      </div>

                      {/* Bento Caption */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1">
                        <h4 className="font-editorial text-sm sm:text-base md:text-lg font-light text-white leading-tight drop-shadow-md">
                          {item.title}
                        </h4>
                        {item.location && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                            <MapPin size={10} className="text-neutral-400" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Center Zoom Icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none z-20">
                        <Maximize2 size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Live Scrub Status HUD */}
          <div className="w-full max-w-[1550px] mx-auto mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>SCRUBBING ENGINE</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-neutral-400">
                <span>TIMECODE:</span>
                <span ref={timecodeRef} className="text-white font-bold">
                  00:00:00:00
                </span>
              </div>
            </div>

            <div className="w-full sm:max-w-md bg-neutral-800/80 h-1.5 rounded-full overflow-hidden border border-white/10 relative">
              <div
                ref={progressBarRef}
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-neutral-400 hidden md:inline">
                ROLE PARA ATIVAR O PARALLAX CINEMATOGRÁFICO
              </span>
              <span ref={progressTextRef} className="text-white font-bold bg-neutral-900 px-2 py-0.5 border border-white/20">
                {scrollProgress}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Matrix Grid View */
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(idx)}
                onMouseEnter={() => setContextCursor('VER', 'gallery')}
                onMouseLeave={resetCursor}
                className="group cursor-pointer bg-neutral-950 border border-white/20 hover:border-white transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-104"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[10px] font-mono uppercase font-bold text-white border border-white/20">
                    [{item.number}] {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2 bg-neutral-900/60 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{item.location || 'ESTÚDIO'}</span>
                    <span>{item.year}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-light text-white">
                    {item.title}
                  </h4>
                  {item.notes && (
                    <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && currentItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/96 p-4 md:p-12 backdrop-blur-2xl">
            {/* Top Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 text-white font-mono text-xs">
              <div className="flex items-center gap-3 bg-neutral-900/90 px-4 py-2 border border-white/20">
                <span className="text-white font-bold">
                  [{String(selectedIdx + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}]
                </span>
                <span className="text-white/40">|</span>
                <span className="uppercase text-neutral-200 font-bold">{currentItem.category}</span>
                {currentItem.year && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-neutral-400">{currentItem.year}</span>
                  </>
                )}
              </div>

              <button
                onClick={closeLightbox}
                className="p-3 bg-neutral-900 hover:bg-white hover:text-black text-white transition-colors focus-visible:outline-none border border-white/20"
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
              className="absolute left-4 md:left-8 z-40 p-4 bg-neutral-900/80 hover:bg-white hover:text-black text-white transition-colors hidden sm:flex items-center justify-center focus-visible:outline-none border border-white/25"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-40 p-4 bg-neutral-900/80 hover:bg-white hover:text-black text-white transition-colors hidden sm:flex items-center justify-center focus-visible:outline-none border border-white/25"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={24} />
            </button>

            {/* Centered Image */}
            <motion.div
              key={currentItem.id}
              variants={modalReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-5xl max-h-[78vh] aspect-[16/10] flex items-center justify-center"
            >
              <div className="relative w-full h-full shadow-2xl border border-white/20 bg-neutral-950">
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
            <div className="absolute bottom-6 left-6 right-6 text-center text-white space-y-1 bg-neutral-900/90 py-4 px-6 border border-white/20 max-w-xl mx-auto backdrop-blur-md">
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
