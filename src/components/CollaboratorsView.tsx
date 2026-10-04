import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { UserCheck, Plus, Shield, Mail, Check, Trash2 } from 'lucide-react';

export const CollaboratorsView: React.FC = () => {
  const { collaborators } = useKoonka();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'coprodutor' | 'suporte' | 'gestor_trafego'>('coprodutor');
  const [revenueShare, setRevenueShare] = useState('20');
  const [localCollaborators, setLocalCollaborators] = useState(collaborators);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLocalCollaborators((prev) => [
      ...prev,
      {
        id: `col-${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        role,
        revenueSharePercent: role === 'coprodutor' ? parseFloat(revenueShare) || 10 : undefined,
        status: 'convite_enviado'
      }
    ]);

    setName('');
    setEmail('');
    setIsInviteOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <span>Colaboradores & Coprodução</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Divisão de faturamento automático com coprodutores e permissões para seu time
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Convidar Colaborador</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Nome / E-mail</th>
                <th className="px-5 py-3.5">Função</th>
                <th className="px-5 py-3.5 text-center">Split de Faturamento</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {localCollaborators.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-900 block">{c.name}</span>
                    <span className="text-[11px] text-slate-400">{c.email}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="capitalize font-medium text-slate-700">
                      {c.role === 'coprodutor'
                        ? 'Coprodutor (Divisão de Receita)'
                        : c.role === 'gestor_trafego'
                        ? 'Gestor de Tráfego'
                        : c.role === 'suporte'
                        ? 'Suporte ao Cliente'
                        : 'Administrador'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center font-mono font-bold text-emerald-600">
                    {c.revenueSharePercent ? `${c.revenueSharePercent}% direto na conta` : '—'}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === 'ativo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {c.status === 'ativo' ? 'Ativo' : 'Convite Enviado'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {c.role !== 'administrador' && (
                      <button
                        type="button"
                        onClick={() =>
                          setLocalCollaborators((prev) => prev.filter((item) => item.id !== c.id))
                        }
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsInviteOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 z-10 text-xs space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Novo Colaborador Koonka</h3>
              <button onClick={() => setIsInviteOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg">
                &times;
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nome</label>
                <input
                  type="text"
                  placeholder="Nome do membro da equipe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="email@colaborador.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Função</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="coprodutor">Coprodutor (Divisão de Faturamento)</option>
                  <option value="suporte">Atendente de Suporte</option>
                  <option value="gestor_trafego">Gestor de Tráfego</option>
                </select>
              </div>

              {role === 'coprodutor' && (
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Porcentagem de Divisão (Split %)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={revenueShare}
                    onChange={(e) => setRevenueShare(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-emerald-600 font-bold"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    O valor é transferido de forma automática e transparente para o saldo do coprodutor em cada venda.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
