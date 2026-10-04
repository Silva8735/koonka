import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { useAuth } from '../context/AuthContext';
import { DemoBar } from './DemoBar';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardView } from './DashboardView';
import { ProductsView } from './ProductsView';
import { CodDeliveryView } from './CodDeliveryView';
import { LevelsView } from './LevelsView';
import { AcademyView } from './AcademyView';
import { SalesView } from './SalesView';
import { WalletView } from './WalletView';
import { AffiliatesView } from './AffiliatesView';
import { AdminView } from './AdminView';
import { CourierPwaView } from './CourierPwaView';
import { CheckoutModal } from './CheckoutModal';
import { AwardsModal } from './AwardsModal';
import { NotificationsDrawer } from './NotificationsDrawer';
import { AddressModal } from './AddressModal';
import { MembersAreaView } from './MembersAreaView';
import { MarketplaceView } from './MarketplaceView';
import { SubscriptionsView } from './SubscriptionsView';
import { FinancialView } from './FinancialView';
import { ReportsView } from './ReportsView';
import { CollaboratorsView } from './CollaboratorsView';
import { AppsView } from './AppsView';
import { HelpView } from './HelpView';
import { StudentPortalView } from './StudentPortalView';
import {
  Sparkles,
  LogOut,
  Home,
  CheckCircle2,
  Flame,
  ArrowRight,
  User,
  ShoppingBag
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { currentTab, userRole, viewMode, openCheckout } = useKoonka();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWelcomeNotice, setShowWelcomeNotice] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If Student view is triggered in header
  if (viewMode === 'aluno') {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <DemoBar />
        <StudentPortalView />
        <CheckoutModal />
      </div>
    );
  }

  // If Courier role is active or courier PWA tab is selected
  if (userRole === 'entregador' || currentTab === 'entregador_pwa') {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <DemoBar />
        <CourierPwaView />
        <CheckoutModal />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'produtos':
        return <ProductsView />;
      case 'cod':
        return <CodDeliveryView />;
      case 'niveis':
        return <LevelsView />;
      case 'academy':
        return <AcademyView />;
      case 'vendas':
        return <SalesView />;
      case 'carteira':
        return <WalletView />;
      case 'afiliados':
        return <AffiliatesView />;
      case 'admin':
        return <AdminView />;
      case 'membros':
        return <MembersAreaView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'assinaturas':
        return <SubscriptionsView />;
      case 'financeiro':
        return <FinancialView />;
      case 'relatorios':
        return <ReportsView />;
      case 'colaboradores':
        return <CollaboratorsView />;
      case 'apps':
        return <AppsView />;
      case 'ajuda':
        return <HelpView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 font-sans">
      {/* Simulation Top Bar */}
      <DemoBar />

      {/* Provisory Welcome Notice Bar requested in prompt #5 */}
      {showWelcomeNotice && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white px-4 py-2.5 border-b border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs shadow-inner">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-emerald-300">
                Bem-vindo, {currentUser?.name || 'Admin Silva'}!
              </span>
              <span className="text-slate-300 ml-1.5 hidden sm:inline">
                Seu painel de controle da Koonka está 100% ativo.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
              title="Voltar para a página inicial"
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ver Landing Page</span>
            </Link>

            <button
              type="button"
              onClick={() => openCheckout()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Testar Checkout</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80 font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

          {/* View Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <CheckoutModal />
      <AwardsModal />
      <NotificationsDrawer />
      <AddressModal />
    </div>
  );
};
