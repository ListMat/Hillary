'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

export function EdgeFrame() {
  const [time, setTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!soundEngine) return;
    const unsub = soundEngine.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    if (soundEngine) {
      soundEngine.toggleMute();
    }
  };

  const navLinks = [
    { label: '01 // DISCIPLINAS', href: '#disciplinas' },
    { label: '02 // TRABALHOS', href: '#trabalhos' },
    { label: '03 // SHOWREEL', href: '#reel' },
    { label: '04 // ARQUIVO BENTO', href: '#arquivo' },
    { label: '05 // SOBRE', href: '#sobre' },
    { label: '06 // CONTATO', href: '#contato' },
  ];

  return (
    <>
      {/* =========================================================================
          PERIMETER CORNER CROSSHAIRS & TECHNICAL MARKS
          ========================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-40 select-none">
        {/* Top-Left Crosshair */}
        <div className="absolute top-3 left-3 text-white/40 font-mono text-[11px] leading-none">
          +
        </div>
        {/* Top-Right Crosshair */}
        <div className="absolute top-3 right-3 text-white/40 font-mono text-[11px] leading-none">
          +
        </div>
        {/* Bottom-Left Crosshair */}
        <div className="absolute bottom-3 left-3 text-white/40 font-mono text-[11px] leading-none">
          +
        </div>
        {/* Bottom-Right Crosshair */}
        <div className="absolute bottom-3 right-3 text-white/40 font-mono text-[11px] leading-none">
          +
        </div>
      </div>

      {/* =========================================================================
          TOP CORNER UNITS
          ========================================================================= */}
      {/* Top Left: Identity & Live Status */}
      <div className="fixed top-0 left-0 z-50 p-4 md:p-6 select-none">
        <a
          href="#"
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white hover:text-neutral-300 transition-colors focus-visible:outline-none"
        >
          <span className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/20 font-bold shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>HILLARY HEIDY</span>
            <span className="text-neutral-400 hidden sm:inline">// LIVE ON SET</span>
          </span>
        </a>
      </div>

      {/* Top Right: Clock & Menu Trigger */}
      <div className="fixed top-0 right-0 z-50 p-4 md:p-6 select-none flex items-center gap-3">
        {/* Live São Paulo Clock */}
        <div className="hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/20 font-mono text-xs text-neutral-300 font-bold shadow-lg">
          <span className="text-neutral-500">SP/BR</span>
          <span className="text-white tabular-nums">{time || '00:00:00'}</span>
        </div>

        {/* Menu Drawer Toggle Button */}
        <button
          onClick={() => {
            soundEngine?.playClick();
            setMenuOpen(!menuOpen)}
          }
          className="flex items-center gap-2 bg-black/80 hover:bg-white hover:text-black backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg focus-visible:outline-none"
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        >
          {menuOpen ? <X size={14} className="stroke-[2.5]" /> : <Menu size={14} className="stroke-[2.5]" />}
          <span>{menuOpen ? 'FECHAR' : 'MENU'}</span>
        </button>
      </div>

      {/* =========================================================================
          BOTTOM CORNER UNITS
          ========================================================================= */}
      {/* Bottom Left: Coordinates & Formats */}
      <div className="fixed bottom-0 left-0 z-50 p-4 md:p-6 select-none hidden sm:block">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-neutral-400 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/15 font-bold shadow-lg">
          <span>LAT: 23°33′S 46°38′W</span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-300">35MM · 4K DCI</span>
        </div>
      </div>

      {/* Bottom Right: Ambient Audio Equalizer Toggle */}
      <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6 select-none">
        <button
          onClick={toggleSound}
          className={`flex items-center gap-2.5 backdrop-blur-md px-3.5 py-1.5 border font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg focus-visible:outline-none ${
            !isMuted
              ? 'bg-white text-black border-white shadow-emerald-500/20'
              : 'bg-black/80 text-neutral-300 hover:text-white border-white/20 hover:border-white/50'
          }`}
          title={isMuted ? 'Ativar Áudio Ambiente' : 'Desativar Áudio Ambiente'}
          aria-pressed={!isMuted}
        >
          {/* Animated Equalizer Bars */}
          {!isMuted ? (
            <div className="flex items-end gap-[2px] h-3.5 w-3.5">
              <span className="w-[2px] bg-black animate-[equalizer_0.8s_ease-in-out_infinite]" style={{ height: '60%' }} />
              <span className="w-[2px] bg-black animate-[equalizer_0.6s_ease-in-out_0.2s_infinite]" style={{ height: '100%' }} />
              <span className="w-[2px] bg-black animate-[equalizer_0.9s_ease-in-out_0.4s_infinite]" style={{ height: '40%' }} />
              <span className="w-[2px] bg-black animate-[equalizer_0.7s_ease-in-out_0.1s_infinite]" style={{ height: '80%' }} />
            </div>
          ) : (
            <VolumeX size={14} className="stroke-[2.5]" />
          )}
          <span>SOUND: {!isMuted ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* =========================================================================
          FULL-SCREEN BRUTALIST OVERLAY MENU
          ========================================================================= */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-16 text-white selection:bg-white selection:text-black animate-in fade-in duration-300"
        >
          {/* Header Row */}
          <div className="flex justify-between items-center pb-6 border-b border-white/15">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
              [ ÍNDICE GERAL DE NAVEGAÇÃO ]
            </span>
            <button
              onClick={() => {
                soundEngine?.playClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-white text-black px-4 py-1.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors focus-visible:outline-none"
            >
              <X size={16} />
              <span>FECHAR</span>
            </button>
          </div>

          {/* Monumental Links List */}
          <nav className="my-auto py-8 flex flex-col space-y-2 md:space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundEngine?.playClick();
                  setMenuOpen(false);
                }}
                className="group flex items-center justify-between py-3 md:py-4 border-b border-white/10 hover:border-white transition-colors focus-visible:outline-none"
              >
                <span className="font-editorial text-3xl sm:text-5xl md:text-7xl font-normal uppercase tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
                  {link.label}
                </span>
                <ArrowUpRight
                  size={28}
                  className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100"
                />
              </a>
            ))}
          </nav>

          {/* Footer Info Row */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-neutral-400">
            <div>HILLARY HEIDY · CINEMA, FOTOGRAFIA & DIREÇÃO CRIATIVA</div>
            <div>SÃO PAULO · BRASIL · 2026</div>
          </div>
        </div>
      )}
    </>
  );
}
