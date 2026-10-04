import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { CountryCode, LevelTierKey, UserRole } from '../types';
import {
  Sparkles,
  Smartphone,
  CreditCard,
  Truck,
  Award,
  Wifi,
  ChevronDown,
  Layers,
  ShoppingBag,
  Home,
  LayoutDashboard
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const DemoBar: React.FC = () => {
  const location = useLocation();
  const {
    activeCountry,
    setActiveCountry,
    activeCurrency,
    userRole,
    setUserRole,
    currentLevel,
    simulateQuickSale,
    simulateLevelUp,
    simulateCodLifecycle,
    lowBandwidthMode,
    setLowBandwidthMode,
    openCheckout
  } = useKoonka();

  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);

  const countries: { code: CountryCode; label: string; flag: string; currency: string }[] = [
    { code: 'MZ', label: 'Moçambique', flag: '🇲🇿', currency: 'MZN' },
    { code: 'AO', label: 'Angola', flag: '🇦🇴', currency: 'AOA' },
    { code: 'BR', label: 'Brasil', flag: '🇧🇷', currency: 'BRL' }
  ];

  const roles: { id: UserRole; label: string }[] = [
    { id: 'vendedor', label: 'Produtor / Vendedor' },
    { id: 'comprador', label: 'Área do Aluno' },
    { id: 'entregador', label: 'Estafeta COD (PWA)' },
    { id: 'admin', label: 'Administrador' }
  ];

  const levels: { key: LevelTierKey; label: string }[] = [
    { key: 'ignis', label: '1. Ignis ($0)' },
    { key: 'lumen', label: '2. Lumen ($1k)' },
    { key: 'solaris', label: '3. Solaris ($5k)' },
    { key: 'virtum', label: '4. Virtum ($10k)' },
    { key: 'nexus', label: '5. Nexus ($25k)' },
    { key: 'aurum', label: '6. Aurum ($50k)' },
    { key: 'apex', label: '7. Apex ($100k)' }
  ];

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800 px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2.5 z-40 select-none">
      {/* Left: Country & Role selector */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>PAINEL MODO DEMO</span>
        </div>

        {/* Country Selector */}
        <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800">
          {countries.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setActiveCountry(c.code)}
              className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                activeCountry === c.code
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{c.flag}</span>
              <span className="hidden sm:inline">{c.label}</span>
              <span className="font-mono text-[10px] opacity-80">({c.currency})</span>
            </button>
          ))}
        </div>

        {/* Role Selector */}
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value as UserRole)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-medium"
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Right: Quick Simulation Triggers */}
      <div className="flex flex-wrap items-center gap-1.5 ml-auto">
        {/* Quick sale button */}
        <button
          type="button"
          onClick={() => simulateQuickSale(activeCountry)}
          className="inline-flex items-center gap-1 bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold px-2.5 py-1 rounded-md transition-colors"
          title={`Simular venda com método local de ${activeCountry}`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>
            + Venda {activeCountry === 'MZ' ? 'M-Pesa 🇲🇿' : activeCountry === 'AO' ? 'Multicaixa 🇦🇴' : 'Pix 🇧🇷'}
          </span>
        </button>

        {/* COD delivery trigger */}
        <button
          type="button"
          onClick={() => simulateCodLifecycle()}
          className="inline-flex items-center gap-1 bg-amber-600/90 hover:bg-amber-600 text-white font-semibold px-2.5 py-1 rounded-md transition-colors"
          title="Simular ciclo de entrega e cobrança COD pelo estafeta"
        >
          <Truck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">+ Entrega COD</span>
        </button>

        {/* Level Up Simulator Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setLevelDropdownOpen(!levelDropdownOpen)}
            className="inline-flex items-center gap-1 bg-purple-600/90 hover:bg-purple-600 text-white font-semibold px-2.5 py-1 rounded-md transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Nível: {currentLevel.name}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {levelDropdownOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-800">
                Simular Subida de Nível
              </div>
              {levels.map((lvl) => (
                <button
                  key={lvl.key}
                  type="button"
                  onClick={() => {
                    simulateLevelUp(lvl.key);
                    setLevelDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-800 transition-colors ${
                    currentLevel.key === lvl.key ? 'text-emerald-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Toggle between Landing Page and Painel */}
        {location.pathname === '/painel' ? (
          <Link
            to="/"
            className="inline-flex items-center gap-1 bg-teal-600/90 hover:bg-teal-600 text-white font-semibold px-2.5 py-1 rounded-md transition-colors"
            title="Ir para a Página Inicial (Landing Page)"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Página Inicial</span>
          </Link>
        ) : (
          <Link
            to="/painel"
            className="inline-flex items-center gap-1 bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold px-2.5 py-1 rounded-md transition-colors"
            title="Ir para o Painel de Vendas"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Painel (/painel)</span>
          </Link>
        )}

        {/* Open Live Checkout */}
        <button
          type="button"
          onClick={() => openCheckout()}
          className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md transition-colors"
          title="Abrir o checkout simulado adaptado ao país activo"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">Ver Checkout</span>
        </button>

        {/* Low bandwidth mode toggle */}
        <button
          type="button"
          onClick={() => setLowBandwidthMode(!lowBandwidthMode)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
            lowBandwidthMode
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
          title="Modo Baixa Largura de Banda para redes 3G (Áudio e Texto)"
        >
          <Wifi className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">{lowBandwidthMode ? '3G Poupança ON' : '3G Normal'}</span>
        </button>
      </div>
    </div>
  );
};
