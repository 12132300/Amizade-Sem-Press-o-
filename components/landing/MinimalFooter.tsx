import React from 'react';
import { LANDING_CONFIG } from '@/lib/landing-config';

export function MinimalFooter() {
  const { footer } = LANDING_CONFIG;

  return (
    <footer className="w-full bg-[#163024] text-white py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          className="text-xl sm:text-2xl font-semibold text-white mb-2"
        >
          {footer.productName}
        </p>
        <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed mb-3">
          {footer.utilityPhrase}
        </p>
        <p className="text-xs text-white/60">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
