import { cn } from '../../lib/utils';

const buttonVariants = {
  variant: {
    default: 'bg-brand-500 text-dark-950 hover:bg-brand-400 shadow-lg shadow-brand-500/20',
    secondary: 'bg-dark-800 text-dark-100 hover:bg-dark-700 border border-dark-600',
    accent: 'bg-accent-500 text-white hover:bg-accent-400 shadow-lg shadow-accent-500/20',
    outline: 'border border-brand-500/30 text-brand-400 hover:bg-brand-500/10',
    ghost: 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50',
    destructive: 'bg-red-500 text-white hover:bg-red-400',
  },
  size: {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
    icon: 'h-10 w-10',
  },
};

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className, 
  ...props 
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-dark-950 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
