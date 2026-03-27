import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Lightbulb, Plus, Pencil, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Field, Input, Textarea, Select, FormGrid } from '../components/FormFields'

const CATEGORIES = ['Git','Deployment','VS Code','JavaScript','Security','AI','DevOps']
const DIFFICULTIES = ['Beginner','Intermediate','Advanced']
const EMPTY = { title: '', category: '', content: '', codeSnippet: '', difficulty: 'Beginner', track: '', xp: '5' }

function TipForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-xl">{error}</p>}
      <FormGrid>
        <Field label="Title"><Input placeholder="Tip title" value={value.title} onChange={e => onChange('title', e.target.value)} required /></Field>
        <Field label="XP Reward"><Input type="number" min="1" placeholder="5" value={value.xp} onChange={e => onChange('xp', e.target.value)} /></Field>
      </FormGrid>
      <FormGrid>
        <Field label="Category">
          <Select value={value.category} onChange={e => onChange('category', e.target.value)} required>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Difficulty">
          <Select value={value.difficulty} onChange={e => onChange('difficulty', e.target.value)}>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </Select>
        </Field>
      </FormGrid>
      <Field label="Content"><Textarea rows={4} placeholder="Tip content..." value={value.content} onChange={e => onChange('content', e.target.value)} required /></Field>
      <Field label="Code Snippet (optional)"><Textarea rows={4} placeholder="// code here..." value={value.codeSnippet} onChange={e => onChange('codeSnippet', e.target.value)} className="font-mono" /></Field>
      <Field label="Track (comma separated)"><Input placeholder="frontend, backend" value={value.track} onChange={e => onChange('track', e.target.value)} /></Field>
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Tip'}
      </button>
    </form>
  )
}

export default function TipsPage() {
  const [tips, setTips] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [filterDiff, setFilterDiff] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState(EMPTY)
  const LIMIT = 20

  const fetch = useCallback(() => {
    setLoading(true)
    adminApi.getTips({ page, limit: LIMIT, category: filterCat || undefined, difficulty: filterDiff || undefined })
      .then(({ data }) => { setTips(data.tips || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page, filterCat, filterDiff])

  useEffect(() => { fetch() }, [fetch])

  const filtered = search ? tips.filter(t => t.title.toLowerCase().includes(search.toLowerCase())) : tips

  const openCreate = () => { setForm(EMPTY); setFormError(''); setModal('create') }
  const openEdit = (t) => { setForm({ ...t, track: (t.track||[]).join(', '), xp: String(t.xp||5) }); setFormError(''); setModal(t) }
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('')
    const payload = { ...form, track: form.track.split(',').map(s=>s.trim()).filter(Boolean), xp: Number(form.xp) }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createTip(payload)
        setTips(prev => [data, ...prev]); setTotal(t => t + 1)
      } else {
        const { data } = await adminApi.updateTip(modal._id, payload)
        setTips(prev => prev.map(t => t._id === data._id ? data : t))
      }
      setModal(null)
    } catch (err) { setFormError(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteTip(deleting._id)
    setTips(prev => prev.filter(t => t._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  const DIFF_COLORS = { Beginner: 'text-green-400 bg-green-500/10', Intermediate: 'text-yellow-400 bg-yellow-500/10', Advanced: 'text-red-400 bg-red-500/10' }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Lightbulb size={22} className="text-teal-400" /> Dev Tips</h1>
          <p className="text-slate-500 text-sm mt-1">{total} tips</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition">
          <Plus size={15} /> New Tip
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tips..." className="pl-9 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/40 text-sm transition w-48" />
        </div>
        <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1) }} className="px-3 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-300 text-sm focus:outline-none">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterDiff} onChange={e => { setFilterDiff(e.target.value); setPage(1) }} className="px-3 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-300 text-sm focus:outline-none">
          <option value="">All Levels</option>
          {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            <th className="text-left px-5 py-3.5">Title</th>
            <th className="text-left px-4 py-3.5 hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Difficulty</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">XP</th>
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({length:5}).map((_,i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={5} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : filtered.map(t => (
              <tr key={t._id} className="border-b border-white/4 hover:bg-white/2 transition">
                <td className="px-5 py-3.5 text-white font-medium">{t.title}</td>
                <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">{t.category}</span></td>
                <td className="px-4 py-3.5 hidden lg:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full ${DIFF_COLORS[t.difficulty]}`}>{t.difficulty}</span></td>
                <td className="px-4 py-3.5 hidden lg:table-cell text-brand-400 font-semibold text-xs">+{t.xp} XP</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition"><Pencil size={13} /></button>
                    <button onClick={() => setDeleting(t)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && <div className="text-center py-12 text-slate-600"><Lightbulb size={28} className="mx-auto mb-2 opacity-30" /><p>No tips found</p></div>}
      </div>

      {Math.ceil(total/LIMIT) > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-500">Page {page} of {Math.ceil(total/LIMIT)}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition">Previous</button>
            <button onClick={() => setPage(p => p+1)} disabled={page===Math.ceil(total/LIMIT)} className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition">Next</button>
          </div>
        </div>
      )}

      {modal && <Modal title={modal === 'create' ? 'New Tip' : 'Edit Tip'} onClose={() => setModal(null)} size="md">
        <TipForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
      </Modal>}
      {deleting && <ConfirmDialog message={`Delete "${deleting.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
