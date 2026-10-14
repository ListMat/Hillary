import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Hillary Heidy — Cinema, Fotografia e Direção',
  description:
    'Portfólio de Hillary Heidy, criadora audiovisual atuando entre fotografia, cinema, direção e produção.',
  authors: [{ name: 'Hillary Heidy' }],
  keywords: [
    'Hillary Heidy',
    'Audiovisual',
    'Direção de Fotografia',
    'Fotografia Editorial',
    'Cinema',
    'Direção Criativa',
    'Produção Audiovisual',
    'Portfolio',
    'Brasil',
  ],
  openGraph: {
    title: 'Hillary Heidy — Cinema, Fotografia e Direção',
    description:
      'Portfólio autoral e cinematográfico de Hillary Heidy. Narrativas visuais, fotografia e direção.',
    url: 'https://hillaryheidy.com',
    siteName: 'Hillary Heidy',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hillary Heidy — Cinema, Fotografia e Direção',
    description:
      'Portfólio autoral e cinematográfico de Hillary Heidy. Narrativas visuais, fotografia e direção.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#fbf9f5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased selection:bg-black selection:text-white bg-background text-foreground transition-colors duration-700">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
