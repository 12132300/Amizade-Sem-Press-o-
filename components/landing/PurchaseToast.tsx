'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { LANDING_CONFIG } from '@/lib/landing-config';

export function PurchaseToast() {
  const buyers = LANDING_CONFIG.recentBuyers;
  const totalBuyers = buyers.length;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (isDismissed || totalBuyers === 0) return;

    // Show first notification after 3 seconds
    const initialShowTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Cycle every 10 seconds: show for 4.5s, hide for 5.5s, then advance index
    const cycleInterval = window.setInterval(() => {
      setIsVisible(false);

      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % totalBuyers);
        setIsVisible(true);
      }, 4500);
    }, 9500);

    return () => {
      window.clearTimeout(initialShowTimer);
      window.clearInterval(cycleInterval);
    };
  }, [isDismissed, totalBuyers]);

  if (isDismissed || totalBuyers === 0) {
    return null;
  }

  const currentBuyer = buyers[currentIndex] ?? buyers[0];

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="purchase-toast"
      className={`fixed bottom-3 left-3 right-3 sm:right-auto sm:bottom-5 sm:left-5 z-40 max-w-xs sm:max-w-sm transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xs border border-[#E4DEC9] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-lg flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#E9F0EC] text-[#1F4333] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-[#1F4333]" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-semibold text-[#1C2822] truncate">
            {currentBuyer.name}{' '}
            <span className="font-normal text-[#526058]">
              • {currentBuyer.location}
            </span>
          </p>
          <p className="text-[11px] sm:text-xs text-[#2C3A33] leading-snug truncate">
            Adquiriu o <span className="font-medium">Kit Amizade Sem Pressão</span>
          </p>
          <p className="text-[10px] text-[#526058] mt-0.5">
            Compra verificada • {currentBuyer.timeAgo}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Fechar notificação"
          className="text-[#526058] hover:text-[#1C2822] p-1 rounded-md transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
