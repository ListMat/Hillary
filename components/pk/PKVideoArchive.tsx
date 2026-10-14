'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Play, X, Film } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

interface VideoArchiveItem {
  id: string;
  title: string;
  duration: string;
  totalSeconds: number;
  thumbnail: string;
  scenes: string[];
  credits: string;
  videoUrl?: string;
}

const archiveVideos: VideoArchiveItem[] = [
  {
    id: 'v-1',
    title: 'Silêncio das Águas — Trailer Oficial',
    duration: '03:45',
    totalSeconds: 225,
    thumbnail: '/images/hillary-1.jpg',
    scenes: [
      '/images/hillary-1.jpg',
      '/images/hillary-2.jpg',
      '/images/hillary-3.jpg',
      '/images/hillary-4.jpg',
    ],
    credits: 'Direção: Hillary Heidy · Fotografia: 35mm Película · Edição de Som: Dolby 5.1',
  },
  {
    id: 'v-2',
    title: 'Corpo e Concreto — Documentário Curto',
    duration: '05:20',
    totalSeconds: 320,
    thumbnail: '/images/hillary-2.jpg',
    scenes: [
      '/images/hillary-2.jpg',
      '/images/hillary-3.jpg',
      '/images/hillary-4.jpg',
      '/images/hillary-5.jpg',
    ],
    credits: 'Direção & Fotografia: Hillary Heidy · Produção: Estúdio Paulistano',
  },
  {
    id: 'v-3',
    title: 'Aurora Sintética — Fashion Film Oficial',
    duration: '02:15',
    totalSeconds: 135,
    thumbnail: '/images/hillary-3.jpg',
    scenes: [
      '/images/hillary-3.jpg',
      '/images/hillary-4.jpg',
      '/images/hillary-5.jpg',
      '/images/hillary-1.jpg',
    ],
    credits: 'Direção de Fotografia: Hillary Heidy · Câmera: ARRI Alexa 35 · Cor: DaVinci Resolve',
  },
  {
    id: 'v-4',
    title: 'Ensaios Noturnos — Fragmentos de Luz',
    duration: '04:10',
    totalSeconds: 250,
    thumbnail: '/images/hillary-4.jpg',
    scenes: [
      '/images/hillary-4.jpg',
      '/images/hillary-5.jpg',
      '/images/hillary-1.jpg',
      '/images/hillary-2.jpg',
    ],
    credits: 'Fotografia Autoral · Iluminação Prática de Set',
  },
];

