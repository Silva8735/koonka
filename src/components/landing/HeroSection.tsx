import React from 'react';
import { useKoonka } from '../../context/KoonkaContext';
import { useAuth } from '../../context/AuthContext';
import { TRANSLATIONS } from '../../i18n/translations';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { activeCountry } = useKoonka();
  const { openAuth } = useAuth();
  const t = TRANSLATIONS[activeCountry];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-950 via-[#0a1120] to-slate-950 text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-orange-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-orange-400 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>A 1ª Plataforma Tri-Nacional {t.flag}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">Moçambique, Angola e Brasil</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Venda mais.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-amber-300">
                Receba em moeda local.
              </span>{' '}
              Cresça em comunidade.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A plataforma de vendas de produtos digitais, físicos e serviços feita sob medida para o mercado lusófono. Receba por <strong>M-Pesa</strong>, <strong>e-Mola</strong>, <strong>Multicaixa Express</strong>, <strong>Pix</strong> e <strong>pagamento na entrega (COD)</strong> com as menores taxas do mercado.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-orange-900/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Criar conta grátis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openAuth('login')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700/80 transition-all cursor-pointer"
              >
                <span>Já tenho conta</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Sem mensalidade
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-400" />
                Comece em 2 minutos
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Saques automáticos em D+1
              </span>
            </div>
          </div>

          {/* Right Column: Animated Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Ambient orange-solar glow behind device */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 rounded-full blur-2xl transform scale-90" />

            {/* Phone Frame */}
            <div className="relative w-[300px] sm:w-[320px] rounded-[36px] bg-slate-950 p-3.5 shadow-2xl border-4 border-slate-700/80 shadow-orange-950/50">
              {/* Dynamic Island / Speaker Notch */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3" />

              {/* Screen Content */}
              <div className="bg-slate-900 rounded-[28px] p-4 text-xs space-y-4 border border-slate-800 overflow-hidden">
                {/* Simulated Floating Notification with bounce animation */}
                <div className="bg-gradient-to-r from-orange-900/90 to-slate-900 p-3 rounded-2xl border border-orange-500/40 shadow-lg space-y-1 transform animate-bounce duration-1000">
                  <div className="flex items-center justify-between text-[10px] text-orange-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-orange-400 fill-orange-400" /> Notificação de Venda
                    </span>
                    <span>Agora</span>
                  </div>
                  <div className="font-bold text-white text-xs">
                    {t.heroNotification}
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Comprador: Salimo M. · Saldo já disponível!
                  </div>
                </div>

                {/* Level Progress Widget on Screen */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Nível de Produtor
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                      Solaris
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white font-mono">
                    $8.450 / $10.000 USD
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full w-[84%]" />
                  </div>

                  <div className="text-[10px] text-slate-400 flex justify-between font-mono">
                    <span>Taxa reduzida: 5.9%</span>
                    <span>Saque em D+7</span>
                  </div>
                </div>

                {/* Simulated Quick Checkout Card */}
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-200">Checkout 1-Clique Activo</span>
                    <span className="text-orange-400 font-bold">100% Online</span>
                  </div>

                  <div className="w-full bg-orange-600/90 text-white font-bold py-2 rounded-xl text-center text-xs shadow-xs">
                    Pagar com {activeCountry === 'MZ' ? 'M-Pesa 🇲🇿' : activeCountry === 'AO' ? 'Multicaixa 🇦🇴' : 'Pix 🇧🇷'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
