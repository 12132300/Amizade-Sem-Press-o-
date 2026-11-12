import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LANDING_CONFIG,
  buildCheckoutUrlWithUtms,
  formatCountdown,
  calculateBonusTotal,
} from './landing-config';

test('Mandatory structure counts match user specification strictly', () => {
  assert.equal(
    LANDING_CONFIG.hero.subheadline,
    'Com 12 histórias em quadrinhos, 12 mapas de escolhas e um guia para responsáveis, vocês podem ensaiar em casa o que dizer quando os colegas insistem, como colocar limites e a quem pedir ajuda.'
  );

  // Section 3: Exactly 4 benefits
  assert.equal(
    LANDING_CONFIG.whatYouGet.benefits.length,
    4,
    'Section "O que você recebe" must have exactly 4 benefits'
  );

  // Section 4: First 3 items of "Veja por dentro" must be real product images
  assert.ok(LANDING_CONFIG.lookInside.items.length >= 4);
  assert.equal(LANDING_CONFIG.lookInside.items[0].type, 'image');
  assert.equal(LANDING_CONFIG.lookInside.items[1].type, 'image');
  assert.equal(LANDING_CONFIG.lookInside.items[2].type, 'image');

  // Section 5: Exactly 3 bonuses
  assert.equal(
    LANDING_CONFIG.bonuses.items.length,
    3,
    'Bonus section must have exactly 3 bonus cards'
  );
  assert.equal(LANDING_CONFIG.bonuses.freeHighlightText, 'MAS HOJE É GRÁTIS!');

  // Section 6: Single offer at R$ 19,90 with 7-day guarantee
  assert.equal(LANDING_CONFIG.offer.priceInteger, '19');
  assert.equal(LANDING_CONFIG.offer.priceCents, ',90');
  assert.ok(LANDING_CONFIG.offer.guaranteeTitle.includes('7 dias'));

  // Section 8: Exactly 4 FAQ items
  assert.equal(
    LANDING_CONFIG.faq.items.length,
    4,
    'FAQ section must have exactly 4 questions'
  );
});

test('No forbidden technical marketing terms in visible copy', () => {
  const serializedCopy = JSON.stringify({
    urgencyBar: LANDING_CONFIG.urgencyBar,
    hero: LANDING_CONFIG.hero,
    whatYouGet: LANDING_CONFIG.whatYouGet,
    lookInside: LANDING_CONFIG.lookInside,
    bonuses: LANDING_CONFIG.bonuses,
    offer: LANDING_CONFIG.offer,
    socialProof: LANDING_CONFIG.socialProof,
    faq: LANDING_CONFIG.faq,
    footer: LANDING_CONFIG.footer,
  }).toLowerCase();

  const forbiddenTerms = ['\\bhook\\b', '\\bcta\\b', '\\bfunil\\b', '\\blead\\b', '\\bconversão\\b'];
  for (const pattern of forbiddenTerms) {
    const regex = new RegExp(pattern, 'i');
    assert.equal(
      regex.test(serializedCopy),
      false,
      `Visible copy must not contain technical marketing term matching ${pattern}`
    );
  }
});

test('buildCheckoutUrlWithUtms preserves UTM and tracking parameters', () => {
  const base = 'https://pay.seucheckout.com.br/amizade-sem-pressao';
  const search = '?utm_source=ig&utm_medium=cpc&utm_campaign=lancamento&fbclid=abc123';
  const result = buildCheckoutUrlWithUtms(base, search);
  assert.equal(
    result,
    'https://pay.seucheckout.com.br/amizade-sem-pressao?utm_source=ig&utm_medium=cpc&utm_campaign=lancamento&fbclid=abc123'
  );

  // Does not overwrite existing checkout query param
  const baseWithParam = 'https://pay.seucheckout.com.br/amizade-sem-pressao?off=xyz';
  const resultWithParam = buildCheckoutUrlWithUtms(baseWithParam, '?utm_source=fb&off=override');
  assert.equal(
    resultWithParam,
    'https://pay.seucheckout.com.br/amizade-sem-pressao?off=xyz&utm_source=fb'
  );
});

test('formatCountdown and calculateBonusTotal compute accurate values', () => {
  assert.deepEqual(formatCountdown(887), {
    hours: '00',
    minutes: '14',
    seconds: '47',
  });
  assert.deepEqual(formatCountdown(0), {
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const total = calculateBonusTotal(LANDING_CONFIG.bonuses.items);
  assert.equal(total, 'R$ 59,70');
});
