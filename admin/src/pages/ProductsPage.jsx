import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Package, Plus, Pencil, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Field, Input, Textarea, FormGrid } from '../components/FormFields'

const EMPTY = { name: '', category: '', tagline: '', description: '', features: '', price: '', timeline: '', pros: '' }

function ProductForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-xl">{error}</p>}
      <FormGrid>
        <Field label="Name"><Input placeholder="Product name" value={value.name} onChange={e => onChange('name', e.target.value)} required /></Field>
        <Field label="Category"><Input placeholder="Web, Mobile, SaaS..." value={value.category} onChange={e => onChange('category', e.target.value)} required /></Field>
      </FormGrid>
      <Field label="Tagline"><Input placeholder="Short catchy tagline" value={value.tagline} onChange={e => onChange('tagline', e.target.value)} required /></Field>
      <Field label="Description"><Textarea rows={3} placeholder="Full description..." value={value.description} onChange={e => onChange('description', e.target.value)} required /></Field>
      <FormGrid>
        <Field label="Price"><Input placeholder="KES 10,000" value={value.price} onChange={e => onChange('price', e.target.value)} required /></Field>
        <Field label="Timeline"><Input placeholder="2-4 weeks" value={value.timeline} onChange={e => onChange('timeline', e.target.value)} required /></Field>
      </FormGrid>
      <Field label="Features (comma separated)"><Input placeholder="Feature 1, Feature 2" value={value.features} onChange={e => onChange('features', e.target.value)} /></Field>
      <Field label="Pros (comma separated)"><Input placeholder="Pro 1, Pro 2" value={value.pros} onChange={e => onChange('pros', e.target.value)} /></Field>
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState(EMPTY)
  const LIMIT = 20

  const fetch = useCallback(() => {
    setLoading(true)
    adminApi.getProducts({ page, limit: LIMIT, search: search || undefined })
      .then(({ data }) => { setProducts(data.products || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => { const t = setTimeout(fetch, search ? 400 : 0); return () => clearTimeout(t) }, [fetch, search])

  const openCreate = () => { setForm(EMPTY); setFormError(''); setModal('create') }
  const openEdit = (p) => {
    setForm({ ...p, features: (p.features||[]).join(', '), pros: (p.pros||[]).join(', ') })
    setFormError(''); setModal(p)
  }
  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('')
    const payload = { ...form, features: form.features.split(',').map(s=>s.trim()).filter(Boolean), pros: form.pros.split(',').map(s=>s.trim()).filter(Boolean) }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createProduct(payload)
        setProducts(prev => [data, ...prev]); setTotal(t => t + 1)
      } else {
        const { data } = await adminApi.updateProduct(modal._id, payload)
        setProducts(prev => prev.map(p => p._id === data._id ? data : p))
      }
      setModal(null)
    } catch (err) { setFormError(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteProduct(deleting._id)
    setProducts(prev => prev.filter(p => p._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Package size={22} className="text-orange-400" /> Products</h1>
          <p className="text-slate-500 text-sm mt-1">{total} products</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition">
          <Plus size={15} /> New Product
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search products..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/40 text-sm transition" />
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            <th className="text-left px-5 py-3.5">Name</th>
            <th className="text-left px-4 py-3.5 hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Price</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Timeline</th>
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({length:5}).map((_,i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={5} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : products.map(p => (
              <tr key={p._id} className="border-b border-white/4 hover:bg-white/2 transition">
                <td className="px-5 py-3.5">
                  <p className="text-white font-medium">{p.name}</p>
                  <p className="text-slate-600 text-xs mt-0.5 line-clamp-1">{p.tagline}</p>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">{p.category}</span></td>
                <td className="px-4 py-3.5 hidden lg:table-cell text-brand-400 font-semibold text-xs">{p.price}</td>
                <td className="px-4 py-3.5 hidden lg:table-cell text-slate-500 text-xs">{p.timeline}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition"><Pencil size={13} /></button>
                    <button onClick={() => setDeleting(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && products.length === 0 && <div className="text-center py-12 text-slate-600"><Package size={28} className="mx-auto mb-2 opacity-30" /><p>No products found</p></div>}
      </div>

      {modal && <Modal title={modal === 'create' ? 'New Product' : 'Edit Product'} onClose={() => setModal(null)} size="md">
        <ProductForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
      </Modal>}
      {deleting && <ConfirmDialog message={`Delete "${deleting.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
