export interface BenefitItem {
  id: string;
  iconName: 'BookOpen' | 'Compass' | 'MessageCircleHeart' | 'Printer';
  title: string;
  description: string;
}

export interface LookInsideItem {
  id: string;
  type: 'image' | 'usage-card';
  badge: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  highlights?: string[];
}

export interface BonusItem {
  id: string;
  numberLabel: string;
  iconName: 'MessageSquareQuote' | 'Handshake' | 'Puzzle';
  title: string;
  pagesLabel: string;
  referenceValue: number;
  referenceValueFormatted: string;
  description: string;
  coverImage: string;
  interiorImage?: string;
}

export interface SocialProofItem {
  id: string;
  authorLabel: string;
  contextLabel: string;
  stars: number;
  quote: string;
  highlightTag: string;
  imageSrc?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Pure helper to append current page UTM & tracking parameters to the checkout URL.
 * Preserves any query params already present on the checkout URL.
 */
export function buildCheckoutUrlWithUtms(
  baseCheckoutUrl: string,
  currentSearch: string
): string {
  const trimmed = baseCheckoutUrl.trim();
  if (!trimmed) return '#oferta';

  // If no query string in current page, return base URL as-is
  const cleanSearch = currentSearch.startsWith('?')
    ? currentSearch.slice(1)
    : currentSearch;
  if (!cleanSearch) return trimmed;

  // If it's an anchor or placeholder, append query string safely or keep anchor
  if (trimmed.startsWith('#')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const incomingParams = new URLSearchParams(cleanSearch);
    incomingParams.forEach((value, key) => {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    const separator = trimmed.includes('?') ? '&' : '?';
    return `${trimmed}${separator}${cleanSearch}`;
  }
}

/**
 * Pure helper to format remaining seconds into HH:MM:SS strings.
 */
export function formatCountdown(totalSeconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}

/**
 * Formats a Date into pt-BR format (e.g., "12 de novembro de 2026").
 */
export function formatCurrentDatePtBr(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a Date into pt-BR live time HH:MM:SS (e.g., "06:09:15").
 */
export function formatCurrentTimePtBr(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Formats a number into BRL currency string (e.g., "R$ 59,70").
 */
export function formatBrl(value: number): string {
  const fixed = value.toFixed(2).replace('.', ',');
  return `R$ ${fixed}`;
}

/**
 * Calculates total reference value of bonuses.
 */
export function calculateBonusTotal(bonuses: BonusItem[]): string {
  const sum = bonuses.reduce((acc, item) => acc + item.referenceValue, 0);
  return formatBrl(sum);
}

// ============================================================================
// CONFIGURAÇÃO CENTRAL DA PÁGINA (FÁCIL EDIÇÃO DE TEXTOS, IMAGENS, PREÇO E CHECKOUT)
// ============================================================================
export const LANDING_CONFIG = {
  // 0. RASTREAMENTO E CHECKOUT (Substitua apenas os valores abaixo quando desejar)
  tracking: {
    metaPixelId: '', // Ex: '123456789012345'
    googleTagId: '', // Ex: 'G-XXXXXXXXXX' ou 'GTM-XXXXXXX'
  },

  checkout: {
    // Insira aqui o link real do seu checkout (Hotmart, Kiwify, Eduzz, Kirvano, etc.)
    // As UTMs da URL atual são anexadas automaticamente em todos os botões de compra.
    url: 'https://pay.seucheckout.com.br/amizade-sem-pressao',
    placeholderNote: '[INSERIR LINK DO CHECKOUT]',
  },

  // 1. FAIXA SUPERIOR DE URGÊNCIA
  urgencyBar: {
    offerText: 'Condição especial de lançamento disponível hoje',
    countdownInitialSeconds: 14 * 60 + 47, // 14m 47s
  },

  // 2. HERO CENTRALIZADO
  hero: {
    eyebrow: 'Material educativo digital • Para famílias com crianças de 8 a 12 anos',
    headlineBefore: 'Ajude seu filho a lidar com a pressão dos colegas,',
    headlineHighlight: 'colocar limites com calma',
    headlineAfter: 'e saber quando pedir ajuda.',
    subheadline:
      'Com 12 histórias em quadrinhos, 12 mapas de escolhas e um guia para responsáveis, vocês podem ensaiar em casa o que dizer quando os colegas insistem, como colocar limites e a quem pedir ajuda.',
    scrollButtonLabel: 'Quero ver tudo o que está incluído',
    scrollTargetId: 'o-que-voce-recebe',
    immediateAccessNote: 'Recebimento digital imediato • Leitura no celular, tablet ou impresso',
    productMockupImages: {
      mainCover: '/images/produto/capa-livro-principal.png',
      leftPage: '/images/produto/capa-caderno-mapas.png',
      rightPage: '/images/produto/capa-guia-responsaveis.png',
    },
  },

  // 3. SEÇÃO "O QUE VOCÊ RECEBE" (Exatamente 4 benefícios concretos)
  whatYouGet: {
    headline: 'O que você recebe para conversar e praticar em casa',
    subtitle:
      'Um material estruturado passo a passo para transformar situações difíceis da escola e da turma em conversas acolhedoras e práticas.',
    benefits: [
      {
        id: 'beneficio-1',
        iconName: 'BookOpen',
        title: 'Histórias em Quadrinhos Ilustradas',
        description:
          'Seu filho já ouviu algo como “só joga se emprestar”? Leiam juntos histórias sobre pressão da turma, apelidos e exclusão no recreio. Conversar sobre o que aconteceu com os personagens ajuda a abordar o assunto sem exigir que a criança conte algo pessoal.',
      },
      {
        id: 'beneficio-2',
        iconName: 'Compass',
        title: 'Mapas Visuais de Escolhas',
        description:
          'Quando os colegas insistem, pode ser difícil saber o que fazer. Os mapas ajudam seu filho a explorar caminhos possíveis: dizer “não” do seu jeito, sair da situação ou procurar um adulto de confiança.',
      },
      {
        id: 'beneficio-3',
        iconName: 'MessageCircleHeart',
        title: 'Guia dos Responsáveis Sem Interrogatório',
        description:
          'Encontre as palavras para começar uma conversa delicada. O guia traz perguntas para acolher seu filho, sugestões para ensaiar respostas com ele e orientações para acompanhar o que acontece depois.',
      },
      {
        id: 'beneficio-4',
        iconName: 'Printer',
        title: 'Material Pronto para Usar',
        description:
          'Vá direto ao tema que faz sentido para sua família. Vocês podem ler juntos no celular ou tablet e imprimir as atividades que quiserem usar na hora de praticar.',
      },
    ] as BenefitItem[],
  },

  // 4. CARROSSEL "VEJA POR DENTRO" (3 imagens reais primeiro + cards visuais de uso/benefício)
  lookInside: {
    headline: 'Veja por dentro do material Amizade Sem Pressão',
    subtitle:
      'Conheça as páginas reais do kit e como cada parte funciona na rotina da família.',
    items: [
      {
        id: 'inside-img-1',
        type: 'image',
        badge: 'Livro Principal • Unidade 01',
        title: 'História em Quadrinhos: Só joga se emprestar',
        subtitle:
          'Cena ilustrada em quadrinhos que permite conversar sobre limites e pressão da turma a partir de personagens fictícios, sem expor nem interrogar a criança.',
        imageSrc: '/images/produto/hq-unidade-01.png',
        imageAlt: 'Página real da História em Quadrinhos Unidade 01 - Só joga se emprestar',
      },
      {
        id: 'inside-img-2',
        type: 'image',
        badge: 'Caderno de Mapas • Unidade 01',
        title: '12 Mapas Visuais de Escolhas em 5 Passos',
        subtitle:
          'Cada história vem acompanhada de um mapa visual em 5 etapas claras: perceber a pressão, escolher o limite, dizer do seu jeito, sair da pressão e pedir apoio.',
        imageSrc: '/images/produto/mapa-escolhas-01.png',
        imageAlt: 'Página real do Mapa de Escolhas Unidade 01 - Meu mapa de escolhas',
      },
      {
        id: 'inside-img-3',
        type: 'image',
        badge: 'Guia dos Responsáveis • Unidade 01',
        title: 'Roteiro de Conversa e Ensaio para Pais',
        subtitle:
          'Inclui objetivo da unidade, fala de acolhimento, três perguntas para conversar, ensaio de dois desfechos e orientações claras para o adulto acompanhar.',
        imageSrc: '/images/produto/guia-responsavel-01.png',
        imageAlt: 'Página real do Guia do Responsável Unidade 01 - Converse, ensaie e acompanhe',
      },
      {
        id: 'inside-img-4',
        type: 'image',
        badge: 'Livro Principal • Página 03',
        title: 'Como Usar em Família sem Interrogatório',
        subtitle:
          'Orientações práticas de acolhimento e ensaio respeitoso para a criança participar falando, apontando no mapa, escrevendo, desenhando ou observando.',
        imageSrc: '/images/produto/como-usar-em-familia.png',
        imageAlt: 'Página real de Como Usar em Família do Livro Principal',
      },
      {
        id: 'inside-img-5',
        type: 'image',
        badge: 'Livro Principal • Sumário Geral',
        title: 'Organização em 4 Módulos Temáticos',
        subtitle:
          'Índice completo das 12 unidades para a família escolher a situação que a criança está vivenciando hoje na escola ou com os colegas.',
        imageSrc: '/images/produto/indice-modulos.png',
        imageAlt: 'Página real do Índice de Módulos do Livro Principal',
      },
      {
        id: 'inside-img-6',
        type: 'image',
        badge: 'Kit Principal • Página 40',
        title: 'Nosso Combinado de Apoio e Proteção',
        subtitle:
          'Ficha prática de consulta rápida para registrar adultos e lugares seguros de apoio quando a criança precisar de ajuda.',
        imageSrc: '/images/produto/consulta-rapida.png',
        imageAlt: 'Página real de Consulta Rápida do Kit Principal Amizade Sem Pressão',
      },
      {
        id: 'inside-img-7',
        type: 'image',
        badge: 'Bônus 01 • Na Hora, o Que Eu Digo?',
        title: '30 Cartões Práticos de Situações Reais',
        subtitle:
          'Cada cartão traz a situação real, duas falas possíveis (uma suave e uma firme) e uma alternativa de ação para ensaiar em casa.',
        imageSrc: '/images/produto/bonus-01-cartao-01.png',
        imageAlt: 'Página real do cartão 01 de Na Hora o Que Eu Digo',
      },
      {
        id: 'inside-img-8',
        type: 'image',
        badge: 'Bônus 02 • Escola e Família em Acordo',
        title: 'Modelos de Mensagens Prontas para a Escola',
        subtitle:
          'Comunicação documentada e pacífica com professores e coordenação para alinhar combinados e proteger a criança sem conflitos.',
        imageSrc: '/images/produto/bonus-02-mensagens.png',
        imageAlt: 'Página real com modelos de mensagens de Escola e Família em Acordo',
      },
    ] as LookInsideItem[],
  },

  // 5. SEÇÃO DE BÔNUS (Exatamente 3 cards de bônus)
  bonuses: {
    eyebrow: 'Materiais Complementares Incluídos',
    headline: '3 Bônus reais incluídos no seu kit hoje',
    subtitle:
      'Leve o que vocês conversam em casa para o dia a dia. Com o Amizade Sem Pressão, você recebe bônus sem custo adicional para praticar com seu filho o que dizer quando os colegas insistem, saber como conversar com a escola e propor brincadeiras em que cada criança possa participar do seu jeito.',
    referenceNote: 'Valor de referência dos 3 materiais avulsos (incluídos sem custo adicional no lançamento):',
    freeHighlightText: 'MAS HOJE É GRÁTIS!',
    items: [
      {
        id: 'bonus-01',
        numberLabel: 'Bônus 01',
        iconName: 'MessageSquareQuote',
        title: 'Na Hora, o Que Eu Digo?',
        pagesLabel: '',
        referenceValue: 19.9,
        referenceValueFormatted: 'R$ 19,90',
        description:
          'Na hora em que os colegas insistem, é comum a criança travar sem saber como reagir. Este material traz situações reais do cotidiano com exemplos de falas suaves ou firmes e atitudes práticas para seu filho se posicionar com segurança, sem precisar entrar em conflito.',
        coverImage: '/images/produto/bonus-01-capa.png',
        interiorImage: '/images/produto/bonus-01-cartao-01.png',
      },
      {
        id: 'bonus-02',
        numberLabel: 'Bônus 02',
        iconName: 'Handshake',
        title: 'Escola e Família em Acordo',
        pagesLabel: '',
        referenceValue: 24.9,
        referenceValueFormatted: 'R$ 24,90',
        description:
          'Precisa conversar com a escola sobre o que está acontecendo, mas não sabe por onde começar? Tenha em mãos mensagens prontas para falar com professores e coordenação com clareza, além de orientações práticas para alinhar combinados e acompanhar de perto o bem-estar do seu filho.',
        coverImage: '/images/produto/bonus-02-capa.png',
        interiorImage: '/images/produto/bonus-02-mensagens.png',
      },
      {
        id: 'bonus-03',
        numberLabel: 'Bônus 03',
        iconName: 'Puzzle',
        title: 'Brincadeiras em que Todo Mundo Pode Participar',
        pagesLabel: '',
        referenceValue: 14.9,
        referenceValueFormatted: 'R$ 14,90',
        description:
          'Crie momentos leves em que nenhuma criança fica de fora. São atividades cooperativas de preparo simples, pensadas para que cada criança possa participar e contribuir do seu próprio jeito, fortalecendo a confiança e a convivência em família ou entre amigos.',
        coverImage: '/images/produto/bonus-03-capa.png',
      },
    ] as BonusItem[],
  },

  // 6. SEÇÃO DE OFERTA (Oferta única, sem planos ou comparações)
  offer: {
    eyebrow: 'Oferta',
    headline: 'O kit completo já está pronto para você baixar e usar hoje',
    conditionText:
      'Pagamento único de lançamento • Sem mensalidades • Acesso imediato liberado após a confirmação',
    productName: 'Kit Completo Amizade Sem Pressão + 3 Bônus',
    productTagline:
      'Educação socioemocional infantil (8 a 12 anos) sobre amizade, limites, pressão dos colegas e busca de ajuda.',
    mainItemsHeading: 'Você recebe',
    mainItems: [
      {
        title: 'Livro Principal Amizade Sem Pressão',
        description:
          'Histórias em quadrinhos para conversar sobre apelidos, exclusão e pressão dos colegas.',
      },
      {
        title: 'Caderno de Mapas de Escolhas',
        description:
          'Mapas visuais para ajudar a criança a decidir o que dizer, como colocar limites e a quem pedir ajuda.',
      },
      {
        title: 'Guia dos Responsáveis',
        description:
          'Orientações para iniciar conversas, ensaiar respostas com seu filho e acompanhar a situação.',
      },
    ],
    bonusItemsHeading: 'Bônus incluídos',
    bonusItems: [
      {
        title: 'Na Hora, o Que Eu Digo?',
        description:
          'Cartões com exemplos do que dizer e fazer quando os colegas insistem.',
      },
      {
        title: 'Escola e Família em Acordo',
        description:
          'Modelos de mensagens e orientações para conversar com a escola e acompanhar os combinados.',
      },
      {
        title: 'Brincadeiras em que Todo Mundo Pode Participar',
        description:
          'Brincadeiras cooperativas com diferentes formas de participar, para cada criança contribuir do seu jeito.',
      },
    ],
    totalPagesBadge: 'Acesso imediato ao material completo + 3 bônus exclusivos',
    priceCurrency: 'R$',
    priceInteger: '19',
    priceCents: ',90',
    priceObservation: 'Valor único sugerido para o lançamento. Todos os 3 bônus estão incluídos sem custo adicional.',
    buttonLabel: 'Quero garantir o Kit Amizade Sem Pressão agora',
    securityBadgeText: 'Compra 100% segura • Acesso liberado na hora para sua família',
    guaranteeBadgeImage: '/assets/aistudio/images_bd6ba88d.jfif',
    guaranteeTitle: 'Garantia incondicional de 7 dias',
    guaranteeDescription:
      'Você tem 7 dias para conhecer o material em casa. Se por qualquer motivo achar que o kit não atendeu suas expectativas, basta solicitar o reembolso integral sem burocracia.',
  },

  // 7. PROVA SOCIAL (Avaliações reais / Espaço preservado para prints reais sem criar depoimentos falsos)
  socialProof: {
    headline: 'O que pais e responsáveis destacam ao conhecer a estrutura do material',
    subtitle:
      'Veja os pontos reais do kit que ajudam as famílias a conduzir conversas sobre limites sem transformar o diálogo em interrogatório.',
    // Nota para edição: Para exibir prints reais enviados por clientes, basta preencher o campo `imageSrc` de cada item abaixo.
    items: [
      {
        id: 'prova-1',
        authorLabel: 'Histórias Fictícias que Acolhem Sem Expor',
        contextLabel: 'Unidades 01 a 12 • Livro Principal e Guia dos Responsáveis',
        stars: 5,
        quote:
          '“Observe a cena antes da decisão. Pergunte ‘O que você percebeu?’ sem procurar uma resposta perfeita. A história é fictícia; a criança não precisa contar algo pessoal para começar a praticar.”',
        highlightTag: 'Trecho real da página 03 — Como usar em família',
        imageSrc: '/images/produto/como-usar-em-familia.png',
      },
      {
        id: 'prova-2',
        authorLabel: 'Treino de Falas Curtas Antes do Conflito',
        contextLabel: '30 Cartões Práticos • Bônus Na Hora, o Que Eu Digo?',
        stars: 5,
        quote:
          '“Escolher e experimentar uma resposta em casa antes de precisar usá-la na vida real. A criança testa a Fala 1 (suave) e a Fala 2 (firme) para sentir qual combina melhor com o seu jeito de falar.”',
        highlightTag: 'Trecho real da página 03 — Na Hora, o Que Eu Digo?',
        imageSrc: '/images/produto/bonus-01-cartao-01.png',
      },
      {
        id: 'prova-3',
        authorLabel: 'Comunicação Calma e Documentada com a Escola',
        contextLabel: '10 Mensagens Copiáveis • Bônus Escola e Família em Acordo',
        stars: 5,
        quote:
          '“Acionar a escola com clareza, fatos documentados e postura de parceria — garantindo que seu filho seja protegido sem colocar os educadores na defensiva.”',
        highlightTag: 'Trecho real da página 03 — Escola e Família em Acordo',
        imageSrc: '/images/produto/bonus-02-mensagens.png',
      },
      {
        id: 'prova-4',
        authorLabel: 'Plano Concreto de Proteção e Apoio',
        contextLabel: 'Consulta Rápida • Página 40 do Kit Principal',
        stars: 5,
        quote:
          '“Você pode dizer não, sair da pressão e pedir apoio. Se travar ou não conseguir falar, ainda merece proteção. Não é preciso repetir o pedido muitas vezes antes de buscar ajuda.”',
        highlightTag: 'Trecho real da página 40 — Apoio que sai do papel',
        imageSrc: '/images/produto/consulta-rapida.png',
      },
    ] as SocialProofItem[],
  },

  // 8. FAQ (Exatamente 4 perguntas frequentes: entrega, acesso, uso e nível de conhecimento necessário)
  faq: {
    introEyebrow: 'Dúvidas Frequentes',
    introHeadline: 'Respostas diretas antes de você acessar o material',
    introDescription:
      'Veja como acessar o Amizade Sem Pressão e usar o kit em casa para conversar sobre amizades e limites com seu filho, mesmo que seja a primeira vez que você aborda esses temas.',
    items: [
      {
        id: 'faq-entrega',
        question: '1. Como é feita a entrega do material?',
        answer:
          'O material é 100% digital em formato PDF A4. Assim que a sua inscrição é confirmada no checkout, você recebe os arquivos digitais completos: o Kit Principal de 69 páginas (reunindo o Livro Principal de 41 páginas, o Caderno de Mapas de Escolhas de 13 páginas e o Guia dos Responsáveis de 15 páginas) junto com os 3 PDFs de bônus (46 páginas, 29 páginas e 10 páginas).',
      },
      {
        id: 'faq-acesso',
        question: '2. Como posso acessar e ler os arquivos?',
        answer:
          'Você pode abrir, ler e salvar os arquivos PDF diretamente no celular, tablet ou computador. O material de alinhamento escolar também conta com campos interativos preenchíveis no próprio aparelho e textos 100% copiáveis. Se preferir, todas as páginas estão formatadas em tamanho A4 prontas para impressão caseira ou em gráfica.',
      },
      {
        id: 'faq-uso',
        question: '3. Como usar o kit no dia a dia com crianças de 8 a 12 anos?',
        answer:
          'Você pode seguir a sequência das 12 unidades ou escolher uma situação específica no índice conforme o momento da criança. Em cada unidade, vocês leem juntos a história em quadrinhos de 1 página, exploram o Mapa de Escolhas visual e usam o Guia dos Responsáveis para conversar com 3 perguntas abertas e ensaiar 2 desfechos rápidos, sem cobrar nem interrogar a criança.',
      },
      {
        id: 'faq-conhecimento',
        question: '4. Preciso ter conhecimento em psicologia ou pedagogia para aplicar?',
        answer:
          'Não. O material foi escrito em linguagem clara, acessível e direta para pais, mães e responsáveis. Todas as unidades e cartões já trazem as falas prontas de exemplo, o que evitar dizer e o passo a passo de condução em casa e com a escola. Trata-se de um recurso educativo autoral de apoio familiar (não é avaliação nem tratamento clínico).',
      },
    ] as FaqItem[],
  },

  // 9. FOOTER MINIMALISTA
  footer: {
    productName: 'Amizade Sem Pressão',
    utilityPhrase:
      'Material educativo digital para ajudar famílias com crianças de 8 a 12 anos a conversar sobre amizades, limites, pressão dos colegas e como pedir ajuda.',
    disclaimer:
      'Recurso educativo autoral. Não substitui avaliação, acompanhamento psicológico ou protocolo clínico.',
  },
};
