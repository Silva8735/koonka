import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { CurrencyCode } from '../types';
import {
  CreditCard,
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  QrCode,
  DollarSign,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WalletView: React.FC = () => {
  const {
    sales,
    currentLevel,
    withdrawals,
    requestWithdrawal,
    formatMoney,
    activeCountry,
    activeCurrency
  } = useKoonka();

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(activeCurrency);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amountInput, setAmountInput] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [method, setMethod] = useState<'mpesa' | 'emola' | 'multicaixa' | 'unitel_money' | 'pix' | 'banco'>('mpesa');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Group approved sales by currency
  const approvedSales = sales.filter((s) => s.status === 'aprovado');

  const balances: Record<CurrencyCode, { available: number; pending: number }> = {
    MZN: {
      available: approvedSales.filter((s) => s.currency === 'MZN').reduce((acc, s) => acc + s.netAmount, 0),
      pending: sales.filter((s) => s.currency === 'MZN' && s.status === 'pendente').reduce((acc, s) => acc + s.grossAmount, 0)
    },
    AOA: {
      available: approvedSales.filter((s) => s.currency === 'AOA').reduce((acc, s) => acc + s.netAmount, 0),
      pending: sales.filter((s) => s.currency === 'AOA' && s.status === 'pendente').reduce((acc, s) => acc + s.grossAmount, 0)
    },
    BRL: {
      available: approvedSales.filter((s) => s.currency === 'BRL').reduce((acc, s) => acc + s.netAmount, 0),
      pending: sales.filter((s) => s.currency === 'BRL' && s.status === 'pendente').reduce((acc, s) => acc + s.grossAmount, 0)
    },
    USD: {
      available: approvedSales.filter((s) => s.currency === 'USD').reduce((acc, s) => acc + s.netAmount, 0),
      pending: 0
    }
  };

  const currentAvailable = balances[selectedCurrency].available;
  const currentPending = balances[selectedCurrency].pending;

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0 || val > currentAvailable) {
      alert('Por favor insira um valor válido dentro do saldo disponível.');
      return;
    }

    requestWithdrawal(val, selectedCurrency, method, accountDetails || 'Conta padrão verificada');
    setIsWithdrawModalOpen(false);
    setAmountInput('');
    setSuccessNotice(`Saque de ${formatMoney(val, selectedCurrency)} solicitado! O prazo no seu nível ${currentLevel.name} é de D+${currentLevel.withdrawalDays}.`);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}

    setTimeout(() => setSuccessNotice(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <span>Carteira Multi-Moeda & Saques</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sua conta Koonka unificada para receber em Meticais (MZN), Kwanzas (AOA), Reais (BRL) e Dólares (USD)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsWithdrawModalOpen(true)}
            disabled={currentAvailable <= 0}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <ArrowDownToLine className="w-4 h-4" />
            <span>Solicitar Saque ({selectedCurrency})</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Currency Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {(['MZN', 'AOA', 'BRL', 'USD'] as CurrencyCode[]).map((curr) => {
          const isSelected = selectedCurrency === curr;
          const flag = curr === 'MZN' ? '🇲🇿' : curr === 'AOA' ? '🇦🇴' : curr === 'BRL' ? '🇧🇷' : '🌐';
          return (
            <button
              key={curr}
              type="button"
              onClick={() => setSelectedCurrency(curr)}
              className={`px-4 py-2.5 rounded-xl font-bold border transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <span>{flag}</span>
              <span>{curr}</span>
              <span className="font-mono text-[11px] opacity-80">
                ({formatMoney(balances[curr].available, curr)})
              </span>
            </button>
          );
        })}
      </div>

      {/* Balance Summary for Selected Currency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo Disponível para Saque</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Liberado
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {formatMoney(currentAvailable, selectedCurrency)}
          </div>
          <p className="text-[11px] text-slate-400">
            Prazo de liberação de fundos no nível {currentLevel.name}: <strong>D+{currentLevel.withdrawalDays}</strong>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo a Liberar</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Período de Garantia
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-700 font-mono tabular-nums">
            {formatMoney(currentAvailable * 0.25, selectedCurrency)}
          </div>
          <p className="text-[11px] text-slate-400">
            Liberação automática após o prazo de garantia do cliente (7 a 30 dias).
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo Pendente (COD / Boletos)</span>
            <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
              Aguardando pagamento
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
            {formatMoney(currentPending, selectedCurrency)}
          </div>
          <p className="text-[11px] text-slate-400">
            Encomendas com pagamento na entrega e referências bancárias geradas.
          </p>
        </div>
      </div>

      {/* Local Payment Channels Notice */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Canais de Saque Cadastrados por País</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            • <strong>Moçambique:</strong> M-Pesa, e-Mola ou transferência bancária directa (BCI, BIM, Standard Bank).<br />
            • <strong>Angola:</strong> Multicaixa Express, Unitel Money ou transferência bancária (BAI, BFA, BIC).<br />
            • <strong>Brasil:</strong> Chave Pix (CPF, e-mail, telefone ou chave aleatória).
          </p>
        </div>
      </div>

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWithdrawModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 z-10 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Solicitar Saque em {selectedCurrency}
              </h3>
              <button onClick={() => setIsWithdrawModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg">
                &times;
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500">Disponível:</span>
                  <div className="font-bold text-base font-mono text-emerald-800">
                    {formatMoney(currentAvailable, selectedCurrency)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAmountInput(currentAvailable.toFixed(2))}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Sacar Tudo
                </button>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Valor do Saque</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  max={currentAvailable}
                  placeholder="0.00"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Canal de Destino</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  {selectedCurrency === 'MZN' && (
                    <>
                      <option value="mpesa">M-Pesa (Vodacom Moçambique)</option>
                      <option value="emola">e-Mola (Movitel)</option>
                      <option value="banco">Conta Bancária BCI / BIM / Standard Bank</option>
                    </>
                  )}
                  {selectedCurrency === 'AOA' && (
                    <>
                      <option value="multicaixa">Multicaixa Express</option>
                      <option value="unitel_money">Unitel Money</option>
                      <option value="banco">Conta Bancária BAI / BFA</option>
                    </>
                  )}
                  {selectedCurrency === 'BRL' && (
                    <option value="pix">Pix Instantâneo (Chave Pix)</option>
                  )}
                  {selectedCurrency === 'USD' && (
                    <option value="banco">Transferência Swift Internacional</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Número / Chave / IBAN</label>
                <input
                  type="text"
                  required
                  placeholder={
                    selectedCurrency === 'MZN'
                      ? '+258 84 000 0000'
                      : selectedCurrency === 'AOA'
                      ? '+244 923 000 000'
                      : 'Chave Pix ou Conta'
                  }
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500">
                Prazo de depósito para seu nível <strong>{currentLevel.name}</strong>: D+{currentLevel.withdrawalDays}.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Confirmar Saque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
