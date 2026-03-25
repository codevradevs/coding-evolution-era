import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Code2, Mail, Lock, User, CheckCircle, Zap,
  Github, Eye, EyeOff, ArrowLeft, QrCode, Loader2, RefreshCw, AlertCircle,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

// Derive the base server URL from the API URL env var
// VITE_API_URL = "http://localhost:5000/api"  →  BASE = "http://localhost:5000"
// VITE_API_URL = "https://api.codevra.co.ke/api"  →  BASE = "https://api.codevra.co.ke"
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, setUser } = useAuth();

  const initialMode = location.pathname === '/auth/register' ? 'signup' : 'signin';
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  // QR state
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [qrStatus, setQrStatus] = useState('idle'); // idle | loading | pending | approved | expired
  const pollRef = useRef(null);

  // Show OAuth error from callback redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthError = params.get('error');
    if (oauthError) setError(`${oauthError === 'github' ? 'GitHub' : 'Google'} sign-in failed. Please try again.`);
  }, [location.search]);

  // QR polling
  useEffect(() => {
    if (qrStatus === 'pending' && qrData?.sessionId) {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API_BASE}/api/auth/qr/status/${qrData.sessionId}`);
          if (res.status === 404) { clearInterval(pollRef.current); setQrStatus('expired'); return; }
          const data = await res.json();
          if (data.status === 'approved') {
            clearInterval(pollRef.current);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            const meRes = await fetch(`${API_BASE}/api/auth/me`, {
              headers: { Authorization: `Bearer ${data.accessToken}` },
            });
            const user = await meRes.json();
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
          }
        } catch { /* keep polling */ }
      }, 2000);
    }
    return () => clearInterval(pollRef.current);
  }, [qrStatus, qrData, navigate, setUser]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const switchMode = (next) => {
    setMode(next);
    setError('');
    setInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: forgotEmail });
      setInfo('If that email exists, a reset link was sent. Check your inbox and spam folder.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // OAuth — redirect to backend, which redirects back to CLIENT_URL/auth/callback
  const handleOAuth = (provider) => {
    window.location.href = `${API_BASE}/api/auth/${provider}`;
  };

  const generateQR = async () => {
    setQrStatus('loading');
    setQrData(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/qr/generate`);
      const data = await res.json();
      setQrData(data);
      setQrStatus('pending');
    } catch {
      setQrStatus('idle');
    }
  };

  const openQR = () => { setShowQR(true); generateQR(); };
  const closeQR = () => {
    clearInterval(pollRef.current);
    setShowQR(false);
    setQrData(null);
    setQrStatus('idle');
  };

  const isSignUp = mode === 'signup';

  return (
    <div className="relative py-12 px-4 pb-0 self-start w-full">
      <div className="fixed inset-0 bg-dark-950" />
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      <motion.div
        animate={{
          background: isSignUp
            ? 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
            : 'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
        }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

          {/* ── Left Panel (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Shield className="w-12 h-12 text-brand-400" />
                  <Code2 className="w-6 h-6 text-accent-400 absolute -bottom-1 -right-1" />
                </div>
                <span className="text-4xl font-bold gradient-text">Codevra</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-dark-100 leading-tight">
                  {isSignUp ? 'Join the Ecosystem' : 'Welcome Back'}
                </h1>
                <p className="text-xl text-dark-400 leading-relaxed">
                  {isSignUp
                    ? 'Build. Break. Reinvent. Access developer tools, secure vault, and coding challenges.'
                    : 'Continue building secure systems and African tech futures.'}
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle, text: 'Secure local authentication' },
                  { icon: CheckCircle, text: 'OAuth via Google & GitHub' },
                  { icon: CheckCircle, text: 'End-to-end encrypted vault' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-dark-300"
                  >
                    <item.icon className="w-5 h-5 text-brand-400" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-xl p-4 font-mono text-sm"
              >
                <div className="text-brand-400">$ codevra auth --secure</div>
                <div className="text-dark-500 mt-1">✓ JWT with rotation</div>
                <div className="text-dark-500">✓ bcrypt hashing (cost 12)</div>
                <div className="text-dark-500">✓ Rate limiting enabled</div>
                <div className="text-dark-500">✓ OAuth 2.0 (Google / GitHub)</div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Panel — Auth Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center order-1 lg:order-none"
          >
            <div className="w-full max-w-md">
              <motion.div layout className="glass rounded-2xl p-8 border border-dark-700/50 shadow-2xl">

                {/* ── Mode Toggle ── */}
                {mode !== 'forgot' && (
                  <div className="flex gap-2 mb-8 p-1 rounded-xl bg-dark-900/50">
                    <button
                      onClick={() => switchMode('signin')}
                      className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                        mode === 'signin' ? 'bg-brand-500 text-white shadow-lg' : 'text-dark-400 hover:text-dark-200'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => switchMode('signup')}
                      className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                        mode === 'signup' ? 'bg-accent-500 text-white shadow-lg' : 'text-dark-400 hover:text-dark-200'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                <AnimatePresence mode="wait">

                  {/* ── Forgot Password ── */}
                  {mode === 'forgot' && (
                    <motion.div
                      key="forgot"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <button
                        onClick={() => switchMode('signin')}
                        className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Sign In
                      </button>

                      {info ? (
                        <div className="text-center py-6 space-y-3">
                          <div className="w-14 h-14 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto">
                            <Mail className="w-7 h-7 text-brand-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-dark-100">Check your email</h3>
                          <p className="text-sm text-dark-400">{info}</p>
                          <p className="text-xs text-dark-600">Link expires in 15 minutes.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-dark-100 mb-1">Forgot Password?</h3>
                            <p className="text-sm text-dark-500">Enter your email and we'll send a reset link.</p>
                          </div>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 group-focus-within:text-brand-400 transition-colors" />
                            <input
                              type="email"
                              value={forgotEmail}
                              onChange={(e) => setForgotEmail(e.target.value)}
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                              placeholder="you@example.com"
                            />
                          </div>
                          {error && <ErrorBox message={error} />}
                          <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            <Mail className="w-4 h-4" />
                            {loading ? 'Sending...' : 'Send Reset Link'}
                          </Button>
                        </form>
                      )}
                    </motion.div>
                  )}

                  {/* ── Sign In / Sign Up ── */}
                  {mode !== 'forgot' && (
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* ── Section label: Local ── */}
                      <div className="flex items-center gap-2 text-xs text-dark-500 uppercase tracking-widest">
                        <Lock className="w-3 h-3" />
                        <span>Email &amp; Password</span>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                          <Field label="Name" icon={User} color="accent">
                            <input
                              type="text"
                              value={form.name}
                              onChange={set('name')}
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all"
                              placeholder="Your name"
                            />
                          </Field>
                        )}

                        <Field label="Email" icon={Mail} color={isSignUp ? 'accent' : 'brand'}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            required
                            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-${isSignUp ? 'accent' : 'brand'}-500/50 transition-all`}
                            placeholder="you@example.com"
                          />
                        </Field>

                        <div>
                          <Field label="Password" icon={Lock} color={isSignUp ? 'accent' : 'brand'}>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={form.password}
                              onChange={set('password')}
                              required
                              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-${isSignUp ? 'accent' : 'brand'}-500/50 transition-all`}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((p) => !p)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </Field>
                          {!isSignUp && (
                            <button
                              type="button"
                              onClick={() => { switchMode('forgot'); setForgotEmail(form.email); }}
                              className="mt-1.5 text-xs text-dark-500 hover:text-brand-400 transition-colors float-right"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>

                        {error && <ErrorBox message={error} />}

                        <Button
                          type="submit"
                          className="w-full group"
                          size="lg"
                          disabled={loading}
                          style={{
                            background: isSignUp
                              ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
                              : 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                          }}
                        >
                          <Zap className="w-4 h-4" />
                          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
                        </Button>
                      </form>

                      {/* ── Divider ── */}
                      <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-dark-700/50" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-3 bg-dark-900/80 text-dark-500 rounded">OR CONTINUE WITH</span>
                        </div>
                      </div>

                      {/* ── Section label: OAuth ── */}
                      <div className="flex items-center gap-2 text-xs text-dark-500 uppercase tracking-widest">
                        <Shield className="w-3 h-3" />
                        <span>OAuth — no password needed</span>
                      </div>

                      {/* ── OAuth Buttons ── */}
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => handleOAuth('google')}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          </svg>
                          Continue with Google
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOAuth('github')}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 text-dark-100 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Github className="w-5 h-5" />
                          Continue with GitHub
                        </button>

                        <button
                          type="button"
                          onClick={openQR}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 text-dark-100 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <QrCode className="w-5 h-5 text-brand-400" />
                          Sign in with QR Code
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 pt-6 border-t border-dark-700/30">
                  <p className="text-xs text-center text-dark-500">
                    🔒 Local auth uses bcrypt + JWT · OAuth via Google &amp; GitHub
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── QR Modal ── */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeQR}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass rounded-2xl p-8 max-w-sm w-full text-center border border-dark-700/50"
            >
              <h3 className="text-xl font-bold text-dark-100 mb-1">QR Code Login</h3>
              <p className="text-sm text-dark-400 mb-6">
                Scan with your phone while already logged in to authenticate instantly
              </p>

              <div className="flex items-center justify-center mb-6">
                {qrStatus === 'loading' && (
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-brand-400 animate-spin" />
                  </div>
                )}
                {qrStatus === 'pending' && qrData?.qr && (
                  <div className="p-3 bg-white rounded-xl">
                    <img src={qrData.qr} alt="QR Code" className="w-44 h-44" />
                  </div>
                )}
                {qrStatus === 'expired' && (
                  <div className="w-48 h-48 flex flex-col items-center justify-center gap-3">
                    <p className="text-sm text-red-400">QR expired</p>
                    <button onClick={generateQR} className="flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300">
                      <RefreshCw className="w-4 h-4" /> Generate new
                    </button>
                  </div>
                )}
              </div>

              {qrStatus === 'pending' && (
                <div className="flex items-center justify-center gap-2 text-sm text-dark-400 mb-4">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                  Waiting for scan… (expires in 2 min)
                </div>
              )}

              <div className="p-3 rounded-lg bg-dark-900/50 border border-dark-700/30 text-xs text-dark-500 mb-4">
                Open Codevra on your phone → Profile → Approve QR Login
              </div>

              <button onClick={closeQR} className="text-sm text-dark-500 hover:text-dark-300 transition-colors">
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Small helpers ──────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, color = 'brand', children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark-300 mb-2">{label}</label>
      <div className="relative group">
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 group-focus-within:text-${color}-400 transition-colors`} />
        {children}
      </div>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
