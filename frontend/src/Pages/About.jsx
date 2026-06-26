import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

export default function About() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.span {...fadeUp(0)} style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#e61c1c', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>About Us</motion.span>
          <motion.h1 {...fadeUp(0.1)} style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20 }}>
            Spain's Premium<br /><span style={{ color: '#e61c1c' }}>Car Rental</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} style={{ fontSize: 16, color: '#666', lineHeight: 1.8, maxWidth: 560 }}>
            With over 10 years of experience, DriveES provides premium vehicles across 12 Spanish cities. From economy to exotic — we deliver to airports, hotels and city centres.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 24 }}>
          {[
            { num: '10+', label: 'Years Experience', icon: '🏆' },
            { num: '500+', label: 'Vehicles', icon: '🚗' },
            { num: '12', label: 'Spanish Cities', icon: '📍' },
            { num: '50K+', label: 'Happy Customers', icon: '😊' },
            { num: '4.9★', label: 'Average Rating', icon: '⭐' },
          ].map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.08)}
              whileHover={{ y: -4, borderColor: 'rgba(230,28,28,0.4)' }}
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 24, textAlign: 'center', transition: 'all .2s' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e61c1c', letterSpacing: '-1px' }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#444', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <motion.div {...fadeUp(0)}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#e61c1c', textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 12 }}>Our Story</span>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 20 }}>We Started With a Simple Mission</h2>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, marginBottom: 16 }}>
              Founded in 2014 in Madrid, DriveES was created to make premium car rental accessible to everyone visiting Spain. We noticed that most rental companies offered either cheap unreliable cars or overpriced luxury with hidden fees.
            </p>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, marginBottom: 32 }}>
              We built something different — a curated fleet of well-maintained vehicles at honest prices, with transparent billing and real 24/7 support.
            </p>
            {['All-inclusive pricing — no hidden fees', 'Free cancellation up to 48 hours', 'Young fleet — all under 3 years old', 'Multilingual support (EN, ES, FR)', 'Delivery to any address in Spain'].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#aaa', marginBottom: 10 }}>
                <span style={{ color: '#e61c1c', fontWeight: 700 }}>✓</span> {item}
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.2)} style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?w=700&q=80" alt="About"
              style={{ width: '100%', borderRadius: 16, objectFit: 'cover', aspectRatio: '4/3' }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, background: '#e61c1c', borderRadius: 12, padding: '16px 20px', boxShadow: '0 10px 40px rgba(230,28,28,0.4)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>10+</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Years in Spain</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#e61c1c', textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 12 }}>Our Values</span>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-1px' }}>What We Stand For</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {[
              { icon: '🔒', title: 'Trust & Safety', desc: 'Every vehicle is fully insured and regularly inspected by certified mechanics.' },
              { icon: '💎', title: 'Premium Quality', desc: 'Fleet younger than 3 years. Always clean, always ready when you arrive.' },
              { icon: '💰', title: 'Fair Pricing', desc: 'What you see is what you pay. No surprise charges at pickup or return.' },
              { icon: '🌍', title: 'Sustainability', desc: 'Growing electric and hybrid fleet to reduce our carbon footprint across Spain.' },
            ].map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.1)}
                whileHover={{ y: -4, borderColor: 'rgba(230,28,28,0.3)' }}
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 28, transition: 'all .2s' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
