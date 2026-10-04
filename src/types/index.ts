export type CountryCode = 'MZ' | 'AO' | 'BR';
export type CurrencyCode = 'MZN' | 'AOA' | 'BRL' | 'USD';

export type UserRole =
  | 'vendedor'
  | 'comprador'
  | 'afiliado'
  | 'entregador'
  | 'mentor'
  | 'admin'
  | 'financeiro'
  | 'suporte';

export type PaymentMethod =
  | 'mpesa'
  | 'emola'
  | 'mkesh'
  | 'multicaixa_express'
  | 'referencia_multicaixa'
  | 'unitel_money'
  | 'pix'
  | 'cartao'
  | 'boleto'
  | 'cod'
  | 'stripe';

export type PaymentStatus = 'pendente' | 'aprovado' | 'recusado' | 'expirado' | 'reembolsado';
export type SaleStatus = PaymentStatus;

export type LevelTierKey =
  | 'ignis'
  | 'lumen'
  | 'solaris'
  | 'virtum'
  | 'nexus'
  | 'aurum'
  | 'apex';

export interface LevelConfig {
  key: LevelTierKey;
  number: number;
  name: string;
  identity: string;
  thresholdUsd: number;
  baseFeePercent: number;
  withdrawalDays: number;
  colorClass: string;
  badgeBg: string;
  badgeBorder: string;
  benefits: string[];
}

export interface OrderBumpConfig {
  active: boolean;
  title: string;
  price: number;
  currency?: CurrencyCode;
}

export type ProductType =
  | 'digital'
  | 'fisico'
  | 'servico'
  | 'assinatura'
  | 'evento'
  | 'curso'
  | 'ebook'
  | 'mentoria'
  | 'comunidade';

export type ProductPriceByCountry = Partial<Record<CurrencyCode, number>>;

export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  primaryCountry?: CountryCode;
  price: number;
  currency?: CurrencyCode;
  pricesByCountry: ProductPriceByCountry;
  status: 'ativo' | 'rascunho';
  salesCount: number;
  revenue?: number;
  revenueByCurrency?: Partial<Record<CurrencyCode, number>>;
  image?: string;
  guaranteeDays: number;
  stock?: number;
  weightKg?: number;
  orderBump?: OrderBumpConfig;
  checkoutSlug: string;
  createdAt: string;
  sellerId?: string;
  sellerName?: string;
}

export interface Sale {
  id: string;
  code: string;
  date: string;
  country?: CountryCode;
  currency: CurrencyCode;
  customerName: string;
  customerPhone?: string;
  customerEmail: string;
  customerDocument?: string;
  customerCpf?: string;
  productId: string;
  productName: string;
  productType?: ProductType;
  paymentMethod: PaymentMethod;
  installments?: number;
  status: PaymentStatus;
  grossAmount: number;
  feePercent?: number;
  feeAmount: number;
  netAmount: number;
  isOneClick?: boolean;
  utmSource?: string;
  codDetails?: {
    deliveryZone: string;
    deliveryAddress: string;
    courierId?: string;
    confirmedByPhone: boolean;
    deliveredAt?: string;
  };
}

export interface CodOrder {
  id: string;
  saleCode: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  country: CountryCode;
  amount: number;
  currency: CurrencyCode;
  paymentMethodToCollect: 'mpesa' | 'multicaixa_express' | 'dinheiro';
  status: 'aguardando_confirmacao' | 'confirmado' | 'em_rota' | 'entregue' | 'recusado';
  courierId?: string;
  courierName?: string;
  createdAt: string;
  deliveryDate?: string;
  reconciliationStatus: 'pendente' | 'conciliado';
}

export interface Courier {
  id: string;
  name: string;
  phone: string;
  country: CountryCode;
  zones: string[];
  vehicle: 'moto' | 'carro' | 'bicicleta';
  rating: number;
  deliveriesCompleted: number;
  activeDeliveries: number;
}

export interface AcademyLesson {
  id: string;
  trackLevel: LevelTierKey;
  title: string;
  durationMinutes: number;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  summaryText: string;
  checklist: string[];
  completed?: boolean;
  category: 'copywriting' | 'trafego' | 'cod' | 'funis' | 'financeiro' | 'afiliados';
}

export interface AcademyTrack {
  tierKey: LevelTierKey;
  tierName: string;
  title: string;
  description: string;
  lessons: AcademyLesson[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorLevel: LevelTierKey;
  authorCountry: CountryCode;
  authorAvatar?: string;
  createdAt: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  tierRoom: LevelTierKey;
  tag: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: CountryCode;
  level: LevelTierKey;
  niche: string;
  servicesOffered: string[];
  totalAccumulatedUsd: number;
  verified: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  description?: string;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface MemberCourse {
  id: string;
  productId: string;
  title: string;
  category: string;
  bannerUrl: string;
  studentsCount: number;
  modules: CourseModule[];
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  productId: string;
  productName: string;
  commissionPercent: number;
  salesCount: number;
  totalCommission: number;
  status: 'ativo' | 'pendente';
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  creator: string;
  category: string;
  price: number;
  commissionPercent: number;
  maxCommission: number;
  temperature: number;
  image: string;
  description: string;
  rating: number;
  isAffiliated?: boolean;
}

export interface Subscription {
  id: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  amount: number;
  interval: 'mensal' | 'trimestral' | 'anual';
  status: 'ativa' | 'cancelada' | 'atrasada';
  nextBillingDate: string;
  startDate: string;
}

export interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  currency: CurrencyCode;
  method?: 'mpesa' | 'emola' | 'multicaixa' | 'unitel_money' | 'pix' | 'banco';
  accountDetails?: string;
  pixKey?: string;
  status: 'concluido' | 'processando' | 'recusado' | 'pago';
  releaseDays?: number;
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'coprodutor' | 'suporte' | 'gestor_trafego' | 'administrador';
  revenueSharePercent?: number;
  status: 'ativo' | 'convite_enviado';
}

export interface AppIntegration {
  id: string;
  name: string;
  category: 'webhooks' | 'marketing' | 'fiscal' | 'mensagens';
  description: string;
  iconName: string;
  connected: boolean;
  webhookUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'venda' | 'premiacao' | 'saque' | 'sistema';
}

export interface AwardTier {
  threshold: number;
  name: string;
  label: string;
  iconType: 'bronze' | 'silver' | 'gold' | 'gemstone' | 'ruby' | 'black';
  unlocked: boolean;
  unlockedDate?: string;
  trackingCode?: string;
}

export interface RecommendationInsight {
  id: string;
  title: string;
  description: string;
  actionText: string;
  targetLessonId?: string;
  severity: 'alta' | 'media' | 'dica';
}
