import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Code2, Mail, Lock, User, CheckCircle, Zap, Github, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await register(name, email, password);
      } else {
        await login(email, password);
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
      setForgotSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/github`;
  };

  return (
    <div className="relative py-12 px-4 pb-0 self-start w-full">
      <div className="fixed inset-0 bg-dark-950" />
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      
      {/* Animated Background Gradient */}
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
          
          {/* Left Panel - Branding */}
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
                  { icon: CheckCircle, text: 'Secure authentication' },
                  { icon: CheckCircle, text: 'No spam, ever' },
                  { icon: CheckCircle, text: 'End-to-end encrypted' },
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

              {/* Floating Code Snippet */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-xl p-4 font-mono text-sm"
              >
                <div className="text-brand-400">$ codevra auth --secure</div>
                <div className="text-dark-500 mt-1">✓ JWT with rotation</div>
                <div className="text-dark-500">✓ bcrypt hashing</div>
                <div className="text-dark-500">✓ Rate limiting enabled</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Left Panel - Mobile (below form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:hidden flex flex-col items-center text-center order-2"
          >
            <div className="space-y-6 w-full max-w-md">
              <div className="flex items-center justify-center gap-3">
                <div className="relative">
                  <Shield className="w-10 h-10 text-brand-400" />
                  <Code2 className="w-5 h-5 text-accent-400 absolute -bottom-1 -right-1" />
                </div>
                <span className="text-3xl font-bold gradient-text">Codevra</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-dark-100">
                  {isSignUp ? 'Join the Ecosystem' : 'Welcome Back'}
                </h2>
                <p className="text-dark-400 text-sm leading-relaxed">
                  {isSignUp
                    ? 'Build. Break. Reinvent. Access developer tools, secure vault, and coding challenges.'
                    : 'Continue building secure systems and African tech futures.'}
                </p>
              </div>

              <div className="space-y-2 text-left">
                {[
                  { icon: CheckCircle, text: 'Secure authentication' },
                  { icon: CheckCircle, text: 'No spam, ever' },
                  { icon: CheckCircle, text: 'End-to-end encrypted' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-dark-300 text-sm">
                    <item.icon className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="glass rounded-xl p-4 font-mono text-sm text-left">
                <div className="text-brand-400">$ codevra auth --secure</div>
                <div className="text-dark-500 mt-1">✓ JWT with rotation</div>
                <div className="text-dark-500">✓ bcrypt hashing</div>
                <div className="text-dark-500">✓ Rate limiting enabled</div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center order-1 lg:order-none"
          >
            <div className="w-full max-w-md">
              <motion.div
                layout
                className="glass rounded-2xl p-8 border border-dark-700/50 shadow-2xl"
              >
                {/* Toggle Buttons */}
                <div className="flex gap-2 mb-8 p-1 rounded-xl bg-dark-900/50">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      !isSignUp
                        ? 'bg-brand-500 text-white shadow-lg'
                        : 'text-dark-400 hover:text-dark-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      isSignUp
                        ? 'bg-accent-500 text-white shadow-lg'
                        : 'text-dark-400 hover:text-dark-200'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                {/* Forgot Password Mode */}
                {forgotMode ? (
                  <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                    <button onClick={() => { setForgotMode(false); setForgotSent(false); setError(''); }} className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-2">
                      <ArrowLeft className="w-4 h-4" /> Back to Sign In
                    </button>
                    {forgotSent ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="w-14 h-14 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto">
                          <Mail className="w-7 h-7 text-brand-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-dark-100">Check your email</h3>
                        <p className="text-sm text-dark-400">If that email exists, a reset link was sent. Check your inbox and spam folder.</p>
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
                          <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all" placeholder="you@example.com" />
                        </div>
                        {error && <p className="text-sm text-red-400">{error}</p>}
                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                          <Mail className="w-4 h-4" />{loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key={isSignUp ? 'signup' : 'signin'}
                    initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {isSignUp && (
                      <div className="relative">
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                          Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 group-focus-within:text-accent-400 transition-colors" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 transition-all"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Email
                      </label>
                      <div className="relative group">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 group-focus-within:text-${isSignUp ? 'accent' : 'brand'}-400 transition-colors`} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-${isSignUp ? 'accent' : 'brand'}-500/50 focus:border-${isSignUp ? 'accent' : 'brand'}-500/50 transition-all`}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 group-focus-within:text-${isSignUp ? 'accent' : 'brand'}-400 transition-colors`} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className={`w-full pl-10 pr-10 py-3 rounded-lg bg-dark-900/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-${isSignUp ? 'accent' : 'brand'}-500/50 focus:border-${isSignUp ? 'accent' : 'brand'}-500/50 transition-all`}
                          placeholder="••••••••"
                        />
                        <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {!isSignUp && (
                        <button type="button" onClick={() => { setForgotMode(true); setForgotEmail(email); setError(''); }} className="mt-1.5 text-xs text-dark-500 hover:text-brand-400 transition-colors float-right">
                          Forgot password?
                        </button>
                      )}
                    </div>

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

                    {error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                        {error}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dark-700/50"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-dark-900/50 text-dark-500">OR</span>
                      </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </button>

                      <button
                        type="button"
                        onClick={handleGithubLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 text-dark-100 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Github className="w-5 h-5" />
                        Continue with GitHub
                      </button>
                    </div>
                  </motion.form>
                </AnimatePresence>
                )}

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-dark-700/30">
                  <p className="text-xs text-center text-dark-500">
                    🔒 Secure OAuth authentication
                  </p>
                </div>


              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
