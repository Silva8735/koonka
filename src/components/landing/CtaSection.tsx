import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useKoonka } from '../../context/KoonkaContext';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { openAuth } = useAuth();
  const { activeCountry } = useKoonka();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative select-none overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-emerald-600/20 via-teal-500/15 to-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-400 shadow-inner">
          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          <span>Comece hoje sem mensalidade</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Pronto para vender mais e receber na sua moeda?
        </h2>

        <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Junte-se aos milhares de empreendedores em Moçambique, Angola e Brasil que já usam a Koonka para transformar cliques em vendas reais.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openAuth('signup')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-xl shadow-emerald-900/40 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <span>Criar conta grátis agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => openAuth('login')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm px-6 py-4 rounded-xl border border-slate-700/80 transition-all cursor-pointer"
          >
            <span>Já tenho uma conta</span>
          </button>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Configuração em 2 minutos
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Suporte dedicado em português
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Pagamentos 100% seguros
          </span>
        </div>
      </div>
    </section>
  );
};
