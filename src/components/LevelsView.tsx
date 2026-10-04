import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { LevelTierKey, CountryCode } from '../types';
import {
  Award,
  Lock,
  Unlock,
  CheckCircle2,
  Users,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Calendar,
  Search
} from 'lucide-react';

export const LevelsView: React.FC = () => {
  const {
    levels,
    currentLevel,
    totalAccumulatedUsd,
    progressToNextLevelPercent,
    nextLevel,
    communityPosts,
    addCommunityPost,
    formatMoney
  } = useKoonka();

  const [selectedTierTab, setSelectedTierTab] = useState<LevelTierKey>(currentLevel.key);
  const [postInput, setPostInput] = useState('');
  const [postTag, setPostTag] = useState('Dica de Vendas');
  const [memberFilterCountry, setMemberFilterCountry] = useState<string>('all');

  const selectedLevelConfig = levels.find((l) => l.key === selectedTierTab) || currentLevel;
  const isSelectedTierUnlocked = totalAccumulatedUsd >= selectedLevelConfig.thresholdUsd;

  const filteredPosts = communityPosts.filter((p) => p.tierRoom === selectedTierTab);

  const sampleDirectory = [
    {
      name: 'Manuel Mabunda',
      country: 'MZ' as CountryCode,
      level: 'solaris' as LevelTierKey,
      niche: 'Produtos Físicos & Eletrónica',
      salesVolume: '$8.450',
      service: 'Gestão de COD em Maputo'
    },
    {
      name: 'Nádia dos Santos',
      country: 'AO' as CountryCode,
      level: 'lumen' as LevelTierKey,
      niche: 'Moda Feminina & Calçado',
      salesVolume: '$3.890',
      service: 'Tráfego Pago em Luanda'
    },
    {
      name: 'Admin Silva',
      country: 'MZ' as CountryCode,
      level: currentLevel.key,
      niche: 'Infoprodutos & Educação',
      salesVolume: `$${Math.round(totalAccumulatedUsd)}`,
      service: 'Coprodução & Funis de Conversão'
    },
    {
      name: 'Vinícius Ferreira',
      country: 'BR' as CountryCode,
      level: 'virtum' as LevelTierKey,
      niche: 'SaaS & Assinaturas',
      salesVolume: '$18.200',
      service: 'Afiliado Profissional'
    }
  ];

  const filteredMembers = sampleDirectory.filter((m) => {
    if (memberFilterCountry === 'all') return true;
    return m.country === memberFilterCountry;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postInput.trim()) return;
    addCommunityPost(postInput, postTag, selectedTierTab);
    setPostInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner with Current Level Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentLevel.badgeBg} text-white shadow-xs`}>
                Nível Oficial: {currentLevel.name}
              </span>
              <span className="text-xs text-slate-400">· {currentLevel.identity}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Área de Membros & Níveis Koonka
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O ecossistema exclusivo onde quanto mais você fatura em Moçambique, Angola e Brasil, menores são as suas taxas e mais rápido é o seu prazo de saque.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-400" />
                <span>Sua Taxa Atual: <strong>{currentLevel.baseFeePercent}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Prazo de Saque: <strong>D+{currentLevel.withdrawalDays}</strong></span>
              </div>
            </div>
          </div>

          {/* Progress to Next Level Box */}
          <div className="bg-slate-950/80 backdrop-blur-md rounded-xl p-5 border border-slate-800 min-w-[280px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Faturamento Acumulado</span>
              <span className="font-mono text-emerald-400 font-bold">
                ${Math.round(totalAccumulatedUsd).toLocaleString('en-US')} USD
              </span>
            </div>

            {nextLevel ? (
              <>
                <div className="text-xs text-slate-300 mb-2">
                  Próximo nível: <strong className="text-white">{nextLevel.name}</strong> (${nextLevel.thresholdUsd.toLocaleString()} USD)
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressToNextLevelPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
                  <span>{progressToNextLevelPercent}% concluído</span>
                  <span>Faltam ${Math.max(0, Math.round(nextLevel.thresholdUsd - totalAccumulatedUsd))} USD</span>
                </div>
              </>
            ) : (
              <div className="text-emerald-400 font-bold text-xs mt-2 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>Você atingiu o topo máximo: Nível Apex!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 7 Tiers Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
        {levels.map((lvl) => {
          const isUnlocked = totalAccumulatedUsd >= lvl.thresholdUsd;
          const isSelected = selectedTierTab === lvl.key;
          return (
            <button
              key={lvl.key}
              type="button"
              onClick={() => setSelectedTierTab(lvl.key)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : isUnlocked
                  ? 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  : 'bg-slate-100 text-slate-400 border-dashed border-slate-300'
              }`}
            >
              <span>{isUnlocked ? <Unlock className="w-3.5 h-3.5 text-emerald-500" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}</span>
              <span>{lvl.number}. {lvl.name}</span>
              <span className="text-[10px] opacity-75 font-mono font-normal">
                {lvl.thresholdUsd === 0 ? 'Start' : `$${lvl.thresholdUsd / 1000}k`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Details & Private Room */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tier Benefits & Rules (Left Column) */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${selectedLevelConfig.badgeBg}`}>
                Nível {selectedLevelConfig.number}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedLevelConfig.name}</h2>
              <p className="text-xs text-slate-500">{selectedLevelConfig.identity}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Faturamento Mínimo</span>
              <span className="font-mono font-bold text-base text-slate-900">
                ${selectedLevelConfig.thresholdUsd.toLocaleString()} USD
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-semibold text-emerald-800 uppercase block">Taxa por Venda</span>
              <span className="text-lg font-extrabold text-emerald-900 font-mono">
                {selectedLevelConfig.baseFeePercent}%
              </span>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
              <span className="text-[10px] font-semibold text-indigo-800 uppercase block">Prazo de Saque</span>
              <span className="text-lg font-extrabold text-indigo-900 font-mono">
                D+{selectedLevelConfig.withdrawalDays}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Benefícios e Vantagens Exclusivas:
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {selectedLevelConfig.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {!isSelectedTierUnlocked && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Esta sala e os benefícios correspondentes serão desbloqueados assim que atingir ${selectedLevelConfig.thresholdUsd.toLocaleString()} USD em vendas.
              </span>
            </div>
          )}
        </div>

        {/* Private Room Feed & Networking (Right Column) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Post box if unlocked */}
          {isSelectedTierUnlocked ? (
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Sala Privada de Discussão: {selectedLevelConfig.name}</span>
                </h3>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Membros Verificados
                </span>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-2">
                <textarea
                  rows={2}
                  value={postInput}
                  onChange={(e) => setPostInput(e.target.value)}
                  placeholder={`Compartilhe resultados, parcerias ou dúvidas na sala ${selectedLevelConfig.name}...`}
                  className="w-full p-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 resize-none"
                />
                <div className="flex items-center justify-between">
                  <select
                    value={postTag}
                    onChange={(e) => setPostTag(e.target.value)}
                    className="text-xs px-2 py-1 rounded border border-slate-200 bg-slate-50"
                  >
                    <option value="Dica de Vendas">Dica de Vendas</option>
                    <option value="Busco Afiliados">Busco Afiliados</option>
                    <option value="Logística & COD">Logística & COD</option>
                    <option value="Coprodução">Parceria / Coprodução</option>
                  </select>

                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                  >
                    Publicar na Sala
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center space-y-2">
              <Lock className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-slate-800">Sala Privada Bloqueada</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Apenas vendedores que atingiram o nível {selectedLevelConfig.name} têm permissão para interagir e ver as discussões desta sala.
              </p>
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                      {post.authorName[0]}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">{post.authorName}</span>
                      <span className="text-[11px] text-slate-400 ml-1.5">({post.authorCountry === 'MZ' ? 'Moçambique 🇲🇿' : post.authorCountry === 'AO' ? 'Angola 🇦🇴' : 'Brasil 🇧🇷'})</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{post.createdAt}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{post.content}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    #{post.tag}
                  </span>
                  <div className="flex items-center gap-3">
                    <button type="button" className="hover:text-emerald-600">
                      👍 {post.likesCount} Curtidas
                    </button>
                    <span>💬 {post.commentsCount} Respostas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Member Matchmaking & Directory */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Directório de Membros & Matchmaking</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Encontre coprodutores, afiliados e gestores em Moçambique, Angola e Brasil
                </p>
              </div>

              <select
                value={memberFilterCountry}
                onChange={(e) => setMemberFilterCountry(e.target.value)}
                className="text-xs px-2.5 py-1 rounded border border-slate-200 bg-white"
              >
                <option value="all">Todos os Países</option>
                <option value="MZ">Moçambique 🇲🇿</option>
                <option value="AO">Angola 🇦🇴</option>
                <option value="BR">Brasil 🇧🇷</option>
              </select>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredMembers.map((m, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">
                      {m.country === 'MZ' ? '🇲🇿 MZ' : m.country === 'AO' ? '🇦🇴 AO' : '🇧🇷 BR'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">{m.niche}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-600 font-semibold block">{m.service}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Iniciando contacto de parceria com ${m.name}`)}
                      className="text-[10px] text-slate-400 hover:text-emerald-700 underline font-medium"
                    >
                      Propor Parceria
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