export function PKVideoArchive() {
  const { t } = useLanguage();
  const [selectedVideoIdx, setSelectedVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0.25);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const currentVideo = archiveVideos[selectedVideoIdx];
  const playerRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);

  // Magnetic button spring physics
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 220, damping: 18 });
  const springY = useSpring(magnetY, { stiffness: 220, damping: 18 });

  const handlePlayerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = playerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate magnetic pull offset (max 35px in each direction)
    const pullFactor = 0.25;
    const dx = Math.max(-35, Math.min(35, (e.clientX - centerX) * pullFactor));
    const dy = Math.max(-35, Math.min(35, (e.clientY - centerY) * pullFactor));

    magnetX.set(dx);
    magnetY.set(dy);
  };

  const handlePlayerMouseLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  // Scrubber calculation: maps mouse position to timecode & active scene frame
  const handleScrubberMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setScrubProgress(progress);
  };

  // Active scene index based on scrubber percentage
  const sceneIdx = Math.min(
    currentVideo.scenes.length - 1,
    Math.floor(scrubProgress * currentVideo.scenes.length)
  );
  const activeImage = currentVideo.scenes[sceneIdx];

  // Format real-time timecode from scrub percentage
  const currentSecs = Math.floor(scrubProgress * currentVideo.totalSeconds);
  const mins = String(Math.floor(currentSecs / 60)).padStart(2, '0');
  const secs = String(currentSecs % 60).padStart(2, '0');
  const frames = String(Math.floor((scrubProgress * 24 * currentVideo.totalSeconds) % 24)).padStart(2, '0');
  const timecodeString = `00:${mins}:${secs}:${frames}`;

  return (
    <section id="video-archive" className="relative w-full min-h-screen flex flex-col justify-between py-16 md:py-24 bg-[#050505] text-white selection:bg-white selection:text-black">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-white/10 gap-4">
          <div className="section-top__start">
            <div className="square bg-white" />
            <h3 className="u-text-caps text-white">{t.videoArchive.badge}</h3>
          </div>
          <div className="text-neutral-400 font-sans text-sm md:text-base max-w-md">
            <p className="p-l">{t.videoArchive.subtitle}</p>
          </div>
        </div>

        {/* Main Stage Grid (Counter / Video Frame with Scrubber / Credits) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-start">
          {/* Col 1: Oversized Counter */}
          <div className="lg:col-span-2">
            <span className="h-d text-white/40 block font-light">
              {String(selectedVideoIdx + 1).padStart(2, '0')}
              <span className="text-white/20">/{String(archiveVideos.length).padStart(2, '0')}</span>
            </span>
            <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest mt-2 hidden lg:block">
              {t.videoArchive.tag}
            </div>
          </div>

          {/* Col 2: Main Video Player Box with Scrubber & Magnetic Play */}
          <div className="lg:col-span-7 space-y-4">
            <div
              ref={playerRef}
              onMouseMove={handlePlayerMouseMove}
              onMouseLeave={handlePlayerMouseLeave}
              className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 border border-white/20 shadow-2xl group cursor-pointer"
              onClick={() => {
                setIsPlaying(true);
                soundEngine?.playClick();
              }}
            >
              {/* Dynamic Scrubbed Scene Still */}
              <Image
                src={activeImage}
                alt={currentVideo.title}
                fill
                className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Magnetic Play Button */}
              <motion.div
                style={{ x: springX, y: springY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform pointer-events-none z-20"
              >
                <Play size={24} className="fill-black ml-1" />
              </motion.div>

              {/* Top Video Header HUD */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center font-mono text-[10px] text-white/80 tracking-widest pointer-events-none z-20">
                <span className="bg-black/80 px-2.5 py-1 border border-white/20 flex items-center gap-1.5">
                  <Film size={12} className="text-white" />
                  <span>[ SCENE {sceneIdx + 1}/4 // TAKE 0{sceneIdx + 1} ]</span>
                </span>
                <span className="bg-black/80 px-2.5 py-1 border border-white/20 font-bold text-white">
                  {timecodeString}
                </span>
              </div>
            </div>

            {/* Interactive Scene Scrubber Timeline (DaVinci / Premiere Studio Bar) */}
            <div
              ref={scrubberRef}
              onMouseMove={handleScrubberMove}
              onMouseEnter={() => setIsScrubbing(true)}
              onMouseLeave={() => setIsScrubbing(false)}
              onClick={(e) => {
                handleScrubberMove(e);
                soundEngine?.playClick();
              }}
              className="w-full pt-2 pb-1 cursor-ew-resize group"
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pb-1.5 uppercase tracking-widest">
                <span className="text-white font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{t.videoArchive.scrubberTitle}</span>
                </span>
                <span>{timecodeString} / {currentVideo.duration}</span>
              </div>

              {/* Scrubber Track */}
              <div className="relative w-full h-3 bg-neutral-800 border border-white/20 overflow-hidden">
                {/* 4 Scene Marker Segments */}
                <div className="absolute inset-0 grid grid-cols-4 divide-x divide-white/20 pointer-events-none z-0" />

                {/* Active Progress Fill */}
                <div
                  style={{ width: `${scrubProgress * 100}%` }}
                  className="h-full bg-white transition-all duration-75 relative z-10"
                />
              </div>
            </div>

            {/* Title & Format Description */}
            <h4 className="font-editorial text-2xl md:text-3xl text-white font-light pt-1">
              {currentVideo.title}
            </h4>
          </div>

          {/* Col 3: Technical Credits Box */}
          <div className="lg:col-span-3 p-6 bg-neutral-900/60 border border-white/10 space-y-4 font-mono text-xs text-neutral-300">
            <span className="text-white block font-bold uppercase tracking-wider">{t.videoArchive.creditsTitle}</span>
            <p className="leading-relaxed text-neutral-300">{currentVideo.credits}</p>
            <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-neutral-400">
              <p>{t.videoArchive.pelicula}</p>
              <p>{t.videoArchive.aspectRatio}</p>
              <p>{t.videoArchive.master}</p>
            </div>
          </div>
        </div>

        {/* Bottom Video Selector List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
          {archiveVideos.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedVideoIdx(idx);
                setScrubProgress(0.25);
                soundEngine?.playClick();
              }}
              className={`relative aspect-[16/9] w-full overflow-hidden border text-left p-2 transition-all duration-300 ${
                idx === selectedVideoIdx ? 'border-white bg-neutral-900 shadow-2xl' : 'border-white/15 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-[10px] text-white font-bold">
                <span className="truncate pr-2">{item.title}</span>
                <span>{item.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Video Player Lightbox */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-2xl">
            <div className="relative w-full max-w-5xl aspect-[16/9] bg-black border border-white/20 shadow-2xl flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-neutral-300 font-mono text-xs uppercase tracking-widest flex items-center gap-1"
              >
                <span>{t.videoArchive.closeBtn}</span>
                <X size={18} />
              </button>

              <div className="text-center space-y-4 font-mono text-white p-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-white/25 flex items-center justify-center animate-pulse">
                  <Play size={24} className="fill-white ml-1" />
                </div>
                <h3 className="font-editorial text-3xl font-light">{currentVideo.title}</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto font-sans">{currentVideo.credits}</p>
                <div className="text-[11px] text-neutral-500">{t.videoArchive.privateSession}</div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
