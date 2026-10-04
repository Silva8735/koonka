import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import {
  CreditCard,
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  QrCode,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinancialView: React.FC = () => {
  const { availableBalance, pendingBalance, withdrawals, requestWithdrawal } = useKoonka();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [pixKey, setPixKey] = useState('admin.silva@koonka.com');
  const [pixKeyType, setPixKeyType] = useState<'cpf' | 'email' | 'telefone' | 'aleatoria'>('email');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (!amountNum || amountNum <= 0 || amountNum > availableBalance) {
      alert('Por favor insira um valor válido menor ou igual ao seu saldo disponível.');
      return;
    }

    const success = requestWithdrawal(amountNum, pixKey, pixKeyType);
    if (success) {
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      setSuccessMessage(`Saque de ${formatCurrency(amountNum)} solicitado com sucesso via PIX!`);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <span>Financeiro & Saques</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie seu saldo disponível, prazos de liquidação e solicite saques via PIX instantâneo
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsWithdrawModalOpen(true)}
          disabled={availableBalance < 5}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <ArrowDownToLine className="w-4 h-4" />
          <span>Solicitar Saque PIX</span>
        </button>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-3 text-xs font-medium animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Saldo Disponível */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo Disponível</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              Liberado
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {formatCurrency(availableBalance)}
          </div>
          <p className="text-[11px] text-slate-400">
            Disponível para saque imediato sem taxas ocultas.
          </p>
        </div>

        {/* Saldo a Liberar */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo a Liberar</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
              D+2 PIX / D+30 Cartão
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-700 font-mono tabular-nums">
            {formatCurrency(availableBalance * 0.42)}
          </div>
          <p className="text-[11px] text-slate-400">
            Valores de vendas recentes em processo de liberação por segurança.
          </p>
        </div>

        {/* Saldo Pendente (Boletos) */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo Pendente</span>
            <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              Aguardando compensação
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
            {formatCurrency(pendingBalance)}
          </div>
          <p className="text-[11px] text-slate-400">
            Boletos bancários gerados aguardando pagamento do comprador.
          </p>
        </div>
      </div>

      {/* Security & Rules Banner */}
      <div className="bg-emerald-950/90 text-white rounded-xl p-5 border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-800/80 text-emerald-200 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Regras de Saque da Koonka</h3>
            <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl leading-relaxed">
              Os saques via PIX são transferidos para sua conta bancária cadastrada. O valor mínimo de saque é de R$ 5,00. A taxa fixa por saque é de apenas R$ 3,67 (tarifa bancária padrão).
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] text-emerald-300 block">Conta Verificada</span>
          <span className="text-xs font-semibold text-white">Banco Nubank S.A.</span>
        </div>
      </div>

      {/* Withdrawals History Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Histórico de Saques</h3>
          <span className="text-xs text-slate-500">{withdrawals.length} solicitações</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Data / Hora</th>
                <th className="px-5 py-3">Valor</th>
                <th className="px-5 py-3">Chave PIX de Destino</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Comprovante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {withdrawals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-semibold text-slate-900 block">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      às {new Date(item.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(item.amount)}
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-mono text-[11px]">{item.pixKey}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Pago via PIX
                    </span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Comprovante bancário autenticado: Autenticação #${item.id.toUpperCase()}`)}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-[11px] hover:underline"
                    >
                      Ver Comprovante
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Solicitar Saque */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWithdrawModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 z-10 animate-in fade-in zoom-in-95 duration-200 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ArrowDownToLine className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Solicitar Saque PIX</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500">Saldo Disponível:</span>
                  <div className="text-base font-bold text-emerald-700 font-mono">
                    {formatCurrency(availableBalance)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount(availableBalance.toFixed(2))}
                  className="text-[11px] text-emerald-600 hover:underline font-bold"
                >
                  Sacar Tudo
                </button>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Valor do Saque (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0,00"
                  max={availableBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block font-medium text-slate-700 mb-1">Tipo</label>
                  <select
                    value={pixKeyType}
                    onChange={(e) => setPixKeyType(e.target.value as any)}
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="email">E-mail</option>
                    <option value="cpf">CPF</option>
                    <option value="telefone">Telefone</option>
                    <option value="aleatoria">Aleatória</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Chave PIX</label>
                  <input
                    type="text"
                    required
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                A transferência bancária via PIX é instantânea e o comprovante fica salvo no seu extrato.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
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
