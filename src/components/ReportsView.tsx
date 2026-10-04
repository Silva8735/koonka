import React from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { BarChart3, QrCode, CreditCard, FileText, PieChart, Compass, TrendingUp } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { sales, products } = useKoonka();

  const approvedSales = sales.filter((s) => s.status === 'aprovado');
  const totalRevenue = approvedSales.reduce((acc, s) => acc + s.netAmount, 0);

  // Method breakdown
  const pixRevenue = approvedSales
    .filter((s) => s.paymentMethod === 'pix')
    .reduce((acc, s) => acc + s.netAmount, 0);
  const cardRevenue = approvedSales
    .filter((s) => s.paymentMethod === 'cartao')
    .reduce((acc, s) => acc + s.netAmount, 0);
  const boletoRevenue = approvedSales
    .filter((s) => s.paymentMethod === 'boleto')
    .reduce((acc, s) => acc + s.netAmount, 0);

  const pixPercent = totalRevenue > 0 ? Math.round((pixRevenue / totalRevenue) * 100) : 55;
  const cardPercent = totalRevenue > 0 ? Math.round((cardRevenue / totalRevenue) * 100) : 40;
  const boletoPercent = totalRevenue > 0 ? Math.max(0, 100 - pixPercent - cardPercent) : 5;

  // UTM breakdown
  const utmSources: Record<string, number> = {};
  approvedSales.forEach((s) => {
    const src = s.utmSource || 'direto';
    utmSources[src] = (utmSources[src] || 0) + s.netAmount;
  });

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-600" />
          <span>Relatórios de Performance</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Inteligência de dados, conversão por método de pagamento e atribuição de tráfego UTM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Method Breakdown */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600" />
              <span>Receita por Método de Pagamento</span>
            </h3>
            <span className="text-xs font-mono font-bold text-slate-900">{formatCurrency(totalRevenue)}</span>
          </div>

          <div className="space-y-3">
            {/* PIX */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PIX Instantâneo</span>
                </div>
                <div className="font-mono tabular-nums text-slate-700">
                  {formatCurrency(pixRevenue)} ({pixPercent}%)
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pixPercent}%` }} />
              </div>
            </div>

            {/* Cartão de Crédito */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Cartão de Crédito (até 12x)</span>
                </div>
                <div className="font-mono tabular-nums text-slate-700">
                  {formatCurrency(cardRevenue)} ({cardPercent}%)
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${cardPercent}%` }} />
              </div>
            </div>

            {/* Boleto Bancário */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Boleto Bancário</span>
                </div>
                <div className="font-mono tabular-nums text-slate-700">
                  {formatCurrency(boletoRevenue)} ({boletoPercent}%)
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${boletoPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* UTM Attribution */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Origem do Tráfego (UTM Source)</span>
            </h3>
            <span className="text-xs text-slate-500">Rastreamento 100% ativo</span>
          </div>

          <div className="space-y-3">
            {Object.entries(utmSources).map(([source, amount]) => {
              const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 25;
              return (
                <div key={source} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 capitalize">
                      {source.replace(/_/g, ' ')}
                    </span>
                    <span className="font-mono tabular-nums text-slate-700">
                      {formatCurrency(amount)} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-800 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Top Produtos Mais Vendidos</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Preço</th>
                <th className="px-5 py-3 text-right">Vendas</th>
                <th className="px-5 py-3 text-right">Faturamento Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{p.name}</td>
                  <td className="px-5 py-3.5 capitalize text-slate-600">{p.type}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-700">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-slate-900">
                    {p.salesCount}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-600">
                    {formatCurrency(p.revenue || 0)}
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
