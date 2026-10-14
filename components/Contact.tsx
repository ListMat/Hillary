'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { easeCinema } from '@/lib/motion';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const email = 'contato@hillaryheidy.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com', handle: '@hillaryheidy' },
    { label: 'Vimeo', href: 'https://vimeo.com', handle: 'vimeo.com/hillaryheidy' },
    { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'linkedin.com/in/hillaryheidy' },
  ];

  return (
    <section
      id="contato"
      className="relative w-full py-32 md:py-52 px-6 md:px-12 lg:px-16 border-t border-black/[0.14] dark:border-white/[0.16]"
      aria-label="Contato Profissional"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Title & Direct Email */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCinema }}
              className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block font-bold"
            >
              [ 09 — CONTATO & NOVOS PROJETOS ]
            </motion.span>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: easeCinema }}
              className="font-editorial text-fluid-title font-light text-neutral-900 dark:text-neutral-50 leading-[0.88]"
            >
              “Vamos criar
              <br />
              <span className="italic font-normal">algo juntos?”</span>
            </motion.h2>

            {/* Email Contact with Copy Button */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5">
              <a
                href={`mailto:${email}`}
                className="font-editorial text-2xl sm:text-4xl md:text-5xl font-light text-neutral-950 dark:text-neutral-50 hover:opacity-75 transition-opacity underline decoration-2 underline-offset-8 focus-visible:outline-none"
              >
                {email}
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-3.5 bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:opacity-90 transition-all duration-300 font-mono font-bold w-max focus-visible:outline-none shadow-subtle border border-black dark:border-white"
                aria-label="Copiar endereço de email"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span>COPIADO</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>COPIAR E-MAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links & Networks */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-8 lg:border-l lg:border-black/[0.14] dark:lg:border-white/[0.16] lg:pl-12">
            <div className="space-y-4">
              <span className="text-eyebrow text-neutral-700 dark:text-neutral-300 font-mono block font-bold">
                [ REDES & CANAIS OFICIAIS ]
              </span>
              <div className="space-y-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 border-b border-black/[0.12] dark:border-white/[0.14] text-neutral-900 dark:text-neutral-50 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
                  >
                    <div>
                      <div className="text-xl font-editorial font-light">
                        {item.label}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 font-mono font-medium">
                        {item.handle}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-xs text-neutral-700 dark:text-neutral-300 font-mono space-y-1 pt-4 font-bold">
              <p>• Respostas em até 24–48 horas úteis.</p>
              <p>• Projetos comerciais, autorais e festivais de cinema.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

