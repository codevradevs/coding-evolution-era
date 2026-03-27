import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../lib/api'
import { Search, Users, Shield, Github, Chrome, User, Trash2 } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'

const PROVIDER_ICON = {
  google: <Chrome size={11} className="text-blue-400" />,
  github: <Github size={11} className="text-slate-300" />,
  local: <User size={11} className="text-slate-500" />,
}

const AVATAR_COLORS = [
  'from-brand-500 to-accent-500', 'from-purple-500 to-pink-500',
  'from-orange-500 to-yellow-500', 'from-blue-500 to-cyan-500',
  'from-rose-500 to-orange-500', 'from-teal-500 to-green-500',
]

function Avatar({ name, index }) {
  const initials = name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
      {initials}
    </div>
  )
}

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [updatingId, setUpdatingId] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [deleteSaving, setDeleteSaving] = useState(false)
  const LIMIT = 20

  const fetchUsers = useCallback(() => {
    setLoading(true)
    adminApi.getUsers({ page, limit: LIMIT, search })
      .then(({ data }) => {
        setUsers(data.users || data)
        setTotal(data.total || data.users?.length || 0)
      })
      .catch((err) => setError(err.response?.data?.error || 'Failed to load users'))
      .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => {
    const t = setTimeout(fetchUsers, search ? 400 : 0)
    return () => clearTimeout(t)
  }, [fetchUsers, search])

  const toggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    setUpdatingId(user._id)
    try {
      await adminApi.updateUserRole(user._id, newRole)
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, role: newRole } : u))
    } catch {
      // silently fail
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteUser = async () => {
    setDeleteSaving(true)
    await adminApi.deleteUser(deleting._id)
    setUsers(prev => prev.filter(u => u._id !== deleting._id))
    setTotal(t => t - 1)
    setDeleting(null); setDeleteSaving(false)
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users size={22} className="text-brand-500" /> Users
          </h1>
          <p className="text-slate-500 text-sm mt-1">{total} registered accounts</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/40 text-sm transition"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Table */}
      <div className="bg-dark-900/60 border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3.5">User</th>
              <th className="text-left px-4 py-3.5 hidden md:table-cell">Provider</th>
              <th className="text-left px-4 py-3.5">Role</th>
              <th className="text-left px-4 py-3.5 hidden lg:table-cell">Joined</th>
              <th className="text-left px-4 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-white/4">
                  <td className="px-5 py-3.5" colSpan={5}>
                    <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                  </td>
                </tr>
              ))
              : users.map((u, i) => (
                <tr key={u._id} className="border-b border-white/4 hover:bg-white/2 transition group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} index={i} />
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{u.name}</p>
                        <p className="text-slate-500 text-xs truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      {PROVIDER_ICON[u.provider] || PROVIDER_ICON.local}
                      {u.provider || 'local'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.role === 'admin'
                        ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                        : 'bg-white/5 text-slate-400 border border-white/8'
                    }`}>
                      {u.role === 'admin' && <Shield size={10} />}
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-slate-500 text-xs">
                    {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleRole(u)}
                        disabled={updatingId === u._id}
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/8 text-slate-400 hover:text-white hover:border-white/20 transition disabled:opacity-40"
                      >
                        {updatingId === u._id ? '...' : u.role === 'admin' ? 'Demote' : 'Make Admin'}
                      </button>
                      <button onClick={() => setDeleting(u)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/8 transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {!loading && users.length === 0 && (
          <div className="text-center py-12 text-slate-600">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p>No users found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-dark-900 border border-white/8 text-slate-400 hover:text-white disabled:opacity-30 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {deleting && (
        <ConfirmDialog
          message={`Delete user "${deleting.name}"? This cannot be undone.`}
          onConfirm={handleDeleteUser}
          onCancel={() => setDeleting(null)}
          loading={deleteSaving}
        />
      )}
    </div>
  )
}
