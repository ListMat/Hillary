'use client';

import React, { useRef, useState, useEffect, useId } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryStill } from '@/data/projects';
import { useCursor } from '@/components/motion/ContextCursor';
import { ArrowUpRight, Camera, Film, Layers, Maximize2, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrubbedBentoGalleryProps {
  stills: GalleryStill[];
  projectTitle: string;
  projectNumber: string;
  category: string;
}

export function ScrubbedBentoGallery({
  stills,
  projectTitle,
  projectNumber,
  category,
}: ScrubbedBentoGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryGridRef = useRef<HTMLDivElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  const [activeStillIdx, setActiveStillIdx] = useState<number | null>(null);
  const [activeLayout, setActiveLayout] = useState<'bento' | 'matrix'>('bento');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const { setContextCursor, resetCursor } = useCursor();
  const componentId = useId();

  const activeStill = activeStillIdx !== null ? stills[activeStillIdx] : null;

  // Set up GSAP Scrubbed Bento Animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if reduced motion or very small screen
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      if (!containerRef.current || !galleryGridRef.current || activeLayout !== 'bento') return;

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const hero = heroCardRef.current;

      // Master Scrubbed Timeline pinned to viewport
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

            // Update live cinematic timecode display
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
        // Initial setup for 3D cinematic scrub
        gsap.set(galleryGridRef.current, {
          perspective: 1200,
          transformStyle: 'preserve-3d',
        });

        // 1. Grid expansion and depth choreography
        tl.fromTo(
          galleryGridRef.current,
          {
            scale: 0.94,
            rotateX: 4,
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

        // 2. Bento cards movement vectors (mimics the scrubbed explosion & focal convergence)
        cards.forEach((card, i) => {
          const img = card.querySelector('.bento-img');
          const badge = card.querySelector('.bento-badge');

          // Directional scatter offsets based on grid quadrant
          let xOffset = 0;
          let yOffset = 0;
          let rotZ = 0;
          let zOffset = 0;

          if (i === 0) {
            // Central Hero Card expands to dominate foreground
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

          // Parallax movement on the inner imagery
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
        // Mobile scrub: smooth translation and scale
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
  }, [activeLayout, stills]);

  // Lightbox keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeStillIdx === null) return;
      if (e.key === 'Escape') setActiveStillIdx(null);
      if (e.key === 'ArrowRight') {
        setActiveStillIdx((prev) => (prev !== null ? (prev + 1) % stills.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveStillIdx((prev) => (prev !== null ? (prev - 1 + stills.length) % stills.length : 0));
      }
    };

    if (activeStillIdx !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeStillIdx, stills.length]);

  return (
    <div className="w-full relative bg-[#070706] text-white border-t border-white/[0.14] overflow-hidden selection:bg-white selection:text-black">
      {/* Top Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold mb-3">
            <span className="inline-block w-2 h-2 bg-white animate-pulse" />
            <span>[ 02 — BENTO GALLERY SCRUBBED ]</span>
            <span>·</span>
            <span>PROJETO {projectNumber}</span>
          </div>

          <h2 className="font-editorial text-[clamp(2.4rem,6vw,5.2rem)] font-light text-white tracking-tight leading-[0.92]">
            Galeria de Stills,
            <br />
            <span className="italic font-normal text-neutral-300">texturas & enquadramentos.</span>
          </h2>
        </div>

        {/* Controls & Metadata */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Layout Toggle */}
          <div className="flex items-center bg-neutral-900 border border-white/20 p-1 font-mono text-xs">
            <button
              onClick={() => setActiveLayout('bento')}
              className={`px-3 py-1.5 flex items-center gap-2 transition-colors ${
                activeLayout === 'bento'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Visualização Bento Scrub Interativa"
            >
              <Layers size={14} />
              <span>BENTO SCRUB</span>
            </button>
            <button
              onClick={() => setActiveLayout('matrix')}
              className={`px-3 py-1.5 flex items-center gap-2 transition-colors ${
                activeLayout === 'matrix'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Visualização Matriz Editorial"
            >
              <SlidersHorizontal size={14} />
              <span>MATRIZ</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-neutral-900/80 border border-white/15 px-4 py-2 font-mono text-xs text-neutral-300">
            <Film size={14} className="text-white" />
            <span>{stills.length} STILLS CATALOGADOS</span>
          </div>
        </div>
      </div>

      {/* Main Scrubbed Bento Section View */}
      {activeLayout === 'bento' ? (
        <div
          ref={containerRef}
          className="relative w-full min-h-screen flex flex-col justify-between overflow-visible px-4 md:px-8 lg:px-12 py-8"
        >
          {/* Pinned Viewport Container */}
          <div className="w-full max-w-[1500px] mx-auto my-auto relative">
            {/* Bento Grid Layer */}
            <div
              ref={galleryGridRef}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-5 w-full auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[190px] lg:auto-rows-[210px] items-stretch will-change-transform"
            >
              {stills.map((still, idx) => {
                // Determine responsive Bento cell spans
                let colSpan = 'col-span-1 md:col-span-2 lg:col-span-3';
                let rowSpan = 'row-span-1 md:row-span-2';
                let isHero = false;

                if (idx === 0) {
                  // Central / Monumental Hero Bento Card
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
                    key={still.id || `${componentId}-${idx}`}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                      if (isHero) heroCardRef.current = el;
                    }}
                    onClick={() => setActiveStillIdx(idx)}
                    onMouseEnter={() => setContextCursor('AMPLIAR', 'gallery')}
                    onMouseLeave={resetCursor}
                    className={`group relative overflow-hidden bg-neutral-950 border border-white/20 hover:border-white/60 transition-colors duration-300 cursor-pointer shadow-2xl rounded-sm ${colSpan} ${rowSpan}`}
                  >
                    {/* Inner image with scale and parallax */}
                    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                      <Image
                        src={still.image}
                        alt={still.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="bento-img object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        priority={idx < 4}
                      />

                      {/* Filmic Grain & Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none group-hover:opacity-90 transition-opacity" />

                      {/* Bento Card Top Badge */}
                      <div className="bento-badge absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono font-bold tracking-wider text-neutral-300">
                        <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 border border-white/20 uppercase text-white">
                          [{String(idx + 1).padStart(2, '0')}] {still.tag || 'FRAME'}
                        </span>
                        {still.lens && (
                          <span className="bg-black/75 backdrop-blur-md px-2 py-0.5 border border-white/15 hidden sm:inline-block text-neutral-300">
                            {still.lens}
                          </span>
                        )}
                      </div>

                      {/* Bento Card Bottom Caption */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1">
                        <h4 className="font-editorial text-sm sm:text-base md:text-lg font-light text-white leading-tight drop-shadow-md group-hover:text-white transition-colors">
                          {still.title}
                        </h4>
                        {still.format && (
                          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
                            {still.format}
                          </div>
                        )}
                      </div>

                      {/* Interactive Hover Expand Icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none z-20">
                        <Maximize2 size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Live Scrub HUD / Status Bar */}
          <div className="w-full max-w-[1500px] mx-auto mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
            {/* Left: Interactive Scrub Tracker */}
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

            {/* Middle: Progress Bar */}
            <div className="w-full sm:max-w-md bg-neutral-800/80 h-1.5 rounded-full overflow-hidden border border-white/10 relative">
              <div
                ref={progressBarRef}
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Right: Percentage & Hints */}
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
            {stills.map((still, idx) => (
              <div
                key={still.id || idx}
                onClick={() => setActiveStillIdx(idx)}
                onMouseEnter={() => setContextCursor('VER', 'gallery')}
                onMouseLeave={resetCursor}
                className="group cursor-pointer bg-neutral-950 border border-white/20 hover:border-white transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={still.image}
                    alt={still.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-104"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[10px] font-mono uppercase font-bold text-white border border-white/20">
                    FRAME [{String(idx + 1).padStart(2, '0')}]
                  </div>
                </div>

                <div className="p-5 space-y-2 bg-neutral-900/60 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{still.tag || category}</span>
                    <span>{still.lens}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-light text-white">
                    {still.title}
                  </h4>
                  {still.caption && (
                    <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                      {still.caption}
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
        {activeStillIdx !== null && activeStill && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/98 p-4 md:p-12 backdrop-blur-2xl">
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 text-white font-mono text-xs">
              <div className="flex items-center gap-3 bg-neutral-900/90 px-4 py-2 border border-white/20">
                <span className="text-white font-bold">
                  [{String(activeStillIdx + 1).padStart(2, '0')} / {String(stills.length).padStart(2, '0')}]
                </span>
                <span className="text-white/40">|</span>
                <span className="uppercase text-neutral-300 font-bold">{projectTitle}</span>
                {activeStill.tag && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-emerald-400 font-bold">{activeStill.tag}</span>
                  </>
                )}
              </div>

              <button
                onClick={() => setActiveStillIdx(null)}
                className="p-3 bg-neutral-900 hover:bg-white hover:text-black text-white transition-colors focus-visible:outline-none border border-white/20"
                aria-label="Fechar visualizador"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveStillIdx((prev) => (prev !== null ? (prev - 1 + stills.length) % stills.length : 0));
              }}
              className="absolute left-4 md:left-8 z-40 p-4 bg-neutral-900/80 hover:bg-white hover:text-black text-white transition-colors hidden sm:flex items-center justify-center border border-white/25"
              aria-label="Still anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveStillIdx((prev) => (prev !== null ? (prev + 1) % stills.length : 0));
              }}
              className="absolute right-4 md:right-8 z-40 p-4 bg-neutral-900/80 hover:bg-white hover:text-black text-white transition-colors hidden sm:flex items-center justify-center border border-white/25"
              aria-label="Próximo still"
            >
              <ChevronRight size={24} />
            </button>

            {/* Center Image */}
            <motion.div
              key={activeStill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl max-h-[75vh] aspect-[16/10] flex items-center justify-center"
            >
              <div className="relative w-full h-full shadow-2xl border border-white/20 bg-neutral-950">
                <Image
                  src={activeStill.image}
                  alt={activeStill.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Bottom Metadata Card */}
            <div className="absolute bottom-6 left-6 right-6 max-w-2xl mx-auto bg-neutral-900/90 p-5 border border-white/20 text-center space-y-2 backdrop-blur-md">
              <h3 className="font-editorial text-2xl font-light text-white">
                {activeStill.title}
              </h3>
              {activeStill.caption && (
                <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                  {activeStill.caption}
                </p>
              )}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono uppercase text-neutral-400">
                {activeStill.lens && (
                  <span className="bg-black/60 px-2.5 py-1 border border-white/10">
                    LENTE: <strong className="text-white">{activeStill.lens}</strong>
                  </span>
                )}
                {activeStill.format && (
                  <span className="bg-black/60 px-2.5 py-1 border border-white/10">
                    FORMATO: <strong className="text-white">{activeStill.format}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
