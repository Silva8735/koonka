import {
  Product,
  Sale,
  CodOrder,
  Courier,
  LevelConfig,
  AcademyTrack,
  CommunityPost,
  MemberProfile,
  RecommendationInsight,
  Withdrawal
} from '../types';

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    key: 'ignis',
    number: 1,
    name: 'Ignis',
    identity: 'A faísca. Primeiros passos.',
    thresholdUsd: 0,
    baseFeePercent: 6.9,
    withdrawalDays: 14,
    colorClass: 'text-amber-500',
    badgeBg: 'bg-gradient-to-r from-amber-600 to-orange-500',
    badgeBorder: 'border-amber-400',
    benefits: [
      'Acesso à Koonka Academy (Trilha Fundamentos)',
      'Acesso à Comunidade Geral Koonka',
      'Sala Privada do Nível Ignis',
      'Checkout multi-país (M-Pesa, Multicaixa, Pix)',
      'Taxa padrão de 6,9% por venda'
    ]
  },
  {
    key: 'lumen',
    number: 2,
    name: 'Lumen',
    identity: 'Já brilha. Primeira tracção comprovada.',
    thresholdUsd: 1000,
    baseFeePercent: 6.5,
    withdrawalDays: 10,
    colorClass: 'text-yellow-400',
    badgeBg: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    badgeBorder: 'border-yellow-300',
    benefits: [
      'Taxa reduzida para 6,5%',
      'Prazo de saque acelerado para D+10',
      'Trilha de Tracção & Tráfego Orgânico na Academy',
      'Lives mensais com especialistas de MZ, AO e BR',
      'Sala exclusiva dos vendedores Lumen'
    ]
  },
  {
    key: 'solaris',
    number: 3,
    name: 'Solaris',
    identity: 'Energia própria. Vendedor consistente e lucrativo.',
    thresholdUsd: 5000,
    baseFeePercent: 5.9,
    withdrawalDays: 7,
    colorClass: 'text-orange-500',
    badgeBg: 'bg-gradient-to-r from-orange-500 to-red-500',
    badgeBorder: 'border-orange-400',
    benefits: [
      'Taxa reduzida para 5,9%',
      'Prazo de saque semanal (D+7)',
      'Domínio próprio personalizado no checkout',
      'Automações avançadas de WhatsApp e Webhooks',
      'Trilha de Escala e Funis na Academy'
    ]
  },
  {
    key: 'virtum',
    number: 4,
    name: 'Virtum',
    identity: 'Virtude e escala. Operação estruturada.',
    thresholdUsd: 10000,
    baseFeePercent: 5.5,
    withdrawalDays: 5,
    colorClass: 'text-purple-400',
    badgeBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    badgeBorder: 'border-purple-300',
    benefits: [
      'Taxa reduzida para 5,5%',
      'Prazo de saque em apenas D+5',
      'Suporte prioritário via WhatsApp direto com time sênior',
      'Participação em Mentorias em Grupo quinzenais',
      'Direito de mentorar membros Ignis/Lumen (pontuação bónus)'
    ]
  },
  {
    key: 'nexus',
    number: 5,
    name: 'Nexus',
    identity: 'Conector. Lidera redes, equipas e parceiros.',
    thresholdUsd: 25000,
    baseFeePercent: 5.0,
    withdrawalDays: 3,
    colorClass: 'text-cyan-400',
    badgeBg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
    badgeBorder: 'border-cyan-300',
    benefits: [
      'Taxa reduzida para 5,0%',
      'Prazo de saque de D+3',
      'Destaque no topo do Marketplace de Afiliados',
      'Masterminds trimestrais fechados (grupos de 8 a 12)',
      'Acesso antecipado a novas integrações logísticas'
    ]
  },
  {
    key: 'aurum',
    number: 6,
    name: 'Aurum',
    identity: 'Ouro. Elite regional do comércio lusófono.',
    thresholdUsd: 50000,
    baseFeePercent: 4.5,
    withdrawalDays: 2,
    colorClass: 'text-amber-300',
    badgeBg: 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600',
    badgeBorder: 'border-amber-200',
    benefits: [
      'Taxa ultra-reduzida de 4,5%',
      'Saques em apenas D+2 para bancos e carteiras móveis',
      'Gestor de conta executivo dedicado',
      'Convite para encontros e jantares presenciais em Maputo/Luanda/SP',
      'Apoio em internacionalização de produtos'
    ]
  },
  {
    key: 'apex',
    number: 7,
    name: 'Apex',
    identity: 'O topo. Conselho Consultivo Koonka.',
    thresholdUsd: 100000,
    baseFeePercent: 3.9,
    withdrawalDays: 1,
    colorClass: 'text-emerald-300',
    badgeBg: 'bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 text-slate-900',
    badgeBorder: 'border-emerald-300',
    benefits: [
      'Melhor taxa do mercado: 3,9% + condições personalizadas',
      'Saques instantâneos D+1',
      'Voto directo no roadmap e funcionalidades da Koonka',
      'Co-marketing patrocinado pela plataforma',
      'Acesso vitalício ao Conselho Apex'
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-mz-1',
    name: 'Guia Prático: Vendas com M-Pesa & e-Mola',
    description: 'Aprenda a estruturar negócios digitais em Moçambique, receber por mobile money e automatizar cobranças por WhatsApp.',
    type: 'digital',
    primaryCountry: 'MZ',
    price: 1450.00,
    currency: 'MZN',
    pricesByCountry: {
      MZN: 1450.00,
      AOA: 21000.00,
      BRL: 129.00,
      USD: 23.00
    },
    status: 'ativo',
    salesCount: 168,
    revenueByCurrency: { MZN: 243600, AOA: 0, BRL: 0, USD: 0 },
    guaranteeDays: 7,
    checkoutSlug: 'vendas-mpesa-emola',
    createdAt: '2026-08-10',
    sellerId: 'user-1',
    sellerName: 'Admin Silva',
    orderBump: {
      active: true,
      title: 'Pack de 50 Scripts de Fechamento por WhatsApp',
      price: 450.00,
      currency: 'MZN'
    }
  },
  {
    id: 'prod-ao-1',
    name: 'Importação China -> Luanda & Vendas com Multicaixa Express',
    description: 'Curso completo de importação aérea e marítima para Angola, desembaraço aduaneiro e checkout local em Kwanzas.',
    type: 'digital',
    primaryCountry: 'AO',
    price: 35000.00,
    currency: 'AOA',
    pricesByCountry: {
      MZN: 2400.00,
      AOA: 35000.00,
      BRL: 210.00,
      USD: 38.00
    },
    status: 'ativo',
    salesCount: 114,
    revenueByCurrency: { MZN: 0, AOA: 3990000, BRL: 0, USD: 0 },
    guaranteeDays: 15,
    checkoutSlug: 'importacao-angola-mcx',
    createdAt: '2026-07-25',
    sellerId: 'user-1',
    sellerName: 'Admin Silva',
    orderBump: {
      active: true,
      title: 'Lista de Fornecedores Verificados de Guangzhou',
      price: 9500.00,
      currency: 'AOA'
    }
  },
  {
    id: 'prod-cod-mz',
    name: 'Mini Projetor Smart 4K Portátil (Com Pagamento na Entrega - COD)',
    description: 'Produto físico de alta demanda. O cliente compra pelo checkout ou WhatsApp e paga ao estafeta no acto da entrega em Maputo/Matola.',
    type: 'fisico',
    primaryCountry: 'MZ',
    price: 4900.00,
    currency: 'MZN',
    pricesByCountry: {
      MZN: 4900.00,
      AOA: 72000.00,
      BRL: 420.00,
      USD: 77.00
    },
    status: 'ativo',
    salesCount: 84,
    revenueByCurrency: { MZN: 411600, AOA: 0, BRL: 0, USD: 0 },
    guaranteeDays: 30,
    stock: 45,
    weightKg: 0.8,
    checkoutSlug: 'mini-projetor-cod',
    createdAt: '2026-09-01',
    sellerId: 'user-1',
    sellerName: 'Admin Silva'
  },
  {
    id: 'prod-br-1',
    name: 'Método Escala Digital 2.0 (Brasil & Global)',
    description: 'Formação para produtores e afiliados criarem funis de alta conversão com Pix, cartão de crédito até 12x e 1-clique.',
    type: 'digital',
    primaryCountry: 'BR',
    price: 297.00,
    currency: 'BRL',
    pricesByCountry: {
      MZN: 3450.00,
      AOA: 51000.00,
      BRL: 297.00,
      USD: 54.00
    },
    status: 'ativo',
    salesCount: 230,
    revenueByCurrency: { MZN: 0, AOA: 0, BRL: 68310, USD: 0 },
    guaranteeDays: 7,
    checkoutSlug: 'escala-digital-br',
    createdAt: '2026-06-15',
    sellerId: 'user-1',
    sellerName: 'Admin Silva',
    orderBump: {
      active: true,
      title: 'Templates de Páginas Prontas de Alta Conversão',
      price: 47.00,
      currency: 'BRL'
    }
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-1',
    code: 'KO-MZ-9841',
    date: '2026-10-03T16:20:00',
    country: 'MZ',
    currency: 'MZN',
    customerName: 'Hermínio Tembe',
    customerPhone: '+258 84 912 3456',
    customerEmail: 'herminio.tembe@gmail.com',
    customerDocument: '110294819283B',
    productId: 'prod-mz-1',
    productName: 'Guia Prático: Vendas com M-Pesa & e-Mola',
    productType: 'digital',
    paymentMethod: 'mpesa',
    status: 'aprovado',
    grossAmount: 1900.00,
    feePercent: 6.5,
    feeAmount: 123.50,
    netAmount: 1776.50,
    isOneClick: true,
    utmSource: 'facebook_maputo'
  },
  {
    id: 'sale-2',
    code: 'KO-AO-3129',
    date: '2026-10-03T14:45:00',
    country: 'AO',
    currency: 'AOA',
    customerName: 'Kiara Domingos',
    customerPhone: '+244 923 456 789',
    customerEmail: 'kiara.domingos@hotmail.com',
    customerDocument: '004928172LA041',
    productId: 'prod-ao-1',
    productName: 'Importação China -> Luanda & Vendas com Multicaixa Express',
    productType: 'digital',
    paymentMethod: 'multicaixa_express',
    status: 'aprovado',
    grossAmount: 44500.00,
    feePercent: 6.5,
    feeAmount: 2892.50,
    netAmount: 41607.50,
    isOneClick: false,
    utmSource: 'instagram_luanda'
  },
  {
    id: 'sale-3',
    code: 'KO-COD-5512',
    date: '2026-10-03T12:10:00',
    country: 'MZ',
    currency: 'MZN',
    customerName: 'Zaida Macamo',
    customerPhone: '+258 87 234 5678',
    customerEmail: 'zaida.macamo@gmail.com',
    customerDocument: '091823910291M',
    productId: 'prod-cod-mz',
    productName: 'Mini Projetor Smart 4K Portátil (COD)',
    productType: 'fisico',
    paymentMethod: 'cod',
    status: 'pendente',
    grossAmount: 4900.00,
    feePercent: 6.5,
    feeAmount: 318.50,
    netAmount: 4581.50,
    isOneClick: false,
    utmSource: 'whatsapp_direto',
    codDetails: {
      deliveryZone: 'Maputo Cidade (Polana Cimento)',
      deliveryAddress: 'Av. Julius Nyerere, Edifício Jat V',
      courierId: 'cour-1',
      confirmedByPhone: true
    }
  },
  {
    id: 'sale-4',
    code: 'KO-BR-7719',
    date: '2026-10-03T10:05:00',
    country: 'BR',
    currency: 'BRL',
    customerName: 'Thiago Albuquerque',
    customerPhone: '+55 11 98765-4321',
    customerEmail: 'thiago.albuquerque@gmail.com',
    customerDocument: '312.***.***-09',
    productId: 'prod-br-1',
    productName: 'Método Escala Digital 2.0 (Brasil & Global)',
    productType: 'digital',
    paymentMethod: 'pix',
    status: 'aprovado',
    grossAmount: 344.00,
    feePercent: 6.5,
    feeAmount: 22.36,
    netAmount: 321.64,
    isOneClick: true,
    utmSource: 'youtube_escala'
  }
];

