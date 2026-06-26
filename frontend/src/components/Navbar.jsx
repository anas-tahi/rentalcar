import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../Context/authContext';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Fleet' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 68,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          background: scrolled ? 'rgba(8,8,8,0.98)' : 'rgba(8,8,8,0.7)',
          backdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid rgba(230,28,28,0.2)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <motion.div
            whileHover={{ rotate: [0,-10,10,0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 28 }}
          >
            🚗
          </motion.div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
            DRIVE<span style={{ color: '#e61c1c' }}>ES</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          {LINKS.map(link => {
            const active = location.pathname === link.to;
            return (
              <motion.div key={link.to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={link.to} style={{
                  display: 'inline-block',
                  padding: '7px 16px', borderRadius: 8,
                  fontSize: 14, fontWeight: active ? 700 : 500,
                  color: active ? '#fff' : '#888',
                  background: active ? 'rgba(230,28,28,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(230,28,28,0.3)' : '1px solid transparent',
                  textDecoration: 'none', transition: 'all .2s',
                }}>
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-pill" style={{
                      position:'absolute', bottom:-1, left:0, right:0,
                      height:1, background:'#e61c1c'
                    }} />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {currentUser ? (
            <>
              <Link to={currentUser.isAdmin ? '/dashboard/admin' : '/dashboard/user'}>
                <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  style={{ padding:'8px 16px', background:'rgba(230,28,28,0.1)', border:'1px solid rgba(230,28,28,0.3)', color:'#e61c1c', borderRadius:8, fontSize:14, fontWeight:700, cursor:'pointer' }}>
                  Dashboard
                </motion.button>
              </Link>
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                onClick={logout}
                style={{ padding:'8px 14px', background:'none', border:'1px solid rgba(255,255,255,0.1)', color:'#666', borderRadius:8, fontSize:14, cursor:'pointer' }}>
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  style={{ padding:'8px 20px', background:'none', border:'1px solid rgba(255,255,255,0.15)', color:'#ccc', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button whileHover={{ scale:1.05, boxShadow:'0 0 20px rgba(230,28,28,0.4)' }} whileTap={{ scale:0.95 }}
                  className="btn-glow"
                  style={{ padding:'8px 20px', background:'#e61c1c', border:'none', color:'#fff', borderRadius:8, fontSize:14, fontWeight:700, cursor:'pointer' }}>
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            style={{ display:'none', background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer', padding:4 }}
            className="mobile-hamb"
          >
            {open ? '✕' : '☰'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            transition={{ duration: 0.25 }}
            style={{
              position:'fixed', top:68, left:0, right:0,
              background:'rgba(8,8,8,0.98)', backdropFilter:'blur(20px)',
              borderBottom:'1px solid rgba(230,28,28,0.2)',
              padding: 20, zIndex: 999,
              display:'flex', flexDirection:'column', gap:8
            }}
          >
            {LINKS.map((link, i) => (
              <motion.div key={link.to}
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={link.to} style={{ display:'block', padding:'12px 16px', color:'#ccc', fontSize:16, fontWeight:500, borderRadius:8, textDecoration:'none', background:'rgba(255,255,255,0.03)' }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {!currentUser ? (
              <div style={{ display:'flex', gap:10, paddingTop:8 }}>
                <Link to="/login" style={{ flex:1 }}>
                  <button style={{ width:'100%', padding:'12px', background:'none', border:'1px solid rgba(255,255,255,0.1)', color:'#ccc', borderRadius:8, fontSize:15, cursor:'pointer' }}>Login</button>
                </Link>
                <Link to="/signup" style={{ flex:1 }}>
                  <button style={{ width:'100%', padding:'12px', background:'#e61c1c', border:'none', color:'#fff', borderRadius:8, fontSize:15, fontWeight:700, cursor:'pointer' }}>Sign Up</button>
                </Link>
              </div>
            ) : (
              <button onClick={logout} style={{ padding:'12px', background:'none', border:'1px solid rgba(230,28,28,0.3)', color:'#e61c1c', borderRadius:8, fontSize:15, cursor:'pointer' }}>
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamb { display: block !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:nth-child(3) > a, nav > div:nth-child(3) > div:not(.mobile-hamb) { display: none !important; }
        }
      `}</style>
    </>
  );
}
