'use client';

import React from 'react';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { LanguageProvider } from '@/lib/i18n';
import { PKNav } from '@/components/pk/PKNav';
import { PKHero } from '@/components/pk/PKHero';
import { PKExperience } from '@/components/pk/PKExperience';
import { PKPlatformsMarquee } from '@/components/pk/PKPlatformsMarquee';
import { PKRecordings } from '@/components/pk/PKRecordings';
import { PKTourDates } from '@/components/pk/PKTourDates';
import { PKDroppingStack } from '@/components/pk/PKDroppingStack';
import { PKVideoArchive } from '@/components/pk/PKVideoArchive';
import { PKNewsletter } from '@/components/pk/PKNewsletter';
import { PKFooter } from '@/components/pk/PKFooter';
import { JevCommandPalette } from '@/components/navigation/JevCommandPalette';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { PixelTransition, PixelSectionDissolve } from '@/components/motion/PixelTransition';
import { CinematicPreloader } from '@/components/motion/CinematicPreloader';

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <LanguageProvider>
      <SmoothScroll>
        {/* 35mm Analog Cinematic Preloader */}
        <CinematicPreloader onComplete={() => setIsLoaded(true)} />

        {/* Hairline Scroll Progress Bar */}
        <ScrollProgress />

        {/* Jev System One Typesafe Command Palette (Cmd + K) */}
        <JevCommandPalette />

        <main className="min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white">
          {/* 1. Header Navigation Bar */}
          <PKNav isLoaded={isLoaded} />

          {/* 2. Hero Section with Embedded Image Cycle */}
          <PKHero isLoaded={isLoaded} />

          {/* 3. Experience 9-Column Architectural Framework */}
          <PKExperience />

          {/* Pixel Dissolve: White (#ffffff) -> Gray (#C5C5C5) */}
          <PixelSectionDissolve fromColor="#ffffff" toColor="#C5C5C5" />

          {/* 4. Draggable Platforms & Cinema Disciplines Marquee */}
          <PKPlatformsMarquee />

          {/* Pixel Dissolve: Gray (#C5C5C5) -> Blue (#9CD2FF) */}
          <PixelSectionDissolve fromColor="#C5C5C5" toColor="#9CD2FF" />

          {/* 5. Featured Recordings / Film Works with Year Tabs */}
          <PKRecordings />

          {/* Pixel Dissolve: Blue (#9CD2FF) -> White (#ffffff) */}
          <PixelSectionDissolve fromColor="#9CD2FF" toColor="#ffffff" />

          {/* 6. Tour Dates & International Festival Screenings Table */}
          <PKTourDates />

          {/* Monumental 100vh 35mm Parallax Pixel Dissolve into Gallery */}
          <PixelTransition
            src="/images/hillary-4.jpg"
            targetColor="#C5C5C5"
            alt="Hillary Heidy — 35mm Analog Transition"
          />

          {/* 7. Dropping Stack Photo Gallery with Odometer Counter */}
          <PKDroppingStack />

          {/* Pixel Dissolve: Gray (#C5C5C5) -> Theater Dark (#050505) */}
          <PixelSectionDissolve fromColor="#C5C5C5" toColor="#050505" />

          {/* 8. Video Archive with Mini-Showreel Player & Duration Strip */}
          <PKVideoArchive />

          {/* Pixel Dissolve: Theater Dark (#050505) -> Flame Orange (#FF6831) */}
          <PixelSectionDissolve fromColor="#050505" toColor="#FF6831" />

          {/* 9. Newsletter Dispatch & Auto-Scrolling Image Strip Marquee */}
          <PKNewsletter />

          {/* Pixel Dissolve: Flame Orange (#FF6831) -> White (#ffffff) */}
          <PixelSectionDissolve fromColor="#FF6831" toColor="#ffffff" />

          {/* 10. Multi-Column Parallax Footer with Spinning Logo Mark */}
          <PKFooter />
        </main>
      </SmoothScroll>
    </LanguageProvider>
  );
}
