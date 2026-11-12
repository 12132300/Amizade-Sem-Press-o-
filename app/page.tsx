import React from 'react';
import { UrgencyTopBar } from '@/components/landing/UrgencyTopBar';
import { HeroSection } from '@/components/landing/HeroSection';
import { WhatYouGetSection } from '@/components/landing/WhatYouGetSection';
import { LookInsideCarousel } from '@/components/landing/LookInsideCarousel';
import { BonusSection } from '@/components/landing/BonusSection';
import { OfferSection } from '@/components/landing/OfferSection';
import { SocialProofCarousel } from '@/components/landing/SocialProofCarousel';
import { FaqSection } from '@/components/landing/FaqSection';
import { MinimalFooter } from '@/components/landing/MinimalFooter';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. FAIXA SUPERIOR DE URGÊNCIA */}
      <UrgencyTopBar />

      {/* 2. HERO CENTRALIZADO */}
      <HeroSection />

      {/* 3. SEÇÃO “O QUE VOCÊ RECEBE” */}
      <WhatYouGetSection />

      {/* 4. CARROSSEL “VEJA POR DENTRO” */}
      <LookInsideCarousel />

      {/* 5. SEÇÃO DE BÔNUS */}
      <BonusSection />

      {/* 6. SEÇÃO DE OFERTA */}
      <OfferSection />

      {/* 7. PROVA SOCIAL */}
      <SocialProofCarousel />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. FOOTER MINIMALISTA */}
      <MinimalFooter />
    </main>
  );
}
