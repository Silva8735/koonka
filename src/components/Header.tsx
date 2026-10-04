import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { CountryCode } from '../types';
import {
  Menu,
  Bell,
  Award,
  ChevronDown,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  User,
  Truck,
  BookOpen,
  Sliders,
  DollarSign
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    activeCountry,
    setActiveCountry,
    activeCurrency,
    currentLevel,
    nextLevel,
    progressToNextLevelPercent,
    totalAccumulatedUsd,
    openCheckout,
    setCurrentTab,
    setUserRole,
    userRole
  } = useKoonka();

  const [profileOpen, setProfileOpen] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  const countries: { code: CountryCode; label: string; flag: string; currency: string }[] = [
    { code: 'MZ', label: 'Moçambique', flag: '🇲🇿', currency: 'MZN' },
    { code: 'AO', label: 'Angola', flag: '🇦🇴', currency: 'AOA' },
    { code: 'BR', label: 'Brasil', flag: '🇧🇷', currency: 'BRL' }
  ];

  const currentCountryObj = countries.find((c) => c.code === activeCountry) || countries[0];

  return (
    <header className="h-16 bg-[#059669] text-white flex items-center justify-between px-4 sm:px-6 shadow-md relative z-20 select-none">
      {/* Left: Mobile menu & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-md hover:bg-emerald-700/80 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Small brand mark for mobile */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center font-bold text-white text-sm">
            K
          </div>
          <span className="font-bold tracking-tight text-white">Koonka</span>
        </div>

        {/* Country Quick Selector */}
        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setCountryMenuOpen(!countryMenuOpen)}
            className="flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-700/80 transition-all shadow-xs"
          >
            <span>{currentCountryObj.flag}</span>
            <span>{currentCountryObj.label}</span>
            <span className="text-[10px] text-emerald-200 font-mono">({activeCurrency})</span>
            <ChevronDown className="w-3 h-3 text-emerald-300" />
          </button>

          {countryMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-xs text-slate-800 animate-in fade-in">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                Mercado em Foco
              </div>
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setActiveCountry(c.code);
                    setCountryMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    activeCountry === c.code ? 'font-bold text-emerald-700 bg-emerald-50/60' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{c.currency}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Gamification Level Badge, Test Checkout & Profile */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* Test Checkout CTA */}
        <button
          type="button"
          onClick={() => openCheckout()}
          className="hidden md:inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/25 transition-all shadow-xs"
          title="Abrir o checkout simulado multi-país"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-100" />
          <span>Checkout {currentCountryObj.flag}</span>
        </button>

        {/* Level 7-Tier Badge (Click opens Níveis tab) */}
        <button
          type="button"
          onClick={() => setCurrentTab('niveis')}
          className="flex flex-col justify-center items-end py-1 px-2.5 rounded-lg hover:bg-emerald-700/80 transition-colors cursor-pointer text-right group"
          title="Ver o sistema de 7 níveis da Koonka"
        >
          <div className="text-[11px] font-bold text-white tabular-nums tracking-wide flex items-center gap-1.5">
            <span className="text-emerald-100 text-[10px] font-normal hidden sm:inline">Nível:</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-extrabold ${currentLevel.badgeBg} text-white shadow-xs`}>
              {currentLevel.name}
            </span>
            <span className="font-mono text-emerald-100">(${Math.round(totalAccumulatedUsd / 1000)}k)</span>
          </div>

          <div className="flex items-center gap-1.5 w-24 sm:w-32 mt-1">
            <Award className="w-3.5 h-3.5 text-yellow-300 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="w-full bg-emerald-900/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-yellow-300 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(5, progressToNextLevelPercent)}%` }}
              />
            </div>
          </div>
        </button>

        {/* Profile Avatar & Role Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-white/40 transition-all focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-900 text-white font-bold flex items-center justify-center border-2 border-white/60 text-xs shadow-sm overflow-hidden">
              AS
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-slate-700 animate-in fade-in duration-150">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="font-semibold text-sm text-slate-900">Admin Silva</div>
                <div className="text-xs text-slate-500 truncate">admin.silva@koonka.com</div>
              </div>

              <div className="py-1 text-xs">
                <div className="px-4 py-1 text-[10px] uppercase font-bold text-slate-400">
                  Alternar Módulo
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('vendedor');
                    setCurrentTab('dashboard');
                    setProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors ${
                    userRole === 'vendedor' ? 'font-bold text-emerald-700 bg-emerald-50/50' : ''
                  }`}
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Painel do Produtor / Vendedor</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('comprador');
                    setCurrentTab('academy');
                    setProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors ${
                    userRole === 'comprador' ? 'font-bold text-indigo-700 bg-indigo-50/50' : ''
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Área do Aluno (Koonka Club)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('entregador');
                    setCurrentTab('entregador_pwa');
                    setProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors ${
                    userRole === 'entregador' ? 'font-bold text-amber-700 bg-amber-50/50' : ''
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Estafeta COD (App Mobile PWA)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('admin');
                    setCurrentTab('admin');
                    setProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors ${
                    userRole === 'admin' ? 'font-bold text-purple-700 bg-purple-50/50' : ''
                  }`}
                >
                  <Sliders className="w-4 h-4 text-purple-600" />
                  <span>Painel Administrativo Koonka</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('carteira');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span>Carteira & Saques</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