export const INITIAL_COD_ORDERS: CodOrder[] = [
  {
    id: 'cod-1',
    saleCode: 'KO-COD-5512',
    customerName: 'Zaida Macamo',
    customerPhone: '+258 87 234 5678',
    city: 'Maputo',
    address: 'Av. Julius Nyerere, Edifício Jat V, 4º Andar',
    country: 'MZ',
    amount: 4900.00,
    currency: 'MZN',
    paymentMethodToCollect: 'mpesa',
    status: 'em_rota',
    courierId: 'cour-1',
    courierName: 'Mateus Chissano (Maputo Express)',
    createdAt: '2026-10-03T12:10:00',
    reconciliationStatus: 'pendente'
  },
  {
    id: 'cod-2',
    saleCode: 'KO-COD-4910',
    customerName: 'Bento Manuel',
    customerPhone: '+244 945 112 233',
    city: 'Luanda',
    address: 'Talatona, Condomínio Belas Business Park',
    country: 'AO',
    amount: 72000.00,
    currency: 'AOA',
    paymentMethodToCollect: 'multicaixa_express',
    status: 'confirmado',
    courierId: 'cour-2',
    courierName: 'Edgar Quaresma (Luanda Courier)',
    createdAt: '2026-10-03T09:30:00',
    reconciliationStatus: 'pendente'
  },
  {
    id: 'cod-3',
    saleCode: 'KO-COD-3891',
    customerName: 'Fatima Abdul',
    customerPhone: '+258 82 555 4321',
    city: 'Matola',
    address: 'Matola Rio, Próximo ao Mozal',
    country: 'MZ',
    amount: 4900.00,
    currency: 'MZN',
    paymentMethodToCollect: 'dinheiro',
    status: 'entregue',
    courierId: 'cour-1',
    courierName: 'Mateus Chissano (Maputo Express)',
    createdAt: '2026-10-02T15:20:00',
    deliveryDate: '2026-10-03T11:00:00',
    reconciliationStatus: 'conciliado'
  }
];

