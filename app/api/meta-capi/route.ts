import { NextRequest, NextResponse } from 'next/server';
import { LANDING_CONFIG } from '@/lib/landing-config';

const DEFAULT_PIXEL_ID = LANDING_CONFIG.tracking.metaPixelId || '1252002683687190';
const DEFAULT_CAPI_TOKEN =
  'EAAV3MYeuEaABSw9DrHhdYmlvXws4wxCyUkoUXso7YTdlhP830TnTdNqHhVIscQXiZB6bx32ZC0ZCjp3z8sURxDydhQQnIOMK5kezzooyVVwNSaAhdZCzZB7oZAiUPOfUWZCtknDXZANtuqqsJ3NoZApZC0Cs9h7SZBlHEV3fiZCNpoRlrSTOmAX0CygIlMsNjeMWZCgZDZD';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventName = 'PageView',
      eventId,
      eventSourceUrl,
      fbp,
      fbc,
      customData,
    } = body ?? {};

    const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
    const accessToken = process.env.META_CAPI_TOKEN || DEFAULT_CAPI_TOKEN;

    if (!pixelId || !accessToken) {
      return NextResponse.json({ ok: false, reason: 'missing_credentials' }, { status: 200 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIpAddress = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : req.headers.get('x-real-ip') || undefined;
    const clientUserAgent = req.headers.get('user-agent') || undefined;

    const cookieFbp = fbp || req.cookies.get('_fbp')?.value;
    const cookieFbc = fbc || req.cookies.get('_fbc')?.value;

    const eventPayload: Record<string, unknown> = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: eventSourceUrl || req.headers.get('referer') || undefined,
      user_data: {
        ...(clientIpAddress ? { client_ip_address: clientIpAddress } : {}),
        ...(clientUserAgent ? { client_user_agent: clientUserAgent } : {}),
        ...(cookieFbp ? { fbp: cookieFbp } : {}),
        ...(cookieFbc ? { fbc: cookieFbc } : {}),
      },
    };

    if (eventId) {
      eventPayload.event_id = String(eventId);
    }

    if (customData && typeof customData === 'object') {
      eventPayload.custom_data = customData;
    }

    const graphUrl = `https://graph.facebook.com/v21.0/${encodeURIComponent(
      pixelId
    )}/events?access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(graphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [eventPayload],
      }),
    });

    const result = await response.json().catch(() => ({}));
    return NextResponse.json({ ok: response.ok, result }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
