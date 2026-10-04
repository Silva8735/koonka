import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  CountryCode,
  CurrencyCode,
  UserRole,
  LevelTierKey,
  LevelConfig,
  Product,
  Sale,
  CodOrder,
  Courier,
  AcademyTrack,
  CommunityPost,
  RecommendationInsight,
  Withdrawal,
  PaymentMethod,
  MemberCourse,
  Affiliate,
  MarketplaceProduct,
  Subscription,
  Collaborator,
  AppIntegration,
  NotificationItem,
  AwardTier
} from '../types';
import {
  LEVEL_CONFIGS,
  INITIAL_PRODUCTS,
  INITIAL_SALES,
  INITIAL_COD_ORDERS,
  INITIAL_COURIERS,
  ACADEMY_TRACKS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_RECOMMENDATIONS
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type TabType =
  | 'dashboard'
  | 'produtos'
  | 'cod'
  | 'niveis'
  | 'academy'
  | 'comunidade'
  | 'vendas'
  | 'carteira'
  | 'afiliados'
  | 'admin'
  | 'entregador_pwa'
  | 'membros'
  | 'marketplace'
  | 'assinaturas'
  | 'financeiro'
  | 'relatorios'
  | 'colaboradores'
  | 'apps'
  | 'ajuda';

export type DateFilterType = 'hoje' | 'ontem' | '7dias' | '30dias' | 'mes' | 'tudo';

interface KoonkaContextType {
  // Navigation & Role
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  viewMode: 'produtor' | 'aluno';
  setViewMode: (mode: 'produtor' | 'aluno') => void;

  // Country & Currency Localization
  activeCountry: CountryCode;
  setActiveCountry: (country: CountryCode) => void;
  activeCurrency: CurrencyCode;
  setActiveCurrency: (currency: CurrencyCode) => void;
  exchangeRatesToUsd: Record<CurrencyCode, number>;

  // Data Collections
  products: Product[];
  sales: Sale[];
  codOrders: CodOrder[];
  couriers: Courier[];
  academyTracks: AcademyTrack[];
  communityPosts: CommunityPost[];
  recommendations: RecommendationInsight[];
  withdrawals: Withdrawal[];
  memberCourses: MemberCourse[];
  affiliates: Affiliate[];
  marketplace: MarketplaceProduct[];
  subscriptions: Subscription[];
  collaborators: Collaborator[];
  apps: AppIntegration[];
  notifications: NotificationItem[];
  awardTiers: AwardTier[];

  // Filters
  dateFilter: DateFilterType;
  setDateFilter: (f: DateFilterType) => void;
  productFilter: string;
  setProductFilter: (id: string) => void;
  currencyFilter: 'all' | CurrencyCode;
  setCurrencyFilter: (c: 'all' | CurrencyCode) => void;

  // Level & Progression (7 Tiers)
  levels: LevelConfig[];
  currentLevel: LevelConfig;
  totalAccumulatedUsd: number;
  progressToNextLevelPercent: number;
  nextLevel: LevelConfig | null;

  // Bandwidth & Accessibility
  lowBandwidthMode: boolean;
  setLowBandwidthMode: (active: boolean) => void;

  // Actions
  processCheckoutSale: (data: {
    productId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerDocument: string;
    country: CountryCode;
    currency: CurrencyCode;
    paymentMethod: PaymentMethod;
    withOrderBump?: boolean;
    deliveryZone?: string;
    deliveryAddress?: string;
  }) => Promise<Sale>;

  processNewSale: (saleData: any) => Promise<Sale>;
  addProduct: (product: any) => Product;
  deleteProduct: (id: string) => void;
  refundSale: (id: string) => void;

  // COD logistics actions
  confirmCodOrder: (id: string) => void;
  dispatchCodOrder: (orderId: string, courierId: string) => void;
  markCodDelivered: (orderId: string, paymentMethod: 'mpesa' | 'multicaixa_express' | 'dinheiro') => void;
  markCodRejected: (orderId: string) => void;
  reconcileCodOrder: (orderId: string) => void;

  // Academy & Community
  toggleAcademyLesson: (lessonId: string) => void;
  toggleLessonCompleted: (courseId: string, lessonId: string) => void;
  addCommunityPost: (content: string, tag: string, tierRoom: LevelTierKey) => void;

  // Affiliates & Apps
  toggleAffiliation: (id: string) => void;
  toggleAppConnection: (appId: string, webhookUrl?: string) => void;
  markAllNotificationsRead: () => void;

  // Wallet & Withdrawals
  requestWithdrawal: (amount: number, currencyOrPix?: any, method?: any, accountDetails?: string) => boolean;

  // Demo Simulation Actions
  simulateQuickSale: (country?: CountryCode, method?: PaymentMethod) => void;
  simulateLevelUp: (targetTier: LevelTierKey) => void;
  simulateCodLifecycle: () => void;

  // Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  checkoutProduct: Product | null;
  activeCheckoutProduct: Product | null;
  openCheckout: (prod?: Product) => void;

  isAwardsModalOpen: boolean;
  setIsAwardsModalOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;

  // Financial Stats
  availableBalance: number;
  pendingBalance: number;
  totalNetRevenue: number;
  todaySalesCount: number;
  todayNetRevenue: number;
  cardApprovalRate: number;
  boletoConversionRate: number;
  boletosGeneratedCount: number;
  oneClickSalesAmount: number;
  oneClickPercent: number;
  refundRate: number;
  chargebackRate: number;

  // Helper
  formatMoney: (amount: number, currency?: CurrencyCode) => string;
}

const KoonkaContext = createContext<KoonkaContextType | undefined>(undefined);

export const KoonkaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('vendedor');
  const [viewMode, setViewMode] = useState<'produtor' | 'aluno'>('produtor');

  // Country & Currency Localization
  const [activeCountry, setActiveCountry] = useState<CountryCode>('MZ');
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>('MZN');
  const [lowBandwidthMode, setLowBandwidthMode] = useState<boolean>(false);

  // Filters
  const [dateFilter, setDateFilter] = useState<DateFilterType>('hoje');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<'all' | CurrencyCode>('all');

  // Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isAwardsModalOpen, setIsAwardsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const exchangeRatesToUsd: Record<CurrencyCode, number> = {
    USD: 1.0,
    MZN: 63.8,
    AOA: 920.0,
    BRL: 5.50
  };

  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sales, setSales] = useState<Sale[]>(INITIAL_SALES);
  const [codOrders, setCodOrders] = useState<CodOrder[]>(INITIAL_COD_ORDERS);
  const [couriers] = useState<Courier[]>(INITIAL_COURIERS);
  const [academyTracks, setAcademyTracks] = useState<AcademyTrack[]>(ACADEMY_TRACKS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [recommendations] = useState<RecommendationInsight[]>(INITIAL_RECOMMENDATIONS);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  const [memberCourses, setMemberCourses] = useState<MemberCourse[]>([
    {
      id: 'course-1',
      productId: 'prod-mz-1',
      title: 'Guia Prático: Vendas com M-Pesa & e-Mola',
      category: 'Mobile Money & Vendas',
      bannerUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      studentsCount: 168,
      modules: [
        {
          id: 'mod-1',
          title: 'Módulo 1: Configuração M-Pesa & e-Mola',
          lessons: [
            {
              id: 'les-1',
              title: 'Recebimento Instantâneo e Taxas Reduzidas',
              duration: '10:00',
              completed: true
            },
            {
              id: 'les-2',
              title: 'Automação de Confirmação por SMS/WhatsApp',
              duration: '12:30',
              completed: false
            }
          ]
        }
      ]
    }
  ]);

  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    {
      id: 'aff-1',
      name: 'Salomão Muchanga',
      email: 'salomao.afiliado@gmail.com',
      productId: 'prod-mz-1',
      productName: 'Guia Prático M-Pesa & e-Mola',
      commissionPercent: 50,
      salesCount: 42,
      totalCommission: 30450.00,
      status: 'ativo'
    },
    {
      id: 'aff-2',
      name: 'Edson Carvalho',
      email: 'edson.ao@gmail.com',
      productId: 'prod-ao-1',
      productName: 'Importação China -> Luanda',
      commissionPercent: 50,
      salesCount: 19,
      totalCommission: 332500.00,
      status: 'ativo'
    }
  ]);

  const [marketplace, setMarketplace] = useState<MarketplaceProduct[]>([
    {
      id: 'mkt-1',
      title: 'Máquina de Empreendedor M-Pesa 2026',
      creator: 'Admin Silva',
      category: 'Negócios',
      price: 1450.00,
      commissionPercent: 60,
      maxCommission: 870.00,
      temperature: 98,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
      description: 'Esteira validada em Moçambique com alto volume de vendas diárias.',
      isAffiliated: true
    }
  ]);

  const [subscriptions] = useState<Subscription[]>([
    {
      id: 'sub-1',
      customerName: 'Renato Guimarães',
      customerEmail: 'renato@gmail.com',
      planName: 'Comunidade Koonka VIP',
      amount: 97.00,
      interval: 'mensal',
      status: 'ativa',
      nextBillingDate: '2026-10-28',
      startDate: '2026-08-28'
    }
  ]);

  const [collaborators] = useState<Collaborator[]>([
    {
      id: 'col-1',
      name: 'Admin Silva',
      email: 'admin.silva@koonka.com',
      role: 'administrador',
      status: 'ativo'
    },
    {
      id: 'col-2',
      name: 'Lucas Coprodutor',
      email: 'lucas@gmail.com',
      role: 'coprodutor',
      revenueSharePercent: 30,
      status: 'ativo'
    }
  ]);

  const [apps, setApps] = useState<AppIntegration[]>([
    {
      id: 'app-webhook',
      name: 'Webhooks Koonka',
      category: 'webhooks',
      description: 'Envie notificações instantâneas de compras aprovadas.',
      iconName: 'Webhook',
      connected: true,
      webhookUrl: 'https://api.koonka.com/v1/webhook'
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Nova venda M-Pesa aprovada!',
      description: 'Hermínio Tembe concluiu o pagamento de 1.900 MT.',
      date: 'Hoje às 16:20',
      read: false,
      type: 'venda'
    }
  ]);

  // Adjust currency on country change
  useEffect(() => {
    if (activeCountry === 'MZ') setActiveCurrency('MZN');
    else if (activeCountry === 'AO') setActiveCurrency('AOA');
    else if (activeCountry === 'BR') setActiveCurrency('BRL');
  }, [activeCountry]);

  // Total Accumulated USD calculation
  const totalAccumulatedUsd = useMemo(() => {
    const approvedSales = sales.filter((s) => s.status === 'aprovado');
    return approvedSales.reduce((acc, sale) => {
      const rate = exchangeRatesToUsd[sale.currency] || 1;
      return acc + sale.netAmount / rate;
    }, 0);
  }, [sales]);

  // Level determination
  const { currentLevel, nextLevel, progressToNextLevelPercent } = useMemo(() => {
    let current = LEVEL_CONFIGS[0];
    let next: LevelConfig | null = LEVEL_CONFIGS[1];

    for (let i = LEVEL_CONFIGS.length - 1; i >= 0; i--) {
      if (totalAccumulatedUsd >= LEVEL_CONFIGS[i].thresholdUsd) {
        current = LEVEL_CONFIGS[i];
        next = LEVEL_CONFIGS[i + 1] || null;
        break;
      }
    }

    let progress = 100;
    if (next) {
      const range = next.thresholdUsd - current.thresholdUsd;
      const progressAmount = totalAccumulatedUsd - current.thresholdUsd;
      progress = Math.min(100, Math.max(4, Math.round((progressAmount / range) * 100)));
    }

    return { currentLevel: current, nextLevel: next, progressToNextLevelPercent: progress };
  }, [totalAccumulatedUsd]);

  // Format money helper
  const formatMoney = (amount: number, curr?: CurrencyCode): string => {
    const targetCurrency = curr || activeCurrency;
    switch (targetCurrency) {
      case 'MZN':
        return `${amount.toLocaleString('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT`;
      case 'AOA':
        return `${amount.toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kz`;
      case 'BRL':
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      case 'USD':
      default:
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
  };

  // Actions
  const addProduct = (prodData: any): Product => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      salesCount: 0,
      pricesByCountry: prodData.pricesByCountry || { [activeCurrency]: prodData.price },
      revenueByCurrency: { MZN: 0, AOA: 0, BRL: 0, USD: 0 },
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const refundSale = (id: string) => {
    setSales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'reembolsado', netAmount: 0 } : s))
    );
  };

  const processCheckoutSale = async (data: any): Promise<Sale> => {
    const product = products.find((p) => p.id === data.productId) || products[0];
    let gross = product.pricesByCountry?.[data.currency as CurrencyCode] || product.price;

    if (data.withOrderBump && product.orderBump?.active) {
      gross += product.orderBump.price;
    }

    const feePercent = currentLevel.baseFeePercent;
    const feeAmount = Number(((gross * feePercent) / 100).toFixed(2));
    const netAmount = Number((gross - feeAmount).toFixed(2));

    const isCod = data.paymentMethod === 'cod';
    const status = isCod ? 'pendente' : 'aprovado';
    const saleCode = `KO-${data.country}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      code: saleCode,
      date: new Date().toISOString(),
      country: data.country,
      currency: data.currency,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      customerDocument: data.customerDocument,
      customerCpf: data.customerDocument,
      productId: product.id,
      productName: product.name,
      productType: product.type,
      paymentMethod: data.paymentMethod,
      status,
      grossAmount: gross,
      feePercent,
      feeAmount,
      netAmount: isCod ? 0 : netAmount,
      isOneClick: Math.random() > 0.5,
      utmSource: 'checkout_direto',
      codDetails: isCod
        ? {
            deliveryZone: data.deliveryZone || 'Zona Central',
            deliveryAddress: data.deliveryAddress || 'Endereço fornecido',
            confirmedByPhone: false
          }
        : undefined
    };

    setSales((prev) => [newSale, ...prev]);

    if (isCod) {
      const newCod: CodOrder = {
        id: `cod-${Date.now()}`,
        saleCode,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        city: data.country === 'MZ' ? 'Maputo' : data.country === 'AO' ? 'Luanda' : 'São Paulo',
        address: data.deliveryAddress || 'Endereço indicado',
        country: data.country,
        amount: gross,
        currency: data.currency,
        paymentMethodToCollect: data.country === 'MZ' ? 'mpesa' : data.country === 'AO' ? 'multicaixa_express' : 'dinheiro',
        status: 'aguardando_confirmacao',
        createdAt: new Date().toISOString(),
        reconciliationStatus: 'pendente'
      };
      setCodOrders((prev) => [newCod, ...prev]);
    } else {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }

    return newSale;
  };

  const processNewSale = async (data: any) => {
    return processCheckoutSale({
      productId: data.productId,
      customerName: data.customerName,
      customerPhone: data.customerPhone || '+258 84 000 0000',
      customerEmail: data.customerEmail,
      customerDocument: data.customerCpf || '12345678B',
      country: activeCountry,
      currency: activeCurrency,
      paymentMethod: data.paymentMethod,
      withOrderBump: data.withOrderBump
    });
  };

  // COD logistics actions
  const confirmCodOrder = (id: string) => {
    setCodOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: 'confirmado' } : ord))
    );
  };

  const dispatchCodOrder = (orderId: string, courierId: string) => {
    const courier = couriers.find((c) => c.id === courierId);
    setCodOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'em_rota',
              courierId,
              courierName: courier ? courier.name : 'Estafeta'
            }
          : ord
      )
    );
  };

  const markCodDelivered = (
    orderId: string,
    paymentMethod: 'mpesa' | 'multicaixa_express' | 'dinheiro'
  ) => {
    setCodOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'entregue',
            deliveryDate: new Date().toISOString(),
            paymentMethodToCollect: paymentMethod
          };
        }
        return ord;
      })
    );

    setSales((prev) =>
      prev.map((sale) => {
        const matchingCod = codOrders.find((c) => c.id === orderId);
        if (matchingCod && sale.code === matchingCod.saleCode) {
          const feeAmount = Number(((sale.grossAmount * (sale.feePercent || 6.5)) / 100).toFixed(2));
          return {
            ...sale,
            status: 'aprovado',
            netAmount: sale.grossAmount - feeAmount
          };
        }
        return sale;
      })
    );
  };

  const markCodRejected = (orderId: string) => {
    setCodOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'recusado' } : ord))
    );
  };

  const reconcileCodOrder = (orderId: string) => {
    setCodOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, reconciliationStatus: 'conciliado' } : ord))
    );
  };

  const toggleAcademyLesson = (lessonId: string) => {
    setAcademyTracks((prev) =>
      prev.map((track) => ({
        ...track,
        lessons: track.lessons.map((les) =>
          les.id === lessonId ? { ...les, completed: !les.completed } : les
        )
      }))
    );
  };

  const toggleLessonCompleted = (courseId: string, lessonId: string) => {
    setMemberCourses((prev) =>
      prev.map((c) => ({
        ...c,
        modules: c.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l))
        }))
      }))
    );
  };

  const addCommunityPost = (content: string, tag: string, tierRoom: LevelTierKey) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'Admin Silva',
      authorLevel: currentLevel.key,
      authorCountry: activeCountry,
      createdAt: 'Agora mesmo',
      content,
      likesCount: 0,
      commentsCount: 0,
      tierRoom,
      tag
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
  };

  const toggleAffiliation = (id: string) => {
    setMarketplace((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAffiliated: !m.isAffiliated } : m))
    );
  };

  const toggleAppConnection = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, connected: !a.connected } : a))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const requestWithdrawal = (
    amount: number,
    currencyOrPix?: any,
    method?: any,
    accountDetails?: string
  ): boolean => {
    const newW: Withdrawal = {
      id: `w-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      currency: typeof currencyOrPix === 'string' && currencyOrPix.length <= 4 ? (currencyOrPix as CurrencyCode) : activeCurrency,
      method: method || 'mpesa',
      accountDetails: accountDetails || 'Conta padrão',
      pixKey: typeof currencyOrPix === 'string' && currencyOrPix.length > 4 ? currencyOrPix : undefined,
      status: 'concluido',
      releaseDays: currentLevel.withdrawalDays
    };
    setWithdrawals((prev) => [newW, ...prev]);
    return true;
  };

  const simulateQuickSale = (country?: CountryCode, method?: PaymentMethod) => {
    const targetCountry = country || activeCountry;
    const targetCurrency: CurrencyCode =
      targetCountry === 'MZ' ? 'MZN' : targetCountry === 'AO' ? 'AOA' : 'BRL';

    const defaultMethods: Record<CountryCode, PaymentMethod> = {
      MZ: 'mpesa',
      AO: 'multicaixa_express',
      BR: 'pix'
    };
    const targetMethod = method || defaultMethods[targetCountry];
    const prod = products.find((p) => p.primaryCountry === targetCountry) || products[0];

    processCheckoutSale({
      productId: prod.id,
      customerName:
        targetCountry === 'MZ'
          ? 'Salimo Mondlane'
          : targetCountry === 'AO'
          ? 'Anacleto Luanda'
          : 'Renata Albuquerque',
      customerPhone:
        targetCountry === 'MZ'
          ? '+258 84 123 9988'
          : targetCountry === 'AO'
          ? '+244 923 888 777'
          : '+55 11 99999-8888',
      customerEmail: 'comprador.teste@koonka.com',
      customerDocument: targetCountry === 'MZ' ? '1209384B' : targetCountry === 'AO' ? '0049182LA' : '123.456.789-00',
      country: targetCountry,
      currency: targetCurrency,
      paymentMethod: targetMethod,
      withOrderBump: true
    });
  };

  const simulateLevelUp = (targetTier: LevelTierKey) => {
    const targetConfig = LEVEL_CONFIGS.find((l) => l.key === targetTier) || LEVEL_CONFIGS[2];
    const neededUsd = targetConfig.thresholdUsd + 500;

    const boosterSale: Sale = {
      id: `sale-booster-${Date.now()}`,
      code: `KO-BOOST-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      country: 'MZ',
      currency: 'USD',
      customerName: 'Cliente VIP Internacional',
      customerPhone: '+258 84 999 0000',
      customerEmail: 'investidor@koonka.com',
      customerDocument: 'VIP-999',
      productId: products[0].id,
      productName: `Pacote de Aceleração (${targetConfig.name})`,
      productType: 'digital',
      paymentMethod: 'stripe',
      status: 'aprovado',
      grossAmount: neededUsd,
      feePercent: 3.9,
      feeAmount: neededUsd * 0.039,
      netAmount: neededUsd * 0.961,
      utmSource: 'simulador_nivel'
    };

    setSales((prev) => [boosterSale, ...prev]);

    try {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    } catch {}
  };

  const simulateCodLifecycle = () => {
    const pendingCod = codOrders.find((c) => c.status === 'aguardando_confirmacao' || c.status === 'em_rota');
    if (pendingCod) {
      markCodDelivered(pendingCod.id, 'mpesa');
    } else {
      processCheckoutSale({
        productId: products[2]?.id || products[0].id,
        customerName: 'Alípio Chissano',
        customerPhone: '+258 84 777 6655',
        customerEmail: 'alipio.chissano@gmail.com',
        customerDocument: '1102938102B',
        country: 'MZ',
        currency: 'MZN',
        paymentMethod: 'cod',
        deliveryAddress: 'Av. Mao Tse Tung, Bairro Central, Maputo'
      });
    }
  };

  const openCheckout = (prod?: Product) => {
    setCheckoutProduct(prod || products[0]);
    setIsCheckoutOpen(true);
  };

  // Metrics
  const approvedSales = sales.filter((s) => s.status === 'aprovado');
  const totalNetRevenue = approvedSales.reduce((acc, s) => acc + s.netAmount, 0);
  const availableBalance = totalNetRevenue;
  const pendingBalance = sales.filter((s) => s.status === 'pendente').reduce((acc, s) => acc + s.grossAmount, 0);

  const awardTiers: AwardTier[] = [
    { threshold: 10000, name: 'Placa Bronze - 10K', label: 'R$ 10K', iconType: 'bronze', unlocked: true, unlockedDate: '15/09/2026', trackingCode: 'BR-849201948K' },
    { threshold: 100000, name: 'Placa Prata - 100K', label: 'R$ 100K', iconType: 'silver', unlocked: totalAccumulatedUsd >= 20000, unlockedDate: '02/10/2026', trackingCode: 'BR-990184271K' },
    { threshold: 1000000, name: 'Troféu Ouro - 1M', label: 'R$ 1M', iconType: 'gold', unlocked: totalAccumulatedUsd >= 100000 },
    { threshold: 5000000, name: 'Esmeralda - 5M', label: 'R$ 5M', iconType: 'gemstone', unlocked: false },
    { threshold: 10000000, name: 'Rubi Real - 10M', label: 'R$ 10M', iconType: 'ruby', unlocked: false },
    { threshold: 25000000, name: 'Black Gemstone - 25M', label: 'R$ 25M', iconType: 'black', unlocked: false }
  ];

  return (
    <KoonkaContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        userRole,
        setUserRole,
        viewMode,
        setViewMode,
        activeCountry,
        setActiveCountry,
        activeCurrency,
        setActiveCurrency,
        exchangeRatesToUsd,
        products,
        sales,
        codOrders,
        couriers,
        academyTracks,
        communityPosts,
        recommendations,
        withdrawals,
        memberCourses,
        affiliates,
        marketplace,
        subscriptions,
        collaborators,
        apps,
        notifications,
        awardTiers,
        dateFilter,
        setDateFilter,
        productFilter,
        setProductFilter,
        currencyFilter,
        setCurrencyFilter,
        levels: LEVEL_CONFIGS,
        currentLevel,
        totalAccumulatedUsd,
        progressToNextLevelPercent,
        nextLevel,
        lowBandwidthMode,
        setLowBandwidthMode,
        processCheckoutSale,
        processNewSale,
        addProduct,
        deleteProduct,
        refundSale,
        confirmCodOrder,
        dispatchCodOrder,
        markCodDelivered,
        markCodRejected,
        reconcileCodOrder,
        toggleAcademyLesson,
        toggleLessonCompleted,
        addCommunityPost,
        toggleAffiliation,
        toggleAppConnection,
        markAllNotificationsRead,
        requestWithdrawal,
        simulateQuickSale,
        simulateLevelUp,
        simulateCodLifecycle,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCheckoutModalOpen: isCheckoutOpen,
        setIsCheckoutModalOpen: setIsCheckoutOpen,
        checkoutProduct,
        activeCheckoutProduct: checkoutProduct,
        openCheckout,
        isAwardsModalOpen,
        setIsAwardsModalOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        availableBalance,
        pendingBalance,
        totalNetRevenue,
        todaySalesCount: sales.length,
        todayNetRevenue: totalNetRevenue,
        cardApprovalRate: 88,
        boletoConversionRate: 52,
        boletosGeneratedCount: sales.filter((s) => s.paymentMethod === 'boleto').length,
        oneClickSalesAmount: totalNetRevenue * 0.45,
        oneClickPercent: 45,
        refundRate: 1.1,
        chargebackRate: 0.0,
        formatMoney
      }}
    >
      {children}
    </KoonkaContext.Provider>
  );
};

export const useKoonka = () => {
  const ctx = useContext(KoonkaContext);
  if (!ctx) throw new Error('useKoonka must be used within a KoonkaProvider');
  return ctx;
};
