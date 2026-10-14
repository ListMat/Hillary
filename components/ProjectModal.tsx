'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { modalTransition, fadeIn } from '@/lib/motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
          {/* Backdrop with Fade */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/92 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl bg-[#fbf9f5] dark:bg-[#111110] text-neutral-900 dark:text-neutral-50 z-10 overflow-hidden shadow-cinema border border-black/20 dark:border-white/25 my-auto"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-4.5 bg-[#fbf9f5]/95 dark:bg-[#111110]/95 backdrop-blur-md border-b border-black/[0.14] dark:border-white/[0.16]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-900 dark:text-neutral-50 font-bold">
                  [{project.number}]
                </span>
                <span className="text-xs uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-mono font-bold">
                  {project.category} · {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-neutral-900 dark:text-neutral-50 focus-visible:outline-none border border-black/10 dark:border-white/15"
                aria-label="Fechar detalhes do projeto"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 md:p-10 space-y-8 max-h-[82vh] overflow-y-auto">
              {/* Title & Role */}
              <div className="space-y-2">
                <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-900 dark:text-neutral-50">
                  {project.title}
                </h2>
                <p className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-semibold">
                  Papel de Hillary: <span className="text-neutral-950 dark:text-neutral-50 font-bold">{project.role}</span>
                </p>
              </div>

              {/* Main Media Player */}
              <div className="relative w-full aspect-[16/9] bg-black overflow-hidden border border-black/20 dark:border-white/20 shadow-elevation">
                {project.video ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    poster={project.image}
                    className="w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                )}
              </div>

              {/* Narrative & Technical Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono font-semibold">
                    Conceito & Sinopse
                  </h3>
                  <p className="text-base md:text-lg font-normal leading-relaxed text-neutral-900 dark:text-neutral-100 font-sans">
                    {project.description}
                  </p>
                  {project.details && (
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-sans">
                      {project.details}
                    </p>
                  )}
                </div>

                <div className="md:col-span-5 space-y-6 md:border-l md:border-black/[0.14] dark:md:border-white/[0.16] md:pl-8">
                  <div>
                    <h3 className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono mb-2 font-semibold">
                      Ficha Técnica
                    </h3>
                    <ul className="text-xs space-y-2 font-mono text-neutral-700 dark:text-neutral-300">
                      <li><strong className="text-neutral-950 dark:text-neutral-50 font-bold">Ano:</strong> {project.year}</li>
                      <li><strong className="text-neutral-950 dark:text-neutral-50 font-bold">Formato:</strong> {project.tags.join(' / ')}</li>
                      <li><strong className="text-neutral-950 dark:text-neutral-50 font-bold">Direção de Arte / Luz:</strong> Hillary Heidy</li>
                    </ul>
                  </div>

                  {project.awards && project.awards.length > 0 && (
                    <div className="p-4 bg-neutral-200/60 dark:bg-neutral-800/80 border border-neutral-400 dark:border-neutral-600 shadow-sm">
                      <h3 className="text-eyebrow text-neutral-900 dark:text-neutral-100 font-mono mb-2 flex items-center gap-1.5 font-bold">
                        <Award size={14} className="text-cinema-gold" /> Reconhecimento
                      </h3>
                      <ul className="text-xs space-y-1.5 text-neutral-900 dark:text-neutral-100 font-mono font-medium">
                        {project.awards.map((award, i) => (
                          <li key={i}>• {award}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Secondary Image */}
                  {project.secondaryImage && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden border border-black/20 dark:border-white/20 shadow-sm">
                      <Image
                        src={project.secondaryImage}
                        alt={`${project.title} - Quadro Secundário`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
