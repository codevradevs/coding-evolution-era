import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Award, Clock, Sword, Crown, User } from 'lucide-react';
import { rankingsApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const TIER_COLORS = {
  Bronze: 'text-orange-400',
  Silver: 'text-slate-300',
  Gold: 'text-yellow-400',
  Platinum: 'text-cyan-400',
  Diamond: 'text-purple-400',
};

const TIER_EMOJI = { Bronze: '🥉', Silver: '🥈', Gold: '🥇', Platinum: '💎', Diamond: '👑' };

const RANK_MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

const tabs = [
  { id: 'xp', label: 'XP', icon: Zap, valueKey: 'xp', format: v => `${v} XP` },
  { id: 'certificates', label: 'Certificates', icon: Award, valueKey: 'certificateCount', format: v => `${v} certs` },
  { id: 'time', label: 'Time Spent', icon: Clock, valueKey: 'timeSpentMinutes', format: v => `${Math.floor(v / 60)}h ${v % 60}m` },
  { id: 'challenges', label: 'Challenges', icon: Sword, valueKey: 'challengesSolved', format: v => `${v} solved` },
];

export default function RankingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('xp');
  const [rankings, setRankings] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
    if (user) fetchMyRank();
  }, [activeTab]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const { data } = await rankingsApi.get(activeTab);
      setRankings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRank = async () => {
    try {
      const { data } = await rankingsApi.getMe();
      setMyRank(data);
    } catch (e) {}
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <Trophy className="w-3 h-3" />LEADERBOARD
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Developer <span className="gradient-text">Rankings</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-dark-400 max-w-xl mx-auto">
            Compete, learn, and climb the ranks. XP earned through challenges, learning, and time on the platform.
          </motion.p>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="max-w-4xl mx-auto">

          {/* My Rank Banner */}
          {user && myRank?.rank && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-brand-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-100">Your Rank</p>
                  <p className="text-xs text-dark-500">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div><p className="text-2xl font-bold text-brand-400">#{myRank.rank}</p><p className="text-xs text-dark-500">Overall</p></div>
                <div><p className="text-lg font-bold text-dark-100">{myRank.xp || 0}</p><p className="text-xs text-dark-500">XP</p></div>
                <div><p className={`text-lg font-bold ${TIER_COLORS[myRank.tier] || 'text-dark-100'}`}>{TIER_EMOJI[myRank.tier]} {myRank.tier}</p><p className="text-xs text-dark-500">Tier</p></div>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          {!loading && rankings.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[rankings[1], rankings[0], rankings[2]].map((r, i) => {
                const podiumPos = [2, 1, 3][i];
                const heights = ['h-24', 'h-32', 'h-20'];
                return r ? (
                  <motion.div key={r.userId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-4 text-center flex flex-col items-center justify-end">
                    <div className="text-2xl mb-1">{RANK_MEDAL[podiumPos]}</div>
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-500/30 mb-1" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-dark-700/50 flex items-center justify-center text-sm font-bold text-dark-200 mb-1">
                        {r.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <p className="text-xs font-semibold text-dark-100 truncate w-full">{r.name}</p>
                    <p className={`text-xs font-bold mt-0.5 ${TIER_COLORS[r.tier] || 'text-dark-400'}`}>{r.tier}</p>
                    <p className="text-sm font-bold text-brand-400 mt-1">{activeTabData.format(r[activeTabData.valueKey])}</p>
                  </motion.div>
                ) : <div key={i} />;
              })}
            </div>
          )}

          {/* Full List */}
          {loading ? (
            <div className="text-center py-12"><p className="text-dark-400">Loading rankings...</p></div>
          ) : rankings.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <Trophy className="w-12 h-12 text-dark-600 mx-auto mb-3" />
              <p className="text-dark-400">No rankings yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {rankings.map((r, i) => {
                const isMe = user && r.userId?.toString() === user.id?.toString();
                return (
                  <motion.div key={r.userId || i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className={`glass rounded-xl p-4 flex items-center gap-4 transition-all ${isMe ? 'border border-brand-500/30 bg-brand-500/5' : 'hover:border-dark-600/50'}`}>
                    {/* Rank */}
                    <div className="w-8 text-center shrink-0">
                      {RANK_MEDAL[r.rank] ? (
                        <span className="text-lg">{RANK_MEDAL[r.rank]}</span>
                      ) : (
                        <span className="text-sm font-bold text-dark-500">#{r.rank}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-xl object-cover border border-dark-700/50 shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-dark-700/50 flex items-center justify-center text-xs font-bold text-dark-200 shrink-0">
                        {r.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    {/* Name + tier */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-dark-100 truncate">{r.name}{isMe && <span className="ml-1 text-xs text-brand-400">(you)</span>}</p>
                        <span className={`text-xs font-medium shrink-0 ${TIER_COLORS[r.tier] || 'text-dark-500'}`}>{TIER_EMOJI[r.tier]} {r.tier}</span>
                      </div>
                      {r.bio && <p className="text-xs text-dark-500 truncate">{r.bio}</p>}
                    </div>

                    {/* Stats */}
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-brand-400">{activeTabData.format(r[activeTabData.valueKey])}</p>
                      <div className="flex items-center gap-2 justify-end mt-0.5 text-xs text-dark-600">
                        <span>{r.certificateCount} certs</span>
                        <span>{r.challengesSolved} solved</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
