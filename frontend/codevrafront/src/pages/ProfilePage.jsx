import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Github, Globe, Twitter, Linkedin, MapPin, Edit3, Save, X,
  Award, Zap, Clock, BookOpen, Sword, TrendingUp, CheckCircle, Trophy,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { profileApi } from '../lib/api';

const TIER_COLORS = {
  Bronze:   'text-orange-400 bg-orange-400/10 border-orange-400/30',
  Silver:   'text-slate-300  bg-slate-300/10  border-slate-300/30',
  Gold:     'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Platinum: 'text-cyan-400   bg-cyan-400/10   border-cyan-400/30',
  Diamond:  'text-purple-400 bg-purple-400/10 border-purple-400/30',
};
const TIER_GLOW = {
  Bronze: '0 0 24px rgba(251,146,60,0.25)',
  Silver: '0 0 24px rgba(203,213,225,0.2)',
  Gold:   '0 0 24px rgba(250,204,21,0.3)',
  Platinum:'0 0 24px rgba(34,211,238,0.3)',
  Diamond:'0 0 24px rgba(192,132,252,0.35)',
};
const TIER_XP    = { Bronze: 0, Silver: 300, Gold: 1000, Platinum: 2000, Diamond: 5000 };
const TIER_ORDER = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];

/* ── Animated XP bar ── */
function XPBar({ xp, tier }) {
  const idx     = TIER_ORDER.indexOf(tier);
  const nextTier = TIER_ORDER[idx + 1];
  const current  = TIER_XP[tier];
  const next     = nextTier ? TIER_XP[nextTier] : TIER_XP[tier];
  const pct      = nextTier ? Math.min(100, ((xp - current) / (next - current)) * 100) : 100;

  const raw    = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    raw.set(pct);
    const unsub = spring.on('change', v => setDisplay(v));
    return unsub;
  }, [pct]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-dark-500">
        <span className="font-medium">{tier}</span>
        {nextTier && <span>{nextTier} at {next} XP</span>}
      </div>
      <div className="h-2.5 rounded-full bg-dark-800/70 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500"
          style={{ width: `${display}%`, boxShadow: '0 0 8px rgba(34,197,94,0.5)' }}
        />
      </div>
      <p className="text-xs text-dark-500">
        {xp} XP{nextTier && ` · ${next - xp} to ${nextTier}`}
      </p>
    </div>
  );
}

