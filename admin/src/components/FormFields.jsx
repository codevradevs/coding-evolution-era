export function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>}
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

const base = 'w-full px-3 py-2.5 rounded-xl bg-dark-800 border border-white/8 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 text-sm transition'

export function Input({ ...props }) {
  return <input className={base} {...props} />
}

export function Textarea({ rows = 4, ...props }) {
  return <textarea className={`${base} resize-none`} rows={rows} {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className={`${base} bg-dark-800`} {...props}>
      {children}
    </select>
  )
}

export function FormGrid({ children, cols = 2 }) {
  return <div className={`grid grid-cols-1 ${cols === 2 ? 'sm:grid-cols-2' : ''} gap-4`}>{children}</div>
}
