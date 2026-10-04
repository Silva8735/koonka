import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useKoonka } from '../../context/KoonkaContext';
import { CountryCode } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Smartphone,
  BookOpen,
  Package,
  Briefcase,
  Users,
  ShoppingBag
} from 'lucide-react';
import { DemoBar } from '../DemoBar';
import confetti from 'canvas-confetti';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const { activeCountry, setActiveCountry } = useKoonka();
  const navigate = useNavigate();

  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupCountry, setSignupCountry] = useState<CountryCode>(activeCountry);
  const [signupName, setSignupName] = useState('Admin Silva');
  const [signupEmail, setSignupEmail] = useState('admin.silva@koonka.com');
  const [signupPhone, setSignupPhone] = useState('84 912 3456');
  const [signupPassword, setSignupPassword] = useState('koonka2026!');
  const [showPassword, setShowPassword] = useState(false);

  const [signupIntent, setSignupIntent] = useState<string>('digital');
  const [signupNiche, setSignupNiche] = useState('');
  const [signupOtpCode, setSignupOtpCode] = useState('123456');
  const [signupTermsAccepted, setSignupTermsAccepted] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[signupCountry];

  const getPasswordStrength = (pass: string) => {
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

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signupName.trim()) {
      setError('Por favor, informe o seu nome completo.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (!signupPhone.trim()) {
      setError('Por favor, informe o seu número de telemóvel.');
      return;
    }
    if (signupPassword.length < 6) {
      setError('A palavra-passe precisa ter no mínimo 6 caracteres.');
      return;
    }

    setActiveCountry(signupCountry);
    setSignupStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signupTermsAccepted) {
      setError('Por favor, aceite os Termos de Uso e Política de Privacidade.');
      return;
    }

    if (signupOtpCode.trim() !== '123456') {
      setError('Código OTP incorreto. Use o código demo: 123456');
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
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}
    } catch {
      setIsLoading(false);
      setError('Ocorreu um erro ao criar a conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <DemoBar />

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <Link to="/" className="mb-8 flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            <span className="font-black text-2xl text-white">K</span>
          </div>
          <span className="font-black text-2xl tracking-tight text-white flex items-center gap-1">
            <span>koonka</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-6">
          {isSuccess ? (
            /* Celebration Screen: Ignis */
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 mx-auto flex items-center justify-center shadow-xl shadow-orange-950/50 animate-bounce">
                <Flame className="w-10 h-10 text-white fill-white" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Conta Ativada
                </span>
                <h2 className="text-2xl font-black text-white">
                  Bem-vindo à Koonka, {signupName}!
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Você começou no nível <strong>Ignis</strong>. O seu link de checkout já está pronto para aceitar pagamentos locais em {t.countryName}.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-orange-500/30 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Nível atual:</span>
                  <span className="font-bold text-orange-400 uppercase">Ignis (Brasa)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Moeda de recebimento:</span>
                  <span className="font-bold text-white">{t.currencyCode} ({t.currencySymbol})</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Saques liberados para:</span>
                  <span className="font-bold text-emerald-400">{t.methodsSummary.split('·')[0]}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/painel')}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 font-bold text-slate-950 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ir para o meu painel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">
                    Criar conta grátis
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                    Passo {signupStep} de 2
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {signupStep === 1
                    ? 'Registo em 2 minutos. Sem fidelização ou mensalidade.'
                    : 'Configure o seu perfil e ative as suas opções de vendas.'}
                </p>
              </div>

              {/* Progress */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`bg-emerald-500 h-full transition-all duration-300 ${
                    signupStep === 1 ? 'w-1/2' : 'w-full'
                  }`}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {signupStep === 1 ? (
                /* Step 1 Form */
                <form onSubmit={handleStep1} className="space-y-4">
                  {/* Country Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      País de Venda & Moeda Principal
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
                          className={`p-2.5 rounded-xl border text-xs text-center transition-colors ${
                            signupCountry === c.code
                              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="text-lg">{c.flag}</div>
                          <div className="font-semibold text-xs truncate mt-0.5">{c.label}</div>
                          <div className="text-[10px] font-mono text-slate-400">{c.cur}</div>
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
                    <label className="text-xs font-semibold text-slate-300 block">Palavra-passe</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
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

                    {signupPassword.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400">Segurança da palavra-passe:</span>
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
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Avançar para o Passo 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Step 2 Form */
                <form onSubmit={handleStep2} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      O que quer fazer na Koonka?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'digital', title: 'Vender Produtos Digitais', desc: 'Cursos, e-books, mentorias', icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
                        { id: 'fisico', title: 'Vender Produtos Físicos', desc: 'Com entrega & estafetas COD', icon: <Package className="w-4 h-4 text-amber-400" /> },
                        { id: 'servico', title: 'Oferecer Serviços', desc: 'Consultorias, design, aulas', icon: <Briefcase className="w-4 h-4 text-cyan-400" /> },
                        { id: 'afiliado', title: 'Ser Afiliado', desc: 'Promover e receber comissão', icon: <Users className="w-4 h-4 text-purple-400" /> },
                        { id: 'comprar', title: 'Comprar Produtos', desc: 'Aceder a cursos e compras', icon: <ShoppingBag className="w-4 h-4 text-slate-400" /> }
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Nicho ou Segmento (Opcional)
                    </label>
                    <input
                      type="text"
                      value={signupNiche}
                      onChange={(e) => setSignupNiche(e.target.value)}
                      placeholder="Ex: Marketing Digital, Moda, Saúde, Finanças..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  {/* OTP Verification */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                        Código OTP de Verificação
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {t.phonePrefix} {signupPhone}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Código demo pré-preenchido para teste: <strong>123456</strong>
                    </p>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={signupOtpCode}
                      onChange={(e) => setSignupOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="signup_terms"
                      checked={signupTermsAccepted}
                      onChange={(e) => setSignupTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <label htmlFor="signup_terms" className="text-[11px] text-slate-300 leading-snug cursor-pointer select-none">
                      Li e concordo com os <strong>Termos de Serviço</strong> e <strong>Política de Privacidade</strong> da Koonka.
                    </label>
                  </div>

                  {/* Navigation Buttons */}
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
                      className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? <span>Criando conta...</span> : <span>Concluir e Criar Conta</span>}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              <div className="pt-2 text-center text-xs text-slate-400">
                Já tem conta?{' '}
                <Link to="/entrar" className="text-emerald-400 font-bold hover:underline">
                  Fazer login
                </Link>
              </div>
            </>
          )}
        </div>

        <Link to="/" className="mt-6 text-xs text-slate-400 hover:text-white transition-colors">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};
