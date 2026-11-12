'use client';

import React, { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Check, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import {
  LANDING_CONFIG,
  buildCheckoutUrlWithUtms,
} from '@/lib/landing-config';

const emptySubscribe = () => () => {};

export function OfferSection() {
  const { offer, checkout } = LANDING_CONFIG;

  const clientSearch = useSyncExternalStore(
    emptySubscribe,
    () => window.location.search,
    () => ''
  );

  const finalCheckoutUrl = buildCheckoutUrlWithUtms(checkout.url, clientSearch);

  return (
    <section
      id="oferta"
      aria-labelledby="offer-headline"
      className="w-full bg-[#F3EFE6] py-10 sm:py-16 lg:py-20 border-b border-[#E4DEC9]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Eyebrow "Oferta", Headline simples dizendo que o produto está pronto e texto curto sobre condição real */}
        <div className="text-center mb-7 sm:mb-10 px-1">
          <p className="text-xs sm:text-sm font-semibold text-[#C59B40] mb-2">
            {offer.eyebrow}
          </p>
          <h2
            id="offer-headline"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C2822] tracking-tight text-balance mb-2.5 sm:mb-3"
          >
            {offer.headline}
          </h2>
          <p className="text-xs sm:text-base text-[#526058]">
            {offer.conditionText}
          </p>
        </div>

        {/* Apenas uma caixa de oferta */}
        <div
          className="bg-white border-2 border-[#1F4333] rounded-2xl p-5 sm:p-8 lg:p-10 shadow-md"
          data-testid="single-offer-box"
        >
          {/* Cabeçalho da caixa com Nome do produto */}
          <div className="pb-5 mb-5 sm:pb-6 sm:mb-6 border-b border-[#E4DEC9] text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-xs font-semibold text-[#1F4333] mb-1">
                {offer.totalPagesBadge}
              </p>
              <h3
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1C2822]"
              >
                {offer.productName}
              </h3>
              <p className="text-xs sm:text-sm text-[#526058] mt-1">
                {offer.productTagline}
              </p>
            </div>
          </div>

          {/* Lista clara de tudo que está incluído */}
          <div className="mb-7 sm:mb-8 space-y-5 sm:space-y-6">
            <div>
              <p className="text-sm sm:text-base font-semibold text-[#1C2822] mb-2.5 sm:mb-3">
                {offer.mainItemsHeading}
              </p>
              <ul className="space-y-3">
                {offer.mainItems.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-[#2C3A33] leading-snug"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E9F0EC] text-[#1F4333] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C2822] text-sm sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#526058] mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm sm:text-base font-semibold text-[#1C2822] mb-2.5 sm:mb-3">
                {offer.bonusItemsHeading}
              </p>
              <ul className="space-y-3">
                {offer.bonusItems.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-[#2C3A33] leading-snug"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E9F0EC] text-[#1F4333] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C2822] text-sm sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#526058] mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Preço principal bem destacado (sem mostrar preço antigo do produto) */}
          <div className="bg-[#FAF7F2] border border-[#E4DEC9] rounded-xl p-4 sm:p-6 mb-5 sm:mb-6 text-center">
            <p className="text-xs sm:text-sm font-medium text-[#526058] mb-1">
              Pagamento único • Acesso vitalício para consultar sempre que precisar
            </p>
            <div className="flex items-baseline justify-center gap-1 my-1 text-[#1F4333] tabular-nums">
              <span className="text-base sm:text-xl font-semibold">
                {offer.priceCurrency}
              </span>
              <span
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                className="text-5xl sm:text-6xl font-bold tracking-tight"
              >
                {offer.priceInteger}
              </span>
              <span className="text-2xl sm:text-3xl font-bold">
                {offer.priceCents}
              </span>
            </div>
            <p className="text-xs text-[#526058] mt-1">
              {offer.priceObservation}
            </p>
          </div>

          {/* Botão para o checkout */}
          <a
            href={finalCheckoutUrl}
            suppressHydrationWarning
            data-testid="checkout-button"
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1F4333] hover:bg-[#163024] active:bg-[#12261d] active:scale-[0.98] text-white font-bold text-base sm:text-lg px-5 sm:px-6 py-4 rounded-xl shadow-md transition-all duration-150 text-center min-h-[54px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4333]"
          >
            <span>{offer.buttonLabel}</span>
            <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>

          {/* Garantia incondicional de 7 dias abaixo do checkout com selo */}
          <div
            className="mt-4 p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E4DEC9] flex items-center gap-3.5 sm:gap-4 text-left"
            data-testid="guarantee-box"
          >
            <Image
              src={offer.guaranteeBadgeImage}
              alt="Selo Satisfação Garantida 7 Dias — Seu Dinheiro de Volta"
              width={88}
              height={88}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#1C2822]">
                {offer.guaranteeTitle}
              </p>
              <p className="text-[11px] sm:text-xs text-[#526058] mt-0.5 leading-relaxed">
                {offer.guaranteeDescription}
              </p>
            </div>
          </div>

          {/* Selo discreto de acesso seguro */}
          <div className="mt-4 flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-[#526058] text-center">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#1F4333] shrink-0" aria-hidden="true" />
              <span>{offer.securityBadgeText}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B40] shrink-0" aria-hidden="true" />
              <span>Pronto para ler juntos no celular, tablet ou imprimir em casa</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
