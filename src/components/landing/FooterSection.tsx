import React from 'react';
import { useKoonka } from '../../context/KoonkaContext';
import { CountryCode } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import {
  Globe,
  ShieldCheck,
  Mail,
  MessageCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FooterSection: React.FC = () => {
  const { activeCountry, setActiveCountry } = useKoonka();
  const t = TRANSLATIONS[activeCountry];

  const countries: { code: CountryCode; label: string; flag: string }[] = [
    { code: 'MZ', label: 'Moçambique', flag: '🇲🇿' },
    { code: 'AO', label: 'Angola', flag: '🇦🇴' },
    { code: 'BR', label: 'Brasil', flag: '🇧🇷' }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
                <span className="font-black text-lg text-white">K</span>
              </div>
              <span className="font-black text-xl tracking-tight text-white flex items-center gap-1">
                <span>koonka</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Plataforma de checkout, vendas multimoeda, pagamentos locais por mobile money, entrega física (COD) e comunidade para os mercados de Moçambique, Angola e Brasil.
            </p>

            {/* Country Selector in footer */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                País selecionado
              </div>
              <div className="flex flex-wrap gap-2">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setActiveCountry(c.code)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      activeCountry === c.code
                        ? 'bg-slate-900 border-emerald-500/80 text-emerald-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column: Navegação */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#niveis" className="hover:text-emerald-400 transition-colors">
                  Níveis de Vendedor
                </a>
              </li>
              <li>
                <a href="#pagamentos" className="hover:text-emerald-400 transition-colors">
                  Pagamentos Locais
                </a>
              </li>
              <li>
                <a href="#academy" className="hover:text-emerald-400 transition-colors">
                  Koonka Academy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Perguntas frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Políticas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Legal & Segurança
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#termos" onClick={(e) => { e.preventDefault(); alert('Termos de Uso da plataforma Koonka.'); }} className="hover:text-emerald-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#privacidade" onClick={(e) => { e.preventDefault(); alert('Política de Privacidade e Proteção de Dados (LGPD e equivalentes locais).'); }} className="hover:text-emerald-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#reembolso" onClick={(e) => { e.preventDefault(); alert('Política de Reembolso: garantia padrão de 7 a 14 dias para produtos digitais.'); }} className="hover:text-emerald-400 transition-colors">
                  Política de Reembolso
                </a>
              </li>
              <li>
                <a href="#seguranca" onClick={(e) => { e.preventDefault(); alert('Segurança: Criptografia bancária TLS 1.3 ponta a ponta.'); }} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Segurança dos Dados</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Suporte & Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ajuda & Contacto
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">suporte@koonka.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">WhatsApp Suporte 24/7</span>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-slate-500 block">Horário de Atendimento:</span>
                <span className="text-slate-300 text-[11px]">Seg a Sex: 08h às 20h (GMT+2 / GMT+1 / GMT-3)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Koonka Technologies. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Moçambique 🇲🇿</span>
            <span>·</span>
            <span>Angola 🇦🇴</span>
            <span>·</span>
            <span>Brasil 🇧🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
