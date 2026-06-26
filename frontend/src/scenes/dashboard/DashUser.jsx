import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

const MOCK_BOOKINGS = [
  { id: 'BK-001', car: 'Porsche 911', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80', from: '2026-06-10', to: '2026-06-13', days: 3, total: 960, status: 'completed', city: 'Marbella' },
  { id: 'BK-002', car: 'Tesla Model 3', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&q=80', from: '2026-05-20', to: '2026-05-22', days: 2, total: 190, status: 'completed', city: 'Madrid' },
  { id: 'BK-003', car: 'BMW 5 Series', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&q=80', from: '2026-07-05', to: '2026-07-08', days: 3, total: 267, status: 'upcoming', city: 'Barcelona' },
];

const statusColors = {
  completed: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', border: 'rgba(34,197,94,0.2)', label: '✓ Completed' },
  upcoming:  { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'rgba(59,130,246,0.2)', label: '⏳ Upcoming' },
  cancelled: { bg: 'rgba(230,28,28,0.1)',  color: '#e61c1c', border: 'rgba(230,28,28,0.2)',  label: '✗ Cancelled' },
};

function StatCard({ icon, label, value, sub, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      whileHover={{ y: -3, borderColor: 'rgba(230,28,28,0.3)' }}
      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '22px 24px', transition: 'all .2s' }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#555', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: '#e61c1c', marginTop: 6, fontWeight: 600 }}>{sub}</div>}
    </motion.div>
  );
}

export default function DashUser() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lastLogin] = useState(() => new Date().toLocaleString('en-ES', { dateStyle: 'medium', timeStyle: 'short' }));

  const totalSpent = MOCK_BOOKINGS.filter(b => b.status === 'completed').reduce((s, b) => s + b.total, 0);
  const upcoming = MOCK_BOOKINGS.filter(b => b.status === 'upcoming').length;
  const completed = MOCK_BOOKINGS.filter(b => b.status === 'completed').length;

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#fff', padding: '0 0 40px' }}>

      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, rgba(230,28,28,0.15) 0%, rgba(230,28,28,0.05) 100%)', border: '1px solid rgba(230,28,28,0.2)', borderRadius: 16, padding: '28px 32px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }}
          style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(230,28,28,0.1), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ fontSize: 12, color: '#e61c1c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Welcome Back</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6 }}>
          {currentUser?.firstName} {currentUser?.lastName} 👋
        </h2>
        <p style={{ fontSize: 13, color: '#555' }}>📧 {currentUser?.email} · Last login: {lastLogin}</p>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/cars')}
          style={{ marginTop: 20, padding: '10px 24px', background: '#e61c1c', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          🚗 Book a Car Now →
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon="🚗" label="Total Bookings" value={MOCK_BOOKINGS.length} sub={`${upcoming} upcoming`} delay={0.1} />
        <StatCard icon="✅" label="Completed" value={completed} delay={0.15} />
        <StatCard icon="💶" label="Total Spent" value={`€${totalSpent}`} sub="All time" delay={0.2} />
        <StatCard icon="⭐" label="Your Rating" value="4.9" sub="Trusted driver" delay={0.25} />
      </div>

      {/* Bookings */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>My Bookings</h3>
            <p style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Your rental history and upcoming trips</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/cars')}
            style={{ padding: '8px 16px', background: 'rgba(230,28,28,0.1)', border: '1px solid rgba(230,28,28,0.3)', borderRadius: 8, color: '#e61c1c', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            + New Booking
          </motion.button>
        </div>

        {MOCK_BOOKINGS.map((b, i) => (
          <motion.div key={b.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: i < MOCK_BOOKINGS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background .2s' }}>
            <img src={b.image} alt={b.car} style={{ width: 72, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{b.car}</div>
              <div style={{ fontSize: 12, color: '#555' }}>📍 {b.city} · {b.from} → {b.to} · {b.days} days</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#e61c1c', marginBottom: 4 }}>€{b.total}</div>
              <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: statusColors[b.status].bg, color: statusColors[b.status].color, border: `1px solid ${statusColors[b.status].border}` }}>
                {statusColors[b.status].label}
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#333', minWidth: 50, textAlign: 'right' }}>#{b.id}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Payment info + Profile info side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Saved payment */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>💳 Saved Payment</h3>
          <p style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>Used automatically at checkout</p>

          <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #222)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(230,28,28,0.1), transparent)', borderRadius: '50%' }} />
            <div style={{ fontSize: 22, marginBottom: 12 }}>💳</div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>•••• •••• •••• 4242</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555' }}>
              <span>{currentUser?.firstName} {currentUser?.lastName}</span>
              <span>12/28</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {['PayPal', 'Visa', 'MC'].map(p => (
              <div key={p} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, fontSize: 11, color: '#555' }}>{p}</div>
            ))}
            <button style={{ padding: '6px 12px', background: 'rgba(230,28,28,0.1)', border: '1px solid rgba(230,28,28,0.2)', borderRadius: 6, fontSize: 11, color: '#e61c1c', cursor: 'pointer', marginLeft: 'auto' }}>
              + Add
            </button>
          </div>
        </motion.div>

        {/* Personal info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #e61c1c, #8b0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
              {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{currentUser?.firstName} {currentUser?.lastName}</div>
              <div style={{ fontSize: 12, color: '#555' }}>Member since 2026</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['📧 Email', currentUser?.email],
              ['🆔 Account ID', currentUser?.id?.slice(-8)?.toUpperCase() || 'N/A'],
              ['🌍 Location', 'Spain'],
              ['✅ Status', 'Verified Driver'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13 }}>
                <span style={{ color: '#555' }}>{label}</span>
                <span style={{ color: '#ccc', fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard/user/settings')}
            style={{ width: '100%', marginTop: 16, padding: '10px', background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#888', fontSize: 13, cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { e.target.style.borderColor = 'rgba(230,28,28,0.4)'; e.target.style.color = '#e61c1c'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = '#888'; }}>
            Edit Profile →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
