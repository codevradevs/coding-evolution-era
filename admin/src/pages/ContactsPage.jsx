import { useEffect, useState } from 'react'
import { adminApi } from '../lib/api'
import { MessageSquare, Mail, Clock, Inbox, Trash2 } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'

const TYPE_STYLE = {
  intake:   'bg-purple-500/10 text-purple-400 border-purple-500/20',
  contact:  'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

export default function ContactsPage() {
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    adminApi.getContacts()
      .then(({ data }) => {
        setMessages(data.messages || data)
        setTotal(data.total || data.messages?.length || data.length || 0)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteContact(deleting._id)
    setMessages(prev => prev.filter(m => m._id !== deleting._id))
    setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare size={22} className="text-rose-500" /> Messages
        </h1>
        <p className="text-slate-500 text-sm mt-1">{total} contact submissions</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-dark-900/60 border border-white/6 rounded-2xl p-5">
              <div className="h-4 bg-white/5 rounded animate-pulse w-1/3 mb-2" />
              <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-slate-600">
          <Inbox size={36} className="mx-auto mb-3 opacity-30" />
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={m._id}
              className="bg-dark-900/60 border border-white/6 rounded-2xl p-5 hover:border-white/12 transition-all animate-slide-up cursor-pointer"
              style={{ animationDelay: `${i * 30}ms` }}
              onClick={() => setExpanded(expanded === m._id ? null : m._id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500/30 to-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={14} className="text-rose-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold text-sm">{m.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${TYPE_STYLE[m.type] || TYPE_STYLE.contact}`}>
                        {m.type === 'intake' ? 'Project Intake' : 'Contact'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">{m.email}</p>
                    <p className="text-slate-300 text-sm mt-1.5 font-medium">{m.subject}</p>
                    {expanded !== m._id && (
                      <p className="text-slate-500 text-xs mt-1 line-clamp-1">{m.message}</p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-600 flex items-center gap-1 justify-end">
                    <Clock size={10} />
                    {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-[10px] text-slate-700 mt-0.5">
                    {new Date(m.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <button onClick={e => { e.stopPropagation(); setDeleting(m) }} className="mt-2 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/8 transition">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              {expanded === m._id && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 mt-3 text-xs text-brand-400 hover:text-brand-300 transition"
                  >
                    <Mail size={11} /> Reply via email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {deleting && <ConfirmDialog message={`Delete message from "${deleting.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
