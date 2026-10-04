import React, { createContext, useContext, useState, useEffect } from 'react';
import { CountryCode } from '../types';
import confetti from 'canvas-confetti';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: CountryCode;
  role: 'vendedor' | 'comprador' | 'afiliado' | 'entregador' | 'admin';
  level: string;
  verified: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;
  openAuth: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuth: () => void;
  login: (identifier: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean }>;
  loginWithOtp: (phone: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: {
    name: string;
    email: string;
    phone: string;
    country: CountryCode;
    password: string;
    intent: string;
    niche?: string;
  }) => Promise<{ success: boolean }>;
  logout: () => void;
  themeMode: 'dark' | 'light';
  toggleThemeMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('koonka_auth_user');
    return saved
      ? JSON.parse(saved)
      : {
          id: 'user-admin',
          name: 'Admin Silva',
          email: 'admin.silva@koonka.com',
          phone: '+258 84 912 3456',
          country: 'MZ',
          role: 'vendedor',
          level: 'Solaris',
          verified: true
        };
  });

  // Track if user is authenticated (can be checked on /painel)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('koonka_is_auth') === 'true';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('koonka_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('koonka_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('koonka_is_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const openAuth = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuth = () => {
    setAuthModalOpen(false);
  };

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Mock Login (Ready to be swapped with Firebase Auth signInWithEmailAndPassword)
  const login = async (identifier: string, password?: string) => {
    // TODO: Integrar Firebase Auth: await signInWithEmailAndPassword(auth, email, password)
    if (!identifier.trim()) {
      return { success: false, message: 'Por favor, introduza o seu e-mail ou telemóvel.' };
    }

    const user: AuthUser = {
      id: 'user-admin',
      name: 'Admin Silva',
      email: identifier.includes('@') ? identifier : 'admin.silva@koonka.com',
      phone: identifier.includes('@') ? '+258 84 912 3456' : identifier,
      country: identifier.startsWith('+244') ? 'AO' : identifier.startsWith('+55') ? 'BR' : 'MZ',
      role: 'vendedor',
      level: 'Solaris',
      verified: true
    };

    setCurrentUser(user);
    setIsAuthenticated(true);
    closeAuth();
    return { success: true };
  };

  // Mock Google Login (Ready to be swapped with signInWithPopup(auth, googleProvider))
  const loginWithGoogle = async () => {
    // TODO: Integrar Firebase Google Auth: await signInWithPopup(auth, googleProvider)
    const user: AuthUser = {
      id: 'user-google-1',
      name: 'Admin Silva',
      email: 'admin.silva@koonka.com',
      phone: '+258 84 912 3456',
      country: 'MZ',
      role: 'vendedor',
      level: 'Solaris',
      verified: true
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    closeAuth();
    return { success: true };
  };

  // Mock OTP Phone Login
  const loginWithOtp = async (phone: string, otp: string) => {
    // TODO: Integrar Firebase Auth Phone RecaptchaVerifier
    if (otp !== '123456') {
      return { success: false, message: 'Código OTP inválido. Use 123456 em modo de demonstração.' };
    }
    const user: AuthUser = {
      id: 'user-otp-1',
      name: 'Admin Silva',
      email: 'admin.silva@koonka.com',
      phone: phone || '+258 84 912 3456',
      country: phone.startsWith('+244') ? 'AO' : phone.startsWith('+55') ? 'BR' : 'MZ',
      role: 'vendedor',
      level: 'Solaris',
      verified: true
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    closeAuth();
    return { success: true };
  };

  // Mock Signup Wizard (Ready to be swapped with createUserWithEmailAndPassword)
  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    country: CountryCode;
    password: string;
    intent: string;
    niche?: string;
  }) => {
    // TODO: Integrar Firebase Auth: await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: userData.name || 'Admin Silva',
      email: userData.email,
      phone: userData.phone,
      country: userData.country,
      role: 'vendedor',
      level: 'Ignis',
      verified: true
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    closeAuth();
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuth,
        closeAuth,
        login,
        loginWithGoogle,
        loginWithOtp,
        signup,
        logout,
        themeMode,
        toggleThemeMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
