import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KoonkaProvider } from './context/KoonkaContext';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { DashboardPage } from './components/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <KoonkaProvider>
          <Routes>
            {/* Landing Page (Página Inicial / Capa) */}
            <Route path="/" element={<LandingPage />} />

            {/* Dedicated Login Screen */}
            <Route path="/entrar" element={<LoginPage />} />

            {/* Dedicated Signup Screen (2 Steps + OTP) */}
            <Route path="/criar-conta" element={<SignupPage />} />

            {/* Seller / Producer Dashboard */}
            <Route path="/painel" element={<DashboardPage />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </KoonkaProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
