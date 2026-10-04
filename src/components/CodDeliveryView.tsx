import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { CodOrder } from '../types';
import {
  Truck,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  QrCode,
  DollarSign,
  AlertTriangle,
  Send,
  UserCheck,
  ShieldCheck,
  Filter
} from 'lucide-react';

export const CodDeliveryView: React.FC = () => {
  const {
    codOrders,
    couriers,
    confirmCodOrder,
    dispatchCodOrder,
    markCodDelivered,
    markCodRejected,
    reconcileCodOrder,
    formatMoney,
    activeCountry
  } = useKoonka();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCourierId, setSelectedCourierId] = useState<string>(couriers[0]?.id || '');
  const [selectedOrderForDispatch, setSelectedOrderForDispatch] = useState<CodOrder | null>(null);

  const filteredOrders = codOrders.filter((ord) => {
    if (filterStatus === 'all') return true;
    return ord.status === filterStatus;
  });

  const totalCodCount = codOrders.length;
  const deliveredCount = codOrders.filter((o) => o.status === 'entregue').length;
  const rejectedCount = codOrders.filter((o) => o.status === 'recusado').length;
  const pendingConfirmCount = codOrders.filter((o) => o.status === 'aguardando_confirmacao').length;

  const deliveryRate = totalCodCount > 0 ? Math.round((deliveredCount / totalCodCount) * 100) : 94;
  const rejectionRate = totalCodCount > 0 ? Math.round((rejectedCount / totalCodCount) * 100) : 6;

  const handleWhatsAppConfirm = (order: CodOrder) => {
    const text = encodeURIComponent(
      `Olá ${order.customerName}! Aqui é da equipa Koonka de entregas. Vimos o seu pedido #${order.saleCode} no valor de ${order.amount} ${order.currency} com pagamento na entrega. Pode confirmar se podemos despachar hoje para o endereço: ${order.address}?`
    );
    window.open(`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    confirmCodOrder(order.id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-amber-500" />
            <span>Módulo COD & Logística de Estafetas</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão de Cash on Delivery (Pagamento na Entrega) para Moçambique (Maputo/Matola) e Angola (Luanda)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Anti-Recusa Activo: Confirmação Prévia</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Aguardando Confirmação</span>
          <div className="text-2xl font-bold text-amber-600 font-mono mt-1">{pendingConfirmCount}</div>
          <span className="text-[11px] text-slate-400">Ligar ou enviar WhatsApp</span>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Taxa de Sucesso na Entrega</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">{deliveryRate}%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Meta regional: &gt; 90%</span>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Taxa de Recusa de Encomendas</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{rejectionRate}%</div>
          <span className="text-[11px] text-slate-400">Controlado por validação</span>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
          <span className="text-xs text-slate-500 font-medium">Estafetas Activos</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{couriers.length}</div>
          <span className="text-[11px] text-slate-400">Maputo e Luanda</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Todos os Pedidos COD' },
            { id: 'aguardando_confirmacao', label: '1. Aguardando Confirmação' },
            { id: 'confirmado', label: '2. Confirmados' },
            { id: 'em_rota', label: '3. Em Rota com Estafeta' },
            { id: 'entregue', label: '4. Entregues & Pagos' },
            { id: 'recusado', label: 'Recusados' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Pedido / Data</th>
                <th className="px-5 py-3.5">Cliente / Contacto</th>
                <th className="px-5 py-3.5">Cidade & Endereço</th>
                <th className="px-5 py-3.5">Valor a Cobrar</th>
                <th className="px-5 py-3.5">Estafeta Responsável</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Ação Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-mono font-bold text-slate-900 block">{ord.saleCode}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(ord.createdAt).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(ord.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-900 block">{ord.customerName}</span>
                    <span className="font-mono text-emerald-600 text-[11px]">{ord.customerPhone}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-slate-800 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{ord.city}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate max-w-xs">{ord.address}</span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap font-mono font-bold text-slate-900 tabular-nums">
                    {formatMoney(ord.amount, ord.currency)}
                    <span className="text-[10px] text-slate-400 block font-normal capitalize">
                      Cobrar via {ord.paymentMethodToCollect}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-700">
                    {ord.courierName ? (
                      <span className="font-medium text-slate-900 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-amber-500" />
                        {ord.courierName}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Não despachado</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap">
                    {ord.status === 'aguardando_confirmacao' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3" /> Aguardando Confirmação
                      </span>
                    )}
                    {ord.status === 'confirmado' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        <CheckCircle2 className="w-3 h-3" /> Confirmado (Pronto)
                      </span>
                    )}
                    {ord.status === 'em_rota' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        <Truck className="w-3 h-3" /> Em Rota
                      </span>
                    )}
                    {ord.status === 'entregue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Entregue & Pago
                      </span>
                    )}
                    {ord.status === 'recusado' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
                        <XCircle className="w-3 h-3" /> Recusado no Destino
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right space-x-1.5">
                    {ord.status === 'aguardando_confirmacao' && (
                      <button
                        type="button"
                        onClick={() => handleWhatsAppConfirm(ord)}
                        className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-2.5 py-1 rounded text-xs transition-colors shadow-xs"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Confirmar WhatsApp</span>
                      </button>
                    )}

                    {ord.status === 'confirmado' && (
                      <button
                        type="button"
                        onClick={() => setSelectedOrderForDispatch(ord)}
                        className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-2.5 py-1 rounded text-xs transition-colors"
                      >
                        <Truck className="w-3 h-3 text-amber-400" />
                        <span>Despachar</span>
                      </button>
                    )}

                    {ord.status === 'em_rota' && (
                      <div className="inline-flex gap-1">
                        <button
                          type="button"
                          onClick={() => markCodDelivered(ord.id, ord.country === 'MZ' ? 'mpesa' : 'multicaixa_express')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded text-xs transition-colors"
                        >
                          Marcar Entregue
                        </button>
                        <button
                          type="button"
                          onClick={() => markCodRejected(ord.id)}
                          className="text-red-600 hover:bg-red-50 border border-red-200 px-2 py-1 rounded text-xs transition-colors"
                        >
                          Recusar
                        </button>
                      </div>
                    )}

                    {ord.status === 'entregue' && ord.reconciliationStatus === 'pendente' && (
                      <button
                        type="button"
                        onClick={() => reconcileCodOrder(ord.id)}
                        className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded text-xs hover:bg-emerald-200 transition-colors"
                      >
                        <span>Conciliar & Liberar Saldo</span>
                      </button>
                    )}

                    {ord.reconciliationStatus === 'conciliado' && (
                      <span className="text-[11px] text-slate-400 font-semibold">Conciliado ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {selectedOrderForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedOrderForDispatch(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 z-10 text-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Despachar Pedido #{selectedOrderForDispatch.saleCode}
            </h3>
            <p className="text-slate-500">
              Selecione o estafeta com rota activa para a região de {selectedOrderForDispatch.city}:
            </p>

            <div className="space-y-2">
              {couriers
                .filter((c) => c.country === selectedOrderForDispatch.country)
                .map((courier) => (
                  <label
                    key={courier.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedCourierId === courier.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="courier"
                        checked={selectedCourierId === courier.id}
                        onChange={() => setSelectedCourierId(courier.id)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <div>{courier.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {courier.zones.join(', ')} · Veículo: {courier.vehicle}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs">{courier.rating} ★</span>
                      <span className="text-[10px] text-slate-400 block">{courier.deliveriesCompleted} entregas</span>
                    </div>
                  </label>
                ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOrderForDispatch(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatchCodOrder(selectedOrderForDispatch.id, selectedCourierId);
                  setSelectedOrderForDispatch(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                Confirmar Despacho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
