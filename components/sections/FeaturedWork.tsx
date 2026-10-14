'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectListReveal } from '@/components/projects/ProjectListReveal';
import { easeCinema } from '@/lib/motion';
import { soundEngine } from '@/lib/soundEngine';
import { Grid, List } from 'lucide-react';

export function FeaturedWork() {
  const [, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'editorial' | 'list'>('editorial');

  const splitProjects = projects.slice(0, 3);
  const gridProjects = projects.slice(3, 5);

  return (
    <section
      id="trabalhos"
      className="relative w-full py-28 md:py-44 px-6 md:px-12 lg:px-16 border-t border-white/[0.14] bg-[#070706] text-white"
      aria-label="Trabalhos Selecionados"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 md:pb-24 border-b border-white/[0.16] gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCinema }}
              className="text-eyebrow text-neutral-400 font-mono block mb-3 font-bold"
            >
              [ 02 — TRABALHOS SELECIONADOS ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeCinema }}
              className="font-editorial text-[clamp(3rem,8vw,7rem)] font-normal text-white leading-[0.88]"
            >
              Trabalhos
              <br />
              <span className="italic font-normal text-neutral-300">selecionados</span>
            </motion.h2>
          </div>

          <div className="space-y-4 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeCinema }}
              className="space-y-2"
            >
              <p className="text-base md:text-xl text-neutral-300 font-normal leading-relaxed font-sans">
                Seleção de projetos autorais e comerciais entre fotografia, cinema e direção de arte.
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                CINEMA · 35MM · FASHION FILM · ARTE
              </p>
            </motion.div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center bg-neutral-900 border border-white/20 p-1 font-mono text-xs">
                <button
                  onClick={() => {
                    soundEngine?.playClick();
                    setViewMode('editorial');
                  }}
                  className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                    viewMode === 'editorial'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Modo Pôster Editorial"
                >
                  <Grid size={13} />
                  <span>PÔSTERES</span>
                </button>
                <button
                  onClick={() => {
                    soundEngine?.playClick();
                    setViewMode('list');
                  }}
                  className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Modo Catálogo com Cursor Media Reveal"
                >
                  <List size={13} />
                  <span>CATÁLOGO</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Conditional Display */}
        {viewMode === 'list' ? (
          <div className="pt-8">
            <ProjectListReveal />
          </div>
        ) : (
          <>
            {/* First 3 Projects with Custom Individual Layouts */}
            <div>
              {splitProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>

            {/* Asymmetric Editorial Pair for Projects 04 and 05 */}
            {gridProjects.length > 0 && (
              <div className="pt-20 md:pt-32 border-b border-white/[0.14] pb-20 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
                  {/* Project 04 */}
                  <div className="md:col-span-6 lg:col-span-5">
                    <ProjectCard
                      project={gridProjects[0]}
                      onSelect={setSelectedProject}
                    />
                  </div>

                  {/* Project 05 with Offset */}
                  <div className="md:col-span-6 lg:col-span-7 md:mt-24 lg:mt-32">
                    <ProjectCard
                      project={gridProjects[1]}
                      onSelect={setSelectedProject}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

