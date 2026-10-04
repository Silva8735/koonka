import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Grid, Webhook, MessageSquare, Mail, Crosshair, FileText, Check, Settings, Send } from 'lucide-react';

export const AppsView: React.FC = () => {
  const { apps, toggleAppConnection } = useKoonka();
  const [webhookUrlInput, setWebhookUrlInput] = useState('https://api.meusite.com.br/koonka-webhook');
  const [webhookTested, setWebhookTested] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Webhook':
        return <Webhook className="w-6 h-6 text-emerald-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-green-600" />;
      case 'Mail':
        return <Mail className="w-6 h-6 text-blue-600" />;
      case 'Crosshair':
        return <Crosshair className="w-6 h-6 text-indigo-600" />;
      default:
        return <FileText className="w-6 h-6 text-slate-600" />;
    }
  };

  const testWebhook = () => {
    setWebhookTested(true);
    setTimeout(() => setWebhookTested(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Grid className="w-6 h-6 text-emerald-600" />
          <span>Apps & Integrações</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Conecte ferramentas de automação, rastreamento UTM, recuperação no WhatsApp e emissão fiscal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  {getIcon(app.iconName)}
                </div>
                <button
                  type="button"
                  onClick={() => toggleAppConnection(app.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                    app.connected
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {app.connected ? 'Conectado' : 'Conectar'}
                </button>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{app.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{app.description}</p>
              </div>

              {app.id === 'app-webhook' && app.connected && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <label className="block font-medium text-slate-700">URL do Webhook (POST)</label>
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={testWebhook}
                    className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] hover:underline"
                  >
                    <Send className="w-3 h-3" />
                    <span>{webhookTested ? 'Evento de teste enviado com 200 OK!' : 'Enviar Payload de Teste'}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-4">
              <span className="capitalize">{app.category}</span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Settings className="w-3.5 h-3.5" /> Configurar
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
