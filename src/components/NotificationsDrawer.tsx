import React from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Bell, Check, X, QrCode, CreditCard, Award, ArrowDownToLine, Info } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markAllNotificationsRead } = useKoonka();

  if (!isNotificationsOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'venda':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'premiacao':
        return <Award className="w-4 h-4 text-yellow-600" />;
      case 'saque':
        return <ArrowDownToLine className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsNotificationsOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative bg-white w-full max-w-sm h-full shadow-2xl border-l border-slate-200 z-10 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-sm text-slate-900">Notificações</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Marcar lidas
            </button>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex gap-3 text-xs transition-colors ${
                !item.read ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 self-start shadow-xs">
                {getIcon(item.type)}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">
                    {item.date}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <div className="font-semibold text-xs text-slate-600">Nenhuma notificação</div>
              <p className="text-[11px]">Você não tem tarefas ou avisos pendentes no momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
