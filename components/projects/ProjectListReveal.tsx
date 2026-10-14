'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { useViewTransitionRouter } from '@/lib/viewTransition';
import { useCursor } from '@/components/motion/ContextCursor';
import { soundEngine } from '@/lib/soundEngine';
import { ArrowUpRight, Film, Sliders } from 'lucide-react';

export function ProjectListReveal() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const router = useViewTransitionRouter();
  const { setContextCursor, resetCursor } = useCursor();

  // Mouse coordinate motion values with smooth physics spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleMouseEnterRow = (p: Project) => {
    setActiveProject(p);
    soundEngine?.playClick();
    setContextCursor('EXPLORAR', 'project');
  };

  const handleMouseLeaveRow = () => {
    setActiveProject(null);
    resetCursor();
  };

  const handleRowClick = (id: string) => {
    resetCursor();
    router.push(`/work/${id}`);
  };

  return (
    <div className="relative w-full">
      {/* Floating Media Follower Box (Position Fixed) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: activeProject ? 1 : 0,
          scale: activeProject ? 1 : 0.8,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-[360px] aspect-[16/10] overflow-hidden bg-neutral-950 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] will-change-transform"
      >
        {activeProject && (
          <div className="relative w-full h-full">
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              sizes="400px"
              className="object-cover contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end font-mono text-[10px] text-white uppercase tracking-wider">
              <span className="font-bold">[{activeProject.number}] {activeProject.category}</span>
              <span className="text-neutral-300">{activeProject.year}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Tabular Projects List */}
      <div className="w-full border-t border-white/20 divide-y divide-white/15">
        {projects.map((project) => {
          const isHovered = activeProject?.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => handleRowClick(project.id)}
              onMouseEnter={() => handleMouseEnterRow(project)}
              onMouseLeave={handleMouseLeaveRow}
              className={`group relative py-6 md:py-8 px-4 md:px-6 cursor-pointer transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isHovered ? 'bg-white text-black' : 'text-white hover:bg-neutral-950'
              }`}
            >
              {/* Left Column: Number & Title */}
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className={`font-mono text-xs font-bold transition-colors ${
                  isHovered ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  [{project.number}]
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {project.title}
                </h3>
              </div>

              {/* Middle Column: Role & Category */}
              <div className="flex flex-wrap items-center gap-4 md:gap-8 font-mono text-xs uppercase tracking-wider font-bold">
                <span className={isHovered ? 'text-neutral-700' : 'text-neutral-400'}>
                  {project.category}
                </span>
                <span className={isHovered ? 'text-neutral-900' : 'text-neutral-300'}>
                  PAPEL: {project.role}
                </span>
                <span className={isHovered ? 'text-black' : 'text-neutral-500'}>
                  {project.year}
                </span>
              </div>

              {/* Right Column: Arrow Trigger */}
              <div className="hidden sm:flex items-center">
                <ArrowUpRight
                  size={20}
                  className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    isHovered ? 'text-black' : 'text-neutral-500'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
