import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, MessageSquare, Play, ExternalLink, ShieldCheck, Mail } from 'lucide-react';

export const HelpView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'support'; text: string }[]>([
    { sender: 'support', text: 'Olá! Sou o atendente de suporte da Koonka. Como posso te ajudar hoje?' }
  ]);

  const faqs = [
    {
      q: 'Quais são as taxas da Koonka por venda realizada?',
      a: 'A Koonka possui uma das taxas mais competitivas do mercado: 4.9% + R$ 1,00 para pagamentos via PIX e 7.9% + R$ 1,00 para Cartão de Crédito (com antecipação automática e parcelamento em até 12x). Boletos gerados não têm custo; você só paga quando o cliente compensar o pagamento.'
    },
    {
      q: 'Em quanto tempo o saldo de vendas fica disponível para saque?',
      a: 'Vendas via PIX ficam disponíveis em até 2 dias úteis (D+2). Vendas no cartão de crédito em até 30 dias (D+30) com liberação automática direto na sua conta bancária sem necessidade de taxas extras de antecipação.'
    },
    {
      q: 'Como funciona o Checkout 1-Click da rede Koonka?',
      a: 'Quando um comprador adquire qualquer produto na rede de produtores da Koonka, os dados do cartão de crédito ficam salvos com segurança de nível bancário PCI-DSS. Quando ele visita o checkout do seu produto, ele pode comprar com apenas 1 clique sem precisar digitar novamente o número do cartão, aumentando a conversão em mais de 35%!'
    },
    {
      q: 'Como configurar a Área de Membros para meus alunos?',
      a: 'Basta acessar a aba "Área de Membros", criar os módulos e adicionar as aulas com links de vídeo ou upload de arquivos. Seus compradores recebem instantaneamente no e-mail o link de acesso e senha gerada com segurança.'
    },
    {
      q: 'Como funciona a divisão automática de receitas (Coprodução)?',
      a: 'Na aba "Colaboradores", convide seu coprodutor e informe a porcentagem de divisão acordada (ex: 30%). A cada venda aprovada, o sistema divide os valores líquidos automaticamente e deposita na conta de cada um.'
    }
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'support',
          text: `Recebi sua dúvida sobre "${userText.slice(0, 35)}...". Nossa equipe de plantão 24/7 já está analisando sua solicitação.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <span>Central de Ajuda & Tutoriais Koonka</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tire dúvidas, aprenda as melhores práticas de escala e fale com nosso suporte
        </p>
      </div>

      {/* Support Chat / Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-emerald-950">Suporte ao Vivo 24/7</h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Fale agora com um especialista em funis e pagamentos da Koonka no chat em tempo real.
            </p>
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Abrir Chat de Atendimento</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900">E-mail Oficial</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Para assuntos corporativos, parcerias de alto volume ou suporte de segurança:
            </p>
            <span className="text-xs font-mono font-semibold text-slate-800 block">
              suporte@koonka.com
            </span>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
        <h2 className="font-bold text-base text-slate-900">Perguntas Frequentes (FAQ)</h2>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left font-semibold text-xs text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-1 border-l-2 border-emerald-500">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Support Chat Drawer/Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setChatOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full h-[500px] flex flex-col z-10 animate-in fade-in zoom-in-95 text-xs overflow-hidden">
            <div className="p-4 bg-[#059669] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  K
                </div>
                <div>
                  <div className="font-bold text-sm">Suporte Koonka</div>
                  <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" /> Online agora
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="text-white hover:text-emerald-100 text-lg"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatHistory.map((item, i) => (
                <div
                  key={i}
                  className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                      item.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Digite sua dúvida aqui..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 text-xs"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-xs"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
