'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="w-full py-12 md:py-16 px-6 md:px-12 lg:px-16 border-t border-black/[0.14] dark:border-white/[0.16] bg-[#fbf9f5] dark:bg-[#070706]"
      aria-label="Rodapé do site"
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-editorial text-2xl md:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 block">
              Hillary Heidy
            </span>
            <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono mt-1 font-semibold">
              Cinema · Fotografia · Direção
            </p>
          </div>

          {/* Time and Location Indicator */}
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono">
            <div>
              <span>São Paulo, BR</span>
              {time && <span className="ml-2 text-neutral-950 dark:text-neutral-50 font-bold">{time} BRT</span>}
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white font-semibold transition-colors focus-visible:outline-none"
              aria-label="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-700 dark:text-neutral-300 font-mono pt-6 border-t border-black/[0.1] dark:border-white/[0.1] font-medium">
          <p>© 2026 Hillary Heidy. Todos os direitos reservados.</p>
          <p className="mt-2 sm:mt-0">Direção Visual Autoral & Identidade Cinematográfica</p>
        </div>
      </div>
    </footer>
  );
}
