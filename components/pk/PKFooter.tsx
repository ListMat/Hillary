'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

export function PKFooter() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundEngine?.playClick();
  };

  return (
    <footer id="contact" className="w-full min-h-[50vh] md:min-h-screen flex flex-col justify-between py-16 md:py-24 px-6 md:px-12 bg-white text-black selection:bg-black selection:text-white">
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col justify-between space-y-16">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1: Links */}
          <div className="space-y-4">
            <h3 className="p-s u-text-caps text-black font-bold">{t.footer.navTitle}</h3>
            <ul className="space-y-2 font-mono text-xs">
              <li><a href="#recordings" className="text-neutral-600 hover:text-black transition-colors">{t.nav.works}</a></li>
              <li><a href="#tour" className="text-neutral-600 hover:text-black transition-colors">{t.nav.tour}</a></li>
              <li><a href="#gallery" className="text-neutral-600 hover:text-black transition-colors">{t.nav.gallery}</a></li>
              <li><a href="#video-archive" className="text-neutral-600 hover:text-black transition-colors">{t.nav.archive}</a></li>
            </ul>
          </div>

          {/* Col 2: Disciplines */}
          <div className="space-y-4">
            <h3 className="p-s u-text-caps text-black font-bold">{t.footer.disciplinesTitle}</h3>
            <ul className="space-y-2 font-mono text-xs">
              {t.footer.disciplines.map((item, idx) => (
                <li key={idx}><span className="text-neutral-600">{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Col 3: Follow */}
          <div className="space-y-4">
            <h3 className="p-s u-text-caps text-black font-bold">{t.footer.followTitle}</h3>
            <ul className="space-y-2 font-mono text-xs">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-black transition-colors">Instagram</a></li>
              <li><a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-black transition-colors">Vimeo</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-black transition-colors">LinkedIn</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-black transition-colors">YouTube</a></li>
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div className="space-y-4">
            <h3 className="p-s u-text-caps text-black font-bold">{t.footer.contactTitle}</h3>
            <div className="space-y-2 font-mono text-xs">
              <a href="mailto:contato@hillaryheidy.com" className="text-black hover:underline block font-bold">
                contato@hillaryheidy.com
              </a>
              <p className="text-neutral-600">{t.footer.location}</p>
              <button
                onClick={scrollToTop}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-black hover:opacity-75 font-bold uppercase tracking-wider"
              >
                <span>{t.footer.backToTop}</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row with Copyright and Geometric SVG Mark */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-black/10 text-xs font-mono text-neutral-500 gap-4">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest text-[11px]">{t.hero.location}</span>
            <svg width="20" height="20" viewBox="0 0 25 25" fill="none" className="animate-spin duration-1000 text-black">
              <path
                d="M12.5 0L15.5 9.5L25 12.5L15.5 15.5L12.5 25L9.5 15.5L0 12.5L9.5 9.5L12.5 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
