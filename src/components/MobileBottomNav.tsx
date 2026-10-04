import React from 'react';
import { useKoonka, TabType } from '../context/KoonkaContext';
import { LayoutDashboard, TrendingUp, Plus, CreditCard, Menu } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenMore: () => void;
}

/**
 * Barra de navegação inferior — só aparece em telemóvel (< 768 px).
 * No PC a navegação continua a ser a barra lateral.
 */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { currentTab, setCurrentTab } = useKoonka();

  const item = (id: TabType, label: string, icon: React.ReactNode) => {
    const active = currentTab === id;
    return (
      <button
        type="button"
        onClick={() => setCurrentTab(id)}
        aria-current={active ? 'page' : undefined}
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[56px] text-[10px] font-semibold transition-colors ${
          active ? 'text-orange-400' : 'text-slate-400 active:text-white'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav
      aria-label="Navegação principal"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-end max-w-xl mx-auto px-1">
        {item('dashboard', 'Início', <LayoutDashboard className="w-5 h-5" />)}
        {item('vendas', 'Vendas', <TrendingUp className="w-5 h-5" />)}

        {/* Botão central: Novo produto */}
        <div className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={() => setCurrentTab('produtos')}
            aria-label="Novo produto"
            className="-mt-5 w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-900/40 flex items-center justify-center active:scale-95 transition-transform border-4 border-slate-950"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {item('carteira', 'Carteira', <CreditCard className="w-5 h-5" />)}

        <button
          type="button"
          onClick={onOpenMore}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[56px] text-[10px] font-semibold text-slate-400 active:text-white"
        >
          <Menu className="w-5 h-5" />
          <span>Mais</span>
        </button>
      </div>
    </nav>
  );
};
