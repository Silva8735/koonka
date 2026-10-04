import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Repeat, Calendar, CheckCircle2, AlertTriangle, XCircle, Search, DollarSign } from 'lucide-react';

export const SubscriptionsView: React.FC = () => {
  const { subscriptions } = useKoonka();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = subscriptions.filter(
    (s) =>
      s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSubscribers = subscriptions.filter((s) => s.status === 'ativa').length;
  const mrr = subscriptions
    .filter((s) => s.status === 'ativa')
    .reduce((acc, s) => acc + (s.interval === 'trimestral' ? s.amount / 3 : s.amount), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Repeat className="w-6 h-6 text-emerald-600" />
          <span>Assinaturas & Planos Recorrentes</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Acompanhamento de MRR, renovações automáticas e gestão de inadimplência
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">MRR (Receita Mensal Recorrente)</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
            R$ {mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">+18% este mês</span>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Assinantes Ativos</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">{activeSubscribers}</div>
          <span className="text-[11px] text-slate-400">Total cadastrados: {subscriptions.length}</span>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Churn Rate (Cancelamentos)</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">2.1%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Abaixo da média de mercado</span>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar assinante por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <span className="text-xs text-slate-500">{filtered.length} contratos</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Plano</th>
                <th className="px-5 py-3">Periodicidade</th>
                <th className="px-5 py-3">Valor</th>
                <th className="px-5 py-3">Próxima Cobrança</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-900 block">{sub.customerName}</span>
                    <span className="text-[11px] text-slate-400">{sub.customerEmail}</span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{sub.planName}</td>
                  <td className="px-5 py-3.5 capitalize text-slate-600">{sub.interval}</td>
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-900 tabular-nums">
                    R$ {sub.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-600">
                    {new Date(sub.nextBillingDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        sub.status === 'ativa'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sub.status === 'atrasada'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {sub.status === 'ativa' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Ativa
                        </>
                      ) : sub.status === 'atrasada' ? (
                        <>
                          <AlertTriangle className="w-3 h-3" /> Atrasada
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> Cancelada
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
