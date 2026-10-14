'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';
import { useLanguage } from '@/lib/i18n';

interface PKNavProps {
  isLoaded?: boolean;
}

export function PKNav({ isLoaded = true }: PKNavProps) {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('works');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.works, href: '#recordings', id: 'recordings' },
    { label: t.nav.tour, href: '#tour', id: 'tour' },
    { label: t.nav.gallery, href: '#gallery', id: 'gallery' },
    { label: t.nav.archive, href: '#video-archive', id: 'video-archive' },
    { label: t.nav.news, href: '#newsletter', id: 'newsletter' },
    { label: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  const showFullMenu = !isScrolled || isHovered;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundEngine?.playClick();
  };

  const toggleLanguage = (lang: 'pt' | 'en') => {
    if (language !== lang) {
      setLanguage(lang);
      soundEngine?.playClick();
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : -15,
        }}
        transition={{ duration: 0.8, delay: isLoaded ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 flex items-center justify-between pointer-events-none transition-all duration-500"
      >
        {/* Left Minimal Geometric Logo (Visible at top, fades on scroll) */}
        <div className="flex items-center gap-6">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label={t.nav.homeAria}
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? -20 : 0,
              scale: isScrolled ? 0.85 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex items-center gap-3 text-black focus-visible:outline-none ${
              isScrolled ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 25 25"
              fill="none"
              className="transition-transform group-hover:rotate-45 duration-500"
            >
              <path
                d="M12.5 0L15.5 9.5L25 12.5L15.5 15.5L12.5 25L9.5 15.5L0 12.5L9.5 9.5L12.5 0Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-editorial text-lg tracking-tight text-black hidden sm:inline font-normal">
              Hillary Heidy
            </span>
          </motion.a>

          {/* Desktop Language Switcher (PT / EN) */}
          <motion.div
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? -15 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={`hidden sm:flex items-center bg-white/80 backdrop-blur-md border border-black/15 rounded-full p-0.5 shadow-sm ${
              isScrolled ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            <button
              onClick={() => toggleLanguage('pt')}
              className={`relative px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-colors ${
                language === 'pt' ? 'text-white' : 'text-neutral-500 hover:text-black'
              }`}
            >
              {language === 'pt' && (
                <motion.div
                  layoutId="activeLangIndicator"
                  className="absolute inset-0 bg-black rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">PT</span>
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`relative px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-colors ${
                language === 'en' ? 'text-white' : 'text-neutral-500 hover:text-black'
              }`}
            >
              {language === 'en' && (
                <motion.div
                  layoutId="activeLangIndicator"
                  className="absolute inset-0 bg-black rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">EN</span>
            </button>
          </motion.div>
        </div>

        {/* Center / Right Floating Morphing Pill Navbar */}
        <div
          className={`transition-all duration-500 pointer-events-auto ${
            isScrolled
              ? 'fixed left-1/2 -translate-x-1/2 top-5 z-50'
              : 'ml-auto flex items-center gap-3'
          }`}
        >
          <motion.div
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="hidden md:flex items-center bg-black/90 text-white backdrop-blur-xl border border-black/15 rounded-full px-4 py-2 shadow-2xl overflow-hidden cursor-pointer"
          >
            {/* Centered Logo when collapsed on scroll */}
            <AnimatePresence mode="popLayout">
              {!showFullMenu ? (
                <motion.button
                  key="collapsed-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={scrollToTop}
                  className="flex items-center gap-2.5 px-3 py-0.5 focus-visible:outline-none group"
                  aria-label={t.nav.backToTop}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 25 25"
                    fill="none"
                    className="transition-transform group-hover:rotate-45 duration-500 text-white"
                  >
                    <path
                      d="M12.5 0L15.5 9.5L25 12.5L15.5 15.5L12.5 25L9.5 15.5L0 12.5L9.5 9.5L12.5 0Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-editorial text-sm tracking-tight text-white font-normal">
                    Hillary Heidy
                  </span>
                </motion.button>
              ) : (
                /* Full Links List when at top or hovered */
                <motion.ul
                  key="expanded-links"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-6"
                >
                  {/* Embedded mini logo indicator inside expanded pill when scrolled */}
                  {isScrolled && (
                    <li className="pr-1 border-r border-white/20">
                      <button
                        onClick={scrollToTop}
                        aria-label={t.nav.backToTop}
                        className="flex items-center text-white hover:opacity-80 transition-opacity"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 25 25"
                          fill="none"
                          className="hover:rotate-45 transition-transform duration-300"
                        >
                          <path
                            d="M12.5 0L15.5 9.5L25 12.5L15.5 15.5L12.5 25L9.5 15.5L0 12.5L9.5 9.5L12.5 0Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </li>
                  )}

                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <li key={link.label} className="relative py-1">
                        <a
                          href={link.href}
                          onClick={() => {
                            setActiveSection(link.id);
                            soundEngine?.playClick();
                          }}
                          className="p-r text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-200 block whitespace-nowrap"
                        >
                          <span>{link.label}</span>
                          {isActive && (
                            <motion.span
                              layoutId="activeNavUnderline"
                              className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-2 md:hidden pointer-events-auto">
          {/* Mobile Language Switcher Pill */}
          <div className="flex items-center bg-white/90 border border-black/20 rounded-full p-0.5 shadow-md">
            <button
              onClick={() => toggleLanguage('pt')}
              className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-full ${
                language === 'pt' ? 'bg-black text-white' : 'text-black'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-full ${
                language === 'en' ? 'bg-black text-white' : 'text-black'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              soundEngine?.playClick();
            }}
            className="p-2.5 rounded-full bg-black text-white border border-black/20 shadow-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-28 px-8 pb-12 flex flex-col justify-between md:hidden text-black"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-editorial text-4xl uppercase tracking-tight text-black border-b border-black/10 pb-3"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="text-xs font-mono text-neutral-600 space-y-1">
              <p>Hillary Heidy — {language === 'pt' ? 'Cinema & Fotografia' : 'Cinema & Cinematography'}</p>
              <p>São Paulo, Brasil — 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
