'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PixelTransitionProps {
  src?: string;
  alt?: string;
  targetColor?: string; // Target dissolve color (e.g. '#FFFFFF', '#9CD2FF', '#C5C5C5', '#FF6831')
  columns?: number;
  rows?: number;
  className?: string;
}

export function PixelTransition({
  src = '/images/hillary-4.jpg',
  alt = 'Hillary Heidy — Ensaio Cinematográfico em 35mm',
  targetColor = '#ffffff',
  columns = 14,
  rows = 7,
  className = '',
}: PixelTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const pixels = container.querySelectorAll('.pixel-dissolve-cell');
    if (!pixels.length) return;

    // Initial state: transparent
    gsap.set(pixels, {
      opacity: 0,
      backgroundColor: targetColor,
    });

    const ctx = gsap.context(() => {
      gsap.to(pixels, {
        opacity: 1,
        ease: 'power2.inOut',
        stagger: {
          grid: [rows, columns],
          from: 'random',
          amount: 1.2,
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 0.6,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion, rows, columns, targetColor]);

  // Interactive Cursor Reaction: Hovering scrubs/dissolves the pixel to reveal the 35mm photo underneath
  const handlePixelHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const currentOpacity = Number(gsap.getProperty(el, 'opacity')) || 0;
    
    gsap.killTweensOf(el);
    gsap.timeline()
      .to(el, {
        opacity: Math.max(0, currentOpacity - 0.75),
        scale: 0.85,
        duration: 0.12,
        ease: 'power1.out',
      })
      .to(el, {
        opacity: currentOpacity,
        scale: 1,
        duration: 0.7,
        delay: 0.25,
        ease: 'power2.out',
      });
  };

  const totalPixels = columns * rows;

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-screen aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black flex items-center justify-center ${className}`}
      aria-label="Transição Cinematográfica em Pixels"
    >
      {/* 1. Underlying 35mm Parallax Still */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: translateY, scale: 1.15 }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale contrast-110 brightness-95"
        />
        {/* Subtle Analogue Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* 2. Floating Frame Label */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 font-mono text-xs text-white uppercase tracking-widest bg-black/80 px-3 py-1.5 border border-white/20 pointer-events-none">
        [ TRANSIÇÃO PIXELADA 35MM // DISSOLVE INTERATIVO ]
      </div>

      {/* 3. GSAP Pixel Dissolve Grid overlaying the photo directly with Hover Reaction */}
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        className="absolute inset-0 w-full h-full grid pointer-events-auto z-10"
        aria-hidden="true"
      >
        {Array.from({ length: totalPixels }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={handlePixelHover}
            className="pixel-dissolve-cell w-full h-full transition-transform duration-150 cursor-crosshair"
            style={{ backgroundColor: targetColor }}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * PixelSectionDissolve: Dissolve larger chunky pixels between consecutive section colors on scroll + Interactive hover trail
 */
interface PixelSectionDissolveProps {
  fromColor?: string; // background color of previous section
  toColor?: string;   // background color of next section
  columns?: number;
  rows?: number;
  className?: string;
}

export function PixelSectionDissolve({
  fromColor = '#ffffff',
  toColor = '#9CD2FF',
  columns = 16,
  rows = 5,
  className = '',
}: PixelSectionDissolveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const pixels = container.querySelectorAll<HTMLElement>('.pixel-cell-dissolve');
    if (!pixels.length) return;

    // Reset initial state: transparent
    gsap.set(pixels, {
      opacity: 0,
      backgroundColor: toColor,
    });

    const ctx = gsap.context(() => {
      // Create a scrubbed randomized pixel dissolve based on scroll position
      gsap.to(pixels, {
        opacity: 1,
        ease: 'none',
        stagger: {
          grid: [rows, columns],
          from: 'random',
          amount: 1,
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 90%',
          end: 'bottom 25%',
          scrub: true,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion, rows, columns, toColor]);

  // Interactive Cursor Reaction: Brush over pixels to create a fluid ripple effect
  const handlePixelHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const currentOpacity = Number(gsap.getProperty(el, 'opacity')) || 0;
    const targetOpacity = currentOpacity > 0.5 ? 0.2 : 0.85;

    gsap.killTweensOf(el);
    gsap.timeline()
      .to(el, {
        scale: 0.82,
        opacity: targetOpacity,
        filter: 'brightness(1.25)',
        duration: 0.14,
        ease: 'power2.out',
      })
      .to(el, {
        scale: 1,
        opacity: currentOpacity,
        filter: 'brightness(1)',
        duration: 0.6,
        delay: 0.15,
        ease: 'elastic.out(1, 0.4)',
      });
  };

  const totalPixels = columns * rows;

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: fromColor }}
      className={`relative w-full h-32 sm:h-44 md:h-56 overflow-hidden pointer-events-auto select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        className="w-full h-full grid"
      >
        {Array.from({ length: totalPixels }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={handlePixelHover}
            className="pixel-cell-dissolve w-full h-full transition-transform cursor-pointer"
            style={{ backgroundColor: toColor }}
          />
        ))}
      </div>
    </div>
  );
}
