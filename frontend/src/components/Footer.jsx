import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{ background:'#0a0a0a', borderTop:'1px solid rgba(230,28,28,0.15)', fontFamily:'Inter, system-ui, sans-serif' }}>
      {/* Newsletter strip */}
      <div style={{ background:'#e61c1c', padding:'28px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap' }}>
          <div>
            <h3 style={{ fontSize:'1.4rem', fontWeight:700, color:'#fff', marginBottom:4 }}>Get exclusive deals</h3>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.75)' }}>Subscribe for early access and discounts across Spain</p>
          </div>
          <div style={{ display:'flex', minWidth:300 }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex:1, padding:'11px 14px', background:'rgba(0,0,0,0.25)', border:'none', borderRadius:'8px 0 0 8px', color:'#fff', fontSize:14, outline:'none' }} />
            <motion.button whileHover={{ background:'#000' }} whileTap={{ scale:0.97 }}
              style={{ padding:'11px 20px', background:'#080808', border:'none', borderRadius:'0 8px 8px 0', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', transition:'background .2s' }}>
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'52px 24px', display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:48 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <span style={{ fontSize:28 }}>🚗</span>
            <span style={{ fontSize:'1.6rem', fontWeight:900, color:'#fff' }}>DRIVE<span style={{ color:'#e61c1c' }}>ES</span></span>
          </div>
          <p style={{ fontSize:14, color:'#444', lineHeight:1.8, marginBottom:24, maxWidth:280 }}>
            Spain's premium car rental platform. 500+ vehicles across 12 cities — delivered to your door.
          </p>
          <div style={{ display:'flex', gap:10 }}>
            {['facebook-f','instagram','twitter','linkedin'].map(s => (
              <motion.a key={s} href="#"
                whileHover={{ background:'#e61c1c', borderColor:'#e61c1c', color:'#fff', scale:1.1 }}
                style={{ width:36, height:36, borderRadius:8, background:'#111', border:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', color:'#555', fontSize:14, transition:'all .2s', textDecoration:'none' }}>
                <i className={`fab fa-${s}`}></i>
              </motion.a>
            ))}
          </div>
        </div>

        {[
          { title:'Navigation', links:[['Home','/'],['Browse Cars','/cars'],['About','/about'],['Contact','/contact']] },
          { title:'Contact', links:[['📧 support@drivees.com','#'],['📞 +34 900 123 456','#'],['📍 Madrid, Spain','#'],['🕐 24/7 Support','#']] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize:12, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:1.5, marginBottom:18 }}>{col.title}</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {col.links.map(([label, path]) => (
                <motion.div key={label} whileHover={{ x:4 }} style={{ transition:'all .2s' }}>
                  <Link to={path} style={{ fontSize:14, color:'#444', textDecoration:'none', transition:'color .2s' }}
                    onMouseEnter={e => e.target.style.color='#e61c1c'}
                    onMouseLeave={e => e.target.style.color='#444'}>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.04)', padding:'20px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:13, color:'#333' }}>© {new Date().getFullYear()} DriveES. All rights reserved.</p>
          <div style={{ display:'flex', gap:20 }}>
            {['Privacy Policy','Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontSize:13, color:'#333', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => e.target.style.color='#e61c1c'}
                onMouseLeave={e => e.target.style.color='#333'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
