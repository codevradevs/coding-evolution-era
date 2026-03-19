import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import {
  Menu, X, Home, User, FolderKanban, BookOpen, Mail,
  Wrench, Lock, Gamepad2, TrendingUp, Globe, LogIn, LogOut, Lightbulb, Sparkles, Code2
} from 'lucide-react';
import logo from '../../logo.png';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/products', label: 'Products', icon: FolderKanban },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const ecosystemLinks = [
  { href: '/hub/tools', label: 'Dev Tools', icon: Wrench },
  { href: '/hub/vault', label: 'Vault', icon: Lock },
  { href: '/hub/arena', label: 'Arena', icon: Gamepad2 },
  { href: '/hub/tracker', label: 'Tracker', icon: TrendingUp },
  { href: '/hub/network', label: 'Network', icon: Globe },
  { href: '/hub/tips', label: 'Dev Intel', icon: Lightbulb },
  { href: '/fun-lab', label: 'Fun Lab', icon: Sparkles },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEcosystemOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="Codevra Logo" className="w-[140px] sm:w-[200px] h-auto transition-transform group-hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setEcosystemOpen(!ecosystemOpen)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname.startsWith('/hub')
                    ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                    : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                )}
              >
                <Code2 className="w-4 h-4" />
                Ecosystem
                <svg
                  className={cn('w-3 h-3 transition-transform', ecosystemOpen && 'rotate-180')}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {ecosystemOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 glass rounded-xl p-2 shadow-2xl">
                  {ecosystemLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setEcosystemOpen(false)}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                          isActive
                            ? 'bg-accent-500/10 text-accent-400'
                            : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden md:block text-sm text-dark-400">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-dark-800 text-dark-300 hover:text-dark-100 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 text-dark-950 hover:bg-brand-400 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-dark-300 hover:text-dark-100 hover:bg-dark-800/50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-dark-700/50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-500/10 text-brand-400'
                      : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-dark-700/50">
              <p className="px-3 py-1 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                Ecosystem
              </p>
              {ecosystemLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                      isActive
                        ? 'bg-accent-500/10 text-accent-400'
                        : 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-dark-800 text-dark-300 hover:text-dark-100 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium bg-brand-500 text-dark-950 hover:bg-brand-400 transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
