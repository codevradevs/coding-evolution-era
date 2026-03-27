import { useEffect, useState } from 'react'
import { adminApi } from '../lib/api'
import { Users, Trophy, BookOpen, Code2, TrendingUp, UserPlus, Star, Lightbulb, MessageSquare } from 'lucide-react'

const TIER_COLORS = {
  Diamond: 'text-cyan-400', Platinum: 'text-purple-400',
  Gold: 'text-yellow-400', Silver: 'text-slate-300', Bronze: 'text-orange-400',
}

function StatCard({ icon: Icon, label, value, sub, gradient, delay = 0 }) {
  return (
    <div
      className="stat-card rounded-2xl p-5 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon size={18} className="text-white" />
        </div>
        <TrendingUp size={12} className="text-slate-600 mt-1" />
      </div>
      <p className="text-3xl font-bold text-white">{value ?? <span className="text-slate-600">—</span>}</p>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
      {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
    </div>
  )
}

function RecentUser({ user, index }) {
  const initials = user.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
  const colors = ['from-brand-500 to-accent-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-yellow-500', 'from-blue-500 to-cyan-500']
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/4 last:border-0 animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white truncate">{user.name}</p>
        <p className="text-xs text-slate-500 truncate">{user.email}</p>
      </div>
      <div className="text-right shrink-0">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.role === 'admin' ? 'bg-brand-500/15 text-brand-400' : 'bg-white/5 text-slate-400'}`}>
          {user.role || 'user'}
        </span>
        <p className="text-[10px] text-slate-600 mt-0.5">{new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

function TopRanker({ ranker, index }) {
  const medals = ['🥇', '🥈', '🥉']
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/4 last:border-0">
      <span className="text-lg w-6 text-center">{medals[index] || `#${index + 1}`}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{ranker.name}</p>
        <p className={`text-xs font-medium ${TIER_COLORS[ranker.tier] || 'text-slate-400'}`}>{ranker.tier}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-brand-400">{ranker.xp?.toLocaleString()}</p>
        <p className="text-[10px] text-slate-600">XP</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState({})
  const [recentUsers, setRecentUsers] = useState([])
  const [topRankers, setTopRankers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      adminApi.getUserStats(),
      adminApi.getUsers({ limit: 5 }),
      adminApi.getRankings({ limit: 5 }),
    ]).then(([statsRes, usersRes, rankingsRes]) => {
      const s = statsRes.value?.data
      if (s) {
        setStats({
          totalUsers: s.total,
          newThisMonth: s.newThisMonth,
          blogs: s.blogs,
          challenges: s.challenges,
          tips: s.tips,
          contacts: s.contacts,
          rankings: s.rankings,
        })
      }
      setRecentUsers(usersRes.value?.data?.users?.slice(0, 5) || [])
      const rankData = rankingsRes.value?.data
      setTopRankers((rankData?.rankings || (Array.isArray(rankData) ? rankData : [])).slice(0, 5))
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Platform overview · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users}         label="Total Users"   value={stats.totalUsers}  sub={`+${stats.newThisMonth ?? 0} this month`} gradient="from-brand-500 to-brand-600"     delay={0}   />
        <StatCard icon={Trophy}        label="Ranked Users"  value={stats.rankings}    sub="on leaderboard"    gradient="from-yellow-500 to-orange-500"  delay={60}  />
        <StatCard icon={BookOpen}      label="Blog Posts"    value={stats.blogs}       sub="published"         gradient="from-accent-500 to-blue-500"    delay={120} />
        <StatCard icon={Code2}         label="Challenges"    value={stats.challenges}  sub="coding problems"   gradient="from-purple-500 to-pink-500"    delay={180} />
        <StatCard icon={Lightbulb}     label="Dev Tips"      value={stats.tips}        sub="in the hub"        gradient="from-teal-500 to-green-500"     delay={240} />
        <StatCard icon={MessageSquare} label="Messages"      value={stats.contacts}    sub="contact forms"     gradient="from-rose-500 to-orange-500"    delay={300} />
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="bg-dark-900/60 border border-white/6 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserPlus size={16} className="text-brand-500" />
              <h3 className="font-semibold text-white text-sm">Recent Signups</h3>
            </div>
            <a href="/users" className="text-xs text-slate-500 hover:text-brand-400 transition">View all →</a>
          </div>
          {recentUsers.length === 0
            ? <p className="text-slate-600 text-sm text-center py-6">No users yet</p>
            : recentUsers.map((u, i) => <RecentUser key={u._id} user={u} index={i} />)
          }
        </div>

        {/* Top rankers */}
        <div className="bg-dark-900/60 border border-white/6 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <h3 className="font-semibold text-white text-sm">Top Rankers</h3>
            </div>
            <a href="/rankings" className="text-xs text-slate-500 hover:text-brand-400 transition">View all →</a>
          </div>
          {topRankers.length === 0
            ? <p className="text-slate-600 text-sm text-center py-6">No rankings yet</p>
            : topRankers.map((r, i) => <TopRanker key={r.userId || i} ranker={r} index={i} />)
          }
        </div>
      </div>
    </div>
  )
}
