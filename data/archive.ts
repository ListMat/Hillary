export interface ArchiveItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  aspect: 'tall' | 'wide' | 'square' | 'standard';
  image: string;
  location?: string;
  notes?: string;
}

export const archiveItems: ArchiveItem[] = [
  {
    id: 'arch-01',
    number: '01',
    title: 'Retrato em Luz Natural',
    category: 'Retrato',
    year: '2026',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    location: 'São Paulo, SP',
    notes: 'Luz difusa de fim de tarde através de cortina translúcida. Ensaio de estúdio.'
  },
  {
    id: 'arch-02',
    number: '02',
    title: 'Frame 42 — Neblina Matinal',
    category: 'Cinema Still',
    year: '2025',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop',
    location: 'Serra da Mantiqueira',
    notes: 'Frame do projeto "Silêncio das Águas", momento de transição atmosférica.'
  },
  {
    id: 'arch-03',
    number: '03',
    title: 'Estudo Cromático III',
    category: 'Experimentação',
    year: '2025',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    location: 'Ateliê Central',
    notes: 'Gelatinas coloridas e sombras duras explorando geometria de silhueta.'
  },
  {
    id: 'arch-04',
    number: '04',
    title: 'Bastidores: Montagem de Luz',
    category: 'Bastidores',
    year: '2025',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    location: 'Locação Fábrica Desativada',
    notes: 'Preparação do rig de iluminação para cena noturna.'
  },
  {
    id: 'arch-05',
    number: '05',
    title: 'Composição Arquitetônica',
    category: 'Fotografia',
    year: '2024',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    location: 'Brasília, DF',
    notes: 'Linhas retas e sombras projetadas em concreto aparente.'
  },
  {
    id: 'arch-06',
    number: '06',
    title: 'Frame 108 — Horizonte Noturno',
    category: 'Cinema Still',
    year: '2024',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1400&auto=format&fit=crop',
    location: 'Viaduto do Chá',
    notes: 'Tomada em plano geral com reflexos de chuva no piso urbano.'
  },
  {
    id: 'arch-07',
    number: '07',
    title: 'Textura e Matéria Orgânica',
    category: 'Estudo',
    year: '2024',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
    location: 'Litoral Norte',
    notes: 'Macrofotografia de casca de árvore e umidade.'
  },
  {
    id: 'arch-08',
    number: '08',
    title: 'Direção de Movimento',
    category: 'Retrato',
    year: '2023',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop',
    location: 'Estúdio Galpão',
    notes: 'Longa exposição com flash sincronizado na segunda cortina.'
  }
];
