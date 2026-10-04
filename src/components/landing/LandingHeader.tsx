import React, { useState } from 'react';
import { useKoonka } from '../../context/KoonkaContext';
import { useAuth } from '../../context/AuthContext';
import { CountryCode } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import {
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingHeader: React.FC = () => {
  const { activeCountry, setActiveCountry } = useKoonka();
  const { openAuth, isAuthenticated, themeMode, toggleThemeMode } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const t = TRANSLATIONS[activeCountry];

  const countries: { code: CountryCode; label: string; flag: string; cur: string }[] = [
    { code: 'MZ', label: 'Moçambique', flag: '🇲🇿', cur: 'MZN' },
    { code: 'AO', label: 'Angola', flag: '🇦🇴', cur: 'AOA' },
    { code: 'BR', label: 'Brasil', flag: '🇧🇷', cur: 'BRL' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800 text-white select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            {/* Styled K with flame/arrow */}
            <span className="font-black text-xl text-white tracking-tighter">K</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              <span>koonka</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-[10px] text-slate-400 -mt-1 font-medium hidden sm:inline">
              MZ · AO · BR
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">
            Como funciona
          </a>
          <a href="#niveis" className="hover:text-emerald-400 transition-colors">
            Níveis & Benefícios
          </a>
          <a href="#pagamentos" className="hover:text-emerald-400 transition-colors">
            Pagamentos Locais
          </a>
          <a href="#academy" className="hover:text-emerald-400 transition-colors">
            Academy
          </a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">
            Perguntas frequentes
          </a>
        </nav>

        {/* Right Zone: Country Selector + Theme + Auth Actions */}
        <div className="flex items-center gap-3">
          {/* Country Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
              title="Selecione o seu país de operação"
            >
              <span>{t.flag}</span>
              <span className="hidden sm:inline">{t.countryName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {countryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-xl shadow-2xl border border-slate-700/80 py-1.5 z-50 text-xs animate-in fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-800">
                  Mercado & Idioma
                </div>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setActiveCountry(c.code);
                      setCountryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      activeCountry === c.code ? 'font-bold text-emerald-400 bg-emerald-950/40' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.label}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{c.cur}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={toggleThemeMode}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors hidden sm:inline-flex"
            title="Alternar tema"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Login & Signup Buttons */}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => navigate('/painel')}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.02]"
            >
              <span>Aceder ao Painel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              >
                Entrar
              </button>

              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <span>Criar conta grátis</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3 animate-in fade-in">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300 pb-3 border-b border-slate-800">
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-400"
            >
              Como funciona
            </a>
            <a
              href="#niveis"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-400"
            >
              Níveis & Benefícios
            </a>
            <a
              href="#pagamentos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-400"
            >
              Pagamentos Locais
            </a>
            <a
              href="#academy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-400"
            >
              Academy
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-emerald-400"
            >
              Perguntas frequentes
            </a>
          </nav>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuth('login');
              }}
              className="w-full py-2.5 text-xs font-semibold text-center border border-slate-700 rounded-xl hover:bg-slate-900 text-slate-200"
            >
              Entrar na conta
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuth('signup');
              }}
              className="w-full py-2.5 text-xs font-bold text-center bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white shadow-md"
            >
              Criar conta grátis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
