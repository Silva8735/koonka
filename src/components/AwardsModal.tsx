import React from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Award, CheckCircle2, Shield, ExternalLink, X } from 'lucide-react';

export const AwardsModal: React.FC = () => {
  const { isAwardsModalOpen, setIsAwardsModalOpen, awardTiers, totalNetRevenue } = useKoonka();

  if (!isAwardsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAwardsModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Premiações da Koonka</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Reconhecimento oficial para produtores e afiliados que batem metas históricas de faturamento
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAwardsModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs text-slate-600 leading-relaxed">
            Na Koonka você recebe prêmios físicos (placas de metal escovado, troféus e medalhas exclusivas) ao atingir marcos de faturamento líquido. Você pode receber premiações tanto como produtor, quanto como co-produtor e afiliado.{' '}
            <a
              href="https://ajuda.kiwify.com.br"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Leia mais sobre as regras de premiação</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>

          {/* Current progress indicator */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Seu Faturamento Líquido Atual
              </span>
              <div className="text-xl font-extrabold text-emerald-950 font-mono tabular-nums">
                R$ {totalNetRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              Metas conquistadas automaticamente pelo seu volume de vendas.
            </div>
          </div>

          {/* Awards Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Data</th>
                  <th className="px-6 py-3.5">Premiação</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Rastreio dos Correios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {awardTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-mono">
                      {tier.unlockedDate || '---'}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                            tier.iconType === 'bronze'
                              ? 'bg-amber-100 text-amber-800'
                              : tier.iconType === 'silver'
                              ? 'bg-slate-200 text-slate-700'
                              : tier.iconType === 'gold'
                              ? 'bg-yellow-100 text-yellow-800'
                              : tier.iconType === 'gemstone'
                              ? 'bg-emerald-100 text-emerald-800'
                              : tier.iconType === 'ruby'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{tier.label}</span>
                          <span className="text-[11px] text-slate-400">{tier.name}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {tier.unlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Conquistado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500">
                          Não conquistado
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono">
                      {tier.trackingCode ? (
                        <span className="text-emerald-700 font-semibold underline cursor-pointer">
                          {tier.trackingCode}
                        </span>
                      ) : (
                        '---'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={() => setIsAwardsModalOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
