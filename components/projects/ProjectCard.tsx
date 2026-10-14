'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useCursor } from '@/components/motion/ContextCursor';
import { useViewTransitionRouter } from '@/lib/viewTransition';
import { ArrowUpRight } from 'lucide-react';
import { easeCinema } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setContextCursor, resetCursor } = useCursor();
  const router = useViewTransitionRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setContextCursor('VER', 'project');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetCursor();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    resetCursor();
    router.push(`/work/${project.id}`);
  };

  const imageTransitionStyle: React.CSSProperties = {
    viewTransitionName: `project-image-${project.id}`,
  };

  const titleTransitionStyle: React.CSSProperties = {
    viewTransitionName: `project-title-${project.id}`,
  };

  // 1. Split Left (Big Image Left, Editorial Info Right)
  if (project.layoutType === 'split-left') {
    return (
      <div
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer w-full py-16 md:py-24 border-b border-white/[0.14] text-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-7">
            <div
              style={imageTransitionStyle}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-950 shadow-2xl border border-white/20 will-change-transform"
            >
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
            </div>
          </div>

          {/* Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/15 pb-3 font-bold">
              <span className="text-white">[ PROJETO {project.number} ]</span>
              <span>{project.year} · BRASIL</span>
            </div>

            <div className="space-y-2">
              <h3
                style={titleTransitionStyle}
                className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-white group-hover:translate-x-2 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.95]"
              >
                {project.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold pt-1">
                {project.category}
              </p>
            </div>

            <p className="text-base text-neutral-300 font-normal leading-relaxed font-sans">
              {project.description}
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-white/15 text-xs font-mono uppercase tracking-wider font-bold">
              <span className="text-neutral-400">
                PAPEL: <strong className="text-white font-bold">{project.role}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-white font-bold group-hover:translate-x-1 transition-transform">
                EXPLORAR <ArrowUpRight size={16} className="stroke-[2.5]" />
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
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer w-full py-16 md:py-24 border-b border-white/[0.14] text-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Info */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/15 pb-3 font-bold">
              <span className="text-white">[ PROJETO {project.number} ]</span>
              <span>{project.year} · EDITORIAL</span>
            </div>

            <div className="space-y-2">
              <h3
                style={titleTransitionStyle}
                className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-white group-hover:translate-x-2 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.95]"
              >
                {project.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold pt-1">
                {project.category}
              </p>
            </div>

            <p className="text-base text-neutral-300 font-normal leading-relaxed font-sans">
              {project.description}
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-white/15 text-xs font-mono uppercase tracking-wider font-bold">
              <span className="text-neutral-400">
                PAPEL: <strong className="text-white font-bold">{project.role}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-white font-bold group-hover:translate-x-1 transition-transform">
                EXPLORAR <ArrowUpRight size={16} className="stroke-[2.5]" />
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div
              style={imageTransitionStyle}
              className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-neutral-950 shadow-2xl border border-white/20 will-change-transform"
            >
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
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer w-full py-20 md:py-32 border-b border-white/[0.14] text-white"
      >
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2 font-bold">
                [ PROJETO {project.number} ] · {project.category} · {project.year}
              </span>
              <h3
                style={titleTransitionStyle}
                className="font-editorial text-4xl sm:text-6xl md:text-8xl font-normal text-white group-hover:translate-x-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.9]"
              >
                {project.title}
              </h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">
              PAPEL: <span className="text-white font-bold">{project.role}</span>
            </p>
          </div>

          <div
            style={imageTransitionStyle}
            className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black shadow-2xl border border-white/20 will-change-transform"
          >
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
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-base text-neutral-300 font-sans">
            <p className="max-w-2xl font-normal leading-relaxed">{project.description}</p>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white font-mono font-bold whitespace-nowrap border-b-2 border-white pb-0.5">
              VER PROJETO COMPLETO <ArrowUpRight size={16} className="stroke-[2.5]" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4 & 5. Asymmetric Grid Item (Museum Catalogue)
  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer w-full space-y-6 text-white"
    >
      <div
        style={imageTransitionStyle}
        className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 shadow-2xl border border-white/20 will-change-transform"
      >
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
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          <span className="text-white">[ PROJETO {project.number} ]</span>
          <span>{project.year}</span>
        </div>

        <h3
          style={titleTransitionStyle}
          className="font-editorial text-3xl sm:text-5xl font-normal text-white group-hover:translate-x-2 transition-transform duration-400 leading-tight"
        >
          {project.title}
        </h3>

        <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-bold">
          {project.category} · {project.role}
        </p>

        <p className="text-base text-neutral-300 line-clamp-2 font-normal leading-relaxed font-sans pt-1">
          {project.description}
        </p>
      </div>
    </div>
  );
}
