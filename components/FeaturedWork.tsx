'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { easeCinema } from '@/lib/motion';

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const splitProjects = projects.slice(0, 3);
  const gridProjects = projects.slice(3, 5);

  return (
    <section
      id="trabalhos"
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-black/[0.12] dark:border-white/[0.14]"
      aria-label="Trabalhos Selecionados"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 md:pb-24 border-b border-black/[0.14] dark:border-white/[0.16] gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCinema }}
              className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block mb-3 font-bold"
            >
              [ 02 — TRABALHOS SELECIONADOS ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeCinema }}
              className="font-editorial text-fluid-title font-light text-neutral-900 dark:text-neutral-50 leading-[0.88]"
            >
              Trabalhos
              <br />
              <span className="italic font-normal">selecionados</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeCinema }}
            className="space-y-2 max-w-md"
          >
            <p className="text-base md:text-xl text-neutral-800 dark:text-neutral-200 font-light leading-relaxed font-sans">
              Seleção de projetos autorais e comerciais entre fotografia, cinema e direção de arte.
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-semibold">
              CINEMA · 35MM · FASHION FILM · ARTE
            </p>
          </motion.div>
        </div>

        {/* First 3 Projects with Custom Individual Layouts */}
        <div className="divide-y divide-black/[0.12] dark:divide-white/[0.14]">
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
          <div className="pt-20 md:pt-32 border-b border-black/[0.14] dark:border-white/[0.16] pb-20 md:pb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
              {/* Project 04 */}
              <div className="md:col-span-6 lg:col-span-5">
                <ProjectCard
                  project={gridProjects[0]}
                  onSelect={setSelectedProject}
                />
              </div>

              {/* Spacer */}
              <div className="hidden lg:block lg:col-span-1" />

              {/* Project 05 with Staggered Offset */}
              <div className="md:col-span-6 lg:col-span-6 md:pt-28">
                <ProjectCard
                  project={gridProjects[1]}
                  onSelect={setSelectedProject}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

