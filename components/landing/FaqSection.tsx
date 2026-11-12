'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LANDING_CONFIG } from '@/lib/landing-config';

export function FaqSection() {
  const { faq } = LANDING_CONFIG;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="faq-headline"
      className="w-full bg-[#FAF7F2] py-10 sm:py-16 lg:py-20 border-b border-[#E4DEC9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Layout com introdução à esquerda e perguntas expansíveis à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-start">
          {/* Coluna Esquerda: Introdução */}
          <div className="lg:col-span-5 text-center lg:text-left px-1">
            <p className="text-xs sm:text-sm font-semibold text-[#C59B40] mb-2">
              {faq.introEyebrow}
            </p>
            <h2
              id="faq-headline"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C2822] tracking-tight text-balance mb-2.5 sm:mb-3"
            >
              {faq.introHeadline}
            </h2>
            <p className="text-xs sm:text-base text-[#526058] leading-relaxed">
              {faq.introDescription}
            </p>
          </div>

          {/* Coluna Direita: Exatamente 4 perguntas frequentes expansíveis */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5" data-testid="faq-list">
            {faq.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E4DEC9] rounded-xl overflow-hidden shadow-xs transition-colors"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`panel-${item.id}`}
                      id={`button-${item.id}`}
                      className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left font-semibold text-sm sm:text-base md:text-lg text-[#1C2822] hover:bg-[#FAF7F2]/60 active:bg-[#FAF7F2] transition-colors cursor-pointer min-h-[50px]"
                    >
                      <span
                        style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                        className="leading-snug"
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#1F4333] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={`panel-${item.id}`}
                      role="region"
                      aria-labelledby={`button-${item.id}`}
                      className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1.5 text-xs sm:text-sm md:text-base text-[#526058] leading-relaxed border-t border-[#E4DEC9]/60"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
