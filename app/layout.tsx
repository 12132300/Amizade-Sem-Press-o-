import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF7F2',
};

export const metadata: Metadata = {
  title: 'Amizade Sem Pressão — Kit Educativo Socioemocional',
  description:
    'Material educativo digital de educação socioemocional infantil (8 a 12 anos) com foco em amizade, limites, pressão dos colegas e como pedir ajuda.',
  openGraph: {
    title: 'Amizade Sem Pressão — Kit Educativo Socioemocional',
    description:
      'Material educativo digital de educação socioemocional infantil (8 a 12 anos) com foco em amizade, limites, pressão dos colegas e como pedir ajuda.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amizade Sem Pressão — Kit Educativo Socioemocional',
    description:
      'Material educativo digital de educação socioemocional infantil (8 a 12 anos) com foco em amizade, limites, pressão dos colegas e como pedir ajuda.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAF7F2] text-[#1C2822] antialiased selection:bg-[#1F4333] selection:text-white"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
