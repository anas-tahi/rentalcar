import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/authContext';
import apiRequest from '../Api/apiRequest';

export default function Signup() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true); setError('');
    try {
      await apiRequest.post('/auth/register', {
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, password: form.password
      });
      const loginRes = await apiRequest.post('/auth/login', {
        usernameOrEmail: form.email, password: form.password
      });
      if (loginRes.data.token) {
        apiRequest.defaults.headers.common['Authorization'] = `Bearer ${loginRes.data.token}`;
        localStorage.setItem('token', loginRes.data.token);
      }
      updateUser(loginRes.data.user);
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['#333', '#e61c1c', '#f59e0b', '#22c55e'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>

      {/* Left visual */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', overflow: 'hidden' }}
        className="signup-left-panel"
      >
        <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80"
          alt="bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(230,28,28,0.12) 100%)' }} />

        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '15%', right: '5%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(230,28,28,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>🚗</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff' }}>DRIVE<span style={{ color: '#e61c1c' }}>ES</span></span>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
            Join Thousands<br />of <span style={{ color: '#e61c1c' }}>Happy Drivers</span>
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
            {['Free account — no credit card needed', 'Book any car in 2 minutes', 'Manage all your trips in one place', 'Exclusive member deals & discounts'].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#888' }}>
                <span style={{ color: '#e61c1c', fontWeight: 700 }}>✓</span> {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 500, background: '#0d0d0d', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', position: 'relative', overflowY: 'auto' }}
      >
        <Link to="/" style={{ position: 'absolute', top: 24, right: 24, display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#e61c1c'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}>
          ← Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: '-0.5px' }}>Create account</h2>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 32 }}>Start renting premium cars across Spain</p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(230,28,28,0.1)', border: '1px solid rgba(230,28,28,0.3)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 8, fontSize: 14, marginBottom: 20 }}>
            ❌ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[{ label: 'First Name', key: 'firstName', placeholder: 'Anas' }, { label: 'Last Name', key: 'lastName', placeholder: 'Tahir' }].map((f, i) => (
              <motion.div key={f.key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} value={form[f.key]} required
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} required
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} required
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 44px 12px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 15 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {form.password && (
              <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'center' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: strength >= i ? strengthColors[strength] : '#1a1a1a', transition: 'background .3s' }} />
                ))}
                <span style={{ fontSize: 11, color: strengthColors[strength], marginLeft: 8, minWidth: 40 }}>{strengthLabels[strength]}</span>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Confirm Password</label>
            <input type="password" placeholder="Repeat password" value={form.confirm} required
              onChange={e => setForm({ ...form, confirm: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.confirm && form.confirm !== form.password ? 'rgba(230,28,28,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 10, padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
            {form.confirm && form.confirm !== form.password && (
              <p style={{ fontSize: 12, color: '#e61c1c', marginTop: 4 }}>Passwords don't match</p>
            )}
          </motion.div>

          <motion.button type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(230,28,28,0.4)' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ padding: '14px', background: loading ? '#333' : 'linear-gradient(135deg, #e61c1c, #c91515)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
            {loading ? '⏳ Creating account...' : 'Create Account →'}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#444', marginTop: 20 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e61c1c', fontWeight: 700, textDecoration: 'none' }}>Sign in →</Link>
        </p>
      </motion.div>

      <style>{`
        @media (max-width: 768px) { .signup-left-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
