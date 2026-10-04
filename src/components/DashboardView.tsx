import React, { useMemo } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { CurrencyCode, CountryCode } from '../types';
import {
  TrendingUp,
  DollarSign,
  Truck,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  CreditCard,
  Layers,
  ShoppingBag
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    sales,
    codOrders,
    currentLevel,
    nextLevel,
    progressToNextLevelPercent,
    totalAccumulatedUsd,
    formatMoney,
    activeCountry,
    activeCurrency,
    recommendations,
    setCurrentTab,
    openCheckout
  } = useKoonka();

  const approvedSales = sales.filter((s) => s.status === 'aprovado');

  // Breakdown by currency
  const totalMzn = approvedSales.filter((s) => s.currency === 'MZN').reduce((acc, s) => acc + s.netAmount, 0);
  const totalAoa = approvedSales.filter((s) => s.currency === 'AOA').reduce((acc, s) => acc + s.netAmount, 0);
  const totalBrl = approvedSales.filter((s) => s.currency === 'BRL').reduce((acc, s) => acc + s.netAmount, 0);

  // COD stats
  const pendingCod = codOrders.filter((c) => c.status === 'aguardando_confirmacao').length;
  const inTransitCod = codOrders.filter((c) => c.status === 'em_rota').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Multi-Country Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Painel Geral do Vendedor
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operação consolidada para Moçambique 🇲🇿, Angola 🇦🇴 e Brasil 🇧🇷
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openCheckout()}
            className="inline-flex items-center gap-1.5 bg-[#059669] hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-100" />
            <span>Testar Checkout</span>
          </button>
        </div>
      </div>

      {/* Gamification Level Progression Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentLevel.badgeBg} text-white shadow-xs`}>
                Nível: {currentLevel.name}
              </span>
              <span className="text-xs text-slate-400">· Taxa Especial de {currentLevel.baseFeePercent}%</span>
            </div>

            <h2 className="text-xl font-bold text-white">
              Faturamento Acumulado: ${Math.round(totalAccumulatedUsd).toLocaleString('en-US')} USD
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Você está vendendo com prazo de saque acelerado de <strong>D+{currentLevel.withdrawalDays}</strong> para M-Pesa, Multicaixa e Pix.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[240px]">
            {nextLevel ? (
              <>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Rumo ao {nextLevel.name}</span>
                  <span className="font-mono text-emerald-400 font-bold">{progressToNextLevelPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevelPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Próxima taxa: {nextLevel.baseFeePercent}% · Saque D+{nextLevel.withdrawalDays}
                </span>
              </>
            ) : (
              <span className="text-xs font-bold text-emerald-400">Nível Máximo Apex Conquistado!</span>
            )}
          </div>
        </div>
      </div>

      {/* Tri-National Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Moçambique */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <span>🇲🇿</span> Moçambique
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
              M-Pesa & e-Mola
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums pt-1">
            {formatMoney(totalMzn, 'MZN')}
          </div>
          <p className="text-[11px] text-slate-400">Total líquido transacionado em Meticais</p>
        </div>

        {/* Angola */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <span>🇦🇴</span> Angola
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
              Multicaixa Express
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums pt-1">
            {formatMoney(totalAoa, 'AOA')}
          </div>
          <p className="text-[11px] text-slate-400">Total líquido transacionado em Kwanzas</p>
        </div>

        {/* Brasil */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <span>🇧🇷</span> Brasil & Global
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
              Pix & Cartão
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums pt-1">
            {formatMoney(totalBrl, 'BRL')}
          </div>
          <p className="text-[11px] text-slate-400">Total líquido transacionado em Reais</p>
        </div>
      </div>

      {/* COD Operational Status Strip */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Operação COD (Cash On Delivery)</h3>
            <p className="text-xs text-amber-900">
              {pendingCod} pedido(s) aguardando confirmação telefónica prévia e {inTransitCod} em rota com estafetas em Maputo/Luanda.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentTab('cod')}
          className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          <span>Gerir Entregas COD</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recent Sales Live Feed */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Últimas Vendas Aprovadas nos Três Mercados</h3>
          <button
            type="button"
            onClick={() => setCurrentTab('vendas')}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            Ver todas &rarr;
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {sales.slice(0, 5).map((sale) => (
            <div key={sale.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl">
                  {sale.country === 'MZ' ? '🇲🇿' : sale.country === 'AO' ? '🇦🇴' : '🇧🇷'}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">{sale.customerName}</div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {sale.productName} · <span className="uppercase font-semibold">{sale.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-slate-900">
                  {formatMoney(sale.grossAmount, sale.currency)}
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    sale.status === 'aprovado'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {sale.status === 'aprovado' ? 'Aprovado' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
