import React from 'react';
import { useKoonka } from '../../context/KoonkaContext';
import { useAuth } from '../../context/AuthContext';
import { Flame, Sun, Sparkles, Zap, Shield, Crown, Award, ArrowRight, Check } from 'lucide-react';

interface TierData {
  name: string;
  badge: string;
  colorName: string;
  bgGradient: string;
  borderClass: string;
  textClass: string;
  badgeBg: string;
  revenueRange: string;
  rate: string;
  payoutTime: string;
  benefits: string[];
  icon: React.ReactNode;
}

export const LevelsSection: React.FC = () => {
  const { activeCountry } = useKoonka();
  const { openAuth } = useAuth();

  const tiers: TierData[] = [
    {
      name: 'Ignis',
      badge: 'Brasa',
      colorName: 'Laranja Brasa',
      bgGradient: 'from-orange-950/40 to-slate-900',
      borderClass: 'border-orange-500/40 hover:border-orange-400',
      textClass: 'text-orange-400',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      revenueRange: '0 a $1.000 USD',
      rate: '7.9% + R$ 1,49',
      payoutTime: 'Saque em D+14',
      benefits: [
        'Acesso à comunidade Ignis',
        'Checkout otimizado para celular'
      ],
      icon: <Flame className="w-5 h-5 text-orange-400" />
    },
    {
      name: 'Lumen',
      badge: 'Amarelo',
      colorName: 'Luz Amarela',
      bgGradient: 'from-amber-950/40 to-slate-900',
      borderClass: 'border-amber-400/40 hover:border-amber-300',
      textClass: 'text-amber-400',
      badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      revenueRange: 'A partir de $1.000 USD',
      rate: '6.9% + R$ 1,49',
      payoutTime: 'Saque em D+10',
      benefits: [
        'Selo Lumen verificado',
        'Webhooks e integrações API'
      ],
      icon: <Sun className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'Solaris',
      badge: 'Laranja-Sol',
      colorName: 'Laranja Solar',
      bgGradient: 'from-orange-900/50 to-slate-900',
      borderClass: 'border-amber-500/50 hover:border-amber-400',
      textClass: 'text-amber-500',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      revenueRange: 'A partir de $5.000 USD',
      rate: '5.9% + R$ 1,29',
      payoutTime: 'Saque em D+7',
      benefits: [
        'Masterclasses mensais exclusivas',
        'Módulo de estafetas prioritário'
      ],
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      name: 'Virtum',
      badge: 'Violeta',
      colorName: 'Violeta Nobre',
      bgGradient: 'from-purple-950/50 to-slate-900',
      borderClass: 'border-purple-500/50 hover:border-purple-400',
      textClass: 'text-purple-400',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      revenueRange: 'A partir de $10.000 USD',
      rate: '4.9% + R$ 1,19',
      payoutTime: 'Saque em D+5',
      benefits: [
        'Canal VIP privado de networking',
        'Análise de funil individual'
      ],
      icon: <Shield className="w-5 h-5 text-purple-400" />
    },
    {
      name: 'Nexus',
      badge: 'Azul Eléctrico',
      colorName: 'Azul Quântico',
      bgGradient: 'from-cyan-950/50 to-slate-900',
      borderClass: 'border-cyan-400/50 hover:border-cyan-300',
      textClass: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      revenueRange: 'A partir de $25.000 USD',
      rate: '4.5% + R$ 0,99',
      payoutTime: 'Saque em D+3',
      benefits: [
        'Gerente de contas dedicado no WhatsApp',
        'Aprovação acelerada de retiradas'
      ],
      icon: <Zap className="w-5 h-5 text-cyan-400" />
    },
    {
      name: 'Aurum',
      badge: 'Dourado',
      colorName: 'Ouro Real',
      bgGradient: 'from-yellow-950/60 to-slate-900',
      borderClass: 'border-yellow-400/60 hover:border-yellow-300 shadow-yellow-500/10 shadow-lg',
      textClass: 'text-yellow-400',
      badgeBg: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40',
      revenueRange: 'A partir de $50.000 USD',
      rate: '4.2% + R$ 0,89',
      payoutTime: 'Saque em D+2',
      benefits: [
        'Placa física comemorativa Aurum',
        'Convite para Imersão Presencial'
      ],
      icon: <Crown className="w-5 h-5 text-yellow-400" />
    },
    {
      name: 'Apex',
      badge: 'Holográfico',
      colorName: 'Prata Holográfico',
      bgGradient: 'from-slate-800 via-indigo-950/50 to-slate-950',
      borderClass: 'border-slate-300/70 hover:border-white shadow-cyan-500/20 shadow-xl',
      textClass: 'text-slate-100',
      badgeBg: 'bg-slate-200/20 text-white border-slate-200/40',
      revenueRange: 'A partir de $100.000 USD',
      rate: '3.9% + R$ 0,79 (Menor Taxa)',
      payoutTime: 'Saque em D+1 (24h)',
      benefits: [
        'Troféu personalizado Apex',
        'Mastermind internacional restrito'
      ],
      icon: <Award className="w-5 h-5 text-slate-200" />
    }
  ];

  return (
    <section id="niveis" className="py-20 bg-slate-950 text-white relative select-none overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Gamificação & Comunidade de Vendas
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Quanto mais vende, mais sobe.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Aqui o seu esforço gera retorno imediato. Conforme escala o seu faturamento, você avança nos 7 níveis da Koonka e conquista taxas cada vez menores, retiradas mais rápidas e acesso direto aos maiores players de Moçambique, Angola e Brasil.
          </p>
        </div>

        {/* 7 Horizontal Scrollable Cards */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`snap-center shrink-0 w-[270px] sm:w-[290px] rounded-2xl p-5 border bg-gradient-to-b ${tier.bgGradient} ${tier.borderClass} flex flex-col justify-between space-y-5 transition-all hover:scale-[1.02] shadow-md`}
              >
                {/* Header of card */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center">
                      {tier.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tier.badgeBg}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-black ${tier.textClass} tracking-tight`}>
                      {tier.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-300 mt-0.5">
                      {tier.revenueRange}
                    </p>
                  </div>

                  {/* Conditions & Payout */}
                  <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium text-[11px]">Taxa por venda:</span>
                      <span className="font-bold text-white text-[11px]">{tier.rate}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium text-[11px]">Prazo de saque:</span>
                      <span className={`font-bold ${tier.textClass} text-[11px]`}>{tier.payoutTime}</span>
                    </div>
                  </div>

                  {/* 2 Key Benefits */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Vantagens do nível:
                    </span>
                    {tier.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtitle tag */}
                <div className="pt-3 border-t border-slate-800/80 text-[10px] text-center font-mono text-slate-400">
                  Nível {idx + 1} de 7 · {tier.colorName}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-slate-400 text-[11px] mt-2 sm:hidden">
            ← Deslize horizontalmente para ver todos os 7 níveis →
          </div>
        </div>

        {/* High-level summary statement */}
        <div className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-200">
            &ldquo;Níveis superiores têm taxas menores, saques mais rápidos, mentoria e eventos exclusivos.&rdquo;
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openAuth('signup')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-900/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Começar no Nível Ignis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
