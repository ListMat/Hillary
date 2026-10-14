'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Disciplinas', href: '#disciplinas', id: 'disciplinas' },
    { label: 'Trabalhos', href: '#trabalhos', id: 'trabalhos' },
    { label: 'Agenda', href: '#agenda', id: 'agenda' },
    { label: 'Reel', href: '#reel', id: 'reel' },
    { label: 'Arquivo', href: '#arquivo', id: 'arquivo' },
    { label: 'Sobre', href: '#sobre', id: 'sobre' },
    { label: 'Contato', href: '#contato', id: 'contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'py-3.5 md:py-4 bg-[#050505]/95 backdrop-blur-md border-b border-white/15 shadow-2xl'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 text-white focus-visible:outline-none"
            aria-label="Hillary Heidy — Início"
          >
            <span className="font-editorial text-xl md:text-2xl font-normal tracking-tight text-white">
              Hillary Heidy
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation with Animated Links */}
          <nav
            className="hidden md:flex items-center space-x-9 text-xs uppercase tracking-widest font-mono font-bold"
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <div key={link.label} className="relative py-1">
                  <AnimatedLink
                    href={link.href}
                    className={`transition-colors duration-200 font-bold ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </AnimatedLink>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-white" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-white focus-visible:outline-none rounded-none border border-white/25 bg-black/40"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] pt-28 px-8 pb-12 flex flex-col justify-between md:hidden text-white"
          >
            <nav className="flex flex-col space-y-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  className="flex items-center justify-between text-3xl font-editorial font-light tracking-tight text-white border-b border-white/15 pb-3.5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={20} className="text-white stroke-[2.5]" />
                </motion.a>
              ))}
            </nav>

            <div className="pt-8 text-xs text-neutral-400 uppercase tracking-widest space-y-2 border-t border-white/15 font-mono font-bold">
              <p className="text-white">Cinema · Fotografia · Direção · Produção</p>
              <p className="text-[11px] text-neutral-400">São Paulo, Brasil — 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
