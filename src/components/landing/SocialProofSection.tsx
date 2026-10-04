import React from 'react';
import { Star, Quote, CheckCircle2, TrendingUp, Globe, Award, Sparkles } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  // DADOS DE DEMONSTRAÇÃO - Depoimentos fictícios para validação de produto
  const testimonials = [
    {
      name: 'Amélia Sitoe',
      role: 'Produtora de Cursos Digitais',
      location: 'Maputo, Moçambique 🇲🇿',
      level: 'Solaris',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      comment:
        'Antes da Koonka eu perdia mais de 60% dos meus clientes porque plataformas brasileiras exigiam cartão internacional em USD. Com o checkout direto em M-Pesa e e-Mola, as minhas alunas pagam em 2 toques. Minha receita triplicou em 4 meses!',
      metric: '+184% de conversão via M-Pesa'
    },
    {
      name: 'Domingos Manuel',
      role: 'Comércio de Eletrónicos & COD',
      location: 'Luanda, Angola 🇦🇴',
      level: 'Virtum',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      comment:
        'Vender produtos físicos em Luanda era um pesadelo logístico com comprovativos falsos. O módulo de Pagamento na Entrega da Koonka com estafetas cadastrados e Multicaixa Express acabou com o prejuízo de entregas canceladas.',
      metric: '92% de entregas concluídas com sucesso'
    },
    {
      name: 'Camila Rocha',
      role: 'Infoprodutora & Mentora',
      location: 'São Paulo, Brasil 🇧🇷',
      level: 'Nexus',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      comment:
        'Eu já vendia bem no Brasil com Pix, mas expandir para Angola e Moçambique sempre foi uma barreira cambial imensa. A Koonka unificou tudo num único painel: recebo em moeda local, sem dor de cabeça de câmbio ou taxas abusivas.',
      metric: '+R$ 140k faturados no mercado africano'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-16 border-b border-slate-800">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">+3</span>
            <p className="text-xs text-slate-300 font-medium">Países Conectados (MZ, AO, BR)</p>
          </div>
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">7 Níveis</span>
            <p className="text-xs text-slate-300 font-medium">Progressão & Menores Taxas</p>
          </div>
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">0</span>
            <p className="text-xs text-slate-300 font-medium">Mensalidade ou Custo Fixo</p>
          </div>
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">&lt; 3 s</span>
            <p className="text-xs text-slate-300 font-medium">Tempo de Carregamento em 3G</p>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mt-14 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Prova Social & Casos de Sucesso
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Quem vende na Koonka, escala.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Conheça quem transformou o seu negócio digital e físico com ferramentas pensadas para o nosso mercado.
          </p>
        </div>

        {/* 3 Demonstration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5 relative group"
            >
              <div className="space-y-4">
                {/* Header with avatar and badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{t.name}</h3>
                      <p className="text-[11px] text-slate-400">{t.role}</p>
                      <p className="text-[10px] text-orange-400 font-medium">{t.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {t.level}
                  </span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Bottom metric badge */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-bold text-orange-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.metric}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <span className="text-[11px] text-slate-500 font-mono">
            * Depoimentos ilustrativos baseados em cenários reais de vendedores da comunidade Koonka.
          </span>
        </div>
      </div>
    </section>
  );
};
