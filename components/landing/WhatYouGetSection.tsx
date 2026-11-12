import React from 'react';
import {
  BookOpen,
  Compass,
  MessageCircleHeart,
  Printer,
} from 'lucide-react';
import { LANDING_CONFIG, type BenefitItem } from '@/lib/landing-config';

const ICON_MAP: Record<BenefitItem['iconName'], React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Compass,
  MessageCircleHeart,
  Printer,
};

export function WhatYouGetSection() {
  const { whatYouGet } = LANDING_CONFIG;

  return (
    <section
      id="o-que-voce-recebe"
      aria-labelledby="what-you-get-headline"
      className="w-full bg-[#FAF7F2] py-10 sm:py-16 lg:py-20 border-b border-[#E4DEC9]/80 scroll-mt-6"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 px-1">
          <h2
            id="what-you-get-headline"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C2822] tracking-tight text-balance mb-2.5 sm:mb-3"
          >
            {whatYouGet.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#526058] leading-relaxed">
            {whatYouGet.subtitle}
          </p>
        </div>

        {/* Grade de exatamente 4 benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {whatYouGet.benefits.map((item) => {
            const IconComponent = ICON_MAP[item.iconName];
            return (
              <article
                key={item.id}
                className="bg-white border border-[#E4DEC9] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-[#C59B40]"
              >
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#E9F0EC] text-[#1F4333] flex items-center justify-center mb-3 sm:mb-4 border border-[#1F4333]/10">
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                    className="text-base sm:text-lg font-semibold text-[#1C2822] mb-1.5 leading-snug"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526058] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
