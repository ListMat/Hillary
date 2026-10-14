'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCursor } from './CursorLabel';

interface BTSItem {
  id: string;
  image: string;
  caption: string;
  format: string;
  tag: string;
}

const btsItems: BTSItem[] = [
  {
    id: 'bts-1',
    image: '/images/hillary-2.jpg',
    caption: 'Set de gravação — Iluminação contínua & 35mm',
    format: '35MM STILL',
    tag: 'Set',
  },
  {
    id: 'bts-2',
    image: '/images/hillary-4.jpg',
    caption: 'Direção de atores e marcação de cena',
    format: 'DIGITAL 4K',
    tag: 'Direção',
  },
  {
    id: 'bts-3',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop',
    caption: 'Checagem de monitor & foco em externa',
    format: 'ALEXA MINI',
    tag: 'Equipamento',
  },
  {
    id: 'bts-4',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    caption: 'Locação ao entardecer na praia',
    format: 'LENTE ANAMÓRFICA',
    tag: 'Locação',
  },
  {
    id: 'bts-5',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
    caption: 'Seleção de negativos e grading preliminar',
    format: 'LABORATÓRIO',
    tag: 'Pós-Produção',
  },
];

export function BehindTheScenes() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const { setCursorText, resetCursor } = useCursor();

  useEffect(() => {
    if (carouselRef.current) {
      setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section
      className="relative w-full py-32 md:py-48 border-t border-black/[0.12] dark:border-white/[0.14] overflow-hidden"
      aria-label="Bastidores e Processo"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mb-12 flex flex-col sm:flex-row justify-between sm:items-end gap-6">
        <div>
          <span className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block mb-2 font-bold">
            [ 08 — PROCESSO & SET / 35MM ]
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-neutral-900 dark:text-neutral-50 leading-none">
            Bastidores de Set
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-bold bg-neutral-200/80 dark:bg-neutral-800 px-3.5 py-1.5 border border-neutral-400 dark:border-neutral-600">
          <span className="w-2 h-2 rounded-full bg-neutral-950 dark:bg-neutral-50 animate-pulse" />
          <span>Arraste para explorar →</span>
        </div>
      </div>

      {/* Draggable Film Strip */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setCursorText('ARRASTAR')}
        onMouseLeave={resetCursor}
        className="w-full cursor-grab active:cursor-grabbing overflow-x-auto no-scrollbar md:overflow-hidden pl-6 md:pl-12 lg:pl-16"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth - 40 }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
          className="flex gap-6 md:gap-10 w-max pb-8"
        >
          {btsItems.map((item, idx) => (
            <div
              key={item.id}
              className="relative w-[300px] sm:w-[380px] md:w-[480px] flex-shrink-0 group select-none"
            >
              {/* Image Frame styled like a 35mm film cell border */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 shadow-cinema border border-black/25 dark:border-white/25">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover grayscale contrast-105 pointer-events-none group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  sizes="(max-width: 768px) 300px, 480px"
                />

                {/* Sprocket / Film Marker details */}
                <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest text-white font-bold bg-black/85 px-2.5 py-0.5 border border-white/20">
                  FRAME #{String(idx + 1).padStart(2, '0')}
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest text-white font-bold bg-black/85 px-2.5 py-0.5 border border-white/20">
                  {item.format}
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 flex justify-between items-baseline text-xs font-mono">
                <span className="text-neutral-900 dark:text-neutral-50 font-bold truncate max-w-[70%]">
                  {item.caption}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-3 py-0.5 border border-neutral-400 dark:border-neutral-600 bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-bold">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

