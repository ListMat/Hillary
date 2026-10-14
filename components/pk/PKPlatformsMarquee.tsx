'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export function PKPlatformsMarquee() {
  const { t } = useLanguage();
  const platforms = t.platforms;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  
  // Transform scroll velocity into speed multiplier with direction
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(Date.now());

  // Continuous animation loop with velocity integration & wrapping
  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      if (!isDragging.current) {
        // Base auto-scroll speed (-1.2px) + scroll acceleration + drag residual inertia
        const baseSpeed = -1.2;
        const scrollBoost = velocityFactor.get();
        const currentDragSpeed = dragVelocity.current;

        // Apply friction to residual drag momentum
        dragVelocity.current *= 0.94;
        if (Math.abs(dragVelocity.current) < 0.05) dragVelocity.current = 0;

        const delta = baseSpeed + (scrollBoost * -1.5) + currentDragSpeed;
        
        let newX = baseX.get() + delta;
        // Wrap smoothly around single track width (~ -50%)
        if (newX <= -2400) {
          newX = 0;
        } else if (newX > 0) {
          newX = -2400;
        }
        baseX.set(newX);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseX, velocityFactor]);

  // Pointer drag event handlers for direct fling interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    dragVelocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt = Math.max(1, now - lastTime.current);
    const dx = e.clientX - lastX.current;

    baseX.set(baseX.get() + dx);
    dragVelocity.current = (dx / dt) * 16; // Project velocity to 60fps frame delta

    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#C5C5C5] text-black overflow-hidden select-none selection:bg-black selection:text-white">
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-2 touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          style={{ x: baseX }}
          className="flex whitespace-nowrap will-change-transform items-center"
        >
          {/* Track 1 */}
          <div className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 flex-shrink-0">
            {platforms.map((name, i) => (
              <span key={`p1-${i}`} className="inline-flex items-center gap-12 md:gap-20">
                <span className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-tight text-black hover:opacity-75 transition-opacity">
                  {name}
                </span>
                <span className="font-mono text-xl text-black/30 font-bold">/</span>
              </span>
            ))}
          </div>

          {/* Track 2 for seamless loop */}
          <div aria-hidden="true" className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 flex-shrink-0">
            {platforms.map((name, i) => (
              <span key={`p2-${i}`} className="inline-flex items-center gap-12 md:gap-20">
                <span className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-tight text-black hover:opacity-75 transition-opacity">
                  {name}
                </span>
                <span className="font-mono text-xl text-black/30 font-bold">/</span>
              </span>
            ))}
          </div>

          {/* Track 3 for ultra-wide screen safety */}
          <div aria-hidden="true" className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 flex-shrink-0">
            {platforms.map((name, i) => (
              <span key={`p3-${i}`} className="inline-flex items-center gap-12 md:gap-20">
                <span className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-tight text-black hover:opacity-75 transition-opacity">
                  {name}
                </span>
                <span className="font-mono text-xl text-black/30 font-bold">/</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
