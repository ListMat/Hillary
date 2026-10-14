'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin, Film, Ticket } from 'lucide-react';
import { useCursor } from '@/components/motion/ContextCursor';
import { soundEngine } from '@/lib/soundEngine';

interface ScreeningEvent {
  id: string;
  date: string;
  day: string;
  month: string;
  year: string;
  city: string;
  country: string;
  venue: string;
  event: string;
  type: 'ESTREIA' | 'FESTIVAL' | 'EXPOSIÇÃO' | 'MASTERCLASS' | 'MOSTRA';
  status: 'INGRESSOS' | 'ESGOTADO' | 'CONFIRMADO' | 'CONVITE';
  link?: string;
  image?: string;
}

const screeningsData: ScreeningEvent[] = [
  {
    id: 'sc-01',
    date: '24 OUT 2026',
    day: '24',
    month: 'OUT',
    year: '2026',
    city: 'São Paulo',
    country: 'Brasil',
    venue: 'Cinemateca Brasileira — Sala Grande Otelo',
    event: 'Mostra Internacional de Cinema de São Paulo',
    type: 'ESTREIA',
    status: 'INGRESSOS',
    link: '#contato',
    image: '/images/hillary-1.jpg',
  },
  {
    id: 'sc-02',
    date: '12 NOV 2026',
    day: '12',
    month: 'NOV',
    year: '2026',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    venue: 'Estação NET Botafogo',
    event: 'Festival do Rio — Première Brasil Cinema Contemporâneo',
    type: 'FESTIVAL',
    status: 'CONFIRMADO',
    link: '#contato',
    image: '/images/hillary-2.jpg',
  },
  {
    id: 'sc-03',
    date: '05 DEZ 2026',
    day: '05',
    month: 'DEZ',
    year: '2026',
    city: 'Berlin',
    country: 'Alemanha',
    venue: 'Kino International // Karl-Marx-Allee',
    event: 'Berlinale Forum Expanded & Special Retrospective',
    type: 'FESTIVAL',
    status: 'INGRESSOS',
    link: '#contato',
    image: '/images/hillary-3.jpg',
  },
  {
    id: 'sc-04',
    date: '18 JAN 2027',
    day: '18',
    month: 'JAN',
    year: '2027',
    city: 'Paris',
    country: 'França',
    venue: 'Grand Palais Éphémère',
    event: 'Paris Photo — Pavillon Cinéma et Forme Expérimentale',
    type: 'EXPOSIÇÃO',
    status: 'CONVITE',
    link: '#contato',
    image: '/images/hillary-4.jpg',
  },
  {
    id: 'sc-05',
    date: '28 FEV 2027',
    day: '28',
    month: 'FEV',
    year: '2027',
    city: 'Gramado',
    country: 'Brasil',
    venue: 'Palácio dos Festivais',
    event: 'Festival de Cinema de Gramado — Mostra Competitiva',
    type: 'ESTREIA',
    status: 'ESGOTADO',
    link: '#contato',
    image: '/images/hillary-5.jpg',
  },
];

export function TourScreenings() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { setContextCursor, resetCursor } = useCursor();

  return (
    <section
      id="agenda"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-white/15 bg-[#050505] text-white selection:bg-white selection:text-black"
      aria-label="Circuito de Festivais e Exibições 2026"
    >
      <div className="max-w-[1550px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 pb-4 border-b border-white/15 gap-4">
          <div>
            <span className="text-eyebrow text-neutral-400 font-mono block mb-2 font-bold">
              [ 03 — CIRCUITO & EXIBIÇÕES // TOUR DATES ]
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-none">
              Agenda & Festivais
            </h2>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-neutral-400 font-bold space-y-1">
            <div className="text-white flex items-center gap-2 sm:justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TEMPORADA 2026 / 2027</span>
            </div>
            <div>EXIBIÇÕES EM SALA · FESTIVAIS · PAINÉIS</div>
          </div>
        </div>

        {/* Tabular Matrix (Paul Kalkbrenner Live Dates standard) */}
        <div className="divide-y divide-white/15 border-y border-white/15">
          {screeningsData.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <a
                key={item.id}
                href={item.link || '#contato'}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  setContextCursor('RESERVAR', 'project');
                  soundEngine?.playClick();
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  resetCursor();
                }}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 items-center transition-all duration-300 hover:bg-white/[0.03] px-2 md:px-4 focus-visible:outline-none"
              >
                {/* Col 1: Date & Day Badge */}
                <div className="md:col-span-3 flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-neutral-900 border border-white/20 group-hover:border-white group-hover:bg-white group-hover:text-black transition-colors font-mono">
                    <span className="text-xl font-bold leading-none">{item.day}</span>
                    <span className="text-[10px] uppercase font-bold">{item.month}</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block font-bold">
                      {item.year}
                    </span>
                    <span className="text-sm font-mono text-white font-bold uppercase">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Col 2: Event Name & Venue */}
                <div className="md:col-span-5 space-y-1">
                  <h3 className="font-editorial text-2xl md:text-3xl font-light text-white group-hover:text-neutral-200 transition-colors leading-tight">
                    {item.event}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Film size={12} className="text-neutral-400" />
                    <span>{item.venue}</span>
                  </div>
                </div>

                {/* Col 3: City & Country */}
                <div className="md:col-span-2 flex items-center gap-2 text-sm font-mono text-neutral-300">
                  <MapPin size={14} className="text-neutral-400" />
                  <span className="font-bold">{item.city}</span>
                  <span className="text-neutral-400">({item.country})</span>
                </div>

                {/* Col 4: Status Badge & Arrow Action */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <span
                    className={`text-[11px] font-mono font-bold uppercase px-3 py-1.5 border tracking-wider transition-colors ${
                      item.status === 'INGRESSOS'
                        ? 'bg-white text-black border-white'
                        : item.status === 'ESGOTADO'
                        ? 'bg-neutral-900 text-neutral-400 border-white/20 line-through'
                        : 'bg-neutral-950 text-neutral-200 border-white/25 group-hover:border-white'
                    }`}
                  >
                    {item.status}
                  </span>

                  <div className="w-9 h-9 border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Booking Notice */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-neutral-400 gap-2">
          <span>* PARA SESSÕES FECHADAS DE IMPRENSA E CONVITES VIP, ENTRE EM CONTATO COM A PRODUÇÃO.</span>
          <a
            href="#contato"
            className="text-white hover:underline underline-offset-4 font-bold flex items-center gap-1.5"
          >
            <span>SOLICITAR PAUTA // CREDENCIAMENTO</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