/* ── Floating orb ── */
function Orb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Glassy stat card ── */
function StatCard({ icon: Icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(34,197,94,0.15)' }}
      className="glass rounded-2xl p-4 text-center cursor-default transition-shadow"
    >
      <div className={`w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center bg-dark-800/60 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-xl font-bold text-dark-100">{value}</div>
      <div className="text-xs text-dark-500 mt-0.5">{label}</div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [form, setForm] = useState({
    bio: '', avatar: '', github: '', twitter: '', linkedin: '', website: '', location: '',
  });

  useEffect(() => {
    if (!user) { navigate('/auth/login'); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data: res } = await profileApi.get();
      setData(res);
      const p = res.profile;
      setForm({
        bio: p.bio || '', avatar: p.avatar || '', github: p.github || '',
        twitter: p.twitter || '', linkedin: p.linkedin || '',
        website: p.website || '', location: p.location || '',
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await profileApi.update(form);
      await fetchProfile();
      setEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent"
      />
    </div>
  );
  if (!data) return null;

  const { stats, certificates, recentSubmissions, trackerItems } = data;
  const tierColor = TIER_COLORS[stats.tier] || TIER_COLORS.Bronze;
  const tierGlow  = TIER_GLOW[stats.tier]  || TIER_GLOW.Bronze;
  const initials  = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const tabs = [
    { id: 'overview',      label: 'Overview',      icon: User },
    { id: 'certificates',  label: 'Certificates',  icon: Award },
    { id: 'tracker',       label: 'Learning',       icon: BookOpen },
    { id: 'arena',         label: 'Arena',          icon: Sword },
  ];

  const inputCls = 'w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30';

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      <Orb className="w-96 h-96 bg-brand-500/10  top-10  -left-32" delay={0} />
      <Orb className="w-80 h-80 bg-accent-500/10 top-40  right-0"  delay={2} />
      <Orb className="w-64 h-64 bg-cyan-500/8    bottom-20 left-1/3" delay={4} />

      <section className="relative py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Profile Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl p-6 sm:p-8 mb-6 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.7) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: tierGlow,
            }}
          >
            {/* subtle inner shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-500/5 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar with animated ring */}
              <div className="shrink-0 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-60"
                  style={{ filter: 'blur(2px)' }}
                />
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                  {form.avatar ? (
                    <img src={form.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center text-2xl font-bold text-dark-100">
                      {initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-dark-100">{user.name}</h1>
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${tierColor}`}
                  >
                    {stats.tier}
                  </motion.span>
                  {user.role === 'admin' && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-500/10 text-accent-400 border border-accent-500/30">Admin</span>
                  )}
                </div>
                <p className="text-sm text-dark-400 mb-2">{user.email}</p>
                {form.bio && <p className="text-sm text-dark-300 mb-3">{form.bio}</p>}

                <div className="flex flex-wrap gap-3 text-xs text-dark-500">
                  {form.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{form.location}</span>}
                  {form.github   && <a href={`https://github.com/${form.github.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Github className="w-3 h-3" />{form.github}</a>}
                  {form.twitter  && <a href={`https://twitter.com/${form.twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Twitter className="w-3 h-3" />{form.twitter}</a>}
                  {form.linkedin && <a href={form.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Linkedin className="w-3 h-3" />LinkedIn</a>}
                  {form.website  && <a href={form.website}  target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Globe className="w-3 h-3" />Website</a>}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 shrink-0">
                <Button size="sm" variant="secondary" onClick={() => setEditing(!editing)}>
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </Button>
                <Link to="/rankings">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all"
                  >
                    <Trophy className="w-3.5 h-3.5" /> Rankings
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* XP Bar */}
            <div className="relative mt-6 pt-6 border-t border-white/5">
              <XPBar xp={stats.xp} tier={stats.tier} />
            </div>
          </motion.div>

          {/* ── Edit Form ── */}
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass rounded-2xl p-6 mb-6"
            >
              <h3 className="text-sm font-semibold text-dark-200 mb-4">Edit Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-dark-400 mb-1">Bio</label>
                  <textarea rows={2} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className={`${inputCls} resize-none`} placeholder="Tell the community about yourself..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-dark-400 mb-1">Avatar URL</label>
                  <input type="url" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} className={inputCls} placeholder="https://..." />
                </div>
                {[
                  { key: 'location', label: 'Location',       placeholder: 'Nairobi, Kenya' },
                  { key: 'github',   label: 'GitHub Username', placeholder: '@username' },
                  { key: 'twitter',  label: 'Twitter Handle',  placeholder: '@handle' },
                  { key: 'linkedin', label: 'LinkedIn URL',    placeholder: 'https://linkedin.com/in/...' },
                  { key: 'website',  label: 'Website',         placeholder: 'https://yoursite.com' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs text-dark-400 mb-1">{label}</label>
                    <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className={inputCls} placeholder={placeholder} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <Button size="sm" onClick={saveProfile} disabled={saving}><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="secondary" onClick={() => setEditing(false)}><X className="w-4 h-4" />Cancel</Button>
              </div>
            </motion.div>
          )}

          {/* ── Stats Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatCard icon={Zap}   label="Total XP"         value={stats.xp}            color="text-brand-400"  delay={0.1} />
            <StatCard icon={Award} label="Certificates"     value={stats.certificates}  color="text-yellow-400" delay={0.15} />
            <StatCard icon={Sword} label="Challenges Solved" value={stats.challengesSolved} color="text-accent-400" delay={0.2} />
            <StatCard icon={Clock} label="Time Spent"       value={`${Math.floor(stats.timeSpentMinutes / 60)}h ${stats.timeSpentMinutes % 60}m`} color="text-cyan-400" delay={0.25} />
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === id
                    ? 'bg-brand-500/15 text-brand-400 border border-brand-500/25 shadow-[0_0_12px_rgba(34,197,94,0.15)]'
                    : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />{label}
              </motion.button>
            ))}
          </div>

          {/* ── Tab Content ── */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassPanel title="Recent Arena Submissions" icon={<Sword className="w-4 h-4 text-accent-400" />}>
                  {recentSubmissions.length === 0 ? (
                    <p className="text-sm text-dark-500">No submissions yet. <Link to="/hub/arena" className="text-brand-400 hover:underline">Try the Arena →</Link></p>
                  ) : recentSubmissions.map(s => (
                    <div key={s._id} className="flex items-center justify-between p-2.5 rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-colors">
                      <span className="text-sm text-dark-300 truncate">{s.language}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-brand-400">+{s.points} XP</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${s.passed ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{s.passed ? 'Passed' : 'Failed'}</span>
                      </div>
                    </div>
                  ))}
                </GlassPanel>

                <GlassPanel title="Learning Progress" icon={<TrendingUp className="w-4 h-4 text-green-400" />}>
                  {[
                    { label: 'Completed',  value: stats.trackerCompleted,  color: 'text-green-400' },
                    { label: 'In Progress', value: stats.trackerInProgress, color: 'text-brand-400' },
                    { label: 'Total Items', value: trackerItems.length,     color: 'text-dark-200' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-center p-2.5 rounded-lg bg-dark-800/30">
                      <span className="text-sm text-dark-300">{label}</span>
                      <span className={`text-sm font-bold ${color}`}>{value}</span>
                    </div>
                  ))}
                  <Link to="/hub/tracker" className="block mt-2 text-xs text-brand-400 hover:underline">Go to Tracker →</Link>
                </GlassPanel>
              </div>
            )}

            {activeTab === 'certificates' && (
              certificates.length === 0 ? (
                <EmptyState icon={<Award className="w-12 h-12 text-dark-600" />} title="No certificates yet" sub="Complete challenges and courses to earn certificates." />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certificates.map((cert, i) => (
                    <motion.div
                      key={cert._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ boxShadow: '0 0 20px rgba(250,204,21,0.12)' }}
                      className="glass rounded-xl p-5 border border-yellow-500/10 hover:border-yellow-500/25 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{cert.badgeIcon || '🏆'}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-dark-100 mb-0.5">{cert.title}</h4>
                          {cert.description && <p className="text-xs text-dark-400 mb-2">{cert.description}</p>}
                          <div className="flex flex-wrap gap-2 text-xs text-dark-500">
                            <span className="px-2 py-0.5 rounded bg-dark-800/50 capitalize">{cert.category}</span>
                            <span>Awarded by {cert.awardedBy}</span>
                          </div>
                          <p className="text-xs text-dark-600 mt-1">ID: {cert.credentialId}</p>
                          <p className="text-xs text-dark-600">{new Date(cert.awardedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'tracker' && (
              trackerItems.length === 0 ? (
                <EmptyState icon={<BookOpen className="w-12 h-12 text-dark-600" />} title="No learning items yet" sub={<Link to="/hub/tracker" className="text-brand-400 hover:underline">Start tracking your learning →</Link>} />
              ) : (
                <div className="space-y-3">
                  {trackerItems.map((item, i) => (
                    <motion.div key={item._id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-dark-600/60 transition-colors">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'completed' ? 'bg-green-400' : item.status === 'in-progress' ? 'bg-brand-400' : 'bg-dark-600'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-dark-100 truncate">{item.title}</p>
                        <p className="text-xs text-dark-500 capitalize">{item.type} · {item.status}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-brand-400">{item.progress}%</p>
                        <div className="w-16 h-1.5 rounded-full bg-dark-800/60 mt-1">
                          <motion.div
                            className="h-1.5 rounded-full bg-brand-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 0.6, delay: i * 0.04 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'arena' && (
              recentSubmissions.length === 0 ? (
                <EmptyState icon={<Sword className="w-12 h-12 text-dark-600" />} title="No arena submissions yet" sub={<Link to="/hub/arena" className="text-brand-400 hover:underline">Start competing →</Link>} />
              ) : (
                <div className="space-y-3">
                  {recentSubmissions.map((s, i) => (
                    <motion.div key={s._id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-4 flex items-center justify-between gap-4 hover:border-dark-600/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${s.passed ? 'text-green-400' : 'text-red-400'}`} />
                        <div>
                          <p className="text-sm font-medium text-dark-100">{s.language} submission</p>
                          <p className="text-xs text-dark-500">{new Date(s.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-brand-400">+{s.points} XP</p>
                        <p className={`text-xs ${s.passed ? 'text-green-400' : 'text-red-400'}`}>{s.passed ? 'Passed' : 'Failed'}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}

          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Helpers ── */
function GlassPanel({ title, icon, children }) {
  return (
    <motion.div
      whileHover={{ boxShadow: '0 0 24px rgba(34,197,94,0.08)' }}
      className="glass rounded-2xl p-5 transition-shadow"
    >
      <h3 className="text-sm font-semibold text-dark-200 mb-4 flex items-center gap-2">{icon}{title}</h3>
      <div className="space-y-2">{children}</div>
    </motion.div>
  );
}

function EmptyState({ icon, title, sub }) {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="text-dark-400 mb-1">{title}</p>
      <p className="text-sm text-dark-600">{sub}</p>
    </div>
  );
}
