import { useEffect, useState } from 'react'
import { adminApi } from '../lib/api'
import { Trophy, Zap, Clock, Award, Code2 } from 'lucide-react'

const TIER_CONFIG = {
  Diamond:  { color: 'text-cyan-400',   bg: 'bg-cyan-400/10',   border: 'border-cyan-400/20',   emoji: '💎' },
  Platinum: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', emoji: '🔮' },
  Gold:     { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', emoji: '🥇' },
  Silver:   { color: 'text-slate-300',  bg: 'bg-slate-400/10',  border: 'border-slate-400/20',  emoji: '🥈' },
  Bronze:   { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', emoji: '🥉' },
}

const AVATAR_COLORS = [
  'from-yellow-500 to-orange-500',
  'from-slate-400 to-slate-500',
  'from-orange-600 to-yellow-700',
]

function PodiumCard({ ranker, position }) {
  const heights = ['h-28', 'h-20', 'h-16']
  const medals = ['🥇', '🥈', '🥉']
  const tier = TIER_CONFIG[ranker.tier] || TIER_CONFIG.Bronze
  const initials = ranker.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_COLORS[position]} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
        {initials}
      </div>
      <p className="text-white font-semibold text-sm text-center max-w-[80px] truncate">{ranker.name}</p>
      <span className={`text-xs px-2 py-0.5 rounded-full border ${tier.bg} ${tier.color} ${tier.border}`}>{tier.emoji} {ranker.tier}</span>
      <p className="text-brand-400 font-bold text-sm">{ranker.xp?.toLocaleString()} XP</p>
      <div className={`w-20 ${heights[position]} bg-gradient-to-t ${position === 0 ? 'from-yellow-500/30 to-yellow-500/5 border-yellow-500/30' : position === 1 ? 'from-slate-500/30 to-slate-500/5 border-slate-500/30' : 'from-orange-500/30 to-orange-500/5 border-orange-500/30'} border rounded-t-xl flex items-end justify-center pb-2`}>
        <span className="text-2xl">{medals[position]}</span>
      </div>
    </div>
  )
}

export default function RankingsPage() {
  const [rankings, setRankings] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('xp')

  useEffect(() => {
    setLoading(true)
    adminApi.getRankings({ sort, limit: 100 })
      .then(({ data }) => setRankings(Array.isArray(data) ? data : (data.rankings || [])))
      .finally(() => setLoading(false))
  }, [sort])

  const maxXP = rankings[0]?.xp || 1

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy size={22} className="text-yellow-500" /> Rankings
          </h1>
          <p className="text-slate-500 text-sm mt-1">{rankings.length} ranked users</p>
        </div>
        <div className="flex gap-2">
          {[['xp', 'XP'], ['challenges', 'Challenges'], ['certificates', 'Certs'], ['time', 'Time']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSort(val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${sort === val ? 'bg-brand-500/15 text-brand-400 border-brand-500/30' : 'bg-dark-900 text-slate-500 border-white/8 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-7 h-7 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Podium top 3 */}
          {rankings.length >= 3 && (
            <div className="bg-dark-900/60 border border-white/6 rounded-2xl p-6">
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-6 text-center">Top 3</p>
              <div className="flex items-end justify-center gap-6">
                <PodiumCard ranker={rankings[1]} position={1} />
                <PodiumCard ranker={rankings[0]} position={0} />
                <PodiumCard ranker={rankings[2]} position={2} />
              </div>
            </div>
          )}

          {/* Full table */}
          <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3.5 w-12">#</th>
                  <th className="text-left px-4 py-3.5">User</th>
                  <th className="text-left px-4 py-3.5 hidden md:table-cell">Tier</th>
                  <th className="text-left px-4 py-3.5">XP</th>
                  <th className="text-left px-4 py-3.5 hidden lg:table-cell">Challenges</th>
                  <th className="text-left px-4 py-3.5 hidden lg:table-cell">Certs</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((r, i) => {
                  const tier = TIER_CONFIG[r.tier] || TIER_CONFIG.Bronze
                  const initials = r.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
                  const xpPct = Math.min(100, Math.round((r.xp / maxXP) * 100))
                  return (
                    <tr key={r.userId || i} className="border-b border-white/4 hover:bg-white/2 transition">
                      <td className="px-5 py-3.5">
                        <span className={`text-sm font-bold ${i < 3 ? 'text-yellow-500' : 'text-slate-600'}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500/40 to-accent-500/40 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate">{r.name}</p>
                            <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all" style={{ width: `${xpPct}%` }} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${tier.bg} ${tier.color} ${tier.border}`}>
                          {tier.emoji} {r.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-brand-400 font-semibold flex items-center gap-1">
                          <Zap size={11} />{r.xp?.toLocaleString() ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Code2 size={11} />{r.challengesSolved ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Award size={11} />{r.certificateCount ?? 0}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {rankings.length === 0 && (
              <div className="text-center py-12 text-slate-600">
                <Trophy size={32} className="mx-auto mb-2 opacity-30" />
                <p>No rankings yet</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
