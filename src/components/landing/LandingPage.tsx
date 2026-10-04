import React from 'react';
import { LandingHeader } from './LandingHeader';
import { HeroSection } from './HeroSection';
import { PaymentMethodsStrip } from './PaymentMethodsStrip';
import { HowItWorksSection } from './HowItWorksSection';
import { BenefitsSection } from './BenefitsSection';
import { LevelsSection } from './LevelsSection';
import { AcademyLandingSection } from './AcademyLandingSection';
import { SocialProofSection } from './SocialProofSection';
import { FaqSection } from './FaqSection';
import { CtaSection } from './CtaSection';
import { FooterSection } from './FooterSection';
import { AuthModal } from '../AuthModal';
import { CheckoutModal } from '../CheckoutModal';
import { DemoBar } from '../DemoBar';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Simulation Bar at the top to easily test features */}
      <DemoBar />

      {/* 1. CABEÇALHO FIXO */}
      <LandingHeader />

      <main className="flex-1">
        {/* 2. HERO (capa principal) */}
        <HeroSection />

        {/* 3. FAIXA DE MÉTODOS DE PAGAMENTO */}
        <PaymentMethodsStrip />

        {/* 4. COMO FUNCIONA */}
        <HowItWorksSection />

        {/* 5. BENEFÍCIOS */}
        <BenefitsSection />

        {/* 6. SECÇÃO DE NÍVEIS */}
        <LevelsSection />

        {/* 7. KOONKA ACADEMY */}
        <AcademyLandingSection />

        {/* 8. PROVA SOCIAL */}
        <SocialProofSection />

        {/* 9. PERGUNTAS FREQUENTES */}
        <FaqSection />

        {/* 10. CHAMADA FINAL (CTA) */}
        <CtaSection />
      </main>

      {/* 11. RODAPÉ */}
      <FooterSection />

      {/* Global Auth Modal & Checkout Modal */}
      <AuthModal />
      <CheckoutModal />
    </div>
  );
};
