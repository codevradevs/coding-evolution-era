import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Code2, Plus, Pencil, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Field, Input, Textarea, Select, FormGrid } from '../components/FormFields'

const EMPTY = { title: '', description: '', difficulty: 'easy', points: '', testCases: '' }
const DIFF = { easy: 'text-green-400 bg-green-500/10 border-green-500/20', medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', hard: 'text-red-400 bg-red-500/10 border-red-500/20' }

function ChallengeForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-xl">{error}</p>}
      <Field label="Title"><Input placeholder="Challenge title" value={value.title} onChange={e => onChange('title', e.target.value)} required /></Field>
      <Field label="Description"><Textarea rows={5} placeholder="Problem description..." value={value.description} onChange={e => onChange('description', e.target.value)} required /></Field>
      <FormGrid>
        <Field label="Difficulty">
          <Select value={value.difficulty} onChange={e => onChange('difficulty', e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </Field>
        <Field label="Points"><Input type="number" min="1" placeholder="100" value={value.points} onChange={e => onChange('points', e.target.value)} required /></Field>
      </FormGrid>
      <Field label="Test Cases (JSON array: [{input,output}])">
        <Textarea rows={4} placeholder='[{"input":"1 2","output":"3"}]' value={value.testCases} onChange={e => onChange('testCases', e.target.value)} className="font-mono text-xs" />
      </Field>
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Challenge'}
      </button>
    </form>
  )
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState(EMPTY)
  const LIMIT = 20

  const fetch = useCallback(() => {
    setLoading(true)
    adminApi.getChallenges({ page, limit: LIMIT })
      .then(({ data }) => { setChallenges(data.challenges || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page])

  useEffect(() => { fetch() }, [fetch])

  const openCreate = () => { setForm(EMPTY); setFormError(''); setModal('create') }
  const openEdit = (c) => {
    setForm({ ...c, points: String(c.points), testCases: JSON.stringify(c.testCases || [], null, 2) })
    setFormError(''); setModal(c)
  }
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('')
    let testCases = []
    try { testCases = form.testCases ? JSON.parse(form.testCases) : [] } catch { setFormError('Invalid JSON in test cases'); setSaving(false); return }
    const payload = { ...form, points: Number(form.points), testCases }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createChallenge(payload)
        setChallenges(prev => [data, ...prev]); setTotal(t => t + 1)
      } else {
        const { data } = await adminApi.updateChallenge(modal._id, payload)
        setChallenges(prev => prev.map(c => c._id === data._id ? data : c))
      }
      setModal(null)
    } catch (err) { setFormError(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteChallenge(deleting._id)
    setChallenges(prev => prev.filter(c => c._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Code2 size={22} className="text-purple-400" /> Challenges</h1>
          <p className="text-slate-500 text-sm mt-1">{total} challenges</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition">
          <Plus size={15} /> New Challenge
        </button>
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            <th className="text-left px-5 py-3.5">Title</th>
            <th className="text-left px-4 py-3.5">Difficulty</th>
            <th className="text-left px-4 py-3.5 hidden md:table-cell">Points</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Test Cases</th>
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({length:4}).map((_,i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={5} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : challenges.map(c => (
              <tr key={c._id} className="border-b border-white/4 hover:bg-white/2 transition">
                <td className="px-5 py-3.5 text-white font-medium">{c.title}</td>
                <td className="px-4 py-3.5"><span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${DIFF[c.difficulty]}`}>{c.difficulty}</span></td>
                <td className="px-4 py-3.5 hidden md:table-cell text-brand-400 font-semibold">{c.points}</td>
                <td className="px-4 py-3.5 hidden lg:table-cell text-slate-500 text-xs">{c.testCases?.length || 0} cases</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition"><Pencil size={13} /></button>
                    <button onClick={() => setDeleting(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && challenges.length === 0 && <div className="text-center py-12 text-slate-600"><Code2 size={28} className="mx-auto mb-2 opacity-30" /><p>No challenges yet</p></div>}
      </div>

      {modal && <Modal title={modal === 'create' ? 'New Challenge' : 'Edit Challenge'} onClose={() => setModal(null)} size="md">
        <ChallengeForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
      </Modal>}
      {deleting && <ConfirmDialog message={`Delete "${deleting.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
