'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorMode = 'default' | 'project' | 'video' | 'gallery' | 'drag';

interface CursorContextType {
  cursorText: string;
  cursorMode: CursorMode;
  setCursorText: (text: string) => void;
  setCursorMode: (mode: CursorMode) => void;
  setContextCursor: (text: string, mode?: CursorMode) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  cursorMode: 'default',
  setCursorText: () => {},
  setCursorMode: () => {},
  setContextCursor: () => {},
  resetCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);

  // Responsive spring physics without overshooting
  const springConfig = { damping: 32, stiffness: 420, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  const setContextCursor = (text: string, mode: CursorMode = 'default') => {
    setCursorText(text);
    setCursorMode(mode);
  };

  const resetCursor = () => {
    setCursorText('');
    setCursorMode('default');
  };

  const isActive = cursorText !== '' || cursorMode !== 'default';

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        cursorMode,
        setCursorText,
        setCursorMode,
        setContextCursor,
        resetCursor,
      }}
    >
      {children}

      {/* Floating Contextual Cursor Bubble: ONLY ON pointer: fine */}
      {hasFinePointer && isVisible && isActive && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-mono text-[10px] uppercase tracking-widest shadow-2xl border border-white/20 dark:border-black/20"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            width: cursorText ? '76px' : '36px',
            height: cursorText ? '76px' : '36px',
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 28,
            stiffness: 380,
          }}
        >
          <span className="font-bold select-none text-center px-1">
            {cursorText}
          </span>
        </motion.div>
      )}
    </CursorContext.Provider>
  );
}
