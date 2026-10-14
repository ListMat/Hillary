import { Variants } from 'framer-motion';

// Base Motion Easings — Rigoroso Easing Cinematográfico Editorial
export const easeCinema = [0.22, 1, 0.36, 1];
export const easeOutQuint = [0.23, 1, 0.32, 1];
export const easeInOutCinema = [0.77, 0, 0.175, 1];

// Timing Presets
export const durations = {
  instant: 0.15,
  micro: 0.25,
  element: 0.55,
  title: 0.85,
  hero: 1.05,
  section: 1.2,
};

// 1. Hero Reveal Variants
export const heroReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: durations.hero,
      ease: easeCinema,
    },
  },
};

// 2. Text Line & Mask Reveals
export const textReveal: Variants = {
  hidden: {
    y: '105%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: durations.title,
      ease: easeCinema,
    },
  },
};

export const charReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: i * 0.025,
      duration: 0.4,
      ease: easeCinema,
    },
  }),
};

// 3. Media & Image Reveals (Aperture Clip-Path + Micro Scale)
export const mediaReveal: Variants = {
  hidden: {
    clipPath: 'inset(18% 6% 18% 6%)',
    scale: 1.08,
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.section,
      ease: easeCinema,
    },
  },
};

// 4. Fade Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.element,
      ease: easeCinema,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.micro,
      ease: easeCinema,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.title,
      ease: easeCinema,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.element,
      ease: easeCinema,
    },
  },
};

// 5. Stagger Containers
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.element,
      ease: easeCinema,
    },
  },
};

// 6. Project Reveal
export const projectReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.title,
      ease: easeCinema,
    },
  },
};

// 7. Modal & Theater Reveal
export const modalReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeCinema,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 16,
    transition: {
      duration: 0.3,
      ease: easeCinema,
    },
  },
};
export const modalTransition = modalReveal;

// 8. Dark Section Transition Token
export const darkTransition: Variants = {
  initial: { backgroundColor: '#fcfbf8' },
  dark: {
    backgroundColor: '#070706',
    transition: { duration: 0.8, ease: easeCinema },
  },
};
