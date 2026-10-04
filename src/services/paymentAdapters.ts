import { PaymentMethod, PaymentStatus, CountryCode, CurrencyCode } from '../types';

export interface PaymentRequest {
  orderCode: string;
  amount: number;
  currency: CurrencyCode;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerDocument: string;
  country: CountryCode;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  transactionId: string;
  status: PaymentStatus;
  method: PaymentMethod;
  currency: CurrencyCode;
  amount: number;
  qrCodeOrReference?: string;
  instructions: string;
  rawResponse?: any;
}

export interface PaymentProvider {
  method: PaymentMethod;
  supportedCountry: CountryCode;
  supportedCurrency: CurrencyCode;
  processPayment(req: PaymentRequest): Promise<PaymentResponse>;
  checkStatus(transactionId: string): Promise<PaymentStatus>;
}

/**
 * ADAPTADOR MOÇAMBIQUE 🇲🇿: M-Pesa (Vodacom)
 */
export class MpesaMZAdapter implements PaymentProvider {
  method: PaymentMethod = 'mpesa';
  supportedCountry: CountryCode = 'MZ';
  supportedCurrency: CurrencyCode = 'MZN';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: integrar API real M-Pesa Vodacom Moçambique (Open API C2B)
    // endpoint: https://api.sandbox.vm.co.mz:18352/ipg/v1x/c2bPayment/singleStage/
    const isApproved = !req.customerPhone.endsWith('00'); // simula erro se terminar em 00

    return {
      transactionId: `MPESA-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: isApproved ? 'aprovado' : 'recusado',
      method: 'mpesa',
      currency: 'MZN',
      amount: req.amount,
      instructions: `Foi enviado um pedido USSD PIN para o telemóvel ${req.customerPhone}. Por favor introduza o seu PIN M-Pesa para confirmar.`,
      qrCodeOrReference: `*150*${req.amount}#`
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    // TODO: consultar status na API M-Pesa via Transaction Query
    return 'aprovado';
  }
}

/**
 * ADAPTADOR MOÇAMBIQUE 🇲🇿: e-Mola (Movitel)
 */
export class EMolaMZAdapter implements PaymentProvider {
  method: PaymentMethod = 'emola';
  supportedCountry: CountryCode = 'MZ';
  supportedCurrency: CurrencyCode = 'MZN';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: integrar API real e-Mola Movitel Moçambique
    return {
      transactionId: `EMOLA-${Date.now()}`,
      status: 'aprovado',
      method: 'emola',
      currency: 'MZN',
      amount: req.amount,
      instructions: `Confirmação e-Mola enviada para ${req.customerPhone}. Confirme no menu *898#.`
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    return 'aprovado';
  }
}

/**
 * ADAPTADOR ANGOLA 🇦🇴: Multicaixa Express
 */
export class MulticaixaExpressAOAdapter implements PaymentProvider {
  method: PaymentMethod = 'multicaixa_express';
  supportedCountry: CountryCode = 'AO';
  supportedCurrency: CurrencyCode = 'AOA';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: integrar API GPO (Gateway de Pagamentos Online) EMIS Angola / Banco Parceiro
    // POST https://gpo.emis.co.ao/v1/payments/multicaixa-express
    return {
      transactionId: `MCX-${Date.now()}`,
      status: 'aprovado',
      method: 'multicaixa_express',
      currency: 'AOA',
      amount: req.amount,
      instructions: `Notificação enviada para o aplicativo Multicaixa Express no número ${req.customerPhone}. Valide com a sua chave PIN.`
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    return 'aprovado';
  }
}

/**
 * ADAPTADOR ANGOLA 🇦🇴: Referência Multicaixa (Pagamento por Referência ATM)
 */
export class ReferenciaMulticaixaAOAdapter implements PaymentProvider {
  method: PaymentMethod = 'referencia_multicaixa';
  supportedCountry: CountryCode = 'AO';
  supportedCurrency: CurrencyCode = 'AOA';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: integrar geração de entidade e referência EMIS
    const entidade = '99104';
    const referencia = Math.floor(100000000 + Math.random() * 900000000).toString();

