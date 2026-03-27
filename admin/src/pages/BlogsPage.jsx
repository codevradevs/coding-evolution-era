import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { BookOpen, Plus, Pencil, Trash2, Search, Star } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Field, Input, Textarea, Select, FormGrid } from '../components/FormFields'

const EMPTY = { title: '', slug: '', category: '', excerpt: '', content: '', readTime: '', tags: '', featured: false }

function BlogForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-xl">{error}</p>}
      <FormGrid>
        <Field label="Title"><Input placeholder="Post title" value={value.title} onChange={e => onChange('title', e.target.value)} required /></Field>
        <Field label="Slug"><Input placeholder="post-slug" value={value.slug} onChange={e => onChange('slug', e.target.value)} required /></Field>
      </FormGrid>
      <FormGrid>
        <Field label="Category">
          <Select value={value.category} onChange={e => onChange('category', e.target.value)} required>
            <option value="">Select category</option>
            {['Web Dev','DevOps','Security','AI','Career','Tutorial','JavaScript','Python','Cloud'].map(c => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Read Time (mins)"><Input type="number" min="1" placeholder="5" value={value.readTime} onChange={e => onChange('readTime', e.target.value)} required /></Field>
      </FormGrid>
      <Field label="Excerpt"><Textarea rows={2} placeholder="Short description..." value={value.excerpt} onChange={e => onChange('excerpt', e.target.value)} required /></Field>
      <Field label="Content (Markdown)"><Textarea rows={8} placeholder="Full post content..." value={value.content} onChange={e => onChange('content', e.target.value)} required /></Field>
      <FormGrid>
        <Field label="Tags (comma separated)"><Input placeholder="react, hooks, tips" value={value.tags} onChange={e => onChange('tags', e.target.value)} /></Field>
        <Field label="Featured">
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={value.featured} onChange={e => onChange('featured', e.target.checked)} className="w-4 h-4 accent-green-500" />
            <span className="text-sm text-slate-300">Mark as featured</span>
          </label>
        </Field>
      </FormGrid>
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  )
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null) // null | 'create' | blog object
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState(EMPTY)
  const LIMIT = 20

  const fetch = useCallback(() => {
    setLoading(true)
    adminApi.getBlogs({ page, limit: LIMIT, search })
      .then(({ data }) => { setBlogs(data.blogs || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => { const t = setTimeout(fetch, search ? 400 : 0); return () => clearTimeout(t) }, [fetch, search])

  const openCreate = () => { setForm(EMPTY); setFormError(''); setModal('create') }
  const openEdit = (b) => {
    setForm({ ...b, tags: (b.tags || []).join(', '), readTime: String(b.readTime) })
    setFormError(''); setModal(b)
  }

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('')
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), readTime: Number(form.readTime) }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createBlog(payload)
        setBlogs(prev => [data, ...prev]); setTotal(t => t + 1)
      } else {
        const { data } = await adminApi.updateBlog(modal._id, payload)
        setBlogs(prev => prev.map(b => b._id === data._id ? data : b))
      }
      setModal(null)
    } catch (err) { setFormError(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    await adminApi.deleteBlog(deleting._id)
    setBlogs(prev => prev.filter(b => b._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><BookOpen size={22} className="text-accent-500" /> Blog Posts</h1>
          <p className="text-slate-500 text-sm mt-1">{total} posts</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition">
          <Plus size={15} /> New Post
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search posts..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/40 text-sm transition" />
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            <th className="text-left px-5 py-3.5">Title</th>
            <th className="text-left px-4 py-3.5 hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Date</th>
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({length:5}).map((_,i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={4} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : blogs.map(b => (
              <tr key={b._id} className="border-b border-white/4 hover:bg-white/2 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {b.featured && <Star size={11} className="text-yellow-400 shrink-0" />}
                    <span className="text-white font-medium line-clamp-1">{b.title}</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">{b.slug}</p>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell"><span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">{b.category}</span></td>
                <td className="px-4 py-3.5 hidden lg:table-cell text-slate-500 text-xs">{new Date(b.publishedAt || b.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition"><Pencil size={13} /></button>
                    <button onClick={() => setDeleting(b)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && blogs.length === 0 && <div className="text-center py-12 text-slate-600"><BookOpen size={28} className="mx-auto mb-2 opacity-30" /><p>No posts found</p></div>}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition">Previous</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition">Next</button>
          </div>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'create' ? 'New Blog Post' : 'Edit Blog Post'} onClose={() => setModal(null)} size="lg">
          <BlogForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
        </Modal>
      )}
      {deleting && <ConfirmDialog message={`Delete "${deleting.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
