'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ArrowUpRight, Film } from 'lucide-react';
import { Project } from '@/data/projects';
import { modalReveal } from '@/lib/motion';

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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/92 backdrop-blur-xl">
          {/* Backdrop Click Close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Card */}
          <motion.div
            variants={modalReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#fcfbf8] dark:bg-[#0c0c0b] text-neutral-900 dark:text-neutral-50 shadow-2xl border border-black/20 dark:border-white/20 overflow-y-auto z-10 p-6 md:p-12 space-y-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-black/[0.12] dark:border-white/[0.14] pb-4">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-600 dark:text-neutral-400 font-bold">
                <span>[ PROJETO {project.number} ]</span>
                <span>·</span>
                <span className="text-neutral-950 dark:text-neutral-50">{project.year}</span>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors border border-black/15 dark:border-white/20 focus-visible:outline-none"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-mono font-bold block">
                {project.category} · {project.role}
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl font-light tracking-tight leading-tight">
                {project.title}
              </h2>
            </div>

            {/* Main Visual */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border border-black/20 dark:border-white/20 shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Editorial Description & Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-black/[0.12] dark:border-white/[0.14]">
              <div className="md:col-span-8 space-y-4">
                <h4 className="font-editorial text-2xl font-light">Sobre o Projeto</h4>
                <p className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 font-light leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              <div className="md:col-span-4 space-y-4 font-mono text-xs">
                <div className="p-4 bg-neutral-500/[0.04] border border-black/10 dark:border-white/10 space-y-2">
                  <div className="text-neutral-500 uppercase tracking-widest font-bold">Ficha Técnica</div>
                  <div><strong className="text-neutral-950 dark:text-neutral-50 font-bold">Direção:</strong> {project.role}</div>
                  <div><strong className="text-neutral-950 dark:text-neutral-50 font-bold">Ano:</strong> {project.year}</div>
                  <div><strong className="text-neutral-950 dark:text-neutral-50 font-bold">Formato:</strong> 35mm Analógico & 4K</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
