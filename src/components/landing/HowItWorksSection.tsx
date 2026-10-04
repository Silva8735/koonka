import React from 'react';
import { useKoonka } from '../../context/KoonkaContext';
import { UserPlus, Share2, Wallet, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HowItWorksSection: React.FC = () => {
  const { activeCountry } = useKoonka();
  const { openAuth } = useAuth();

  const steps = [
    {
      step: '01',
      title: 'Crie a sua conta grátis',
      description: 'Leva apenas 2 minutos. Escolha o seu país (Moçambique, Angola ou Brasil) e defina como deseja receber.',
      icon: <UserPlus className="w-6 h-6 text-emerald-400" />,
      detail: 'Sem cartão de crédito · Sem mensalidade'
    },
    {
      step: '02',
      title: 'Cadastre e partilhe o link',
      description: 'Cadastre o seu produto digital, físico ou serviço. Divulgue o link direto no WhatsApp, Instagram, TikTok ou anúncios.',
      icon: <Share2 className="w-6 h-6 text-teal-400" />,
      detail: 'Checkout ultra-rápido com botão WhatsApp'
    },
    {
      step: '03',
      title: 'Receba na sua moeda e saque',
      description: 'O cliente paga na hora e os fundos entram na sua carteira. Saque para M-Pesa, e-Mola, Multicaixa, banco ou Pix.',
      icon: <Wallet className="w-6 h-6 text-amber-400" />,
      detail: 'Prazos de saque de D+14 até D+1'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-slate-950 text-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Simples, Rápido e Sem Burocracia
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Como funciona a Koonka?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Eliminamos os entraves das plataformas estrangeiras para você focar no que realmente importa: vender e receber.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-700 font-mono">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                <span>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => openAuth('signup')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition-all"
          >
            <span>Começar Agora Gratuitamente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
