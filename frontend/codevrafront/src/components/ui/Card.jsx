import { cn } from '../../lib/utils';

export function Card({ children, className, ...props }) {
  return (
    <div className={cn('glass rounded-xl p-6', className)} {...props}>
      {children}
    </div>
  );
}
