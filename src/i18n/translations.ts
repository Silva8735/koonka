import { CountryCode } from '../types';

export interface TranslationLocale {
  countryName: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  phoneLabel: string;
  phonePrefix: string;
  documentLabel: string;
  methodsSummary: string;
  heroNotification: string;
  samplePrice: string;
}

export const TRANSLATIONS: Record<CountryCode, TranslationLocale> = {
  MZ: {
    countryName: 'Moçambique',
    flag: '🇲🇿',
    currencyCode: 'MZN',
    currencySymbol: 'MT',
    phoneLabel: 'Número de telemóvel (M-Pesa / e-Mola)',
    phonePrefix: '+258',
    documentLabel: 'Bilhete de Identidade (BI) ou NUIT',
    methodsSummary: 'M-Pesa · e-Mola · mKesh · Cartão · Pagamento na Entrega (COD)',
    heroNotification: 'Venda aprovada: 1.500 MT via M-Pesa',
    samplePrice: '1.450 MT'
  },
  AO: {
    countryName: 'Angola',
    flag: '🇦🇴',
    currencyCode: 'AOA',
    currencySymbol: 'Kz',
    phoneLabel: 'Número de telemóvel (Multicaixa Express)',
    phonePrefix: '+244',
    documentLabel: 'Bilhete de Identidade (BI) ou NIF',
    methodsSummary: 'Multicaixa Express · Referência ATM · Unitel Money · Pagamento na Entrega (COD)',
    heroNotification: 'Venda aprovada: 35.000 Kz via Multicaixa Express',
    samplePrice: '35.000 Kz'
  },
  BR: {
    countryName: 'Brasil',
    flag: '🇧🇷',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    phoneLabel: 'Número de celular (WhatsApp)',
    phonePrefix: '+55',
    documentLabel: 'CPF ou CNPJ',
    methodsSummary: 'Pix instantâneo · Cartão até 12x · Boleto bancário · Assinaturas',
    heroNotification: 'Venda aprovada: R$ 297,00 via Pix',
    samplePrice: 'R$ 297,00'
  }
};
