import React from 'react';
import { useKoonka } from '../../context/KoonkaContext';
import { TRANSLATIONS } from '../../i18n/translations';
import {
  Smartphone,
  CreditCard,
  Truck,
  Building,
  Zap,
  QrCode
} from 'lucide-react';

export const PaymentMethodsStrip: React.FC = () => {
  const { activeCountry } = useKoonka();
  const t = TRANSLATIONS[activeCountry];

  const getMethods = () => {
    switch (activeCountry) {
      case 'MZ':
        return [
          { name: 'M-Pesa (Vodacom)', sub: 'Mobile Money líder em MZ', tag: 'Instantâneo' },
          { name: 'e-Mola (Movitel)', sub: 'Cobertura nacional *898#', tag: 'Sem taxas extras' },
          { name: 'mKesh (Tmcel)', sub: 'Carteira móvel', tag: '1-Toque' },
          { name: 'Cartões Visa & Mastercard', sub: 'Bancos BCI, BIM, Standard', tag: 'Segurança 3DS' },
          { name: 'Pagamento na Entrega (COD)', sub: 'Maputo & Matola com estafeta', tag: 'Dinheiro ou M-Pesa' }
        ];
      case 'AO':
        return [
          { name: 'Multicaixa Express', sub: 'Rede EMIS em Kwanzas', tag: 'PIN no telemóvel' },
          { name: 'Referência Multicaixa', sub: 'Pagamentos no ATM e Homebanking', tag: 'Entidade e Ref' },
          { name: 'Unitel Money', sub: 'Carteira móvel Unitel', tag: 'Instantâneo' },
          { name: 'Cartões Bancários GPO', sub: 'Bancos BAI, BFA, BIC', tag: 'Em Kwanzas' },
          { name: 'Pagamento na Entrega (COD)', sub: 'Luanda & Benguela', tag: 'Na entrega' }
        ];
      case 'BR':
        return [
          { name: 'Pix Instantâneo', sub: 'Banco Central do Brasil', tag: 'Aprovação em 3s' },
          { name: 'Cartão de Crédito', sub: 'Até 12x com parcelamento', tag: '1-Click Checkout' },
          { name: 'Boleto Bancário', sub: 'Compensação em 24h úteis', tag: 'Com código de barras' },
          { name: 'Assinaturas Recorrentes', sub: 'Cobrança mensal e trimestral', tag: 'MRR Automático' },
          { name: 'Pagamento na Entrega (COD)', sub: 'Principais capitais', tag: 'Pronta entrega' }
        ];
    }
  };

  return (
    <div id="pagamentos" className="bg-slate-900 border-y border-slate-800 py-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl">{t.flag}</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                Métodos Locais de Pagamento
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Detectados automaticamente para compradores em {t.countryName}:
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {getMethods().map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-orange-500/50 rounded-xl px-3 py-2 text-xs transition-colors flex items-center gap-2"
              >
                <div>
                  <span className="font-bold text-white block">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.sub}</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">
                  {m.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