export const INITIAL_COURIERS: Courier[] = [
  {
    id: 'cour-1',
    name: 'Mateus Chissano (Maputo Express)',
    phone: '+258 84 000 1122',
    country: 'MZ',
    zones: ['Maputo Cidade', 'Sommerschield', 'Polana', 'Matola'],
    vehicle: 'moto',
    rating: 4.95,
    deliveriesCompleted: 142,
    activeDeliveries: 2
  },
  {
    id: 'cour-2',
    name: 'Edgar Quaresma (Luanda Courier)',
    phone: '+244 923 111 222',
    country: 'AO',
    zones: ['Talatona', 'Maianga', 'Kilamba', 'Miramar'],
    vehicle: 'moto',
    rating: 4.88,
    deliveriesCompleted: 98,
    activeDeliveries: 1
  }
];

export const ACADEMY_TRACKS: AcademyTrack[] = [
  {
    tierKey: 'ignis',
    tierName: 'Ignis',
    title: 'Trilha 1: Fundamentos do E-commerce Lusófono',
    description: 'Do zero à primeira venda: validação de oferta para Moçambique, Angola e Brasil sem depender de cartão de crédito.',
    lessons: [
      {
        id: 'les-ignis-1',
        trackLevel: 'ignis',
        title: 'Como Vender com M-Pesa, e-Mola e Multicaixa Express sem Burocracia',
        durationMinutes: 9,
        description: 'Visão prática do comportamento do consumidor africano e brasileiro: como receber dinheiro na hora.',
        summaryText: 'O e-commerce em Moçambique e Angola é orientado a mobile money e pagamento presencial. Evite forçar cartão de crédito internacional.',
        checklist: [
          'Activar M-Pesa e e-Mola no checkout para Moçambique',
          'Activar Multicaixa Express para Angola',
          'Configurar mensagem de boas-vindas no WhatsApp'
        ],
        completed: true,
        category: 'funis'
      },
      {
        id: 'les-ignis-2',
        trackLevel: 'ignis',
        title: 'Oferta Irresistível e Página de Vendas Leve (< 3s em 3G)',
        durationMinutes: 11,
        description: 'Como criar uma oferta clara com texto directo, imagens leves e botão WhatsApp.',
        summaryText: 'A maioria dos seus compradores usa redes móveis 3G limitadas. Páginas pesadas com vídeos lentos perdem até 70% das vendas.',
        checklist: [
          'Comprimir imagens para WebP abaixo de 100KB',
          'Escrever promessa em 1 frase clara com benefício directo',
          'Testar carregamento no telemóvel'
        ],
        completed: true,
        category: 'copywriting'
      }
    ]
  },
  {
    tierKey: 'lumen',
    tierName: 'Lumen',
    title: 'Trilha 2: Tracção & COD (Cash on Delivery) sem Prejuízo',
    description: 'Estruturação de confirmação de pedidos antes da entrega e recuperação de vendas.',
    lessons: [
      {
        id: 'les-lumen-1',
        trackLevel: 'lumen',
        title: 'A Regra de Ouro do COD: Confirmação Prévia por WhatsApp e Ligação',
        durationMinutes: 12,
        description: 'Nunca envie uma mercadoria antes de confirmar nome, endereço exacto e método de recebimento.',
        summaryText: 'A confirmação humana prévia reduz as recusas de COD de 40% para menos de 6% em Maputo e Luanda.',
        checklist: [
          'Ligar em menos de 15 minutos após o pedido',
          'Confirmar ponto de referência do bairro',
          'Validar se o cliente terá o valor em M-Pesa ou dinheiro trocado'
        ],
        completed: false,
        category: 'cod'
      },
      {
        id: 'les-lumen-2',
        trackLevel: 'lumen',
        title: 'Copywriting para TikTok, Reels e Stories Locais',
        durationMinutes: 10,
        description: 'Como gerar vendas diárias orgânicas conectando com a gíria e costumes de cada país.',
        summaryText: 'Vídeos demonstrativos de unboxing de produtos físicos geram até 4x mais conversão.',
        checklist: ['Fazer gancho nos primeiros 3 segundos', 'Mostrar o produto a ser testado na prática'],
        completed: false,
        category: 'copywriting'
      }
    ]
  },
  {
    tierKey: 'solaris',
    tierName: 'Solaris',
    title: 'Trilha 3: Escala de Tráfego Pago & Order Bumps',
    description: 'Aumente o ticket médio em 40% e invista com retorno previsível.',
    lessons: [
      {
        id: 'les-solaris-1',
        trackLevel: 'solaris',
        title: 'Como Lucrar Alto com Order Bump e 1-Click Upsell',
        durationMinutes: 14,
        description: 'Configuração na Koonka para oferecer produtos complementares no checkout com 1 toque.',
        summaryText: 'O Order Bump é a forma mais rápida de pagar os custos de anúncios de tráfego pago.',
        checklist: ['Adicionar um produto complementar de baixo custo (20-30% do principal)'],
        completed: false,
        category: 'funis'
      }
    ]
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Manuel Mabunda',
    authorLevel: 'solaris',
    authorCountry: 'MZ',
    createdAt: 'Hoje às 14:10',
    tierRoom: 'solaris',
    tag: 'Dica Prática COD',
    content: 'Família Koonka em Maputo! Comecei a usar a confirmação por áudio de WhatsApp antes de despachar o estafeta para a Matola e a taxa de entrega subiu para 94%. Quem vende físico precisa fazer isso.',
    likesCount: 24,
    commentsCount: 9
  },
  {
    id: 'post-2',
    authorName: 'Nádia dos Santos',
    authorLevel: 'lumen',
    authorCountry: 'AO',
    createdAt: 'Hoje às 11:30',
    tierRoom: 'lumen',
    tag: 'Multicaixa Express',
    content: 'O checkout da Koonka convertendo muito bem em Luanda! As vendas de hoje bateram 450 mil Kwanzas só no Multicaixa Express. Vamos com tudo rumo ao nível Solaris!',
    likesCount: 38,
    commentsCount: 14
  }
];

export const INITIAL_RECOMMENDATIONS: RecommendationInsight[] = [
  {
    id: 'rec-1',
    title: 'Active Pagamentos em Moçambique',
    description: 'Identificámos visitantes de Maputo e Nampula na sua loja. Com M-Pesa activo, a sua conversão pode dobrar.',
    actionText: 'Configurar M-Pesa no Checkout',
    severity: 'alta'
  },
  {
    id: 'rec-2',
    title: 'Adicione um Order Bump na sua oferta',
    description: 'Produtos com Order Bump activo na Koonka aumentam o ticket médio em média 34%.',
    actionText: 'Adicionar Order Bump',
    severity: 'media'
  },
  {
    id: 'rec-3',
    title: 'Plano de Acção Academy: Reduzir Recusas de COD',
    description: 'A sua taxa de entrega de produtos físicos pode melhorar com a técnica de confirmação prévia em 10 minutos.',
    actionText: 'Ver Aula na Academy',
    targetLessonId: 'les-lumen-1',
    severity: 'dica'
  }
];
