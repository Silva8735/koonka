import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useKoonka } from '../context/KoonkaContext';
import { CountryCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  X,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Flame,
  ShieldCheck,
  Sparkles,
  Smartphone,
  BookOpen,
  Package,
  Briefcase,
  Users,
  ShoppingBag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    closeAuth,
    authModalMode,
    setAuthModalMode,
    login,
    loginWithGoogle,
    loginWithOtp,
    signup
  } = useAuth();
  const { activeCountry, setActiveCountry } = useKoonka();
  const navigate = useNavigate();

  // Mode states: 'login' | 'signup' | 'forgot' | 'welcome_ignis'
  const [internalMode, setInternalMode] = useState<'login' | 'signup' | 'forgot' | 'welcome_ignis'>(authModalMode);
  
  // Login states
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginOtpCode, setLoginOtpCode] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);

  // Signup states (Step 1 & Step 2)
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupCountry, setSignupCountry] = useState<CountryCode>(activeCountry);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupIntent, setSignupIntent] = useState<string>('digital');
  const [signupNiche, setSignupNiche] = useState('');
  const [signupTermsAccepted, setSignupTermsAccepted] = useState(false);
  const [signupOtpCode, setSignupOtpCode] = useState('');

  // UI status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  // Synchronize internal mode with parent when modal opens
  React.useEffect(() => {
    setInternalMode(authModalMode);
    setErrorMessage(null);
    setSuccessInfo(null);
    setSignupStep(1);
    setLoginOtpSent(false);
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  const t = TRANSLATIONS[signupCountry];

  // Password strength calculation
  const getPasswordStrength = (pass: string): { label: string; percent: number; color: string } => {
    if (!pass) return { label: 'Vazia', percent: 0, color: 'bg-slate-700' };
    if (pass.length < 6) return { label: 'Fraca', percent: 30, color: 'bg-red-500' };
    const hasLetters = /[a-zA-Z]/.test(pass);
    const hasNumbers = /[0-9]/.test(pass);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass);

    if (pass.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
      return { label: 'Forte', percent: 100, color: 'bg-emerald-500' };
    }
    if (pass.length >= 6 && hasLetters && hasNumbers) {
      return { label: 'Média', percent: 65, color: 'bg-amber-500' };
    }
    return { label: 'Fraca', percent: 40, color: 'bg-orange-500' };
  };

  const strength = getPasswordStrength(signupPassword);

  // Submit standard login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    if (loginMethod === 'otp') {
      if (!loginOtpSent) {
        // Send OTP
        if (!loginIdentifier.trim()) {
          setErrorMessage('Por favor, informe o seu número de telemóvel para receber o código.');
          setIsLoading(false);
          return;
        }
        setLoginOtpSent(true);
        setSuccessInfo('Código SMS/WhatsApp de teste enviado! (Código demo: 123456)');
        setIsLoading(false);
        return;
      }

      // Verify OTP
      const res = await loginWithOtp(loginIdentifier, loginOtpCode);
      setIsLoading(false);
      if (res.success) {
        closeAuth();
        navigate('/painel');
      } else {
        setErrorMessage(res.message || 'Código OTP inválido.');
      }
      return;
    }

    // Password login
    try {
      const res = await login(loginIdentifier, loginPassword);
      setIsLoading(false);
      if (res.success) {
        closeAuth();
        navigate('/painel');
      } else {
        setErrorMessage(res.message || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage('Erro ao autenticar. Tente novamente.');
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await loginWithGoogle();
      setIsLoading(false);
      if (res.success) {
        closeAuth();
        navigate('/painel');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Não foi possível conectar com a conta Google.');
    }
  };

  // Signup Step 1 verification
  const handleSignupStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signupName.trim()) {
      setErrorMessage('Por favor, introduza o seu nome completo.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage('Por favor, introduza um e-mail válido.');
      return;
    }
    if (!signupPhone.trim()) {
      setErrorMessage('Por favor, introduza o seu telemóvel.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }

    setActiveCountry(signupCountry);
    setSignupStep(2);
  };

  // Signup Step 2 completion
  const handleSignupComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signupTermsAccepted) {
      setErrorMessage('É obrigatório aceitar os Termos de Uso e Política de Privacidade.');
      return;
    }

    if (signupOtpCode.trim() !== '123456') {
      setErrorMessage('Código de verificação incorreto. Use o código demo: 123456');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: signupName,
        email: signupEmail,
        phone: `${t.phonePrefix} ${signupPhone}`,
        country: signupCountry,
        password: signupPassword,
        intent: signupIntent,
        niche: signupNiche
      });

      setIsLoading(false);
      setInternalMode('welcome_ignis');

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage('Erro ao criar a sua conta. Tente novamente.');
    }
  };

  // Forgot password flow
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessInfo('Se o e-mail estiver cadastrado, enviámos instruções para redefinir a palavra-passe.');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl text-white relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuth}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================
            SCREEN: WELCOME IGNIS CELEBRATION
           ======================================================== */}
        {internalMode === 'welcome_ignis' ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 mx-auto flex items-center justify-center shadow-xl shadow-orange-950/50 animate-bounce">
              <Flame className="w-10 h-10 text-white fill-white" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Parabéns! Conta Criada com Sucesso
              </span>
              <h3 className="text-2xl font-black text-white">
                Bem-vindo ao Nível Ignis!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                A sua jornada de vendas na Koonka começou. Você agora faz parte da comunidade oficial de vendedores em {t.countryName}.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-orange-500/30 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Nível inicial:</span>
                <span className="font-bold text-orange-400 uppercase">Ignis (Brasa)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Taxa base:</span>
                <span className="font-bold text-white">7.9% por venda</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Comunidade:</span>
                <span className="font-bold text-emerald-400">Desbloqueada</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                closeAuth();
                navigate('/painel');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 font-bold text-slate-950 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ir para o meu painel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : internalMode === 'login' ? (
          /* ========================================================
              SCREEN: LOGIN (/entrar)
             ======================================================== */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Entrar na sua conta
              </h3>
              <p className="text-xs text-slate-400">
                Aceda ao seu painel de vendas e controle os seus ganhos.
              </p>
            </div>

            {/* Error or info alerts */}
            {errorMessage && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successInfo && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successInfo}</span>
              </div>
            )}

            {/* Google Quick Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continuar com Google</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-800 flex-1" />
              <span className="text-[10px] uppercase font-bold text-slate-500">ou com credenciais</span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            {/* Toggle method: Password vs OTP */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('password');
                  setLoginOtpSent(false);
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                  loginMethod === 'password' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                E-mail ou Telemóvel
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('otp');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                  loginMethod === 'otp' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Código por SMS/WhatsApp
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Identifier Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {loginMethod === 'otp' ? 'Número de telemóvel' : 'E-mail ou Telemóvel'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    {loginMethod === 'otp' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={
                      loginMethod === 'otp'
                        ? `${t.phonePrefix} 84 123 4567`
                        : 'seuemail@exemplo.com ou +258 84...'
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {loginMethod === 'password' ? (
                /* Password Field */
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">Palavra-passe</label>
                    <button
                      type="button"
                      onClick={() => setInternalMode('forgot')}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Esqueci a palavra-passe
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                /* OTP Verification Field */
                loginOtpSent && (
                  <div className="space-y-1.5 animate-in fade-in">
                    <label className="text-xs font-semibold text-slate-300">
                      Código de 6 dígitos recebido por SMS/WhatsApp:
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={loginOtpCode}
                      onChange={(e) => setLoginOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl bg-slate-950 border border-emerald-500/80 text-emerald-400 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500 block text-center">
                      Código de demonstração: <strong>123456</strong>
                    </span>
                  </div>
                )
              )}

              {/* Remember Me */}
              {loginMethod === 'password' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember_me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                  />
                  <label htmlFor="remember_me" className="text-xs text-slate-300 select-none cursor-pointer">
                    Lembrar-me neste dispositivo
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <span>A processar...</span>
                ) : loginMethod === 'otp' && !loginOtpSent ? (
                  <span>Enviar código OTP</span>
                ) : (
                  <span>Entrar</span>
                )}
              </button>
            </form>

            {/* Switch to Signup */}
            <div className="pt-2 text-center text-xs text-slate-400">
              Não tem conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setInternalMode('signup');
                  setSignupStep(1);
                  setErrorMessage(null);
                }}
                className="text-emerald-400 font-bold hover:underline"
              >
                Criar conta grátis
              </button>
            </div>
          </div>
        ) : internalMode === 'signup' ? (
          /* ========================================================
              SCREEN: SIGNUP IN 2 STEPS (/criar-conta)
             ======================================================== */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Criar conta grátis
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  Passo {signupStep} de 2
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {signupStep === 1
                  ? 'Comece em 2 minutos. Sem cartão de crédito.'
                  : 'Personalize o seu perfil e ative as suas ferramentas de venda.'}
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`bg-emerald-500 h-full transition-all duration-300 ${
                  signupStep === 1 ? 'w-1/2' : 'w-full'
                }`}
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Basic Info */}
            {signupStep === 1 ? (
              <form onSubmit={handleSignupStep1Next} className="space-y-4">
                {/* Country Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    País de Operação & Moeda Principal
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { code: 'MZ', label: 'Moçambique', flag: '🇲🇿', cur: 'MZN' },
                        { code: 'AO', label: 'Angola', flag: '🇦🇴', cur: 'AOA' },
                        { code: 'BR', label: 'Brasil', flag: '🇧🇷', cur: 'BRL' }
                      ] as const
                    ).map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setSignupCountry(c.code)}
                        className={`p-2 rounded-xl border text-xs text-center transition-colors ${
                          signupCountry === c.code
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-base">{c.flag}</div>
                        <div className="font-semibold text-[11px] truncate">{c.label}</div>
                        <div className="text-[9px] font-mono text-slate-400">{c.cur}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Nome Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Admin Silva"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">E-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="admin.silva@koonka.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">{t.phoneLabel}</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs font-mono text-emerald-400 font-bold shrink-0 flex items-center">
                      {t.phonePrefix}
                    </span>
                    <input
                      type="tel"
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="84 912 3456"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Password & Strength Meter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Criar Palavra-passe</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Pelo menos 6 caracteres"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength Bar */}
                  {signupPassword.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">Força da palavra-passe:</span>
                        <span className="font-bold text-slate-300">{strength.label}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar para o Passo 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* STEP 2: Intent, OTP verification and Terms */
              <form onSubmit={handleSignupComplete} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    O que deseja fazer na Koonka?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'digital', title: 'Produtos Digitais', desc: 'Cursos, e-books, mentorias', icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
                      { id: 'fisico', title: 'Produtos Físicos', desc: 'Com entrega e COD', icon: <Package className="w-4 h-4 text-amber-400" /> },
                      { id: 'servico', title: 'Oferecer Serviços', desc: 'Consultoria, freelancing', icon: <Briefcase className="w-4 h-4 text-cyan-400" /> },
                      { id: 'afiliado', title: 'Ser Afiliado', desc: 'Promover e ganhar comissões', icon: <Users className="w-4 h-4 text-purple-400" /> },
                      { id: 'comprar', title: 'Apenas Comprar', desc: 'Aceder a conteúdos', icon: <ShoppingBag className="w-4 h-4 text-slate-400" /> }
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSignupIntent(item.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                          signupIntent === item.id
                            ? 'bg-emerald-950/70 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="mt-0.5">{item.icon}</div>
                        <div>
                          <div className="font-bold text-xs text-white">{item.title}</div>
                          <div className="text-[10px] text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Niche */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Nicho ou Categoria Principal (Opcional)
                  </label>
                  <input
                    type="text"
                    value={signupNiche}
                    onChange={(e) => setSignupNiche(e.target.value)}
                    placeholder="Ex: Saúde, Negócios, Gastronomia, Moda..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Phone OTP Verification */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      Verificação do Telemóvel
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {t.phonePrefix} {signupPhone}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Insira o código de 6 dígitos enviado por SMS/WhatsApp. (Código de demonstração: <strong>123456</strong>)
                  </p>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={signupOtpCode}
                    onChange={(e) => setSignupOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center tracking-widest text-base font-mono py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Terms Acceptance */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms_agree"
                    checked={signupTermsAccepted}
                    onChange={(e) => setSignupTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                  />
                  <label htmlFor="terms_agree" className="text-[11px] text-slate-300 leading-snug cursor-pointer select-none">
                    Aceito os <strong>Termos de Uso</strong> e a <strong>Política de Privacidade</strong> da plataforma Koonka.
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className="py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? <span>Criando conta...</span> : <span>Concluir Cadastro</span>}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Switch to Login */}
            <div className="pt-2 text-center text-xs text-slate-400">
              Já tem conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setInternalMode('login');
                  setErrorMessage(null);
                }}
                className="text-emerald-400 font-bold hover:underline"
              >
                Entrar
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
              SCREEN: FORGOT PASSWORD
             ======================================================== */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Recuperar palavra-passe
              </h3>
              <p className="text-xs text-slate-400">
                Informe o seu e-mail ou telemóvel para receber o link de recuperação.
              </p>
            </div>

            {successInfo ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 space-y-3">
                <div className="flex items-center gap-2 font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instruções enviadas!</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Verifique a sua caixa de entrada e spam. Também enviámos uma notificação para o telemóvel cadastrado.
                </p>
                <button
                  type="button"
                  onClick={() => setInternalMode('login')}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  Voltar para o login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    E-mail ou Telemóvel
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="seuemail@exemplo.com ou +258 84..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  {isLoading ? 'A enviar...' : 'Enviar link de recuperação'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setInternalMode('login')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Lembrei da senha, voltar ao login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
