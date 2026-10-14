'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useViewTransitionRouter } from '@/lib/viewTransition';
import { ArrowLeft, ArrowUpRight, Award, Film, Sliders } from 'lucide-react';
import { CursorProvider } from '@/components/motion/ContextCursor';
import { SmoothScroll } from '@/components/motion/SmoothScroll';

import { ScrubbedBentoGallery } from '@/components/projects/ScrubbedBentoGallery';

interface ProjectDetailViewProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const router = useViewTransitionRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/#trabalhos');
  };

  const handleNavigate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    router.push(`/work/${id}`);
  };

  return (
    <SmoothScroll>
      <CursorProvider>
        <main className="min-h-screen bg-[#fcfbf8] dark:bg-[#070706] text-neutral-900 dark:text-neutral-50 selection:bg-neutral-900 selection:text-neutral-50">
          {/* Top Architectural Navigation Bar */}
          <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 lg:px-16 bg-[#fcfbf8]/90 dark:bg-[#070706]/90 backdrop-blur-md border-b border-black/[0.1] dark:border-white/[0.14] flex justify-between items-center">
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white font-bold transition-colors focus-visible:outline-none"
              aria-label="Voltar para a página inicial"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              <span>Voltar ao Portfólio</span>
            </button>

            <div className="font-mono text-xs tracking-widest uppercase text-neutral-500 font-bold hidden sm:block">
              [ CASE STUDY · {project.number} ]
            </div>

            <div className="font-editorial text-lg font-medium tracking-tight">
              Hillary Heidy
            </div>
          </header>

          {/* Project Hero Section */}
          <article className="pt-28 md:pt-36 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto pb-16 md:pb-24">
            {/* Header Titles */}
            <div className="mb-10 md:mb-16 space-y-4">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-bold">
                <span>PROJETO [{project.number}]</span>
                <span>·</span>
                <span className="text-neutral-900 dark:text-neutral-100">{project.category}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>

              {/* Shared Element Title */}
              <h1
                style={{ viewTransitionName: `project-title-${project.id}` }}
                className="font-editorial text-[clamp(3.2rem,8.5vw,7.8rem)] font-light text-neutral-900 dark:text-neutral-50 tracking-tight leading-[0.88]"
              >
                {project.title}
              </h1>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
                <span>PAPEL DA HILLARY: <strong className="text-neutral-950 dark:text-white">{project.role}</strong></span>
                <span>·</span>
                <span>LOCALIZAÇÃO: SÃO PAULO, BRASIL</span>
              </div>
            </div>

            {/* Shared Element Monumental Hero Image */}
            <div
              style={{ viewTransitionName: `project-image-${project.id}` }}
              className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden bg-neutral-950 border border-black/20 dark:border-white/20 shadow-2xl mb-16 md:mb-24 will-change-transform"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Editorial Overview & Technical Spec Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-8 border-t border-black/[0.12] dark:border-white/[0.14] items-start">
              {/* Left Column: Concept & Description */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block font-bold">
                  [ 01 — CONCEITO & LINGUAGEM ]
                </span>

                <p className="text-xl md:text-3xl font-light leading-relaxed text-neutral-900 dark:text-neutral-50 font-sans tracking-tight">
                  {project.description}
                </p>

                {project.details && (
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 font-light leading-relaxed font-sans pt-2">
                    {project.details}
                  </p>
                )}

                {/* Awards if available */}
                {project.awards && project.awards.length > 0 && (
                  <div className="pt-6 border-t border-black/[0.1] dark:border-white/[0.1] space-y-3">
                    <span className="text-xs uppercase tracking-widest font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-2 font-bold">
                      <Award size={16} />
                      RECONHECIMENTO & FESTIVAIS
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                      {project.awards.map((award, i) => (
                        <li key={i}>• {award}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Ficha Técnica */}
              <div className="lg:col-span-5 space-y-6 p-6 md:p-8 bg-[#f4f0e6] dark:bg-neutral-900 border border-black/20 dark:border-white/20">
                <span className="text-eyebrow text-black dark:text-white font-mono block font-bold">
                  [ FICHA TÉCNICA & DISPOSITIVOS ]
                </span>

                <dl className="divide-y divide-black/15 dark:divide-white/15 font-mono text-xs">
                  <div className="py-3 flex justify-between">
                    <dt className="text-neutral-900 dark:text-neutral-100 font-bold">Ano de Conclusão</dt>
                    <dd className="font-bold text-black dark:text-white">{project.year}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-neutral-900 dark:text-neutral-100 font-bold">Categoria</dt>
                    <dd className="font-bold text-black dark:text-white">{project.category}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-neutral-900 dark:text-neutral-100 font-bold">Papel da Hillary</dt>
                    <dd className="font-bold text-black dark:text-white">{project.role}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-neutral-900 dark:text-neutral-100 font-bold">Formato de Captação</dt>
                    <dd className="font-bold text-black dark:text-white">35mm Analógico & 4K DCI</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-neutral-900 dark:text-neutral-100 font-bold">Aspect Ratio</dt>
                    <dd className="font-bold text-black dark:text-white">Anamorphic Scope (2.39:1)</dd>
                  </div>
                </dl>

                {/* Tags */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* GSAP Scrubbed Bento Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <ScrubbedBentoGallery
              stills={project.gallery}
              projectTitle={project.title}
              projectNumber={project.number}
              category={project.category}
            />
          )}

          <article className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto pb-24 md:pb-36">

            {/* Bottom Next/Previous Project Pagination */}
            <nav className="mt-24 md:mt-36 pt-12 border-t border-black/[0.14] dark:border-white/[0.16] grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Previous */}
              <button
                onClick={(e) => handleNavigate(e, prevProject.id)}
                className="group flex flex-col items-start p-6 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all text-left focus-visible:outline-none"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">
                  ← PROJETO ANTERIOR [{prevProject.number}]
                </span>
                <span className="font-editorial text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-50 group-hover:translate-x-1 transition-transform">
                  {prevProject.title}
                </span>
              </button>

              {/* Next */}
              <button
                onClick={(e) => handleNavigate(e, nextProject.id)}
                className="group flex flex-col items-end p-6 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all text-right focus-visible:outline-none"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">
                  PRÓXIMO PROJETO [{nextProject.number}] →
                </span>
                <span className="font-editorial text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-50 group-hover:-translate-x-1 transition-transform">
                  {nextProject.title}
                </span>
              </button>
            </nav>
          </article>
        </main>
      </CursorProvider>
    </SmoothScroll>
  );
}
