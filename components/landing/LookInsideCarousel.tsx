'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';
import { LANDING_CONFIG, type LookInsideItem } from '@/lib/landing-config';

export function LookInsideCarousel() {
  const { lookInside } = LANDING_CONFIG;
  const totalItems = lookInside.items.length;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [zoomedItem, setZoomedItem] = useState<LookInsideItem | null>(null);
  const isZoomed = Boolean(zoomedItem);

  // Mouse drag & touch pause support for desktop & mobile
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    const bounded = Math.max(0, Math.min(index, totalItems - 1));
    setActiveIndex(bounded);
    if (!container) return;
    const cards = container.querySelectorAll('[data-carousel-card]');
    const targetCard = cards[bounded] as HTMLElement | undefined;
    if (targetCard) {
      container.scrollTo({
        left: targetCard.offsetLeft - 16,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isZoomed || totalItems <= 1) return;

    const timerId = window.setInterval(() => {
      if (isDraggingRef.current || isInteractingRef.current) return;
      const container = scrollContainerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('[data-carousel-card]');
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
  }, [isZoomed, totalItems]);

  const handleScroll = () => {
    if (!isDraggingRef.current && !isInteractingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollPos = container.scrollLeft;
    const cardWidth = 340;
    const approxIndex = Math.round(scrollPos / cardWidth);
    if (approxIndex >= 0 && approxIndex < totalItems) {
      setActiveIndex(approxIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    isInteractingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
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
      aria-labelledby="look-inside-headline"
      className="w-full bg-[#F3EFE6] py-10 sm:py-16 lg:py-20 border-b border-[#E4DEC9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header centralizado */}
        <div className="flex flex-col items-center text-center mb-7 sm:mb-10 px-1">
          <div className="max-w-2xl mx-auto">
            <h2
              id="look-inside-headline"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C2822] tracking-tight text-balance mb-2"
            >
              {lookInside.headline}
            </h2>
            <p className="text-xs sm:text-base text-[#526058] leading-relaxed">
              {lookInside.subtitle}
            </p>
          </div>
        </div>

        {/* Carrossel Horizontal com avanço automático */}
        <div
          ref={scrollContainerRef}
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
          data-testid="look-inside-carousel"
        >
          {lookInside.items.map((item, idx) => (
            <article
              key={item.id}
              data-carousel-card
              className="snap-start shrink-0 w-[82vw] max-w-[330px] sm:w-[350px] bg-white border border-[#E4DEC9] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative bg-[#FAF7F2] p-2.5 sm:p-3 border-b border-[#E4DEC9] group">
                  {item.imageSrc && (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      width={450}
                      height={636}
                      sizes="(max-width: 640px) 280px, 450px"
                      className="w-full h-72 sm:h-96 object-contain rounded bg-white mx-auto block shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setZoomedItem(item)}
                    aria-label={`Ampliar página: ${item.title}`}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-[#1F4333]/90 hover:bg-[#1F4333] active:bg-[#163024] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer min-h-[34px]"
                  >
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ampliar página</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[11px] sm:text-xs font-semibold text-[#C59B40] mb-1">
                    0{idx + 1} · {item.badge}
                  </p>
                  <h3
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                    className="text-base sm:text-lg font-semibold text-[#1C2822] mb-1.5 leading-snug"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526058] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Indicadores discretos de posição */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {lookInside.items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Ir para slide ${idx + 1}: ${item.title}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 bg-[#1F4333]'
                  : 'w-2 bg-[#C8C0AE] hover:bg-[#1F4333]/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal de ampliação da página real do produto */}
      {zoomedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomedItem.title}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs"
          onClick={() => setZoomedItem(null)}
        >
          <div
            className="relative bg-white rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-10 flex items-center justify-between gap-3 pb-3 mb-3 border-b border-[#E4DEC9]">
              <div className="pr-2">
                <p className="text-[11px] sm:text-xs font-semibold text-[#C59B40]">
                  {zoomedItem.badge}
                </p>
                <h3
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                  className="text-base sm:text-lg font-semibold text-[#1C2822] leading-snug line-clamp-1"
                >
                  {zoomedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomedItem(null)}
                aria-label="Fechar visualização da página"
                className="w-10 h-10 rounded-lg border border-[#E4DEC9] flex items-center justify-center text-[#1C2822] hover:bg-[#F3EFE6] active:bg-[#E4DEC9] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            {zoomedItem.imageSrc && (
              <Image
                src={zoomedItem.imageSrc}
                alt={zoomedItem.imageAlt || zoomedItem.title}
                width={750}
                height={1060}
                sizes="(max-width: 640px) 90vw, 750px"
                className="w-full h-auto rounded border border-[#E4DEC9] mx-auto block shadow-xs"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
