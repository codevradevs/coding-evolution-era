import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Trash2 } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'

// Generic read+delete table page
function DataPage({ title, icon: Icon, color, fetchFn, deleteFn, columns, rowKey = '_id', emptyMsg }) {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const LIMIT = 20

  const fetch = useCallback(() => {
    setLoading(true)
    fetchFn({ page, limit: LIMIT })
      .then(({ data }) => {
        const key = Object.keys(data).find(k => Array.isArray(data[k]))
        setRows(key ? data[key] : [])
        setTotal(data.total || 0)
      })
      .finally(() => setLoading(false))
  }, [page, fetchFn])

  useEffect(() => { fetch() }, [fetch])

  const handleDelete = async () => {
    setSaving(true)
    await deleteFn(deleting._id)
    setRows(prev => prev.filter(r => r._id !== deleting._id)); setTotal(t => t - 1)
    setDeleting(null); setSaving(false)
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Icon size={22} className={color} />{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{total} records</p>
      </div>

      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
            {columns.map(c => <th key={c.key} className={`text-left px-4 py-3.5 ${c.hidden || ''}`}>{c.label}</th>)}
            <th className="text-left px-4 py-3.5">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? Array.from({length:5}).map((_,i) => (
              <tr key={i} className="border-b border-white/4"><td colSpan={columns.length+1} className="px-5 py-3.5"><div className="h-4 bg-white/5 rounded animate-pulse w-3/4" /></td></tr>
            )) : rows.map(row => (
              <tr key={row[rowKey]} className="border-b border-white/4 hover:bg-white/2 transition">
                {columns.map(c => (
                  <td key={c.key} className={`px-4 py-3.5 ${c.hidden || ''}`}>
                    {c.render ? c.render(row) : <span className="text-slate-300 text-xs">{String(row[c.key] ?? '—').slice(0, 80)}</span>}
                  </td>
                ))}
                <td className="px-4 py-3.5">
                  <button onClick={() => setDeleting(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition"><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 && <div className="text-center py-12 text-slate-600"><Icon size={28} className="mx-auto mb-2 opacity-30" /><p>{emptyMsg || 'No records'}</p></div>}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition">Previous</button>
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition">Next</button>
          </div>
        </div>
      )}

      {deleting && <ConfirmDialog message="Delete this record permanently?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} loading={saving} />}
    </div>
  )
}

export default DataPage
