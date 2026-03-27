import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Award, Plus, Pencil, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Field, Input, Select, FormGrid } from '../components/FormFields'

const EMPTY = { userId: '', title: '', description: '', category: 'special', badgeIcon: '🏆', awardedBy: 'Codevra' }
const CATS = ['arena','tracker','special','community']

function CertForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-xl">{error}</p>}
      <Field label="User ID"><Input placeholder="MongoDB ObjectId of user" value={value.userId} onChange={e => onChange('userId', e.target.value)} required /></Field>
      <Field label="Title"><Input placeholder="Certificate title" value={value.title} onChange={e => onChange('title', e.target.value)} required /></Field>
      <Field label="Description"><Input placeholder="Short description" value={value.description} onChange={e => onChange('description', e.target.value)} /></Field>
      <FormGrid>
        <Field label="Category">
          <Select value={value.category} onChange={e => onChange('category', e.target.value)}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Badge Icon (emoji)"><Input placeholder="🏆" value={value.badgeIcon} onChange={e => onChange('badgeIcon', e.target.value)} /></Field>
      </FormGrid>
      <Field label="Awarded By"><Input placeholder="Codevra" value={value.awardedBy} onChange={e => onChange('awardedBy', e.target.value)} /></Field>
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition disabled:opacity-50">
        {loading ? 'Saving...' : 'Award Certificate'}
      </button>
    </form>
  )
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState([])
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
    adminApi.getCertificates({ page, limit: LIMIT })
      .then(({ data }) => { setCerts(data.certificates || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page])

  useEffect(() => { fetch() }, [fetch])

  const openCreate = () => { setForm(EMPTY); setFormError(''); setModal('create') }
  const openEdit = (c) => { setForm({ ...c, userId: c.userId?._id || c.userId || '' }); setFormError(''); setModal(c) }
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('')
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createCertificate(form)
        setCerts(prev => [data, ...prev]); setTotal(t => t + 1)
      } else {
        const { data } = await adminApi.updateCertificate(modal._id, form)
        setCerts(prev => prev.map(c => c._id === data._id ? data : c))
      }
      setModal(null)
    } catch (err) { setFormError(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteCertificate(deleting._id)
    setCerts(prev => prev.filter(c => c._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  const CAT_COLORS = { arena: 'text-purple-400 bg-purple-500/10', tracker: 'text-blue-400 bg-blue-500/10', special: 'text-yellow-400 bg-yellow-500/10', community: 'text-green-400 bg-green-500/10' }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Award size={22} className="text-yellow-400" /> Certificates</h1>
          <p className="text-slate-500 text-sm mt-1">{total} certificates</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition">
          <Plus size={15} /> Award Certificate
        </button>
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            <th className="text-left px-5 py-3.5">Certificate</th>
            <th className="text-left px-4 py-3.5 hidden md:table-cell">User</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Category</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Awarded</th>
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({length:4}).map((_,i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={5} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : certs.map(c => (
              <tr key={c._id} className="border-b border-white/4 hover:bg-white/2 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.badgeIcon || '🏆'}</span>
                    <div>
                      <p className="text-white font-medium">{c.title}</p>
                      <p className="text-slate-600 text-xs">{c.credentialId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <p className="text-slate-300 text-xs">{c.userId?.name || '—'}</p>
                  <p className="text-slate-600 text-xs">{c.userId?.email}</p>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${CAT_COLORS[c.category] || 'text-slate-400 bg-white/5'}`}>{c.category}</span></td>
                <td className="px-4 py-3.5 hidden lg:table-cell text-slate-500 text-xs">{new Date(c.awardedAt).toLocaleDateString()}</td>
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
        {!loading && certs.length === 0 && <div className="text-center py-12 text-slate-600"><Award size={28} className="mx-auto mb-2 opacity-30" /><p>No certificates yet</p></div>}
      </div>

      {modal && <Modal title={modal === 'create' ? 'Award Certificate' : 'Edit Certificate'} onClose={() => setModal(null)} size="sm">
        <CertForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
      </Modal>}
      {deleting && <ConfirmDialog message={`Revoke "${deleting.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
