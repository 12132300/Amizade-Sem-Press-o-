'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { LANDING_CONFIG } from '@/lib/landing-config';

export function SocialProofCarousel() {
  const { socialProof } = LANDING_CONFIG;
  const totalItems = socialProof.items.length;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [, setActiveIndex] = useState<number>(0);

  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    if (totalItems <= 1) return;

    const timerId = window.setInterval(() => {
      if (isDraggingRef.current || isInteractingRef.current) return;
      const container = scrollRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('[data-social-card]');
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const isAtEnd = container.scrollLeft >= maxScrollLeft - 24;

      setActiveIndex((prev) => {
        const nextIndex = isAtEnd ? 0 : (prev + 1) % totalItems;
        const targetCard = cards[nextIndex] as HTMLElement | undefined;
        if (targetCard) {
          container.scrollTo({
            left: nextIndex === 0 ? 0 : targetCard.offsetLeft - 16,
            behavior: 'smooth',
          });
        }
        return nextIndex;
      });
    }, 1800);

    return () => {
      window.clearInterval(timerId);
    };
  }, [totalItems]);

  const handleScroll = () => {
    if (!isDraggingRef.current && !isInteractingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    const approxIndex = Math.round(container.scrollLeft / 340);
    if (approxIndex >= 0 && approxIndex < totalItems) {
      setActiveIndex(approxIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    isInteractingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    isInteractingRef.current = false;
  };

  return (
    <section
      aria-labelledby="social-proof-headline"
      className="w-full bg-[#FAF7F2] py-10 sm:py-16 lg:py-20 border-b border-[#E4DEC9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-7 sm:mb-10 px-1">
          <div className="max-w-2xl mx-auto">
            <h2
              id="social-proof-headline"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C2822] tracking-tight text-balance mb-2"
            >
              {socialProof.headline}
            </h2>
            <p className="text-xs sm:text-base text-[#526058] leading-relaxed">
              {socialProof.subtitle}
            </p>
          </div>
        </div>

        {/* Carrossel com avanço automático e destaques verificados */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onTouchEnd={() => {
            isInteractingRef.current = false;
          }}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing px-1"
          data-testid="social-proof-carousel"
        >
          {socialProof.items.map((item) => (
            <article
              key={item.id}
              data-social-card
              className="snap-start shrink-0 w-[82vw] max-w-[330px] sm:w-[360px] bg-white border border-[#E4DEC9] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Estrelas + Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="flex items-center gap-1 text-[#C59B40]"
                    aria-label={`${item.stars} de 5 estrelas`}
                  >
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#C59B40] text-[#C59B40]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#526058]">
                    {item.highlightTag}
                  </span>
                </div>

                {/* Imagem real da página/depoimento */}
                {item.imageSrc && (
                  <div className="mb-4 bg-[#FAF7F2] border border-[#E4DEC9] rounded p-2 flex items-center justify-center">
                    <Image
                      src={item.imageSrc}
                      alt={item.authorLabel}
                      width={300}
                      height={424}
                      className="h-44 w-auto object-contain rounded bg-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <p className="text-sm text-[#2C3A33] leading-relaxed italic mb-4">
                  {item.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E4DEC9]/70">
                <p
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                  className="text-base font-semibold text-[#1C2822]"
                >
                  {item.authorLabel}
                </p>
                <p className="text-xs text-[#526058]">{item.contextLabel}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
