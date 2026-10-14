'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X, Maximize2 } from 'lucide-react';
import { useCursor } from '@/components/motion/ContextCursor';
import { easeCinema, modalReveal } from '@/lib/motion';
import { startViewTransition } from '@/lib/viewTransition';

export function Reel() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const { setContextCursor, resetCursor } = useCursor();

  const reelVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4';
  const reelPoster = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const openLightbox = () => {
    startViewTransition(() => {
      setIsLightboxOpen(true);
    });
    resetCursor();
  };

  const closeLightbox = () => {
    startViewTransition(() => {
      setIsLightboxOpen(false);
    });
  };

  return (
    <section
      id="reel"
      className="relative w-full bg-[#070706] text-neutral-50 py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-white/[0.14]"
      aria-label="Reel Cinematográfico"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header with Specified Copy from Etapa 13 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 md:pb-24 border-b border-white/[0.16] gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCinema }}
              className="text-eyebrow text-neutral-400 font-mono block mb-3 font-bold"
            >
              [ 03 — CINEMA & MOVIMENTO ]
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: easeCinema }}
              className="font-editorial text-[clamp(2.8rem,7vw,6.5rem)] font-light text-white tracking-tight leading-[0.9] max-w-4xl"
            >
              Histórias também
              <br />
              <span className="italic font-normal text-neutral-200">existem em movimento.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeCinema }}
            className="space-y-2 max-w-md"
          >
            <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed font-sans">
              Compilação de trabalhos autorais, direção de fotografia, projetos comerciais e experimentações cinematográficas em 35mm.
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              4K DCI · 24FPS · SOUND DESIGN MASTER
            </p>
          </motion.div>
        </div>

        {/* 16:9 / 21:9 Cinema Console Frame */}
        <div className="relative mt-16 md:mt-24 w-full">
          <div
            onClick={openLightbox}
            onMouseEnter={() => {
              setIsHovered(true);
              setContextCursor('PLAY', 'video');
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              resetCursor();
            }}
            className="group relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-neutral-900 cursor-pointer border border-white/25 shadow-2xl"
          >
            {/* Corner Crosshairs */}
            <div className="pointer-events-none absolute top-3 left-3 z-20 text-white/50 font-mono text-[10px] select-none font-bold">
              [ + ] CAM A · 35MM SCAN
            </div>
            <div className="pointer-events-none absolute top-3 right-3 z-20 text-white/50 font-mono text-[10px] select-none font-bold">
              24.00 FPS · 4K DCI [ + ]
            </div>
            <div className="pointer-events-none absolute bottom-3 left-3 z-20 text-white/50 font-mono text-[10px] select-none font-bold">
              [ + ] COLOR PROFILE: ARRI LOG-C
            </div>

            {/* Inline Video Player */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={reelPoster}
              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-104 brightness-95 group-hover:brightness-100"
            >
              <source src={reelVideoUrl} type="video/mp4" />
            </video>

            {/* High Contrast Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Central Play Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.3, ease: easeCinema }}
                className="flex items-center gap-3.5 px-8 py-4 bg-black/85 hover:bg-black text-white backdrop-blur-md border border-white/30 font-mono text-xs uppercase tracking-widest shadow-2xl font-bold"
              >
                <Play size={14} className="fill-white text-white" />
                <span>ASSISTIR SHOWREEL</span>
              </motion.div>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-5 right-6 flex items-center gap-3 pointer-events-auto z-20">
              <button
                onClick={toggleMute}
                className="p-3 bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/25 transition-colors focus-visible:outline-none"
                aria-label={isMuted ? 'Ativar áudio' : 'Mutar áudio'}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <button
                onClick={openLightbox}
                className="p-3 bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/25 transition-colors focus-visible:outline-none"
                aria-label="Assistir em tela cheia"
              >
                <Maximize2 size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Theater Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/96 p-4 md:p-8 backdrop-blur-2xl">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3.5 bg-white/15 hover:bg-white/30 text-white transition-colors focus-visible:outline-none border border-white/20"
              aria-label="Fechar vídeo"
            >
              <X size={22} />
            </button>

            {/* Video Box */}
            <motion.div
              variants={modalReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-6xl aspect-[16/9] bg-black shadow-2xl border border-white/20 overflow-hidden"
            >
              <video
                ref={lightboxVideoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                <source src={reelVideoUrl} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
