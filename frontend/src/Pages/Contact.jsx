import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#e61c1c', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>Contact Us</motion.span>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
            Let's <span style={{ color: '#e61c1c' }}>Talk</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} style={{ fontSize: 16, color: '#666', maxWidth: 500 }}>
            Have a question, need a custom quote, or want to arrange a corporate account? We're here 24/7.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, alignItems: 'start' }}>

          {/* Info */}
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Get in Touch</h2>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 36 }}>
              Our team typically responds within 2 hours. For urgent matters, call our 24/7 hotline.
            </p>
            {[
              { icon: '📞', title: '24/7 Hotline', val: '+34 900 123 456', sub: 'Available around the clock' },
              { icon: '📧', title: 'Email', val: 'support@drivees.com', sub: 'Response within 2 hours' },
              { icon: '📍', title: 'Head Office', val: 'Calle Gran Vía 28, Madrid', sub: 'Mon–Fri 9:00–18:00' },
              { icon: '💬', title: 'WhatsApp', val: '+34 600 123 456', sub: 'Quick chat support' },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(230,28,28,0.1)', border: '1px solid rgba(230,28,28,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.val}</div>
                  <div style={{ fontSize: 12, color: '#444', marginTop: 2 }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2 }}
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 36 }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 24 }}>Send us a Message</h3>

            {sent && (
              <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                style={{ background: 'rgba(0,200,100,0.1)', border: '1px solid rgba(0,200,100,0.3)', color: '#4ade80', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
                ✅ Message sent! We'll get back to you within 2 hours.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Anas Tahir' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key]} required
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Subject</label>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '11px 14px', color: '#ccc', fontSize: 14, outline: 'none' }}>
                  <option value="">Select a topic...</option>
                  <option value="booking">Booking Question</option>
                  <option value="quote">Custom Quote</option>
                  <option value="corporate">Corporate Account</option>
                  <option value="support">Customer Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Message</label>
                <textarea rows={5} placeholder="Tell us how we can help..." value={form.message} required
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>

              <motion.button type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(230,28,28,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '14px', background: 'linear-gradient(135deg, #e61c1c, #c91515)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                Send Message →
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
