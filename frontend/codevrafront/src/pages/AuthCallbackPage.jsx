import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const refresh = searchParams.get('refresh');
    const error = searchParams.get('error');

    if (error) {
      navigate('/auth/login?error=' + error);
      return;
    }

    if (token && refresh) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh);

      const base = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');
      const headers = { 'Authorization': `Bearer ${token}` };

      Promise.all([
        fetch(`${base}/api/auth/me`, { headers }).then(r => r.json()),
        fetch(`${base}/api/profile`, { headers }).then(r => r.json()),
      ])
        .then(([me, profileData]) => {
          // /api/auth/me returns raw mongo doc (_id), /api/profile returns { user, profile, stats, ... }
          const u = profileData?.user || me;
          const shaped = {
            id: u._id || u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            avatar: profileData?.profile?.avatar || u.avatar || null,
          };
          setUser(shaped);
          localStorage.setItem('user', JSON.stringify(shaped));
          navigate('/');
        })
        .catch(() => navigate('/auth/login'));
    } else {
      navigate('/auth/login');
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 bg-dark-950" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <Loader2 className="w-12 h-12 text-brand-400 animate-spin mx-auto mb-4" />
        <p className="text-dark-400">Completing authentication...</p>
      </motion.div>
    </div>
  );
}
