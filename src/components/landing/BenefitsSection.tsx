import React from 'react';
import {
  DollarSign,
  MessageSquare,
  Truck,
  Users,
  GraduationCap,
  Award,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BenefitsSection: React.FC = () => {
  const { openAuth } = useAuth();

  const benefits = [
    {
      title: 'Receba em Moeda Local',
      description: 'Chega de perder vendas porque seu cliente não tem cartão em USD. Receba em Meticais (MZN), Kwanzas (AOA) e Reais (BRL) direto na sua conta ou carteira.',
      icon: <DollarSign className="w-5 h-5 text-orange-400" />,
      color: 'from-orange-500/20 to-teal-500/10'
    },
    {
      title: 'Checkout por WhatsApp',
      description: 'O WhatsApp é o canal onde a lusofonia fecha negócios. O cliente clica no checkout e já abre o WhatsApp com pedido pré-formatado e confirmação instantânea.',
      icon: <MessageSquare className="w-5 h-5 text-green-400" />,
      color: 'from-green-500/20 to-orange-500/10'
    },
    {
      title: 'Pagamento na Entrega (COD)',
      description: 'Vende produtos físicos? Com o módulo COD da Koonka, você confirma o pedido antes do envio e seus estafetas recebem via M-Pesa, Multicaixa ou dinheiro no destino.',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/20 to-orange-500/10'
    },
    {
      title: 'Rede de Afiliados com Split',
      description: 'Multiplique as suas vendas. Deixe outros empreendedores promoverem os seus produtos por comissão automática, dividida no momento exacto da compra.',
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      title: 'Koonka Academy Prática',
      description: 'Formação feita para a nossa realidade: como validar ofertas, escalar no TikTok e Meta, e vender com tráfego leve mesmo em redes móveis 3G lentas.',
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/20 to-indigo-500/10'
    },
    {
      title: 'Comunidade por Níveis & Mentoria',
      description: 'Você não vende sozinho. Conforme o seu faturamento acumula, você sobe de nível (do Ignis ao Apex), reduz taxas para até 3,9% e desbloqueia mentoria com a elite.',
      icon: <Award className="w-5 h-5 text-yellow-400" />,
      color: 'from-yellow-500/20 to-amber-500/10'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Diferenciais Exclusivos
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Por que os melhores vendedores escolhem a Koonka?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Criamos as soluções que as plataformas tradicionais ignoraram: pagamentos por mobile money, COD com estafetas locais e uma comunidade unida por resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {b.icon}
                </div>
                <h3 className="text-base font-bold text-white">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
