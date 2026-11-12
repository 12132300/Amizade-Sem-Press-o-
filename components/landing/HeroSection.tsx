'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { LANDING_CONFIG } from '@/lib/landing-config';

export function HeroSection() {
  const { hero } = LANDING_CONFIG;

  const handleScrollToNextSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(hero.scrollTargetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative w-full bg-[#FAF7F2] pt-6 pb-10 sm:pt-10 sm:pb-14 border-b border-[#E4DEC9]/80 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Headline direta focada no benefício principal com destaque em itálico e cor */}
        <h1
          id="hero-headline"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          className="text-[22px] sm:text-4xl lg:text-[44px] font-semibold text-[#1C2822] leading-[1.18] sm:leading-[1.15] tracking-tight max-w-3xl text-balance px-1"
        >
          {hero.headlineBefore}{' '}
          <span className="italic font-medium text-[#1F4333] underline decoration-[#C59B40]/60 decoration-2 underline-offset-4">
            {hero.headlineHighlight}
          </span>{' '}
          {hero.headlineAfter}
        </h1>

        {/* Visual principal abaixo da headline: Mockup transparente composto pelas capas reais do produto */}
        <div
          className="relative w-full max-w-xl my-4 sm:my-7 flex flex-col items-center justify-center"
          aria-label="Apresentação visual dos 3 livros digitais que compõem o Kit Principal Amizade Sem Pressão"
        >
          {/* Glow sutil de fundo quente (sem blobs chamativos) */}
          <div
            className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-36 sm:h-56 bg-[#EFE9DA]/80 rounded-full blur-2xl -z-10"
            aria-hidden="true"
          />

          <div className="relative flex items-end justify-center w-full max-w-md sm:max-w-lg px-2 sm:px-4">
            {/* Caderno de Mapas de Escolhas (Esquerda) */}
            <div className="w-[33%] -mr-4 sm:-mr-8 mb-1.5 sm:mb-2 transform -rotate-6 transition-transform duration-300 hover:-translate-y-1 z-10">
              <div className="rounded-lg overflow-hidden shadow-md border border-[#E4DEC9] bg-white">
                <Image
                  src={hero.productMockupImages.leftPage}
                  alt="Capa real do Caderno de Mapas de Escolhas (13 páginas com 12 mapas visuais)"
                  width={360}
                  height={509}
                  sizes="(max-width: 640px) 130px, 200px"
                  className="w-full h-auto object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Livro Principal (Centro em destaque) */}
            <div className="w-[44%] z-20 transition-transform duration-300 hover:-translate-y-1">
              <div className="rounded-lg overflow-hidden shadow-xl border-2 border-[#C59B40]/70 bg-white">
                <Image
                  src={hero.productMockupImages.mainCover}
                  alt="Capa real do Livro Principal Amizade Sem Pressão (41 páginas com 12 histórias em quadrinhos)"
                  width={440}
                  height={622}
                  priority
                  sizes="(max-width: 640px) 180px, 260px"
                  className="w-full h-auto object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Guia dos Responsáveis (Direita) */}
            <div className="w-[33%] -ml-4 sm:-ml-8 mb-1.5 sm:mb-2 transform rotate-6 transition-transform duration-300 hover:-translate-y-1 z-10">
              <div className="rounded-lg overflow-hidden shadow-md border border-[#E4DEC9] bg-white">
                <Image
                  src={hero.productMockupImages.rightPage}
                  alt="Capa real do Guia dos Responsáveis (15 páginas com roteiros de conversa e ensaio)"
                  width={360}
                  height={509}
                  sizes="(max-width: 640px) 130px, 200px"
                  className="w-full h-auto object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subheadline simples explicando o que a pessoa recebe e como usa */}
        <p className="text-sm sm:text-base lg:text-lg text-[#425048] leading-relaxed max-w-2xl mb-5 sm:mb-6 px-1">
          {hero.subheadline}
        </p>

        {/* Botão principal levando para a segunda dobra ("O que você recebe") */}
        <div className="flex flex-col items-center gap-2.5 w-full sm:w-auto px-2 sm:px-0">
          <a
            href={`#${hero.scrollTargetId}`}
            onClick={handleScrollToNextSection}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1F4333] hover:bg-[#163024] active:bg-[#12261d] active:scale-[0.98] text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-md transition-all duration-150 min-h-[50px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4333]"
          >
            <span>{hero.scrollButtonLabel}</span>
            <ArrowDown className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>

          {/* Nota curta de acesso imediato abaixo do botão */}
          <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#526058] text-center">
            <CheckCircle2 className="w-4 h-4 text-[#1F4333] shrink-0" aria-hidden="true" />
            <span>{hero.immediateAccessNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