    return {
      transactionId: `REF-${referencia}`,
      status: 'pendente',
      method: 'referencia_multicaixa',
      currency: 'AOA',
      amount: req.amount,
      qrCodeOrReference: `Entidade: ${entidade} | Ref: ${referencia}`,
      instructions: `Pague no Multicaixa ou Homebanking em Pagamentos > Pagamento por Referência. Entidade: ${entidade} | Referência: ${referencia}.`
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    return 'pendente';
  }
}

/**
 * ADAPTADOR BRASIL 🇧🇷: Pix Instantâneo
 */
export class PixBRAdapter implements PaymentProvider {
  method: PaymentMethod = 'pix';
  supportedCountry: CountryCode = 'BR';
  supportedCurrency: CurrencyCode = 'BRL';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: integrar PSP Pix BACEN (Mercado Pago, Asaas ou Pagar.me)
    const pixCopiaCola = `00020126580014br.gov.bcb.pix0136koonka-${req.orderCode}520400005303986540${req.amount.toFixed(2)}5802BR5913KOONKA PAGAMENTOS6009SAO PAULO62070503***6304`;

    return {
      transactionId: `PIX-${Date.now()}`,
      status: 'aprovado',
      method: 'pix',
      currency: 'BRL',
      amount: req.amount,
      qrCodeOrReference: pixCopiaCola,
      instructions: 'QR Code Pix gerado. Aponte a câmara do aplicativo do seu banco ou use o Copia e Cola.'
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    return 'aprovado';
  }
}

/**
 * ADAPTADOR BRASIL 🇧🇷: Cartão de Crédito
 */
export class CartaoBRAdapter implements PaymentProvider {
  method: PaymentMethod = 'cartao';
  supportedCountry: CountryCode = 'BR';
  supportedCurrency: CurrencyCode = 'BRL';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: integrar gateway adquirente com split de pagamento e 3DS 2.0
    return {
      transactionId: `CARD-${Date.now()}`,
      status: 'aprovado',
      method: 'cartao',
      currency: 'BRL',
      amount: req.amount,
      instructions: 'Transação de cartão de crédito autorizada em 1-clique.'
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    return 'aprovado';
  }
}

/**
 * ADAPTADOR GERAL 🇲🇿 🇦🇴 🇧🇷: COD (Cash on Delivery / Pagamento na Entrega)
 */
export class CodAdapter implements PaymentProvider {
  method: PaymentMethod = 'cod';
  supportedCountry: CountryCode = 'MZ'; // Disponível para MZ, AO e BR
  supportedCurrency: CurrencyCode = 'MZN';

  async processPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // TODO: criar ordem de entrega logística no módulo COD Koonka
    return {
      transactionId: `COD-${Date.now()}`,
      status: 'pendente',
      method: 'cod',
      currency: req.currency,
      amount: req.amount,
      instructions: 'Pedido registado com pagamento na entrega. A nossa equipa entrará em contacto por WhatsApp para confirmar antes do envio.'
    };
  }

  async checkStatus(txId: string): Promise<PaymentStatus> {
    return 'pendente';
  }
}

/**
 * REGISTRY / FACTORY DE ADAPTADORES POR PAÍS
 */
export class PaymentRegistry {
  private static providers: PaymentProvider[] = [
    new MpesaMZAdapter(),
    new EMolaMZAdapter(),
    new MulticaixaExpressAOAdapter(),
    new ReferenciaMulticaixaAOAdapter(),
    new PixBRAdapter(),
    new CartaoBRAdapter(),
    new CodAdapter()
  ];

  static getProvider(method: PaymentMethod, country: CountryCode): PaymentProvider | undefined {
    return this.providers.find((p) => p.method === method);
  }

  static getMethodsForCountry(country: CountryCode): PaymentMethod[] {
    switch (country) {
      case 'MZ':
        return ['mpesa', 'emola', 'cod', 'cartao'];
      case 'AO':
        return ['multicaixa_express', 'referencia_multicaixa', 'cod', 'cartao'];
      case 'BR':
        return ['pix', 'cartao', 'boleto', 'cod'];
      default:
        return ['mpesa', 'multicaixa_express', 'pix', 'cod'];
    }
  }
}
