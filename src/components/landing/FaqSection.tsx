import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Quanto custa usar a Koonka?',
      a: 'Zero mensalidade e zero custo fixo de adesão. A Koonka não cobra nada para você abrir a conta, cadastrar produtos ou usar a área de membros. Cobramos apenas uma pequena taxa sobre cada venda concluída e aprovada (a partir de 3.9% nos níveis mais altos como Apex, e 7.9% no nível inicial Ignis). Se você não vender, não paga absolutamente nada.'
    },
    {
      q: 'Como recebo o dinheiro das minhas vendas?',
      a: 'Os fundos caem diretamente na sua carteira virtual na moeda do país onde a venda foi gerada (Meticais para Moçambique, Kwanzas para Angola e Reais para o Brasil). Você pode solicitar saque para a sua carteira M-Pesa, e-Mola, contas bancárias locais (BCI, Millennium BIM, Standard Bank, BAI, BFA, BIC, etc.) ou Pix instantâneo no Brasil.'
    },
    {
      q: 'Posso vender produtos físicos além de infoprodutos?',
      a: 'Sim! A plataforma é híbrida: você pode vender cursos online, e-books, mentorias e também produtos físicos (roupas, cosméticos, eletrónicos, artesanato, etc.). Para produtos físicos, disponibilizamos o módulo completo de gestão de encomendas, rotas de entrega e sincronização de estafetas.'
    },
    {
      q: 'O que é o pagamento na entrega (Cash on Delivery / COD)?',
      a: 'É a forma de pagamento mais popular para produtos físicos em Moçambique e Angola: o comprador faz o pedido no seu site e só efetua o pagamento no momento em que o estafeta entrega a encomenda à porta dele. O estafeta recebe em dinheiro vivo, M-Pesa ou Multicaixa Express e confirma a entrega no aplicativo de estafeta, liberando os valores no seu painel.'
    },
    {
      q: 'Como funcionam os níveis da Koonka?',
      a: 'Todos os vendedores começam no nível Ignis. Conforme o seu faturamento acumulado cresce ao longo do tempo, a sua conta sobe automaticamente de nível: Ignis → Lumen → Solaris → Virtum → Nexus → Aurum → Apex. A cada novo patamar alcançado, a taxa por venda diminui (chegando a 3.9%), o tempo de espera do saque reduz (até D+1) e você desbloqueia acessos a mentorias exclusivas e eventos.'
    },
    {
      q: 'Preciso de empresa registada para começar?',
      a: 'Não. Você pode começar imediatamente como pessoa singular / pessoa física, utilizando apenas o seu Bilhete de Identidade (BI), NUIT (em Moçambique), NIF (em Angola) ou CPF (no Brasil) e um número de telemóvel ativo. Se já tiver uma empresa constituída, também poderá cadastrar com os dados fiscais da sua empresa.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-900 text-white relative select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400">
            <HelpCircle className="w-4 h-4" />
            <span>Tire as suas dúvidas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Tudo o que você precisa saber para começar a vender na Koonka hoje mesmo.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-900 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
