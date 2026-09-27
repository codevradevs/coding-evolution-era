import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { adminApi } from '../lib/api'
import { Zap, Mail, Lock, ArrowRight, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Forgot password state
  const [view, setView] = useState('login') // 'login' | 'forgot'
  const [fpEmail, setFpEmail] = useState('')
  const [fpLoading, setFpLoading] = useState(false)
  const [fpError, setFpError] = useState('')
  const [fpSuccess, setFpSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message === 'Not an admin account.' ? 'This account does not have admin access.' : err.response?.data?.error || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setFpError('')
    setFpLoading(true)
    try {
      await adminApi.forgotPassword(fpEmail)
      setFpSuccess(true)
    } catch {
      setFpError('Failed to send reset email. Please try again.')
    } finally {
      setFpLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-sm mx-4 animate-slide-up">
        <div className="bg-dark-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg glow-green">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none">Codevra Admin</h1>
              <p className="text-xs text-slate-500 mt-0.5">Control Panel</p>
            </div>
          </div>

          {view === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
              <p className="text-slate-400 text-sm mb-6">Sign in to manage your platform</p>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:bg-dark-800 transition text-sm"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setView('forgot'); setError('') }}
                    className="text-xs text-slate-500 hover:text-brand-400 transition"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 text-sm"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight size={14} /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                onClick={() => { setView('login'); setFpSuccess(false); setFpError(''); setFpEmail('') }}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition mb-6"
              >
                <ArrowLeft size={13} /> Back to sign in
              </button>

              <h2 className="text-2xl font-bold text-white mb-1">Reset password</h2>
              <p className="text-slate-400 text-sm mb-6">Enter your admin email and we'll send a reset link.</p>

              {fpSuccess ? (
                <div className="p-4 rounded-xl bg-green-500/8 border border-green-500/20 text-green-400 text-sm flex items-start gap-2">
                  <CheckCircle size={15} className="shrink-0 mt-0.5" />
                  <span>If that admin email exists, a reset link has been sent. Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {fpError && (
                    <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      {fpError}
                    </div>
                  )}
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      placeholder="Admin email address"
                      value={fpEmail}
                      onChange={(e) => setFpEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={fpLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 text-sm"
                  >
                    {fpLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send Reset Link <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          Codevra Admin Panel · Restricted Access
        </p>
      </div>
    </div>
  )
}