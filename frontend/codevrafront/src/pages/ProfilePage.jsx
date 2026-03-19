import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Github, Globe, Twitter, Linkedin, MapPin, Edit3, Save, X, Award, Zap, Clock, BookOpen, Sword, TrendingUp, CheckCircle, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { profileApi } from '../lib/api';

const TIER_COLORS = {
  Bronze: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  Silver: 'text-slate-300 bg-slate-300/10 border-slate-300/30',
  Gold: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Platinum: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  Diamond: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
};

const TIER_XP = { Bronze: 0, Silver: 300, Gold: 1000, Platinum: 2000, Diamond: 5000 };
const TIER_ORDER = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];

function XPBar({ xp, tier }) {
  const idx = TIER_ORDER.indexOf(tier);
  const nextTier = TIER_ORDER[idx + 1];
  const current = TIER_XP[tier];
  const next = nextTier ? TIER_XP[nextTier] : TIER_XP[tier];
  const pct = nextTier ? Math.min(100, ((xp - current) / (next - current)) * 100) : 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-dark-500">
        <span>{tier}</span>
        {nextTier && <span>{nextTier} at {next} XP</span>}
      </div>
      <div className="h-2 rounded-full bg-dark-800/60">
        <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-dark-500">{xp} XP {nextTier && `· ${next - xp} to ${nextTier}`}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [form, setForm] = useState({ bio: '', avatar: '', github: '', twitter: '', linkedin: '', website: '', location: '' });

  useEffect(() => {
    if (!user) { navigate('/auth/login'); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data: res } = await profileApi.get();
      setData(res);
      setForm({
        bio: res.profile.bio || '',
        avatar: res.profile.avatar || '',
        github: res.profile.github || '',
        twitter: res.profile.twitter || '',
        linkedin: res.profile.linkedin || '',
        website: res.profile.website || '',
        location: res.profile.location || '',
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

  if (loading) return <div className="flex items-center justify-center py-32"><p className="text-dark-400">Loading profile...</p></div>;
  if (!data) return null;

  const { stats, certificates, recentSubmissions, trackerItems } = data;
  const tierColor = TIER_COLORS[stats.tier] || TIER_COLORS.Bronze;
  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'tracker', label: 'Learning', icon: BookOpen },
    { id: 'arena', label: 'Arena', icon: Sword },
  ];

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      <section className="relative py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Profile Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="shrink-0">
                {form.avatar ? (
                  <img src={form.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500/30" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-dark-700/50 flex items-center justify-center text-2xl font-bold text-dark-200">
                    {initials}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-dark-100">{user.name}</h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${tierColor}`}>{stats.tier}</span>
                  {user.role === 'admin' && <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-500/10 text-accent-400 border border-accent-500/30">Admin</span>}
                </div>
                <p className="text-sm text-dark-400 mb-2">{user.email}</p>
                {form.bio && <p className="text-sm text-dark-300 mb-3">{form.bio}</p>}

                {/* Socials */}
                <div className="flex flex-wrap gap-3 text-xs text-dark-500">
                  {form.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{form.location}</span>}
                  {form.github && <a href={`https://github.com/${form.github.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Github className="w-3 h-3" />{form.github}</a>}
                  {form.twitter && <a href={`https://twitter.com/${form.twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Twitter className="w-3 h-3" />{form.twitter}</a>}
                  {form.linkedin && <a href={form.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Linkedin className="w-3 h-3" />LinkedIn</a>}
                  {form.website && <a href={form.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-400 transition-colors"><Globe className="w-3 h-3" />Website</a>}
                </div>
              </div>

              <Button size="sm" variant="secondary" onClick={() => setEditing(!editing)}>
                <Edit3 className="w-4 h-4" /> Edit Profile
              </Button>
            </div>

            {/* XP Bar */}
            <div className="mt-6 pt-6 border-t border-dark-700/30">
              <XPBar xp={stats.xp} tier={stats.tier} />
            </div>
          </motion.div>

          {/* Edit Form */}
          {editing && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-semibold text-dark-200 mb-4">Edit Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-dark-400 mb-1">Bio</label>
                  <textarea rows={2} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" placeholder="Tell the community about yourself..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-dark-400 mb-1">Avatar URL</label>
                  <input type="url" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" placeholder="https://..." />
                </div>
                {[
                  { key: 'location', label: 'Location', placeholder: 'Nairobi, Kenya' },
                  { key: 'github', label: 'GitHub Username', placeholder: '@username' },
                  { key: 'twitter', label: 'Twitter Handle', placeholder: '@handle' },
                  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
                  { key: 'website', label: 'Website', placeholder: 'https://yoursite.com' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs text-dark-400 mb-1">{label}</label>
                    <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" placeholder={placeholder} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <Button size="sm" onClick={saveProfile} disabled={saving}><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="secondary" onClick={() => setEditing(false)}><X className="w-4 h-4" />Cancel</Button>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Zap, label: 'Total XP', value: stats.xp, color: 'text-brand-400' },
              { icon: Award, label: 'Certificates', value: stats.certificates, color: 'text-yellow-400' },
              { icon: Sword, label: 'Challenges Solved', value: stats.challengesSolved, color: 'text-accent-400' },
              { icon: Clock, label: 'Time Spent', value: `${Math.floor(stats.timeSpentMinutes / 60)}h ${stats.timeSpentMinutes % 60}m`, color: 'text-cyan-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 text-center">
                <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
                <div className="text-xl font-bold text-dark-100">{value}</div>
                <div className="text-xs text-dark-500">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Submissions */}
              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-dark-200 mb-4 flex items-center gap-2"><Sword className="w-4 h-4 text-accent-400" />Recent Arena Submissions</h3>
                {recentSubmissions.length === 0 ? (
                  <p className="text-sm text-dark-500">No submissions yet. <a href="/hub/arena" className="text-brand-400 hover:underline">Try the Arena →</a></p>
                ) : (
                  <div className="space-y-2">
                    {recentSubmissions.map(s => (
                      <div key={s._id} className="flex items-center justify-between p-2.5 rounded-lg bg-dark-800/30">
                        <span className="text-sm text-dark-300 truncate">{s.language}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-brand-400">+{s.points} XP</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${s.passed ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{s.passed ? 'Passed' : 'Failed'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tracker Summary */}
              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-dark-200 mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" />Learning Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-dark-800/30">
                    <span className="text-sm text-dark-300">Completed</span>
                    <span className="text-sm font-bold text-green-400">{stats.trackerCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-dark-800/30">
                    <span className="text-sm text-dark-300">In Progress</span>
                    <span className="text-sm font-bold text-brand-400">{stats.trackerInProgress}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-dark-800/30">
                    <span className="text-sm text-dark-300">Total Items</span>
                    <span className="text-sm font-bold text-dark-200">{trackerItems.length}</span>
                  </div>
                </div>
                <a href="/hub/tracker" className="block mt-3 text-xs text-brand-400 hover:underline">Go to Tracker →</a>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              {certificates.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center">
                  <Award className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-dark-400 mb-1">No certificates yet</p>
                  <p className="text-sm text-dark-600">Complete challenges and courses to earn certificates from Codevra.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certificates.map(cert => (
                    <motion.div key={cert._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5 border border-yellow-500/10 hover:border-yellow-500/30 transition-all">
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
              )}
            </div>
          )}

          {activeTab === 'tracker' && (
            <div className="space-y-3">
              {trackerItems.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center">
                  <BookOpen className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-dark-400 mb-1">No learning items yet</p>
                  <a href="/hub/tracker" className="text-sm text-brand-400 hover:underline">Start tracking your learning →</a>
                </div>
              ) : trackerItems.map(item => (
                <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'completed' ? 'bg-green-400' : item.status === 'in-progress' ? 'bg-brand-400' : 'bg-dark-600'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-100 truncate">{item.title}</p>
                    <p className="text-xs text-dark-500 capitalize">{item.type} · {item.status}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-brand-400">{item.progress}%</p>
                    <div className="w-16 h-1.5 rounded-full bg-dark-800/60 mt-1">
                      <div className="h-1.5 rounded-full bg-brand-500" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'arena' && (
            <div className="space-y-3">
              {recentSubmissions.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center">
                  <Sword className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-dark-400 mb-1">No arena submissions yet</p>
                  <a href="/hub/arena" className="text-sm text-brand-400 hover:underline">Start competing →</a>
                </div>
              ) : recentSubmissions.map(s => (
                <motion.div key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
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
          )}

        </div>
      </section>
    </div>
  );
}
