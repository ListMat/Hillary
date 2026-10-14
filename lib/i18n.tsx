'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

export interface Translations {
  nav: {
    works: string;
    tour: string;
    gallery: string;
    archive: string;
    news: string;
    contact: string;
    homeAria: string;
    backToTop: string;
  };
  hero: {
    badge: string;
    location: string;
    bio: string;
    exploreBtn: string;
  };
  experience: {
    title: string;
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
  platforms: string[];
  recordings: {
    badge: string;
    subtitle: string;
    viewAll: string;
    formatLabel: string;
    viewProject: string;
    requestDcp: string;
    formatBottom1: string;
    formatBottom2: string;
    works: Array<{
      id: string;
      year: string;
      title: string;
      format: string;
      description: string;
      awards: string;
    }>;
  };
  tour: {
    badge: string;
    subtitle: string;
    circuitTag: string;
    colDate: string;
    colVenue: string;
    colLocation: string;
    colStatus: string;
    colAction: string;
    statusTickets: string;
    statusConfirmed: string;
    statusSoldOut: string;
    btnGetTickets: string;
    btnDetails: string;
    btnSoldOut: string;
  };
  gallery: {
    badge: string;
    subtitle: string;
    dragTip: string;
    counterLabel: string;
    photos: Array<{
      id: string;
      title: string;
      location: string;
    }>;
  };
  videoArchive: {
    badge: string;
    subtitle: string;
    tag: string;
    creditsTitle: string;
    pelicula: string;
    aspectRatio: string;
    master: string;
    scrubberTitle: string;
    closeBtn: string;
    privateSession: string;
  };
  newsletter: {
    badge: string;
    title: string;
    placeholder: string;
    btnSubscribe: string;
    btnSuccess: string;
    privacy: string;
  };
  footer: {
    navTitle: string;
    disciplinesTitle: string;
    followTitle: string;
    contactTitle: string;
    location: string;
    backToTop: string;
    rights: string;
    disciplines: string[];
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      works: 'Obras',
      tour: 'Festivais',
      gallery: 'Galeria',
      archive: 'Arquivo',
      news: 'Notícias',
      contact: 'Contato',
      homeAria: 'Hillary Heidy — Página Inicial',
      backToTop: 'Voltar ao topo',
    },
    hero: {
      badge: '[ CINEMA 35MM · FOTOGRAFIA AUTORAL ]',
      location: 'São Paulo, Brasil — Direção & Fotografia',
      bio: 'Explore seu cinema, fotografia, direções autorais e uma narrativa visual moldada por mais de uma década de exploração analógica em película 35mm.',
      exploreBtn: 'Explorar Obras',
    },
    experience: {
      title: 'Arquitetura de 9 Colunas / Coordenadas',
      badge: '[ GRID COMO ELEMENTO GRÁFICO // VISOR 35MM ]',
      line1: 'Experiência & Pulso Autoral',
      line2: 'Ritmo em Película 35mm',
      line3: 'Luzes e Sombras Analógicas',
      line4: 'Enquadramento Cinematográfico',
    },
    platforms: [
      'CINEMA 35MM',
      'DIREÇÃO DE FOTOGRAFIA',
      'ARRI ALEXA 35',
      'KODAK VISION3',
      'LENTES ANAMÓRFICAS',
      'COLOR GRADING',
      'FASHION FILM',
      'DOCUMENTÁRIO AUTORAL',
      'GESTÃO DE SET',
    ],
    recordings: {
      badge: 'Projetos & Filmes',
      subtitle: 'Explore os lançamentos cinematográficos recentes, formatos 35mm e obras autorais.',
      viewAll: 'Ver todos os projetos',
      formatLabel: '[ FORMATO & RESOLUÇÃO ]',
      viewProject: 'Ver Projeto Completo',
      requestDcp: 'Solicitar Sinopse & DCP',
      formatBottom1: 'Película Kodak 35mm / 500T 5219 / Arriflex',
      formatBottom2: 'DCP Master 4K DCI Flat (1.85:1)',
      works: [
        {
          id: 'w-2026',
          year: '2026',
          title: 'Silêncio das Águas',
          format: '35mm Película Analógica · 4K DCP · Dolby Atmos',
          description:
            'Uma investigação visual sobre o tempo desacelerado nas margens fluviais. Filmado em película 35mm com lentes anamórficas vintage, a luz natural dita o ritmo da narrativa e da solidão humana.',
          awards: 'Melhor Fotografia — Festival Ver & Olhar 2025',
        },
        {
          id: 'w-2025',
          year: '2025',
          title: 'Corpo e Concreto',
          format: '35mm Still Photography · Exposição Individual',
          description:
            'Ensaio brutalista sobre a arquitetura de São Paulo e os corpos que a habitam. Cada fotograma opera como um corte geométrico entre a matéria rígida e a fragilidade do gesto.',
          awards: 'Prêmio Seleção Oficial — Galeria Subterrânea SP',
        },
        {
          id: 'w-2024',
          year: '2024',
          title: 'Aurora Sintética',
          format: 'Fashion Film Autoral · ARRI Alexa 35',
          description:
            'Direção e fotografia para a semana de moda internacional. O contraste entre texturas têxteis artesanais e iluminação neon estroboscópica cria uma atmosfera onírica contemporânea.',
          awards: 'Direção Oficial — SPFW N58',
        },
      ],
    },
    tour: {
      badge: 'Festivais & Exibições',
      subtitle: 'Viva o cinema e as obras visuais de Hillary Heidy na tela grande.',
      circuitTag: '[ CIRCUITO INTERNACIONAL 2026 / 2027 ]',
      colDate: 'DATA',
      colVenue: 'LOCAL / FESTIVAL',
      colLocation: 'CIDADE / PAÍS',
      colStatus: 'STATUS',
      colAction: 'INGRESSOS',
      statusTickets: 'DISPONÍVEL',
      statusConfirmed: 'CONFIRMADO',
      statusSoldOut: 'ESGOTADO',
      btnGetTickets: 'Ingressos',
      btnDetails: 'Detalhes',
      btnSoldOut: 'Esgotado',
    },
    gallery: {
      badge: 'Galeria Autoral',
      subtitle: 'Explore a seleção de fotografias em 35mm capturadas em sets de filmagem e estudos de câmara escura.',
      dragTip: 'Clique ou arraste para passar fotograma',
      counterLabel: 'FOTOGRAMAS EM 35MM',
      photos: [
        { id: 'g-1', title: 'Ensaio Analógico 35mm — Série I', location: 'São Paulo' },
        { id: 'g-2', title: 'Geometria e Luz Natural', location: 'Minas Gerais' },
        { id: 'g-3', title: 'Cenas de Set e Iluminação', location: 'Rio de Janeiro' },
        { id: 'g-4', title: 'Retrato em Película Kodak', location: 'Estúdio Paulistano' },
        { id: 'g-5', title: 'Composição Temporal 35mm', location: 'São Paulo' },
      ],
    },
    videoArchive: {
      badge: 'Arquivo de Vídeos',
      subtitle: 'Explore performances cinematográficas e histórias registradas em película.',
      tag: '[ 35MM SHOWREEL ]',
      creditsTitle: '[ CRÉDITOS TÉCNICOS ]',
      pelicula: 'Película: Kodak Vision3 500T (35mm)',
      aspectRatio: 'Aspect Ratio: 2.39:1 Anamórfico',
      master: 'Master: 4K DCP DCI Cinema',
      scrubberTitle: 'SCRUBBER DE TIMELINE',
      closeBtn: 'Fechar',
      privateSession: '[ SESSÃO PRIVADA // PROJEÇÃO DCP 4K ]',
    },
    newsletter: {
      badge: 'Informativo & Despacho',
      title: 'Receba comunicados exclusivos sobre novos filmes, festivais e pré-estreias privadas.',
      placeholder: 'Digite seu e-mail profissional...',
      btnSubscribe: 'Assinar Informativo',
      btnSuccess: 'E-mail Cadastrado!',
      privacy: 'Sem spam. Apenas cinema autoral e comunicados de exibição.',
    },
    footer: {
      navTitle: 'Navegação',
      disciplinesTitle: 'Disciplinas',
      followTitle: 'Redes',
      contactTitle: 'Contato Direto',
      location: 'São Paulo, Brasil',
      backToTop: 'Voltar ao Topo ↑',
      rights: '© 2026 Hillary Heidy. Todos os direitos reservados.',
      disciplines: [
        'Direção de Fotografia',
        'Cinema 35mm Analógico',
        'Fashion Films & Publicidade',
        'Curadoria & Edição de Cor',
      ],
    },
  },
  en: {
    nav: {
      works: 'Works',
      tour: 'Tour',
      gallery: 'Gallery',
      archive: 'Archive',
      news: 'News',
      contact: 'Contact',
      homeAria: 'Hillary Heidy — Homepage',
      backToTop: 'Back to top',
    },
    hero: {
      badge: '[ 35MM CINEMA · AUTHORED CINEMATOGRAPHY ]',
      location: 'São Paulo, Brazil — Direction & Cinematography',
      bio: 'Explore her cinema, photography, directional works and a visual narrative shaped by over a decade of 35mm analog film exploration.',
      exploreBtn: 'Explore Works',
    },
    experience: {
      title: '9-Column Architecture / Coordinates',
      badge: '[ GRID AS GRAPHIC ELEMENT // 35MM VIEWFINDER ]',
      line1: 'Experience the Pulse',
      line2: 'Rhythm in 35mm Film',
      line3: 'Analog Lights & Shadows',
      line4: 'Cinematic Framing',
    },
    platforms: [
      'CINEMA 35MM',
      'CINEMATOGRAPHY',
      'ARRI ALEXA 35',
      'KODAK VISION3',
      'ANAMORPHIC LENSES',
      'COLOR GRADING',
      'FASHION FILM',
      'AUTHORED DOCUMENTARY',
      'SET MANAGEMENT',
    ],
    recordings: {
      badge: 'Recordings & Films',
      subtitle: 'Explore the latest cinematic releases, 35mm formats and authored works.',
      viewAll: 'View all works',
      formatLabel: '[ FORMAT & RESOLUTION ]',
      viewProject: 'View Full Project',
      requestDcp: 'Request Synopsis & DCP',
      formatBottom1: 'Kodak 35mm Film / 500T 5219 / Arriflex',
      formatBottom2: 'DCP Master 4K DCI Flat (1.85:1)',
      works: [
        {
          id: 'w-2026',
          year: '2026',
          title: 'Silêncio das Águas',
          format: '35mm Analog Film · 4K DCP · Dolby Atmos',
          description:
            'A visual investigation into decelerated time along riverbanks. Shot on 35mm film with vintage anamorphic lenses, natural light dictates the rhythm of narrative and human solitude.',
          awards: 'Best Cinematography — Ver & Olhar Festival 2025',
        },
        {
          id: 'w-2025',
          year: '2025',
          title: 'Corpo e Concreto',
          format: '35mm Still Photography · Solo Exhibition',
          description:
            'Brutalist photo essay on São Paulo’s architecture and the bodies that inhabit it. Each frame operates as a geometric cut between rigid matter and gesture fragility.',
          awards: 'Official Selection Award — Galeria Subterrânea SP',
        },
        {
          id: 'w-2024',
          year: '2024',
          title: 'Aurora Sintética',
          format: 'Authored Fashion Film · ARRI Alexa 35',
          description:
            'Direction and cinematography for international fashion week. The contrast between handcrafted textile textures and strobe neon lighting creates a contemporary oneiric mood.',
          awards: 'Official Direction — SPFW N58',
        },
      ],
    },
    tour: {
      badge: 'Tour Dates & Screenings',
      subtitle: 'Experience Hillary Heidy’s cinema and visual works on the big screen.',
      circuitTag: '[ 2026 / 2027 INTERNATIONAL CIRCUIT ]',
      colDate: 'DATE',
      colVenue: 'VENUE / FESTIVAL',
      colLocation: 'CITY / COUNTRY',
      colStatus: 'STATUS',
      colAction: 'TICKETS',
      statusTickets: 'TICKETS',
      statusConfirmed: 'CONFIRMED',
      statusSoldOut: 'SOLD OUT',
      btnGetTickets: 'Tickets',
      btnDetails: 'Details',
      btnSoldOut: 'Sold Out',
    },
    gallery: {
      badge: 'Gallery',
      subtitle: 'Explore Hillary’s carefully curated photo gallery taken across film sets, fine art exhibitions and analog darkroom studies.',
      dragTip: 'Click or drag to drop next frame',
      counterLabel: '35MM STILL FRAMES',
      photos: [
        { id: 'g-1', title: '35mm Analog Essay — Series I', location: 'São Paulo' },
        { id: 'g-2', title: 'Geometry & Natural Light', location: 'Minas Gerais' },
        { id: 'g-3', title: 'Set Scenes & Practical Lighting', location: 'Rio de Janeiro' },
        { id: 'g-4', title: 'Kodak Film Portraiture', location: 'Studio' },
        { id: 'g-5', title: 'Temporal Composition 35mm', location: 'São Paulo' },
      ],
    },
    videoArchive: {
      badge: 'Video Archive',
      subtitle: 'Explore the moments, stories and cinematographic performances captured on film.',
      tag: '[ 35MM SHOWREEL ]',
      creditsTitle: '[ TECHNICAL CREDITS ]',
      pelicula: 'Film Stock: Kodak Vision3 500T (35mm)',
      aspectRatio: 'Aspect Ratio: 2.39:1 Anamorphic',
      master: 'Master: 4K DCP DCI Cinema',
      scrubberTitle: 'TIMELINE SCRUBBER',
      closeBtn: 'Close',
      privateSession: '[ PRIVATE SCREENING // 4K DCP PROJECTION ]',
    },
    newsletter: {
      badge: 'Newsletter & Dispatch',
      title: 'Join the dispatch for exclusive updates on new films, festival screenings, and private previews.',
      placeholder: 'Enter your professional email...',
      btnSubscribe: 'Subscribe to Dispatch',
      btnSuccess: 'Subscribed Successfully!',
      privacy: 'No spam. Strictly authored cinema and screening announcements.',
    },
    footer: {
      navTitle: 'Navigation',
      disciplinesTitle: 'Disciplines',
      followTitle: 'Follow',
      contactTitle: 'Direct Contact',
      location: 'São Paulo, Brazil',
      backToTop: 'Back to Top ↑',
      rights: '© 2026 Hillary Heidy. All rights reserved.',
      disciplines: [
        'Cinematography & Direction',
        'Analog 35mm Cinema',
        'Fashion Films & Commercials',
        'Color Grading & Curatorship',
      ],
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Read saved language preference or browser locale
    const saved = localStorage.getItem('hh-lang') as Language | null;
    if (saved === 'pt' || saved === 'en') {
      setLanguageState(saved);
      document.documentElement.lang = saved === 'pt' ? 'pt-BR' : 'en';
    } else {
      const browserLang = navigator.language.toLowerCase();
      const initial: Language = browserLang.startsWith('pt') ? 'pt' : 'en';
      setLanguageState(initial);
      document.documentElement.lang = initial === 'pt' ? 'pt-BR' : 'en';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hh-lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
