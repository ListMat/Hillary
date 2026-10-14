import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export function PKExperience() {
  const { t } = useLanguage();
  const columns = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between py-16 md:py-24 bg-white text-black overflow-hidden selection:bg-black selection:text-white">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-black/10 gap-3">
          <div className="section-top__start text-black">
            <div className="square bg-black" />
            <h3 className="u-text-caps text-black font-bold">{t.experience.title}</h3>
          </div>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest font-bold">
            {t.experience.badge}
          </span>
        </div>

        {/* 9-Column Architectural Framework Container */}
        <div className="relative flex-1 min-h-[460px] md:min-h-[560px] w-full border border-black/15 bg-neutral-50/40 flex flex-col justify-between overflow-hidden">
          {/* Vertical Columns Grid with Top & Bottom Miras */}
          <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 divide-x divide-black/10 pointer-events-none">
            {columns.map((col, idx) => (
              <div
                key={col}
                className={`relative h-full flex flex-col justify-between p-3.5 ${
                  idx >= 4 ? 'hidden sm:flex' : ''
                } ${idx >= 6 ? 'hidden md:flex' : ''}`}
              >
                {/* Top Column Header & Crosshair */}
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400 font-bold">
                  <span>{col}</span>
                  <span className="text-neutral-400 font-bold">+</span>
                </div>

                {/* Center Division Marker */}
                <div className="flex justify-center text-neutral-300 font-mono text-[10px]">
                  |
                </div>

                {/* Bottom Crosshair */}
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 font-bold">
                  <span>+</span>
                  <span className="text-[9px] text-neutral-400">COL-{col}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Staggered Monumental Rows (Aligned relative to the 9-column rhythm) */}
          <div className="relative z-10 w-full h-full flex flex-col justify-around py-8 px-4 sm:px-8 space-y-6">
            {/* Row 1: Aligned to Column 01 */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 pl-2 sm:pl-6 md:pl-8"
            >
              <span className="w-3 h-3 rounded-full bg-black flex-shrink-0 shadow-sm" />
              <h2 className="font-editorial text-[clamp(2.5rem,6.5vw,6.2rem)] font-normal uppercase leading-none tracking-tight text-black select-none">
                Experience
              </h2>
            </motion.div>

            {/* Row 2: Shifted to Column 03 */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 pl-8 sm:pl-20 md:pl-36"
            >
              <span className="w-3 h-3 rounded-full bg-black flex-shrink-0 shadow-sm" />
              <h2 className="font-editorial text-[clamp(2.5rem,6.5vw,6.2rem)] font-normal uppercase leading-none tracking-tight text-black select-none">
                the Pulse
              </h2>
            </motion.div>

            {/* Row 3: Shifted to Column 05 */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 pl-14 sm:pl-32 md:pl-64"
            >
              <span className="w-3 h-3 rounded-full bg-black flex-shrink-0 shadow-sm" />
              <h2 className="font-editorial text-[clamp(2.5rem,6.5vw,6.2rem)] font-normal uppercase leading-none tracking-tight text-black select-none">
                of Cinematic
              </h2>
            </motion.div>

            {/* Row 4: Shifted to Column 07 (Editorial Italic) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 pl-20 sm:pl-44 md:pl-96"
            >
              <span className="w-3 h-3 rounded-full bg-black flex-shrink-0 shadow-sm" />
              <h2 className="font-editorial text-[clamp(2.5rem,6.5vw,6.2rem)] font-light italic uppercase leading-none tracking-tight text-black select-none">
                Light
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Bottom Coordinates & Ratio Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 text-xs font-mono text-neutral-500 uppercase tracking-wider gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            <span className="text-black font-bold">Lat -23.5505° // Long -46.6333°</span>
            <span className="text-neutral-400">· São Paulo, SP</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            [ PROPORÇÃO ANAMÓRFICA 2.39:1 // ANALOG FRAMEWORK ]
          </div>
        </div>
      </div>
    </section>
  );
}
