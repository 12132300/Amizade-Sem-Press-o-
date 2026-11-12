import React from 'react';
import Image from 'next/image';
import { MessageSquareQuote, Handshake, Puzzle, Gift } from 'lucide-react';
import {
  LANDING_CONFIG,
  calculateBonusTotal,
  type BonusItem,
} from '@/lib/landing-config';

const BONUS_ICON_MAP: Record<
  BonusItem['iconName'],
  React.ComponentType<{ className?: string }>
> = {
  MessageSquareQuote,
  Handshake,
  Puzzle,
};

export function BonusSection() {
  const { bonuses } = LANDING_CONFIG;
  const totalBonusValue = calculateBonusTotal(bonuses.items);

  return (
    <section
      aria-labelledby="bonus-headline"
      className="w-full bg-[#FAF7F2] py-10 sm:py-16 lg:py-20 border-b border-[#E4DEC9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 px-1">
          <p className="text-xs sm:text-sm font-semibold text-[#C59B40] mb-2">
            {bonuses.eyebrow}
          </p>
          <h2
            id="bonus-headline"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C2822] tracking-tight text-balance mb-2.5 sm:mb-3"
          >
            {bonuses.headline}
          </h2>
          <p className="text-xs sm:text-base text-[#526058] leading-relaxed">
            {bonuses.subtitle}
          </p>
        </div>

        {/* Exatamente 3 cards de bônus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {bonuses.items.map((bonus) => {
            const IconComponent = BONUS_ICON_MAP[bonus.iconName];
            return (
              <article
                key={bonus.id}
                className="bg-white border border-[#E4DEC9] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Topo do card: Ícone, "Bônus 01/02/03" e valor individual riscado */}
                  <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-[#E4DEC9]/70">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#E9F0EC] text-[#1F4333] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#1F4333]">
                        {bonus.numberLabel}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] sm:text-xs text-[#526058] block">
                        Valor avulso:
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#B94625] line-through tabular-nums">
                        {bonus.referenceValueFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Miniatura real da capa do bônus */}
                  <div className="bg-[#FAF7F2] border border-[#E4DEC9] rounded-lg p-2.5 mb-3.5 flex items-center justify-center">
                    <Image
                      src={bonus.coverImage}
                      alt={`Capa do ${bonus.numberLabel}: ${bonus.title}`}
                      width={300}
                      height={424}
                      sizes="(max-width: 640px) 220px, 300px"
                      className="h-44 sm:h-48 w-auto object-contain rounded shadow-xs bg-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Título e descrição curta */}
                  {bonus.pagesLabel ? (
                    <p className="text-[11px] sm:text-xs font-medium text-[#526058] mb-1">
                      {bonus.pagesLabel}
                    </p>
                  ) : null}
                  <h3
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                    className="text-lg sm:text-xl font-semibold text-[#1C2822] mb-1.5 leading-snug"
                  >
                    {bonus.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526058] leading-relaxed">
                    {bonus.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4DEC9]/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#526058]">Incluído no kit:</span>
                  <span className="text-[#1F4333]">R$ 0,00 (Grátis hoje)</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Abaixo: Soma dos bônus + Destaque claro: "MAS HOJE É GRÁTIS!" */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto bg-[#F7F1E1] border border-[#C59B40]/60 rounded-xl p-5 sm:p-6 text-center shadow-xs">
          <p className="text-xs sm:text-base text-[#425048] mb-1">
            {bonuses.referenceNote}{' '}
            <span className="font-semibold line-through text-[#B94625] tabular-nums">
              {totalBonusValue}
            </span>
          </p>
          <div className="inline-flex items-center justify-center gap-2 mt-1">
            <Gift className="w-5 h-5 text-[#1F4333] shrink-0" aria-hidden="true" />
            <p
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              className="text-xl sm:text-2xl font-bold text-[#1F4333] tracking-tight"
            >
              {bonuses.freeHighlightText}
            </p>
          </div>
          <p className="text-[11px] sm:text-sm text-[#526058] mt-1">
            Os 3 materiais bônus estão incluídos sem custo adicional ao adquirir o Kit Amizade Sem Pressão.
          </p>
        </div>
      </div>
    </section>
  );
}
