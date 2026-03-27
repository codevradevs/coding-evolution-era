import { FileCode, Lock, BookMarked, Network, UserCircle } from 'lucide-react'
import DataPage from '../components/DataPage'
import { adminApi } from '../lib/api'

export function SubmissionsPage() {
  return (
    <DataPage
      title="Submissions"
      icon={FileCode}
      color="text-indigo-400"
      fetchFn={adminApi.getSubmissions}
      deleteFn={adminApi.deleteSubmission}
      emptyMsg="No submissions yet"
      columns={[
        { key: 'user', label: 'User', render: r => <div><p className="text-white text-xs">{r.userId?.name || '—'}</p><p className="text-slate-600 text-xs">{r.userId?.email}</p></div> },
        { key: 'challenge', label: 'Challenge', render: r => <span className="text-slate-300 text-xs">{r.challengeId?.title || '—'}</span> },
        { key: 'language', label: 'Language', render: r => <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400">{r.language}</span> },
        { key: 'passed', label: 'Result', render: r => <span className={`text-xs font-semibold ${r.passed ? 'text-green-400' : 'text-red-400'}`}>{r.passed ? '✓ Passed' : '✗ Failed'}</span> },
        { key: 'submittedAt', label: 'Date', hidden: 'hidden lg:table-cell', render: r => <span className="text-slate-500 text-xs">{new Date(r.submittedAt).toLocaleDateString()}</span> },
      ]}
    />
  )
}

export function VaultPage() {
  return (
    <DataPage
      title="Vault Notes"
      icon={Lock}
      color="text-rose-400"
      fetchFn={adminApi.getVaultNotes}
      deleteFn={adminApi.deleteVaultNote}
      emptyMsg="No vault notes"
      columns={[
        { key: 'title', label: 'Title', render: r => <span className="text-white font-medium text-sm">{r.title}</span> },
        { key: 'user', label: 'Owner', render: r => <div><p className="text-slate-300 text-xs">{r.userId?.name || '—'}</p><p className="text-slate-600 text-xs">{r.userId?.email}</p></div> },
        { key: 'tags', label: 'Tags', hidden: 'hidden md:table-cell', render: r => <div className="flex gap-1 flex-wrap">{(r.tags||[]).slice(0,3).map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{t}</span>)}</div> },
        { key: 'updatedAt', label: 'Updated', hidden: 'hidden lg:table-cell', render: r => <span className="text-slate-500 text-xs">{new Date(r.updatedAt).toLocaleDateString()}</span> },
      ]}
    />
  )
}

export function TrackerPage() {
  const STATUS_COLORS = { completed: 'text-green-400', 'in-progress': 'text-yellow-400', planned: 'text-slate-400' }
  return (
    <DataPage
      title="Tracker Items"
      icon={BookMarked}
      color="text-cyan-400"
      fetchFn={adminApi.getTrackerItems}
      deleteFn={adminApi.deleteTrackerItem}
      emptyMsg="No tracker items"
      columns={[
        { key: 'title', label: 'Title', render: r => <span className="text-white font-medium text-sm">{r.title}</span> },
        { key: 'user', label: 'User', render: r => <span className="text-slate-300 text-xs">{r.userId?.name || '—'}</span> },
        { key: 'type', label: 'Type', hidden: 'hidden md:table-cell', render: r => <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 capitalize">{r.type}</span> },
        { key: 'status', label: 'Status', render: r => <span className={`text-xs font-medium capitalize ${STATUS_COLORS[r.status] || 'text-slate-400'}`}>{r.status}</span> },
        { key: 'progress', label: 'Progress', hidden: 'hidden lg:table-cell', render: r => (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-brand-500 rounded-full" style={{ width: `${r.progress||0}%` }} /></div>
            <span className="text-xs text-slate-500">{r.progress||0}%</span>
          </div>
        )},
      ]}
    />
  )
}

export function NetworkPage() {
  return (
    <DataPage
      title="Network Profiles"
      icon={Network}
      color="text-violet-400"
      fetchFn={adminApi.getNetworkProfiles}
      deleteFn={adminApi.deleteNetworkProfile}
      emptyMsg="No network profiles"
      columns={[
        { key: 'user', label: 'User', render: r => <div><p className="text-white text-sm">{r.userId?.name || '—'}</p><p className="text-slate-600 text-xs">{r.userId?.email}</p></div> },
        { key: 'location', label: 'Location', hidden: 'hidden md:table-cell', render: r => <span className="text-slate-400 text-xs">{r.location || '—'}</span> },
        { key: 'lookingFor', label: 'Looking For', render: r => <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 capitalize">{r.lookingFor || 'none'}</span> },
        { key: 'skills', label: 'Skills', hidden: 'hidden lg:table-cell', render: r => <div className="flex gap-1 flex-wrap">{(r.skills||[]).slice(0,3).map(s => <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{s}</span>)}</div> },
      ]}
    />
  )
}

export function UserProfilesPage() {
  return (
    <DataPage
      title="User Profiles"
      icon={UserCircle}
      color="text-pink-400"
      fetchFn={adminApi.getUserProfiles}
      deleteFn={() => Promise.resolve()} // profiles shouldn't be deleted, just viewed
      emptyMsg="No user profiles"
      columns={[
        { key: 'user', label: 'User', render: r => <div><p className="text-white text-sm">{r.userId?.name || '—'}</p><p className="text-slate-600 text-xs">{r.userId?.email}</p></div> },
        { key: 'xp', label: 'XP', render: r => <span className="text-brand-400 font-bold text-sm">{r.xp || 0}</span> },
        { key: 'timeSpentMinutes', label: 'Time', hidden: 'hidden md:table-cell', render: r => <span className="text-slate-400 text-xs">{Math.round((r.timeSpentMinutes||0)/60)}h {(r.timeSpentMinutes||0)%60}m</span> },
        { key: 'location', label: 'Location', hidden: 'hidden lg:table-cell', render: r => <span className="text-slate-500 text-xs">{r.location || '—'}</span> },
        { key: 'lastSeen', label: 'Last Seen', hidden: 'hidden lg:table-cell', render: r => <span className="text-slate-500 text-xs">{r.lastSeen ? new Date(r.lastSeen).toLocaleDateString() : '—'}</span> },
      ]}
    />
  )
}
