'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

const photoImages = [
  '/images/hillary-1.jpg',
  '/images/hillary-2.jpg',
  '/images/hillary-3.jpg',
  '/images/hillary-4.jpg',
  '/images/hillary-5.jpg',
];

export function PKDroppingStack() {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  const galleryList = t.gallery.photos.map((item, idx) => ({
    ...item,
    img: photoImages[idx % photoImages.length],
  }));

  const nextPhoto = () => {
    setCurrentIdx((prev) => (prev + 1) % galleryList.length);
    soundEngine?.playClick();
  };

  const prevPhoto = () => {
    setCurrentIdx((prev) => (prev - 1 + galleryList.length) % galleryList.length);
    soundEngine?.playClick();
  };

  const currentPhoto = galleryList[currentIdx] || galleryList[0];

  return (
    <section id="gallery" className="relative w-full min-h-screen flex flex-col justify-between py-16 md:py-24 bg-[#C5C5C5] text-black overflow-hidden selection:bg-black selection:text-white">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-black/20 gap-4">
          <div className="section-top__start text-black">
            <div className="square bg-black" />
            <h3 className="u-text-caps text-black font-bold">{t.gallery.badge}</h3>
          </div>
          <div className="text-black/80 font-sans text-sm md:text-base max-w-md font-normal">
            <p className="p-l">{t.gallery.subtitle}</p>
          </div>
        </div>

        {/* Dropping Stack Center Stage */}
        <div className="relative w-full max-w-3xl mx-auto my-auto py-8 flex flex-col items-center">
          <div className="relative aspect-[4/3] w-full max-w-2xl bg-neutral-900 border border-black/30 shadow-2xl overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, y: -40, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 60, rotate: 4 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={nextPhoto}
              >
                <Image
                  src={currentPhoto.img}
                  alt={currentPhoto.title}
                  fill
                  className="object-cover grayscale contrast-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-xs text-white">
                  <div>
                    <h4 className="font-editorial text-2xl font-light">{currentPhoto.title}</h4>
                    <span className="text-neutral-300">{currentPhoto.location}</span>
                  </div>
                  <span className="bg-black/80 px-2.5 py-1 border border-white/20 font-bold">35MM SCAN</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dropping Stack Controls (Exact Paul Kalkbrenner format) */}
          <div className="w-full max-w-2xl mt-6 pt-4 border-t border-black/20 flex items-center justify-between font-mono text-xs">
            {/* Odometer Count */}
            <div className="flex items-center gap-1 text-black font-bold text-sm">
              <span>{String(currentIdx + 1).padStart(2, '0')}</span>
              <span className="text-black/40">/</span>
              <span className="text-black/60">{String(galleryList.length).padStart(2, '0')}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-6 uppercase tracking-widest text-xs font-bold">
              <button
                onClick={prevPhoto}
                className="text-black/60 hover:text-black transition-colors focus-visible:outline-none"
              >
                Prev
              </button>
              <span className="text-black/30">|</span>
              <button
                onClick={nextPhoto}
                className="text-black hover:opacity-70 transition-opacity focus-visible:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Format Label */}
        <div className="flex justify-between items-center pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
          <span>{t.gallery.dragTip}</span>
          <span>{t.gallery.counterLabel}</span>
        </div>
      </div>
    </section>
  );
}
