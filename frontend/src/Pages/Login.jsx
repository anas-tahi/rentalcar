import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/authContext';
import apiRequest from '../Api/apiRequest';

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await apiRequest.post('/auth/login', form);
      if (res.data.token) {
        apiRequest.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem('token', res.data.token);
      }
      updateUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate(res.data.user.isAdmin ? '/dashboard/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>

      {/* Left — visual panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', overflow: 'hidden' }}
        className="login-left-panel"
      >
        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80"
          alt="bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(230,28,28,0.15) 100%)' }} />

        {/* Animated orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity }}
          style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(230,28,28,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>🚗</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff' }}>DRIVE<span style={{ color: '#e61c1c' }}>ES</span></span>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
            Premium Cars<br /><span style={{ color: '#e61c1c' }}>Across Spain</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontSize: 15, color: '#666', lineHeight: 1.7, maxWidth: 380 }}>
            500+ vehicles in 12 cities. From economy to exotic — delivered to your door.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 20, marginTop: 40 }}>
            {[['500+', 'Vehicles'], ['12', 'Cities'], ['4.9★', 'Rating']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#e61c1c' }}>{n}</div>
                <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right — form panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 480, background: '#0d0d0d', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', position: 'relative' }}
      >
        {/* Back to home */}
        <Link to="/" style={{ position: 'absolute', top: 24, right: 24, display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#e61c1c'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}>
          ← Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: '-0.5px' }}>Welcome back</h2>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 36 }}>Sign in to your DriveES account</p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(230,28,28,0.1)', border: '1px solid rgba(230,28,28,0.3)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 8, fontSize: 14, marginBottom: 20 }}>
            ❌ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.usernameOrEmail} required
              onChange={e => setForm({ ...form, usernameOrEmail: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} required
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '13px 44px 13px 16px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
                onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </motion.div>

          <motion.button type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(230,28,28,0.4)' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ padding: '14px', background: loading ? '#333' : 'linear-gradient(135deg, #e61c1c, #c91515)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
            {loading ? '⏳ Signing in...' : 'Sign In →'}
          </motion.button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 12, color: '#444' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#444' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#e61c1c', fontWeight: 700, textDecoration: 'none' }}>Create one free →</Link>
        </p>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
