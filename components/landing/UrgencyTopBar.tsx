'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import {
  LANDING_CONFIG,
  formatCurrentDatePtBr,
  formatCurrentTimePtBr,
} from '@/lib/landing-config';

export function UrgencyTopBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => {
      setNow(new Date());
    };

    const initialTimer = window.setTimeout(updateClock, 0);
    const interval = window.setInterval(updateClock, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  const currentDateText = now ? formatCurrentDatePtBr(now) : '';
  const currentTimeText = now ? formatCurrentTimePtBr(now) : '--:--:--';

  return (
    <div
      role="region"
      aria-label="Aviso de condição de lançamento"
      className="w-full bg-[#D95D39] text-white border-b border-[#C04E2C]"
    >
      <div className="max-w-6xl mx-auto px-3 py-1.5 sm:py-2 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 text-[11px] xs:text-xs sm:text-sm font-medium tracking-normal text-center">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0 opacity-90" aria-hidden="true" />
          <span>
            {LANDING_CONFIG.urgencyBar.offerText}
            {currentDateText ? (
              <>
                {' • '}
                <strong className="font-semibold underline decoration-white/60 underline-offset-2">
                  {currentDateText}
                </strong>
              </>
            ) : null}
          </span>
        </span>

        <span className="hidden sm:inline opacity-60" aria-hidden="true">
          |
        </span>

        <span
          className="inline-flex items-center gap-1.5 bg-[#B94625] px-2.5 py-0.5 rounded text-white font-semibold tabular-nums text-[11px] xs:text-xs sm:text-sm shadow-xs"
          aria-live="polite"
        >
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span data-testid="countdown-timer">{currentTimeText}</span>
        </span>
      </div>
    </div>
  );
}
