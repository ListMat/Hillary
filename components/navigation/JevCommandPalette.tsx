'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Command, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { jev, JevActionSchema } from '@/lib/jev';
import { soundEngine } from '@/lib/soundEngine';

export function JevCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<{
    action: string;
    explanation: string;
    latencyMs: number;
    engine: string;
    confidence: number;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        soundEngine?.playClick();
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    soundEngine?.playClick();

    const decision = await jev.decide({
      input: query,
      schema: JevActionSchema,
    });

    setLastResult({
      action: decision.data.action,
      explanation: decision.data.explanation || 'Decisão processada.',
      latencyMs: decision.latencyMs,
      engine: decision.engine,
      confidence: decision.data.confidence,
    });

    // Execute the action in the UI
    if (decision.data.action === 'NAVIGATE_SECTION' && decision.data.target) {
      const el = document.querySelector(decision.data.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (decision.data.action === 'TOGGLE_AUDIO') {
      soundEngine?.toggleMute();
    } else if (decision.data.action === 'OPEN_TRAJECTORY') {
      const el = document.querySelector('#sobre');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating HUD Trigger Badge */}
      <button
        onClick={() => {
          setIsOpen(true);
          soundEngine?.playClick();
        }}
        className="fixed bottom-6 right-28 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#050505]/90 hover:bg-white hover:text-black border border-white/20 text-white font-mono text-[11px] font-bold tracking-wider backdrop-blur-md transition-all duration-300 shadow-2xl focus-visible:outline-none"
        aria-label="Abrir Jev System One Prompt"
        title="Jev System One (Cmd+K)"
      >
        <Zap size={13} className="text-amber-400 fill-amber-400" />
        <span>JEV SYSTEM ONE</span>
        <span className="text-[9px] bg-white/10 px-1 py-0.5 border border-white/20">⌘K</span>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-xl">
            {/* Backdrop Dismiss */}
            <div
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/25 shadow-2xl overflow-hidden z-10 text-white font-mono"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/15 bg-white/[0.02]">
                <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-bold">
                  <Zap size={14} className="text-amber-400 fill-amber-400" />
                  <span>JEV (SYSTEM ONE // TYPESAFE AI)</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-500/30">
                    &lt;10MS ENGINE
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleExecute} className="p-5 flex items-center gap-3 border-b border-white/15">
                <Command size={18} className="text-neutral-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: 'ir para agenda', 'ligar áudio', 'ver filmes 35mm', 'abrir arquivo'..."
                  className="w-full bg-transparent text-sm md:text-base text-white placeholder:text-neutral-600 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-1.5 bg-white text-black text-xs font-bold font-mono flex items-center gap-1.5 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  <span>EXECUTAR</span>
                  <CornerDownLeft size={13} />
                </button>
              </form>

              {/* Suggestions / Shortcuts */}
              <div className="p-4 bg-white/[0.01] border-b border-white/10 space-y-2">
                <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  Comandos Rápidos Recomendados:
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Ir para Agenda de Festivais', 'Ligar/Desligar Som Ambiente', 'Ver Arquivo 35mm Bento', 'Conhecer Trajetória'].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => {
                        setQuery(sug);
                        setTimeout(() => inputRef.current?.focus(), 10);
                      }}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-white hover:text-black border border-white/15 text-neutral-300 transition-colors text-[11px]"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decision Feedback Console */}
              {lastResult && (
                <div className="p-4 bg-black/60 text-xs space-y-2 font-mono">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Sparkles size={12} />
                      DECISÃO JEV: {lastResult.action}
                    </span>
                    <span className="text-emerald-400">
                      LATÊNCIA: {lastResult.latencyMs}ms ({lastResult.engine})
                    </span>
                  </div>
                  <p className="text-neutral-300 font-sans text-sm">
                    {lastResult.explanation}
                  </p>
                  <div className="text-[10px] text-neutral-500">
                    CONFIANÇA ESTRUTURAL: {Math.round(lastResult.confidence * 100)}%
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
