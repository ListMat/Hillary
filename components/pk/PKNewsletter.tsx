'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

const stripPhotos = [
  '/images/hillary-1.jpg',
  '/images/hillary-2.jpg',
  '/images/hillary-3.jpg',
  '/images/hillary-4.jpg',
  '/images/hillary-5.jpg',
];

export function PKNewsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    soundEngine?.playClick();
  };

  return (
    <section id="newsletter" className="relative w-full min-h-screen flex flex-col justify-between py-16 md:py-24 bg-[#FF6831] text-black selection:bg-black selection:text-white">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Section Top Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-black/20 items-start">
          <div className="md:col-span-4 section-top__start text-black">
            <div className="square bg-black" />
            <h3 className="u-text-caps text-black font-bold">{t.newsletter.badge}</h3>
          </div>
          <div className="md:col-span-8">
            <h2 className="h-m text-black leading-tight font-normal">
              {t.newsletter.title}
            </h2>
          </div>
        </div>

        {/* Continuous Auto-Scrolling Image Strip Marquee (Paul Kalkbrenner exact style) */}
        <div className="py-8 overflow-hidden w-full my-auto">
          <div className="flex space-x-6 animate-pulse w-max">
            {stripPhotos.concat(stripPhotos).map((src, i) => (
              <div
                key={`strip-${i}`}
                className="relative w-48 sm:w-64 aspect-[4/3] flex-shrink-0 bg-black border border-black/30 overflow-hidden shadow-2xl"
              >
                <Image
                  src={src}
                  alt="Hillary Heidy — 35mm Strip"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Dispatch Form */}
        <div className="max-w-2xl pt-6 border-t border-black/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="flex-1 bg-white text-black border border-black/30 px-5 py-3.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-black font-sans shadow-md"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-2xl"
              >
                {submitted ? t.newsletter.btnSuccess : t.newsletter.btnSubscribe}
              </button>
            </div>

            {submitted ? (
              <div className="flex items-center gap-2 text-xs font-mono text-black font-bold">
                <Check size={14} className="stroke-[3]" />
                <span>{t.newsletter.btnSuccess}</span>
              </div>
            ) : (
              <p className="text-[11px] font-mono text-black/75">
                {t.newsletter.privacy}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
