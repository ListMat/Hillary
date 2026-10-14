'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

interface TourDateItem {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  status: 'TICKETS' | 'PREMIERE' | 'SOLD OUT' | 'CONFIRMED';
  link: string;
}

const tourDates: TourDateItem[] = [
  {
    id: 't-1',
    date: 'Oct 2, 2026',
    venue: 'Cinemateca Brasileira — Sala Grande Otelo',
    city: 'São Paulo',
    country: 'Brazil',
    status: 'TICKETS',
    link: '#contact',
  },
  {
    id: 't-2',
    date: 'Oct 9, 2026',
    venue: 'Festival do Rio — Estação NET Botafogo',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    status: 'CONFIRMED',
    link: '#contact',
  },
  {
    id: 't-3',
    date: 'Oct 22, 2026',
    venue: 'Berlinale Forum Expanded (Kino International)',
    city: 'Berlin',
    country: 'Germany',
    status: 'TICKETS',
    link: '#contact',
  },
  {
    id: 't-4',
    date: 'Nov 14, 2026',
    venue: 'Grand Palais Éphémère — Paris Photo Cinema',
    city: 'Paris',
    country: 'France',
    status: 'CONFIRMED',
    link: '#contact',
  },
  {
    id: 't-5',
    date: 'Dec 5, 2026',
    venue: 'Palácio dos Festivais — Mostra Competitiva',
    city: 'Gramado',
    country: 'Brazil',
    status: 'SOLD OUT',
    link: '#contact',
  },
  {
    id: 't-6',
    date: 'Jan 18, 2027',
    venue: 'Lincoln Center Film Society',
    city: 'New York',
    country: 'United States',
    status: 'TICKETS',
    link: '#contact',
  },
];

export function PKTourDates() {
  const { t } = useLanguage();

  return (
    <section id="tour" className="relative w-full min-h-screen flex flex-col justify-between py-16 md:py-24 bg-white text-black selection:bg-black selection:text-white">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-black/10 gap-4">
          <div className="section-top__start text-black">
            <div className="square bg-black" />
            <h3 className="u-text-caps text-black font-bold">{t.tour.badge}</h3>
          </div>
          <div className="text-neutral-600 font-sans text-sm md:text-base max-w-md">
            <p className="p-l">{t.tour.subtitle}</p>
          </div>
        </div>

        {/* Featured Portrait Banner with Multiply Blend (Paul Kalkbrenner signature) */}
        <div className="py-6 border-b border-black/10">
          <div className="relative aspect-[21/9] w-full max-h-[300px] overflow-hidden bg-neutral-100 border border-black/15">
            <Image
              src="/images/hillary-4.jpg"
              alt="Hillary Heidy — Screenings Tour"
              fill
              className="object-cover grayscale contrast-110 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-white uppercase tracking-widest bg-black/80 px-3 py-1.5 border border-white/20">
              {t.tour.circuitTag}
            </div>
          </div>
        </div>

        {/* Tour Table Grid */}
        <div className="w-full pt-4 flex-1">
          {/* Table Column Headers */}
          <div className="grid grid-cols-1 md:grid-cols-12 pb-3 border-b border-black/20 font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold px-4">
            <div className="md:col-span-3">{t.tour.colDate}</div>
            <div className="md:col-span-5 hidden md:block">{t.tour.colVenue}</div>
            <div className="md:col-span-2">{t.tour.colLocation}</div>
            <div className="md:col-span-2 text-right">{t.tour.colAction}</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-black/10">
            {tourDates.map((item, idx) => {
              const statusText =
                item.status === 'TICKETS'
                  ? t.tour.btnGetTickets
                  : item.status === 'SOLD OUT'
                  ? t.tour.btnSoldOut
                  : t.tour.statusConfirmed;

              return (
                <motion.a
                  key={item.id}
                  href={item.link}
                  onClick={() => soundEngine?.playClick()}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group grid grid-cols-1 md:grid-cols-12 py-4 md:py-5 px-4 items-center hover:bg-black/[0.03] transition-colors focus-visible:outline-none"
                >
                  {/* Date */}
                  <div className="md:col-span-3 font-mono text-base md:text-lg text-black font-bold">
                    {item.date}
                  </div>

                  {/* Venue */}
                  <div className="md:col-span-5 text-neutral-800 font-sans text-sm md:text-base font-normal group-hover:text-black transition-colors">
                    {item.venue}
                  </div>

                  {/* City & Country */}
                  <div className="md:col-span-2 font-mono text-xs text-neutral-600 uppercase tracking-wider">
                    {item.city}, {item.country}
                  </div>

                  {/* Action Button */}
                  <div className="md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
                    <span
                      className={`inline-flex items-center gap-1 px-4 py-1.5 font-mono text-xs uppercase tracking-widest border transition-all ${
                        item.status === 'TICKETS'
                          ? 'bg-black text-white border-black font-bold group-hover:bg-neutral-800 shadow-md'
                          : item.status === 'SOLD OUT'
                          ? 'bg-neutral-100 text-neutral-400 border-black/10 line-through'
                          : 'bg-white text-black border-black/30 group-hover:border-black'
                      }`}
                    >
                      <span>{statusText}</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom Booking Notice */}
        <div className="flex justify-between items-center pt-4 border-t border-black/10 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>Curadoria & Programação Oficial</span>
          <span>DCP 4K Screening Rights via Contato</span>
        </div>
      </div>
    </section>
  );
}
