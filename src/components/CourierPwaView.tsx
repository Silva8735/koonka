import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import {
  Truck,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  XCircle,
  QrCode,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CourierPwaView: React.FC = () => {
  const { codOrders, markCodDelivered, markCodRejected, formatMoney, setUserRole } = useKoonka();

  const [activeTab, setActiveTab] = useState<'pendentes' | 'concluidos'>('pendentes');

  // Filter orders assigned to couriers
  const assignedOrders = codOrders.filter((o) => o.status === 'em_rota' || o.status === 'confirmado');
  const completedOrders = codOrders.filter((o) => o.status === 'entregue' || o.status === 'recusado');

  const currentList = activeTab === 'pendentes' ? assignedOrders : completedOrders;

  const handleDeliver = (orderId: string, method: 'mpesa' | 'multicaixa_express' | 'dinheiro') => {
    markCodDelivered(orderId, method);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    } catch {}
  };

  return (
    <div className="max-w-md mx-auto bg-slate-100 min-h-screen pb-12 text-slate-800 flex flex-col">
      {/* Mobile Top Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">Koonka Express</div>
            <div className="text-[10px] text-emerald-400 font-medium">Estafeta: Mateus Chissano (Maputo)</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setUserRole('vendedor')}
          className="text-[11px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-slate-300"
        >
          Sair do PWA
        </button>
      </header>

      {/* Segmented Tab */}
      <div className="p-3 bg-white border-b border-slate-200 flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('pendentes')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg text-center transition-all ${
            activeTab === 'pendentes'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          Para Entregar ({assignedOrders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('concluidos')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg text-center transition-all ${
            activeTab === 'concluidos'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          Histórico ({completedOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        {currentList.map((ord) => (
          <div key={ord.id} className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono font-bold text-xs text-slate-900 block">{ord.saleCode}</span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">{ord.customerName}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Cobrar no Acto:</span>
                <span className="font-mono font-extrabold text-base text-emerald-700">
                  {formatMoney(ord.amount, ord.currency)}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1 text-xs">
              <div className="flex items-start gap-1 text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{ord.city}: {ord.address}</span>
              </div>
            </div>

            {/* Quick Contact buttons */}
            <div className="flex gap-2 text-xs">
              <a
                href={`tel:${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Ligar</span>
              </a>

              <a
                href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Action Buttons for Active Orders */}
            {activeTab === 'pendentes' && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Registar Recebimento no Local:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleDeliver(ord.id, ord.country === 'MZ' ? 'mpesa' : 'multicaixa_express')}
                    className="py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1 shadow-xs"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Pago via {ord.country === 'MZ' ? 'M-Pesa' : 'Multicaixa'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeliver(ord.id, 'dinheiro')}
                    className="py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Pago em Dinheiro</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => markCodRejected(ord.id)}
                  className="w-full py-1.5 text-center text-red-600 hover:bg-red-50 text-[11px] font-semibold rounded"
                >
                  Cliente Ausente / Encomenda Recusada
                </button>
              </div>
            )}

            {activeTab === 'concluidos' && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Status final:</span>
                <span
                  className={`font-semibold ${
                    ord.status === 'entregue' ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {ord.status === 'entregue' ? 'Entregue com Sucesso' : 'Recusado'}
                </span>
              </div>
            )}
          </div>
        ))}

        {currentList.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            Nenhuma encomenda nesta lista.
          </div>
        )}
      </div>
    </div>
  );
};
