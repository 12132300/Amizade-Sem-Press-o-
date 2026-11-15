'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { LANDING_CONFIG } from '@/lib/landing-config';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function getOrCreateFbc(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const existingFbc = getCookieValue('_fbc');
  if (existingFbc) return existingFbc;

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

export function trackMetaEvent(
  eventName: 'PageView' | 'ViewContent' | 'InitiateCheckout',
  customData?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  const eventId = `${eventName.toLowerCase()}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 9)}`;

  // 1. Browser Pixel (with eventID for deduplication)
  if (typeof window.fbq === 'function') {
    if (customData) {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } else {
      window.fbq('track', eventName, {}, { eventID: eventId });
    }
  }

  // 2. Server Conversions API (CAPI)
  const payload = JSON.stringify({
    eventName,
    eventId,
    eventSourceUrl: window.location.href,
    fbp: getCookieValue('_fbp'),
    fbc: getOrCreateFbc(),
    customData,
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/meta-capi', blob);
    } else {
      fetch('/api/meta-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Ignore tracking network errors so user experience is never blocked
  }
}

export function MetaPixelTracker() {
  const pixelId = LANDING_CONFIG.tracking.metaPixelId;

  useEffect(() => {
    if (!pixelId) return;

    const timer = window.setTimeout(() => {
      trackMetaEvent('PageView');
      trackMetaEvent('ViewContent', {
        content_name: LANDING_CONFIG.offer.productName,
        content_type: 'product',
        currency: 'BRL',
        value: 19.9,
      });
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
