import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Só deixa passar utilizadores autenticados.
 * Quem não tem sessão é enviado para /entrar (guardamos a página pedida em "state.from").
 */
export const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;
  }
  return children;
};

/**
 * Para páginas públicas de acesso (ex.: /entrar):
 * quem já está autenticado vai directo para o painel.
 */
export const PublicOnlyRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/painel" replace />;
  }
  return children;
};
