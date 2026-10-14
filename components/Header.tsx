'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Trabalhos', href: '#trabalhos', id: 'trabalhos' },
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
            ? 'py-3.5 md:py-4 bg-[#fbf9f5]/92 dark:bg-[#070706]/92 backdrop-blur-md border-b border-black/[0.12] dark:border-white/[0.15] shadow-subtle'
            : 'py-7 md:py-9 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 text-foreground focus-visible:outline-none"
            aria-label="Hillary Heidy — Início"
          >
            <span className="font-editorial text-xl md:text-2xl font-semibold tracking-tight group-hover:opacity-80 transition-opacity text-neutral-900 dark:text-neutral-50">
              Hillary Heidy
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-50 group-hover:scale-125 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-widest font-mono font-medium"
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 group focus-visible:outline-none ${
                    isActive
                      ? 'text-neutral-950 dark:text-neutral-50 font-bold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-neutral-950 dark:bg-neutral-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-neutral-900 dark:text-neutral-50 focus-visible:outline-none rounded-sm border border-black/10 dark:border-white/15"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 z-40 bg-[#fbf9f5] dark:bg-[#070706] pt-28 px-8 pb-12 flex flex-col justify-between md:hidden"
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
                  className="flex items-center justify-between text-3xl font-editorial font-medium tracking-tight text-neutral-900 dark:text-neutral-50 border-b border-black/[0.12] dark:border-white/[0.15] pb-3.5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={20} className="text-neutral-700 dark:text-neutral-300" />
                </motion.a>
              ))}
            </nav>

            <div className="pt-8 text-xs text-neutral-700 dark:text-neutral-300 uppercase tracking-widest space-y-2 border-t border-black/[0.12] dark:border-white/[0.15] font-mono font-medium">
              <p>Cinema · Fotografia · Direção</p>
              <p className="text-[11px] opacity-90">São Paulo, Brasil — 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
