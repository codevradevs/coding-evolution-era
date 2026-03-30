import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import {
  LayoutDashboard, Users, Trophy, BookOpen, LogOut, Shield, Zap,
  MessageSquare, Lightbulb, Code2, Package, Award, Briefcase,
  FileCode, Lock, BookMarked, Network, UserCircle, FolderKanban
} from 'lucide-react'

const SECTIONS = [
  {
    label: 'Overview',
    links: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    label: 'Users',
    links: [
      { to: '/users',        icon: Users,       label: 'Users' },
      { to: '/rankings',     icon: Trophy,      label: 'Rankings' },
      { to: '/userprofiles', icon: UserCircle,  label: 'Profiles' },
      { to: '/certificates', icon: Award,       label: 'Certificates' },
    ]
  },
  {
    label: 'Content',
    links: [
      { to: '/blogs',      icon: BookOpen,       label: 'Blogs' },
      { to: '/tips',       icon: Lightbulb,      label: 'Dev Tips' },
      { to: '/challenges', icon: Code2,          label: 'Challenges' },
      { to: '/products',   icon: Package,        label: 'Products' },
      { to: '/projects',   icon: FolderKanban,   label: 'Projects' },
    ]
  },
  {
    label: 'Activity',
    links: [
      { to: '/submissions', icon: FileCode,    label: 'Submissions' },
      { to: '/tracker',     icon: BookMarked,  label: 'Tracker' },
      { to: '/vault',       icon: Lock,        label: 'Vault Notes' },
      { to: '/network',     icon: Network,     label: 'Network' },
    ]
  },
  {
    label: 'Inbox',
    links: [
      { to: '/contacts', icon: MessageSquare, label: 'Messages' },
      { to: '/quotes',   icon: Briefcase,     label: 'Quotes' },
    ]
  },
]

export default function Sidebar() {
  const { admin, logout } = useAuth()
  const initials = admin?.name
    ? admin.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : admin?.email?.[0]?.toUpperCase() ?? 'A'

  return (
    <aside className="w-56 min-h-screen bg-dark-900 border-r border-white/5 flex flex-col relative overflow-hidden shrink-0">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/5 flex items-center gap-2.5 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg">
          <Zap size={13} className="text-white" />
        </div>
        <div className="leading-none">
          <span className="text-white font-bold text-sm">Codevra</span>
          <span className="ml-1 text-[9px] font-semibold text-brand-500 bg-brand-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
        {SECTIONS.map(({ label, links }) => (
          <div key={label}>
            <p className="text-[9px] font-semibold text-slate-600 uppercase tracking-widest px-2 mb-1">{label}</p>
            <div className="space-y-0.5">
              {links.map(({ to, icon: Icon, label: lbl }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-400'
                        : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-brand-500/20' : 'bg-white/5'}`}>
                        <Icon size={12} />
                      </span>
                      {lbl}
                      {isActive && <span className="ml-auto w-1 h-1 rounded-full bg-brand-500" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Admin profile */}
      <div className="px-2 py-3 border-t border-white/5 space-y-1 shrink-0">
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{admin?.name || 'Admin'}</p>
            <p className="text-[9px] text-slate-500 truncate">{admin?.email}</p>
          </div>
          <Shield size={10} className="text-brand-500 shrink-0" />
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
        >
          <LogOut size={12} /> Sign out
        </button>
      </div>
    </aside>
  )
}
