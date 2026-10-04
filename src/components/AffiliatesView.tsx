import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Users, UserCheck, Percent, DollarSign, Search, Check, Clock } from 'lucide-react';

export const AffiliatesView: React.FC = () => {
  const { affiliates } = useKoonka();
  const [searchTerm, setSearchTerm] = useState('');
  const [attributionRule, setAttributionRule] = useState<'ultimo' | 'primeiro'>('ultimo');
  const [cookieDays, setCookieDays] = useState(90);

  const filteredAffiliates = affiliates.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAffiliates = affiliates.length;
  const totalSalesByAffiliates = affiliates.reduce((acc, a) => acc + a.salesCount, 0);
  const totalCommissionPaid = affiliates.reduce((acc, a) => acc + a.totalCommission, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-emerald-600" />
          <span>Meus Afiliados</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Gerencie seu time de afiliados, regras de comissionamento e desempenho de vendas
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Afiliados Ativos</span>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">{totalAffiliates}</div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Vendas por Afiliados</span>
          <div className="text-xl font-bold text-emerald-600 font-mono mt-1">{totalSalesByAffiliates}</div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Comissões Pagas</span>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">
            R$ {totalCommissionPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Affiliation Rules Box */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
        <h3 className="font-bold text-sm text-slate-900">Configurações Gerais de Afiliação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Regra de Atribuição de Comissão</label>
            <select
              value={attributionRule}
              onChange={(e) => setAttributionRule(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="ultimo">Último Clique (Recomendado - premia o fechamento)</option>
              <option value="primeiro">Primeiro Clique (premia quem trouxe o lead)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Validade dos Cookies de Rastreamento</label>
            <select
              value={cookieDays}
              onChange={(e) => setCookieDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value={60}>60 dias</option>
              <option value={90}>90 dias (Padrão Koonka)</option>
              <option value={180}>180 dias</option>
              <option value={365}>Eterno (Cookie eterno)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Affiliates List */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar afiliado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <span className="text-xs text-slate-500">{filteredAffiliates.length} afiliados</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Afiliado</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3 text-center">Comissão (%)</th>
                <th className="px-5 py-3 text-right">Vendas Realizadas</th>
                <th className="px-5 py-3 text-right">Total Gerado</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredAffiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-900 block">{aff.name}</span>
                    <span className="text-[11px] text-slate-400">{aff.email}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium">{aff.productName}</td>
                  <td className="px-5 py-3.5 text-center font-mono font-bold text-emerald-600">
                    {aff.commissionPercent}%
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {aff.salesCount}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums font-bold text-slate-900">
                    R$ {aff.totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        aff.status === 'ativo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {aff.status === 'ativo' ? (
                        <>
                          <Check className="w-3 h-3" /> Ativo
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> Pendente
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
