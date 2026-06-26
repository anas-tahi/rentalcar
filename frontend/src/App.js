import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Router from './routes/Router';
import './components/i18n';
import './styles/animations.css';
import '../styles/styles.scss';

// Preloader
function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#080808',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 24
      }}
    >
      {/* Animated car logo */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ fontSize: 64 }}
      >
        🚗
      </motion.div>
      {/* Red loading bar */}
      <div style={{ width: 200, height: 2, background: '#1a1a1a', borderRadius: 1, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #e61c1c, #ff6b6b)' }}
        />
      </div>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ color: '#555', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase' }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}

// Page transition wrapper
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Spotlight effect
function Spotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(230,28,28,0.04), transparent 40%)`
    }} />
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 1400); }, []);

  return (
    <>
      <Spotlight />
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      {!loading && (
        <PageTransition>
          <Router />
        </PageTransition>
      )}
    </>
  );
}

export default App;
