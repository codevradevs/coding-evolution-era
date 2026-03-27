import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Briefcase, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'

const STATUS_STYLES = {
  new:       'bg-blue-500/10 text-blue-400 border-blue-500/20',
  reviewed:  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  contacted: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  closed:    'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState(1)
  const LIMIT = 20

  const fetch = useCallback(() => {
    setLoading(true)
    adminApi.getQuotes({ page, limit: LIMIT, status: filterStatus || undefined })
      .then(({ data }) => { setQuotes(data.quotes || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page, filterStatus])

  useEffect(() => { fetch() }, [fetch])

  const updateStatus = async (id, status) => {
    await adminApi.updateQuote(id, { status })
    setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q))
  }

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteQuote(deleting._id)
    setQuotes(prev => prev.filter(q => q._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Briefcase size={22} className="text-blue-400" /> Service Quotes</h1>
          <p className="text-slate-500 text-sm mt-1">{total} quote requests</p>
        </div>
        <div className="flex gap-2">
          {['', 'new', 'reviewed', 'contacted', 'closed'].map(s => (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1) }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border capitalize ${filterStatus === s ? 'bg-brand-500/15 text-brand-400 border-brand-500/30' : 'bg-dark-900 text-slate-500 border-white/8 hover:text-white'}`}>
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({length:3}).map((_,i) => <div key={i} className="bg-dark-900/60 border border-white/6 rounded-2xl p-5"><div className="h-4 bg-white/5 rounded animate-pulse w-1/2" /></div>)}</div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-16 text-slate-600"><Briefcase size={32} className="mx-auto mb-2 opacity-30" /><p>No quotes found</p></div>
      ) : (
        <div className="space-y-3">
          {quotes.map(q => (
            <div key={q._id} className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 flex items-start justify-between gap-4 cursor-pointer" onClick={() => setExpanded(expanded === q._id ? null : q._id)}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold">{q.serviceTitle}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[q.status]}`}>{q.status}</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-0.5">{q.name} · {q.email}</p>
                  {q.company && <p className="text-slate-600 text-xs mt-0.5">{q.company}</p>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-slate-600 text-xs">{new Date(q.createdAt).toLocaleDateString()}</p>
                  <button onClick={e => { e.stopPropagation(); setDeleting(q) }} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/8 transition"><Trash2 size={13} /></button>
                  {expanded === q._id ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
                </div>
              </div>

              {expanded === q._id && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Requirements</p>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{q.requirements}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Proposal</p>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{q.proposal}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-slate-500">Update status:</p>
                    {['new','reviewed','contacted','closed'].map(s => (
                      <button key={s} onClick={() => updateStatus(q._id, s)}
                        className={`px-3 py-1 rounded-lg text-xs capitalize transition border ${q.status === s ? STATUS_STYLES[s] : 'text-slate-500 border-white/8 hover:text-white'}`}>
                        {s}
                      </button>
                    ))}
                    <a href={`mailto:${q.email}?subject=Re: ${encodeURIComponent(q.serviceTitle)}`} className="ml-auto text-xs text-brand-400 hover:text-brand-300 transition">Reply via email →</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {deleting && <ConfirmDialog message={`Delete quote from "${deleting.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
