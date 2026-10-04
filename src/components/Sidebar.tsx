import React from 'react';
import { useKoonka, TabType } from '../context/KoonkaContext';
import {
  LayoutDashboard,
  Tag,
  Truck,
  Award,
  GraduationCap,
  TrendingUp,
  CreditCard,
  Users,
  Sliders,
  Smartphone,
  Sparkles,
  Layers,
  HelpCircle,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentTab, setCurrentTab, currentLevel, codOrders, activeCountry } = useKoonka();

  const pendingCod = codOrders.filter((c) => c.status === 'aguardando_confirmacao').length;

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'produtos', label: 'Catálogo de Produtos', icon: <Tag className="w-4 h-4" /> },
    {
      id: 'cod',
      label: 'Módulo COD & Entregas',
      icon: <Truck className="w-4 h-4" />,
      badge: pendingCod > 0 ? `${pendingCod} pendentes` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold'
    },
    {
      id: 'niveis',
      label: 'Níveis & Comunidade',
      icon: <Award className="w-4 h-4" />,
      badge: currentLevel.name,
      badgeColor: `${currentLevel.badgeBg} text-white font-extrabold uppercase text-[9px]`
    },
    { id: 'academy', label: 'Koonka Academy', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'vendas', label: 'Minhas Vendas', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'carteira', label: 'Carteira & Saques', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'afiliados', label: 'Rede de Afiliados', icon: <Users className="w-4 h-4" /> },
    { id: 'admin', label: 'Painel Admin', icon: <Sliders className="w-4 h-4" /> },
    { id: 'entregador_pwa', label: 'App do Estafeta (PWA)', icon: <Smartphone className="w-4 h-4" /> }
  ];

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300 w-64 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="bg-[#ea580c] px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center font-black text-white text-base shadow-sm">
            K
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>koonka</span>
              <span className="text-[10px] bg-white/20 px-1 rounded uppercase font-mono">v1.0</span>
            </div>
            <div className="text-[10px] text-orange-100 font-medium">
              Moçambique · Angola · Brasil
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <Link
          to="/"
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all mb-2 border border-dashed border-slate-800 hover:border-orange-500/50"
        >
          <Home className="w-4 h-4 text-orange-400" />
          <span>Ver Página Inicial</span>
        </Link>

        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={isActive ? 'text-orange-400' : 'text-slate-400'}>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${item.badgeColor || 'bg-slate-700 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ecossistema Lusófono</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">2026</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
