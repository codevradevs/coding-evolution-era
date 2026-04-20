import { useEffect, useState, useCallback, useRef } from 'react'
import { adminApi } from '../lib/api'
import { FolderKanban, Plus, Pencil, Trash2, Search, Upload, X, Image, ExternalLink, Github, Star } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { Field, Input, Textarea, FormGrid } from '../components/FormFields'

const EMPTY = {
  title: '', slug: '', tagline: '', description: '', category: 'web',
  status: 'Live', client: '', industry: '', tech: '', liveUrl: '', githubUrl: '',
  featured: false, coverImage: '', images: [], problem: '', solution: '',
  architecture: '', lessons: '', results: '', order: 0,
}

// Normalize pasted prose into newline-separated lines before saving
function normalizeCaseStudyText(text) {
  if (!text) return '';
  if (text.includes('\n')) return text; // already formatted
  return text
    .replace(/([a-z,\.!?])\s+([A-Z][a-z])/g, '$1\n$2')
    .replace(/([a-z,\.!?])\s+(👉|✅|⚡|🔥|💡)/g, '$1\n$2')
    .replace(/(\w):\s+([A-Z])/g, '$1:\n$2')
    .replace(/([.!?])\s+([A-Z])/g, '$1\n$2')
    .trim();
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function ImageUploader({ images, onChange }) {
  const inputRef = useRef()

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const remaining = 20 - images.length
    if (remaining <= 0) return
    const toProcess = files.slice(0, remaining)
    const readers = toProcess.map(file => new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = (ev) => resolve(ev.target.result)
      reader.readAsDataURL(file)
    }))
    Promise.all(readers).then(results => onChange([...images, ...results]))
    e.target.value = ''
  }

  const remove = (idx) => onChange(images.filter((_, i) => i !== idx))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{images.length}/20 images {images.length < 3 && <span className="text-amber-400">(min 3 required)</span>}</span>
        {images.length < 20 && (
          <button type="button" onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs hover:bg-brand-500/20 transition">
            <Upload size={12} /> Upload Images
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <div key={i} className="relative group aspect-video rounded-lg overflow-hidden bg-dark-800 border border-white/8">
              <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => remove(i)}
                className="absolute top-1 right-1 p-0.5 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition">
                <X size={10} />
              </button>
              {i === 0 && <span className="absolute bottom-1 left-1 text-[9px] bg-brand-500/80 text-white px-1 rounded">Cover</span>}
            </div>
          ))}
        </div>
      )}
      {images.length === 0 && (
        <div onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-brand-500/30 transition">
          <Image size={24} className="mx-auto mb-2 text-slate-600" />
          <p className="text-slate-600 text-xs">Click to upload project images (3–20)</p>
        </div>
      )}
    </div>
  )
}

function ProjectForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
      {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-xl">{error}</p>}

      <FormGrid>
        <Field label="Title">
          <Input placeholder="Project title" value={value.title} onChange={e => {
            onChange('title', e.target.value)
            if (!value._id) onChange('slug', slugify(e.target.value))
          }} required />
        </Field>
        <Field label="Slug">
          <Input placeholder="project-slug" value={value.slug} onChange={e => onChange('slug', e.target.value)} required />
        </Field>
      </FormGrid>

      <Field label="Tagline">
        <Input placeholder="One-line description" value={value.tagline} onChange={e => onChange('tagline', e.target.value)} required />
      </Field>

      <Field label="Description">
        <Textarea rows={3} placeholder="Full project description..." value={value.description} onChange={e => onChange('description', e.target.value)} required />
      </Field>

      <FormGrid>
        <Field label="Category">
          <select value={value.category} onChange={e => onChange('category', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-dark-800 border border-white/8 text-white text-sm focus:outline-none focus:border-brand-500/40">
            <option value="web">Web App</option>
            <option value="mobile">Mobile App</option>
            <option value="security">Security Tool</option>
            <option value="experiment">Experiment</option>
          </select>
        </Field>
        <Field label="Status">
          <Input placeholder="Live / Beta / In Development" value={value.status} onChange={e => onChange('status', e.target.value)} />
        </Field>
      </FormGrid>

      <FormGrid>
        <Field label="Client">
          <Input placeholder="Client name" value={value.client} onChange={e => onChange('client', e.target.value)} />
        </Field>
        <Field label="Industry">
          <Input placeholder="Fintech / Education..." value={value.industry} onChange={e => onChange('industry', e.target.value)} />
        </Field>
      </FormGrid>

      <Field label="Tech Stack (comma separated)">
        <Input placeholder="React, Node.js, MongoDB..." value={value.tech} onChange={e => onChange('tech', e.target.value)} />
      </Field>

      <FormGrid>
        <Field label="Live URL">
          <Input placeholder="https://..." value={value.liveUrl} onChange={e => onChange('liveUrl', e.target.value)} />
        </Field>
        <Field label="GitHub URL">
          <Input placeholder="https://github.com/..." value={value.githubUrl} onChange={e => onChange('githubUrl', e.target.value)} />
        </Field>
      </FormGrid>

      <FormGrid>
        <Field label="Order (display priority)">
          <Input type="number" value={value.order} onChange={e => onChange('order', Number(e.target.value))} />
        </Field>
        <Field label="Featured">
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="chk-featured" checked={value.featured} onChange={e => onChange('featured', e.target.checked)}
              className="w-4 h-4 rounded accent-brand-500" />
            <label htmlFor="chk-featured" className="text-sm text-slate-300">Mark as featured</label>
          </div>
        </Field>
      </FormGrid>

      <div className="border-t border-white/5 pt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Case Study Details</p>
        <div className="space-y-3">
          <Field label="The Problem">
            <Textarea rows={5} placeholder={`Paste bullet points or plain text:\n- Landlords have no structured way to verify tenant reliability\n- Tenants with good payment history cannot prove it`} value={value.problem} onChange={e => onChange('problem', e.target.value)} />
          </Field>
          <Field label="Our Solution">
            <Textarea rows={5} placeholder={`Paste bullet points or plain text:\n- Rent Payment Tracking\n  Records and verifies rent payments over time`} value={value.solution} onChange={e => onChange('solution', e.target.value)} />
          </Field>
          <Field label="Architecture">
            <Textarea rows={5} placeholder={`Paste bullet points or plain text:\n- Frontend (React)\n  Dashboard-driven UI for tenants and landlords`} value={value.architecture} onChange={e => onChange('architecture', e.target.value)} />
          </Field>
          <Field label="Key Lesson">
            <Textarea rows={3} placeholder="What did you learn? Can be multi-line." value={value.lessons} onChange={e => onChange('lessons', e.target.value)} />
          </Field>
          <Field label="Results (one per line: metric|label)">
            <Textarea rows={4} placeholder={`30%|Reduction in delays\n3x|Faster payments\nKES 80K|Saved annually`} value={value.results} onChange={e => onChange('results', e.target.value)} />
          </Field>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Project Images (3–20)</p>
        <ImageUploader images={value.images} onChange={imgs => onChange('images', imgs)} />
      </div>

      <button type="submit" disabled={loading || value.images.length < 3}
        className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition disabled:opacity-50">
        {loading ? 'Saving...' : value.images.length < 3 ? `Upload at least ${3 - value.images.length} more image(s)` : 'Save Project'}
      </button>
    </form>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
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

  const fetchProjects = useCallback(() => {
    setLoading(true)
    adminApi.getProjects({ page, limit: LIMIT, search: search || undefined })
      .then(({ data }) => { setProjects(data.projects || []); setTotal(data.total || 0) })
      .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => { const t = setTimeout(fetchProjects, search ? 400 : 0); return () => clearTimeout(t) }, [fetchProjects, search])

  const openCreate = () => { setForm(EMPTY); setFormError(''); setModal('create') }

  const openEdit = async (p) => {
    setFormError(''); setModal('loading')
    try {
      const { data } = await adminApi.getProject(p._id)
      setForm({
        ...data,
        tech: (data.tech || []).join(', '),
        results: (data.results || []).map(r => `${r.metric}|${r.label}`).join('\n'),
        images: data.images || [],
      })
      setModal(data)
    } catch { setModal(null) }
  }

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.images.length < 3) return setFormError('Please upload at least 3 images.')
    setSaving(true); setFormError('')
    const payload = {
      ...form,
      tech: form.tech.split(',').map(s => s.trim()).filter(Boolean),
      problem: normalizeCaseStudyText(form.problem),
      solution: normalizeCaseStudyText(form.solution),
      architecture: normalizeCaseStudyText(form.architecture),
      lessons: normalizeCaseStudyText(form.lessons),
      results: form.results ? form.results.split('\n').map(s => {
        const [metric, ...rest] = s.trim().split('|')
        return { metric: metric?.trim(), label: rest.join('|').trim() }
      }).filter(r => r.metric && r.label) : [],
      coverImage: form.images[0] || '',
    }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createProject(payload)
        setProjects(prev => [data, ...prev]); setTotal(t => t + 1)
      } else {
        const { data } = await adminApi.updateProject(modal._id, payload)
        setProjects(prev => prev.map(p => p._id === data._id ? data : p))
      }
      setModal(null)
    } catch (err) { setFormError(err.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try {
      await adminApi.deleteProject(deleting._id)
      setProjects(prev => prev.filter(p => p._id !== deleting._id))
      setTotal(t => t - 1)
    } catch (err) {
      console.error('Delete failed:', err)
    } finally {
      setDeleting(null)
      setSaving(false)
    }
  }

  const CATEGORY_COLORS = { web: 'text-blue-400 bg-blue-500/10 border-blue-500/20', mobile: 'text-purple-400 bg-purple-500/10 border-purple-500/20', security: 'text-red-400 bg-red-500/10 border-red-500/20', experiment: 'text-green-400 bg-green-500/10 border-green-500/20' }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><FolderKanban size={22} className="text-brand-400" /> Projects</h1>
          <p className="text-slate-500 text-sm mt-1">{total} projects</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition">
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search projects..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/40 text-sm transition" />
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            <th className="text-left px-5 py-3.5">Project</th>
            <th className="text-left px-4 py-3.5 hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Status</th>
            <th className="text-left px-4 py-3.5 hidden lg:table-cell">Links</th>
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={5} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : projects.map(p => (
              <tr key={p._id} className="border-b border-white/4 hover:bg-white/2 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {p.coverImage
                      ? <img src={p.coverImage} alt={p.title} className="w-10 h-7 rounded object-cover shrink-0 border border-white/8" />
                      : <div className="w-10 h-7 rounded bg-dark-800 flex items-center justify-center shrink-0"><Image size={12} className="text-slate-600" /></div>
                    }
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-white font-medium">{p.title}</p>
                        {p.featured && <Star size={10} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <p className="text-slate-600 text-xs mt-0.5 line-clamp-1">{p.tagline}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[p.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>{p.category}</span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-xs text-slate-400">{p.status}</span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <div className="flex gap-2">
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-400 transition"><ExternalLink size={13} /></a>}
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition"><Github size={13} /></a>}
                  </div>
                </td>
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
        {!loading && projects.length === 0 && (
          <div className="text-center py-12 text-slate-600">
            <FolderKanban size={28} className="mx-auto mb-2 opacity-30" />
            <p>No projects found</p>
          </div>
        )}
      </div>

      {modal === 'loading' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {modal && modal !== 'loading' && modal !== 'create' && typeof modal === 'object' && (
        <Modal title={`Edit: ${modal.title}`} onClose={() => setModal(null)} size="lg">
          <ProjectForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
        </Modal>
      )}
      {modal === 'create' && (
        <Modal title="New Project" onClose={() => setModal(null)} size="lg">
          <ProjectForm value={form} onChange={handleChange} onSubmit={handleSubmit} loading={saving} error={formError} />
        </Modal>
      )}
      {deleting && <ConfirmDialog message={`Delete "${deleting.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}
