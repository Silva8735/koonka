import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Sale, PaymentMethod, SaleStatus } from '../types';
import {
  TrendingUp,
  Search,
  Download,
  Filter,
  CreditCard,
  QrCode,
  FileText,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const SalesView: React.FC = () => {
  const { sales, refundSale } = useKoonka();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<Sale | null>(null);

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || sale.status === selectedStatus;
    const matchesMethod = selectedMethod === 'all' || sale.paymentMethod === selectedMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalGross = filteredSales.reduce((acc, s) => acc + s.grossAmount, 0);
  const totalNet = filteredSales.reduce((acc, s) => acc + s.netAmount, 0);

  const exportCSV = () => {
    const headers = ['Codigo', 'Data', 'Cliente', 'Email', 'Produto', 'Metodo', 'Status', 'Valor Bruto', 'Valor Liquido'];
    const rows = filteredSales.map((s) => [
      s.code,
      s.date,
      s.customerName,
      s.customerEmail,
      s.productName,
      s.paymentMethod,
      s.status,
      s.grossAmount.toFixed(2),
      s.netAmount.toFixed(2)
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `koonka_vendas_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getStatusBadge = (status: SaleStatus) => {
    switch (status) {
      case 'aprovado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Aprovado
          </span>
        );
      case 'pendente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Pendente
          </span>
        );
      case 'reembolsado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <RotateCcw className="w-3 h-3" /> Reembolsado
          </span>
        );
      case 'recusado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3 h-3" /> Recusado
          </span>
        );
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return (
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <QrCode className="w-3.5 h-3.5" /> PIX
          </span>
        );
      case 'cartao':
        return (
          <span className="flex items-center gap-1 text-indigo-600 font-medium">
            <CreditCard className="w-3.5 h-3.5" /> Cartão
          </span>
        );
      case 'boleto':
        return (
          <span className="flex items-center gap-1 text-amber-600 font-medium">
            <FileText className="w-3.5 h-3.5" /> Boleto
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>Minhas Vendas</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Histórico completo de transações, estornos e conciliação financeira
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Volume Transacionado</span>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {formatCurrency(totalGross)}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Receita Líquida</span>
          <div className="text-xl font-bold text-emerald-600 font-mono tabular-nums mt-1">
            {formatCurrency(totalNet)}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Total de Transações</span>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {filteredSales.length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cliente, e-mail, código (#KO-)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Todos os Status</option>
            <option value="aprovado">Aprovado</option>
            <option value="pendente">Pendente</option>
            <option value="reembolsado">Reembolsado</option>
          </select>

          {/* Payment Method filter */}
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Todas as Formas</option>
            <option value="pix">PIX</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="boleto">Boleto Bancário</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        {/* Telemóvel: cartões empilhados */}
        <ul className="md:hidden divide-y divide-slate-100">
          {filteredSales.map((sale) => (
            <li key={sale.id} className="p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono font-bold text-slate-900 text-xs block">{sale.code}</span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(sale.date).toLocaleDateString('pt-BR')} às{' '}
                    {new Date(sale.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="shrink-0">{getStatusBadge(sale.status)}</div>
              </div>

              <div className="min-w-0">
                <span className="font-semibold text-slate-900 text-sm block truncate">{sale.productName}</span>
                <span className="text-[11px] text-slate-500 block truncate">{sale.customerName}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs">{getMethodIcon(sale.paymentMethod)}</div>
                <div className="text-right font-mono tabular-nums">
                  <span className="font-bold text-slate-900 text-sm block">{formatCurrency(sale.netAmount)}</span>
                  <span className="text-[10px] text-slate-400">Bruto: {formatCurrency(sale.grossAmount)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSaleDetail(sale)}
                className="w-full min-h-[44px] rounded-lg border border-slate-200 text-orange-600 font-semibold text-xs active:bg-slate-50"
              >
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>

        {/* PC: tabela completa */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Código / Data</th>
                <th className="px-5 py-3.5">Cliente</th>
                <th className="px-5 py-3.5">Produto</th>
                <th className="px-5 py-3.5">Pagamento</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Líquido</th>
                <th className="px-5 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-mono font-bold text-slate-900 block">{sale.code}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(sale.date).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(sale.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-900 block">{sale.customerName}</span>
                    <span className="text-[11px] text-slate-400 truncate block">{sale.customerEmail}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-medium text-slate-800 line-clamp-1">{sale.productName}</span>
                    {sale.isOneClick && (
                      <span className="text-[10px] text-emerald-600 font-medium">1-Click Checkout</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap">
                    {getMethodIcon(sale.paymentMethod)}
                    {sale.installments && sale.installments > 1 && (
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {sale.installments}x de R$ {(sale.grossAmount / sale.installments).toFixed(2)}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap">{getStatusBadge(sale.status)}</td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right font-mono tabular-nums">
                    <span className="font-bold text-slate-900 block">
                      {formatCurrency(sale.netAmount)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Bruto: {formatCurrency(sale.grossAmount)}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedSaleDetail(sale)}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-[11px] hover:underline"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs">
            Nenhuma venda encontrada com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Sale Detail Modal */}
      {selectedSaleDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedSaleDetail(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 z-10 animate-in fade-in zoom-in-95 duration-200 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Transação {selectedSaleDetail.code}
                </h3>
                <span className="text-slate-400 text-[11px]">
                  {new Date(selectedSaleDetail.date).toLocaleString('pt-BR')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSaleDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-lg"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Dados do Cliente</span>
                <div className="font-semibold text-slate-900">{selectedSaleDetail.customerName}</div>
                <div className="text-slate-600">{selectedSaleDetail.customerEmail}</div>
                <div className="text-slate-400 font-mono">CPF: {selectedSaleDetail.customerCpf}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Produto & Oferta</span>
                <div className="font-semibold text-slate-900">{selectedSaleDetail.productName}</div>
                <div className="text-slate-600">Origem: {selectedSaleDetail.utmSource || 'Tráfego Direto'}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Valores & Taxas</span>
                <div className="flex justify-between">
                  <span className="text-slate-600">Valor Bruto:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {formatCurrency(selectedSaleDetail.grossAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Taxa Koonka:</span>
                  <span className="font-mono font-semibold">
                    - {formatCurrency(selectedSaleDetail.feeAmount)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-emerald-700 font-bold">
                  <span>Você Recebeu (Líquido):</span>
                  <span className="font-mono text-sm">
                    {formatCurrency(selectedSaleDetail.netAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {selectedSaleDetail.status === 'aprovado' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Confirmar reembolso para ${selectedSaleDetail.customerName}?`)) {
                      refundSale(selectedSaleDetail.id);
                      setSelectedSaleDetail(null);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-semibold transition-colors"
                >
                  Solicitar Reembolso
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setSelectedSaleDetail(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
