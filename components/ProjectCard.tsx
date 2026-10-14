'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useCursor } from './CursorLabel';
import { ArrowUpRight } from 'lucide-react';
import { easeCinema } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorText, resetCursor } = useCursor();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorText('VER');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetCursor();
  };

  // 1. Split Left (Big Image Left, Editorial Info Right)
  if (project.layoutType === 'split-left') {
    return (
      <div
        onClick={() => onSelect(project)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer w-full py-16 md:py-24 border-b border-black/[0.12] dark:border-white/[0.14]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-950 shadow-cinema border border-black/20 dark:border-white/20">
              <motion.div
                animate={{ scale: isHovered ? 1.03 : 1 }}
                transition={{ duration: 0.7, ease: easeCinema }}
                className="relative w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isHovered && project.secondaryImage ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {project.secondaryImage && (
                  <Image
                    src={project.secondaryImage}
                    alt={`${project.title} - Frame Alternativo`}
                    fill
                    className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
              </motion.div>

              {/* Technical Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-widest text-white font-mono font-bold border border-white/20">
                PROJETO [{project.number}] · {project.year}
              </div>
            </div>
          </div>

          {/* Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 border-b border-black/[0.1] dark:border-white/[0.1] pb-3">
              <span className="font-bold text-neutral-950 dark:text-neutral-50">[ PROJETO {project.number} ]</span>
              <span className="font-semibold">{project.year} · BRASIL</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-neutral-50 group-hover:translate-x-2 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.95]">
                {project.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono font-bold pt-1">
                {project.category}
              </p>
            </div>

            <p className="text-base text-neutral-800 dark:text-neutral-200 font-light leading-relaxed font-sans">
              {project.description}
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-black/[0.12] dark:border-white/[0.14] text-xs font-mono uppercase tracking-wider">
              <span className="text-neutral-700 dark:text-neutral-300">
                PAPEL: <strong className="text-neutral-950 dark:text-neutral-50 font-bold">{project.role}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-neutral-950 dark:text-neutral-50 font-bold group-hover:translate-x-1 transition-transform">
                EXPLORAR <ArrowUpRight size={15} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Split Right (Info Left, Big Image Right)
  if (project.layoutType === 'split-right') {
    return (
      <div
        onClick={() => onSelect(project)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer w-full py-16 md:py-24 border-b border-black/[0.12] dark:border-white/[0.14]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Info */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 border-b border-black/[0.1] dark:border-white/[0.1] pb-3">
              <span className="font-bold text-neutral-950 dark:text-neutral-50">[ PROJETO {project.number} ]</span>
              <span className="font-semibold">{project.year} · EDITORIAL</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-neutral-50 group-hover:translate-x-2 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.95]">
                {project.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono font-bold pt-1">
                {project.category}
              </p>
            </div>

            <p className="text-base text-neutral-800 dark:text-neutral-200 font-light leading-relaxed font-sans">
              {project.description}
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-black/[0.12] dark:border-white/[0.14] text-xs font-mono uppercase tracking-wider">
              <span className="text-neutral-700 dark:text-neutral-300">
                PAPEL: <strong className="text-neutral-950 dark:text-neutral-50 font-bold">{project.role}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-neutral-950 dark:text-neutral-50 font-bold group-hover:translate-x-1 transition-transform">
                EXPLORAR <ArrowUpRight size={15} />
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-neutral-950 shadow-cinema border border-black/20 dark:border-white/20">
              <motion.div
                animate={{ scale: isHovered ? 1.03 : 1 }}
                transition={{ duration: 0.7, ease: easeCinema }}
                className="relative w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isHovered && project.secondaryImage ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {project.secondaryImage && (
                  <Image
                    src={project.secondaryImage}
                    alt={`${project.title} - Frame Alternativo`}
                    fill
                    className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
              </motion.div>

              {/* Technical Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-widest text-white font-mono font-bold border border-white/20">
                PROJETO [{project.number}] · {project.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Full Width Cinema Impact (Anamorphic Scope)
  if (project.layoutType === 'fullwidth') {
    return (
      <div
        onClick={() => onSelect(project)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer w-full py-20 md:py-32 border-b border-black/[0.12] dark:border-white/[0.14]"
      >
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.1] dark:border-white/[0.1] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 block mb-2 font-bold">
                [ PROJETO {project.number} ] · {project.category} · {project.year}
              </span>
              <h3 className="font-editorial text-4xl sm:text-6xl md:text-8xl font-light text-neutral-900 dark:text-neutral-50 group-hover:translate-x-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.9]">
                {project.title}
              </h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono font-bold">
              PAPEL: <span className="text-neutral-950 dark:text-neutral-50 font-bold">{project.role}</span>
            </p>
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black shadow-cinema border border-black/25 dark:border-white/25">
            <motion.div
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.75, ease: easeCinema }}
              className="relative w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isHovered && project.secondaryImage ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="100vw"
              />
              {project.secondaryImage && (
                <Image
                  src={project.secondaryImage}
                  alt={`${project.title} - Frame`}
                  fill
                  className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="100vw"
                />
              )}
            </motion.div>

            {/* Scope Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/85 backdrop-blur-md text-[10px] uppercase tracking-widest text-white font-mono font-bold border border-white/20">
              ANAMORPHIC SCOPE 2.39:1 · 4K MASTER
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-base text-neutral-800 dark:text-neutral-200 font-sans">
            <p className="max-w-2xl font-light leading-relaxed">{project.description}</p>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-950 dark:text-neutral-50 font-mono font-bold whitespace-nowrap border-b-2 border-neutral-950 dark:border-white pb-0.5">
              VER PROJETO COMPLETO <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4 & 5. Asymmetric Grid Item (Museum Catalogue)
  return (
    <div
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer w-full space-y-6"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 shadow-cinema border border-black/20 dark:border-white/20">
        <motion.div
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.7, ease: easeCinema }}
          className="relative w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovered && project.secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {project.secondaryImage && (
            <Image
              src={project.secondaryImage}
              alt={`${project.title} - Frame`}
              fill
              className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </motion.div>

        {/* Index Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-widest text-white font-mono font-bold border border-white/20">
          [{project.number}] · {project.year}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
          <span className="font-bold text-neutral-950 dark:text-neutral-50">[ PROJETO {project.number} ]</span>
          <span className="font-semibold">{project.year}</span>
        </div>

        <h3 className="font-editorial text-3xl sm:text-5xl font-light text-neutral-900 dark:text-neutral-50 group-hover:translate-x-2 transition-transform duration-400 leading-tight">
          {project.title}
        </h3>

        <p className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 font-mono font-bold">
          {project.category} · {project.role}
        </p>

        <p className="text-base text-neutral-800 dark:text-neutral-200 line-clamp-2 font-light leading-relaxed font-sans pt-1">
          {project.description}
        </p>
      </div>
    </div>
  );
}

