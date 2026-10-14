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
      className="w-full py-12 md:py-16 px-6 md:px-12 lg:px-16 border-t border-white/15 bg-[#050505] text-white selection:bg-white selection:text-black"
      aria-label="Rodapé do site"
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-editorial text-2xl md:text-3xl font-light tracking-tight text-white block">
              Hillary Heidy
            </span>
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mt-1 font-bold">
              Cinema · Fotografia · Direção · Produção
            </p>
          </div>

          {/* Time and Location Indicator */}
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">
            <div>
              <span>São Paulo, BR</span>
              {time && <span className="ml-2 text-white font-bold">{time} BRT</span>}
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-white font-bold hover:text-neutral-300 transition-colors focus-visible:outline-none"
              aria-label="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp
                size={15}
                className="group-hover:-translate-y-0.5 transition-transform stroke-[2.5]"
              />
            </button>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 font-mono pt-6 border-t border-white/10 font-bold">
          <p>© 2026 Hillary Heidy. Todos os direitos reservados.</p>
          <p className="mt-2 sm:mt-0">Direção Visual Autoral & Identidade Cinematográfica</p>
        </div>
      </div>
    </footer>
  );
}
