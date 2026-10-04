import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  TrendingUp,
  FileText,
  Filter,
  Users,
  PieChart,
  PlayCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const AcademyLandingSection: React.FC = () => {
  const { openAuth } = useAuth();

  const tracks = [
    {
      title: 'Tráfego Pago & Orgânico',
      subtitle: 'Meta Ads, TikTok e WhatsApp',
      desc: 'Como atrair clientes qualificados gastando pouco em Moçambique, Angola e Brasil.',
      lessons: '18 aulas práticas',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Copywriting de Alta Conversão',
      subtitle: 'Comunicação que fecha negócios',
      desc: 'Textos magnéticos e scripts de WhatsApp comprovados para derrubar qualquer objeção.',
      lessons: '14 aulas com modelos',
      icon: <FileText className="w-5 h-5 text-teal-400" />
    },
    {
      title: 'Funis de Vendas & Checkout',
      subtitle: 'Do clique ao pagamento',
      desc: 'Como configurar order bumps, 1-click checkout e campanhas de recuperação automática.',
      lessons: '12 aulas passo a passo',
      icon: <Filter className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Recrutamento de Afiliados',
      subtitle: 'Exército de vendas',
      desc: 'Estratégias para atrair os melhores promotores e gerir comissões com transparência.',
      lessons: '9 aulas estratégicas',
      icon: <Users className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Finanças & Saques Locais',
      subtitle: 'Gestão de fluxo de caixa',
      desc: 'Domine a conversão de câmbio, prazos de recebimento e saques para M-Pesa, ATM e Pix.',
      lessons: '8 aulas essenciais',
      icon: <PieChart className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section id="academy" className="py-20 bg-slate-900 text-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-purple-400">
              <GraduationCap className="w-4 h-4" />
              <span>Koonka Academy Gratuita</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Aprenda a vender com quem já vende.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Não vendemos teoria vazia. A Koonka Academy é uma plataforma de formação prática incluída em todas as contas, com conteúdos gravados pelos maiores produtores e afiliados de Maputo, Luanda e São Paulo.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Formatos leves otimizados para dados móveis 3G</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modelos prontos de cópias para WhatsApp e scripts de fechamento</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atualizações constantes com novas estratégias de mercado</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Criar conta e começar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Track Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tracks.map((track, idx) => (
              <div
                key={idx}
                className={`bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3 ${
                  idx === 0 ? 'sm:col-span-2 bg-gradient-to-r from-slate-950 to-purple-950/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {track.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {track.lessons}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{track.title}</h3>
                  <div className="text-[11px] font-semibold text-purple-400 mt-0.5">{track.subtitle}</div>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{track.desc}</p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                  <PlayCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Acesso imediato no painel</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
