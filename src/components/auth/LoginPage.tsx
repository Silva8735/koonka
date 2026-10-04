import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useKoonka } from '../../context/KoonkaContext';
import { TRANSLATIONS } from '../../i18n/translations';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { DemoBar } from '../DemoBar';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, loginWithOtp } = useAuth();
  const { activeCountry } = useKoonka();
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('admin.silva@koonka.com');
  const [password, setPassword] = useState('koonka2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const t = TRANSLATIONS[activeCountry];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (loginMethod === 'otp') {
      if (!otpSent) {
        if (!identifier.trim()) {
          setError('Por favor, informe o seu número de telemóvel.');
          setIsLoading(false);
          return;
        }
        setOtpSent(true);
        setInfo('Código OTP enviado por SMS/WhatsApp! (Código demo: 123456)');
        setIsLoading(false);
        return;
      }

      const res = await loginWithOtp(identifier, otpCode);
      setIsLoading(false);
      if (res.success) {
        navigate('/painel');
      } else {
        setError(res.message || 'Código OTP inválido. Tente 123456.');
      }
      return;
    }

    const res = await login(identifier, password);
    setIsLoading(false);
    if (res.success) {
      navigate('/painel');
    } else {
      setError(res.message || 'Credenciais inválidas.');
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    const res = await loginWithGoogle();
    setIsLoading(false);
    if (res.success) {
      navigate('/painel');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <DemoBar />

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        {/* Brand Header */}
        <Link to="/" className="mb-8 flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            <span className="font-black text-2xl text-white">K</span>
          </div>
          <span className="font-black text-2xl tracking-tight text-white flex items-center gap-1">
            <span>koonka</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
        </Link>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Aceder à sua conta
            </h1>
            <p className="text-xs text-slate-400">
              Gerencie os seus produtos, vendas e saques em moeda local.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {info && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{info}</span>
            </div>
          )}

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogle}
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
            <span className="text-[10px] uppercase font-bold text-slate-500">ou</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Toggle Method */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('password');
                setOtpSent(false);
                setError(null);
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
                setError(null);
              }}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                loginMethod === 'otp' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Código SMS/WhatsApp
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin.silva@koonka.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            {loginMethod === 'password' ? (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Palavra-passe</label>
                  <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer" onClick={() => setInfo('Instruções de redefinição foram enviadas para o seu e-mail.')}>
                    Esqueci a palavra-passe
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              otpSent && (
                <div className="space-y-1.5 animate-in fade-in">
                  <label className="text-xs font-semibold text-slate-300">
                    Código de 6 dígitos OTP:
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl bg-slate-950 border border-emerald-500 text-emerald-400 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-500 block text-center">
                    Código demo: <strong>123456</strong>
                  </span>
                </div>
              )
            )}

            {loginMethod === 'password' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember_check"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="remember_check" className="text-xs text-slate-300 select-none cursor-pointer">
                  Lembrar-me neste dispositivo
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              {isLoading ? (
                <span>A processar...</span>
              ) : loginMethod === 'otp' && !otpSent ? (
                <span>Enviar código OTP</span>
              ) : (
                <span>Entrar no Painel</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            Ainda não tem conta na Koonka?{' '}
            <Link to="/criar-conta" className="text-emerald-400 font-bold hover:underline">
              Criar conta grátis
            </Link>
          </div>
        </div>

        {/* Back to Home Link */}
        <Link to="/" className="mt-6 text-xs text-slate-400 hover:text-white transition-colors">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};
