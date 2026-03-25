import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const refresh = searchParams.get('refresh');
    const error = searchParams.get('error');

    if (error) {
      navigate(`/auth/login?error=${error}`);
      return;
    }

    if (!token || !refresh) {
      navigate('/auth/login');
      return;
    }

    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refresh);

    const headers = { Authorization: `Bearer ${token}` };

    // Fetch user profile — fall back to /auth/me if /profile fails
    fetch(`${API_BASE}/api/auth/me`, { headers })
      .then((r) => r.json())
      .then((me) => {
        const shaped = {
          id: me._id || me.id,
          name: me.name,
          email: me.email,
          role: me.role,
          avatar: me.avatar || null,
          provider: me.provider,
        };
        setUser(shaped);
        localStorage.setItem('user', JSON.stringify(shaped));
        navigate('/');
      })
      .catch(() => navigate('/auth/login'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 bg-dark-950" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative text-center">
        <Loader2 className="w-12 h-12 text-brand-400 animate-spin mx-auto mb-4" />
        <p className="text-dark-400">Completing authentication…</p>
      </motion.div>
    </div>
  );
}
