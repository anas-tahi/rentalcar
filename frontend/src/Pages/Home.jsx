import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../Context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── DATA ──
const SPAIN_CITIES = ['Madrid','Barcelona','Valencia','Seville','Bilbao','Granada','Marbella','Málaga','Ibiza','Palma de Mallorca'];

const CARS = [
  { id:'1', name:'BMW 5 Series', brand:'BMW', category:'Sedan', price:89, location:'Madrid', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80', badge:'Popular' },
  { id:'2', name:'Mercedes GLE', brand:'Mercedes', category:'SUV', price:145, location:'Barcelona', seats:7, transmission:'Automatic', fuel:'Hybrid', year:2024, image:'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=700&q=80', badge:'New' },
  { id:'3', name:'Porsche 911', brand:'Porsche', category:'Sports', price:320, location:'Marbella', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80', badge:'Premium' },
  { id:'4', name:'Range Rover Sport', brand:'Land Rover', category:'SUV', price:185, location:'Valencia', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80', badge:'' },
  { id:'5', name:'Audi A4', brand:'Audi', category:'Sedan', price:75, location:'Seville', seats:5, transmission:'Automatic', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=700&q=80', badge:'' },
  { id:'6', name:'Tesla Model 3', brand:'Tesla', category:'Electric', price:95, location:'Madrid', seats:5, transmission:'Automatic', fuel:'Electric', year:2024, image:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=700&q=80', badge:'Eco' },
  { id:'7', name:'Ferrari F8 Spider', brand:'Ferrari', category:'Convertible', price:850, location:'Marbella', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=700&q=80', badge:'Exotic' },
  { id:'8', name:'VW Golf', brand:'Volkswagen', category:'Economy', price:45, location:'Barcelona', seats:5, transmission:'Manual', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=700&q=80', badge:'Best Value' },
  { id:'9', name:'Lamborghini Huracán', brand:'Lamborghini', category:'Sports', price:1200, location:'Barcelona', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80', badge:'Exotic' },
  { id:'10', name:'Jeep Wrangler', brand:'Jeep', category:'SUV', price:98, location:'Granada', seats:5, transmission:'Manual', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80', badge:'' },
  { id:'11', name:'Mercedes C-Class', brand:'Mercedes', category:'Sedan', price:110, location:'Bilbao', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&q=80', badge:'' },
  { id:'12', name:'Toyota Camry Hybrid', brand:'Toyota', category:'Economy', price:55, location:'Valencia', seats:5, transmission:'Automatic', fuel:'Hybrid', year:2023, image:'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&q=80', badge:'' },
];

const CATEGORIES = [
  {id:'all',label:'All Cars',icon:'🚗'},
  {id:'Economy',label:'Economy',icon:'💰'},
  {id:'Sedan',label:'Sedan',icon:'🚙'},
  {id:'SUV',label:'SUV',icon:'🏔️'},
  {id:'Sports',label:'Sports',icon:'🏎️'},
  {id:'Convertible',label:'Convertible',icon:'🌞'},
  {id:'Electric',label:'Electric',icon:'⚡'},
];

const STATS = [
  {num:'500+',label:'Vehicles'},
  {num:'12',label:'Spanish Cities'},
  {num:'4.9★',label:'Rating'},
  {num:'24/7',label:'Support'},
];

// ── Animated counter ──
function Counter({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const num = parseInt(value.replace(/\D/g,''));
  const suffix = value.replace(/[\d]/g,'');

  useEffect(() => {
    if (!inView || !num) return;
    let start = 0;
    const step = num / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(t);
  }, [inView, num]);

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, scale:0.5 }}
      animate={inView ? { opacity:1, scale:1 } : {}}
      transition={{ duration:0.5, type:'spring' }}
      style={{ textAlign:'center' }}
    >
      <div style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#fff', letterSpacing:'-1px' }}>
        <span style={{ color:'#e61c1c' }}>{num ? count : value}</span>{num ? suffix : ''}
      </div>
      <div style={{ fontSize:11, color:'#555', textTransform:'uppercase', letterSpacing:2, marginTop:4 }}>{label}</div>
    </motion.div>
  );
}

// ── Car Card with 3D effect ──
function CarCard({ car, index }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:'-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:60 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.5, delay: index * 0.06, ease:[0.4,0,0.2,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y:-8, rotateX:2, rotateY:-1 }}
      style={{
        background:'#111', border:`1px solid ${hovered ? 'rgba(230,28,28,0.4)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius:16, overflow:'hidden', cursor:'pointer',
        transformStyle:'preserve-3d', perspective:1000,
        transition:'border-color .3s',
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,28,28,0.2)' : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image */}
      <div style={{ position:'relative', overflow:'hidden', height:200 }}>
        <motion.img
          src={car.image} alt={car.name}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration:0.4 }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
        {car.badge && (
          <motion.div
            initial={{ opacity:0, x:-20 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ delay: index*0.06 + 0.2 }}
            style={{ position:'absolute', top:12, left:12, background:'rgba(230,28,28,0.9)', color:'#fff', padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:700, letterSpacing:0.5 }}
          >
            {car.badge}
          </motion.div>
        )}
        <div style={{ position:'absolute', bottom:10, left:12, fontSize:12, color:'rgba(255,255,255,0.7)' }}>
          📍 {car.location}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:18 }}>
        <div style={{ fontSize:17, fontWeight:700, color:'#fff', marginBottom:10 }}>{car.name}</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:14 }}>
          {[[`🪑 ${car.seats}`,'seats'],[`⚙️ ${car.transmission}`,'trans'],[`⛽ ${car.fuel}`,'fuel']].map(([v]) => (
            <span key={v} style={{ fontSize:12, color:'#555' }}>{v}</span>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:14 }}>
          <div>
            <span style={{ fontSize:'1.8rem', fontWeight:900, color:'#e61c1c' }}>€{car.price}</span>
            <span style={{ fontSize:12, color:'#444' }}>/day</span>
          </div>
          <motion.button
            whileHover={{ scale:1.05, boxShadow:'0 0 20px rgba(230,28,28,0.5)' }}
            whileTap={{ scale:0.95 }}
            onClick={() => currentUser ? navigate(`/rent-car/${car.id}`, { state: { car } }) : navigate('/login')}
            style={{ padding:'9px 18px', background:'#e61c1c', border:'none', borderRadius:8, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}
          >
            Book Now →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ── FAQ Item ──
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale:0.98 }}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 0', background:'none', border:'none', color: open ? '#e61c1c' : '#fff', fontSize:15, fontWeight:600, cursor:'pointer', textAlign:'left', gap:16 }}
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.3 }} style={{ fontSize:20, color: open ? '#e61c1c' : '#444', flexShrink:0 }}>⌄</motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.3 }}
            style={{ overflow:'hidden' }}
          >
            <p style={{ fontSize:14, color:'#666', lineHeight:1.7, paddingBottom:20, paddingRight:32 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN HOME ──
export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [pickDate, setPickDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [category, setCategory] = useState('all');
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const filtered = category === 'all' ? CARS : CARS.filter(c => c.category === category);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ background:'#080808', minHeight:'100vh', fontFamily:'Inter, system-ui, sans-serif', color:'#fff' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        {/* Background image with parallax */}
        <motion.div style={{ position:'absolute', inset:0, y: heroY, opacity: heroOpacity }}>
          <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1800&q=80"
            alt="Spain" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.18 }} />
        </motion.div>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.95) 100%)' }} />

        {/* Animated red glow blobs */}
        <motion.div animate={{ scale:[1,1.2,1], opacity:[0.3,0.5,0.3] }} transition={{ duration:6, repeat:Infinity }}
          style={{ position:'absolute', top:'20%', right:'10%', width:400, height:400, background:'radial-gradient(circle, rgba(230,28,28,0.12) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <motion.div animate={{ scale:[1.2,1,1.2], opacity:[0.2,0.4,0.2] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:'absolute', bottom:'20%', left:'5%', width:300, height:300, background:'radial-gradient(circle, rgba(230,28,28,0.08) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:900, margin:'0 auto', padding:'100px 24px 120px' }}>
          {/* Tag */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(230,28,28,0.1)', border:'1px solid rgba(230,28,28,0.3)', color:'#e61c1c', padding:'6px 16px', borderRadius:20, fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:2, marginBottom:28 }}
          >
            <motion.span animate={{ scale:[1,1.4,1] }} transition={{ duration:2, repeat:Infinity }} style={{ width:6, height:6, background:'#e61c1c', borderRadius:'50%', display:'inline-block' }} />
            Premium Car Rental in Spain
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
            style={{ fontSize:'clamp(3rem,7vw,6rem)', fontWeight:900, lineHeight:1.0, letterSpacing:'-2px', marginBottom:20 }}>
            Drive Spain<br />
            <span style={{ WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', backgroundImage:'linear-gradient(135deg, #e61c1c, #ff6b6b)' }}>
              Your Way
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}
            style={{ fontSize:'1.1rem', color:'#777', lineHeight:1.7, marginBottom:48, maxWidth:560 }}>
            500+ premium vehicles across 12 Spanish cities. Economy to exotic — delivered to your hotel, airport, or city center.
          </motion.p>

          {/* Search box */}
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.4 }}
            style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:14, maxWidth:800 }}
          >
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:6 }}>📍 City</label>
              <select value={city} onChange={e=>setCity(e.target.value)}
                style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'10px 12px', color: city ? '#fff':'#444', fontSize:14, outline:'none', cursor:'pointer' }}>
                <option value="">Select city...</option>
                {SPAIN_CITIES.map(c => <option key={c} value={c} style={{ background:'#111' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:6 }}>📅 Pick-up</label>
              <input type="date" value={pickDate} onChange={e=>setPickDate(e.target.value)} min={today}
                style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'10px 12px', color:'#ccc', fontSize:14, outline:'none' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:6 }}>📅 Return</label>
              <input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} min={pickDate||today}
                style={{ width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'10px 12px', color:'#ccc', fontSize:14, outline:'none' }} />
            </div>
            <motion.button
              whileHover={{ scale:1.05, boxShadow:'0 0 30px rgba(230,28,28,0.6)' }}
              whileTap={{ scale:0.97 }}
              onClick={() => navigate(`/cars?city=${city}&from=${pickDate}&to=${returnDate}`)}
              style={{ padding:'10px 24px', background:'linear-gradient(135deg, #e61c1c, #c91515)', border:'none', borderRadius:10, color:'#fff', fontSize:15, fontWeight:800, cursor:'pointer', alignSelf:'flex-end', whiteSpace:'nowrap' }}
            >
              🔍 Search
            </motion.button>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
            style={{ display:'flex', gap:48, marginTop:56, flexWrap:'wrap' }}>
            {STATS.map((s,i) => (
              <motion.div key={s.label} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 + i*0.1 }}>
                <Counter value={s.num} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2, repeat:Infinity }}
          style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', color:'#333', fontSize:22, zIndex:2, cursor:'pointer' }}
          onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior:'smooth' })}>
          ↓
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'80px 24px', background:'#0d0d0d', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:56 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#e61c1c', textTransform:'uppercase', letterSpacing:3, display:'block', marginBottom:10 }}>Simple Process</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, letterSpacing:'-1px' }}>Book in 3 Steps</h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:24 }}>
            {[
              { icon:'📍', step:1, title:'Choose City', desc:'Select from 12 Spanish cities — delivered to airport, hotel or station.' },
              { icon:'🚗', step:2, title:'Pick Your Car', desc:'Browse 500+ vehicles. Filter by type, price, fuel and features.' },
              { icon:'🔑', step:3, title:'Drive & Enjoy', desc:'Keys in hand in minutes. All-inclusive pricing, no hidden fees.' },
            ].map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y:-4 }}
                style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:16, padding:32, textAlign:'center', position:'relative', overflow:'hidden' }}
              >
                <motion.div animate={{ rotate:[0,5,-5,0] }} transition={{ duration:4, repeat:Infinity, delay:i*0.5 }}
                  style={{ fontSize:40, marginBottom:16 }}>{s.icon}</motion.div>
                <div style={{ position:'absolute', top:16, right:16, fontSize:48, fontWeight:900, color:'rgba(230,28,28,0.06)', lineHeight:1 }}>{s.step}</div>
                <div style={{ fontSize:17, fontWeight:700, color:'#fff', marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:14, color:'#555', lineHeight:1.6 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section id="fleet" style={{ padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:40 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#e61c1c', textTransform:'uppercase', letterSpacing:3, display:'block', marginBottom:10 }}>Our Fleet</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, letterSpacing:'-1px', marginBottom:8 }}>Available Cars</h2>
            <p style={{ fontSize:15, color:'#444' }}>All vehicles are fully insured, under 3 years old and regularly maintained.</p>
          </motion.div>

          {/* Category tabs */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:36 }}>
            {CATEGORIES.map(cat => (
              <motion.button key={cat.id}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                onClick={() => setCategory(cat.id)}
                style={{ padding:'9px 18px', borderRadius:8, border:`1px solid ${category===cat.id ? '#e61c1c':'rgba(255,255,255,0.08)'}`, background: category===cat.id ? 'rgba(230,28,28,0.15)':'transparent', color: category===cat.id ? '#fff':'#555', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6, transition:'all .2s' }}
              >
                {cat.icon} {cat.label}
                {category===cat.id && <motion.div layoutId="cat-pill" style={{ position:'absolute', inset:0, borderRadius:8, border:'1px solid #e61c1c', pointerEvents:'none' }} />}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:20 }}>
            <AnimatePresence>
              {filtered.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
            </AnimatePresence>
          </motion.div>

          <motion.div style={{ textAlign:'center', marginTop:48 }} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
            <Link to="/cars">
              <motion.button whileHover={{ scale:1.04, borderColor:'#e61c1c', color:'#e61c1c' }} whileTap={{ scale:0.97 }}
                style={{ padding:'14px 40px', border:'1.5px solid rgba(255,255,255,0.12)', background:'transparent', color:'#888', borderRadius:8, fontSize:15, fontWeight:700, cursor:'pointer', transition:'all .2s' }}>
                View All Cars →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding:'80px 24px', background:'#0d0d0d', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#e61c1c', textTransform:'uppercase', letterSpacing:3, display:'block', marginBottom:12 }}>Why Us</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, letterSpacing:'-1px', marginBottom:20 }}>Spain's Most Trusted Car Rental</h2>
            <p style={{ fontSize:15, color:'#555', lineHeight:1.8, marginBottom:32 }}>
              Over 10 years delivering premium vehicles across Spain. Young fleet, all-inclusive pricing and 24/7 roadside assistance included.
            </p>
            {[
              '✅ Best price guarantee — we match any lower price',
              '✅ Free cancellation up to 48 hours before pickup',
              '✅ All-inclusive — no hidden fees ever',
              '✅ Airport, hotel & city centre delivery',
              '✅ English, Spanish & French support 24/7',
            ].map((item,i) => (
              <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
                style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, color:'#aaa', marginBottom:12 }}>
                {item}
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[
              { num:'10+', label:'Years', icon:'🏆' },
              { num:'500+', label:'Vehicles', icon:'🚗' },
              { num:'50K+', label:'Customers', icon:'😊' },
              { num:'4.9★', label:'Rating', icon:'⭐' },
            ].map((s,i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ delay: i*0.1 }}
                whileHover={{ scale:1.05, borderColor:'rgba(230,28,28,0.4)' }}
                style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:24, textAlign:'center', transition:'border-color .2s' }}
              >
                <div style={{ fontSize:32, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:'2rem', fontWeight:900, color:'#e61c1c', letterSpacing:'-1px' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'#444', marginTop:4 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

            {/* ── FAQ ── */}
      <section style={{ padding:'80px 24px', background:'#0d0d0d', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:52 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#e61c1c', textTransform:'uppercase', letterSpacing:3, display:'block', marginBottom:10 }}>FAQ</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, letterSpacing:'-1px' }}>Common Questions</h2>
          </motion.div>
          {[
            ['What documents do I need?','A valid driver\'s license and passport or national ID. International visitors may need an International Driving Permit.'],
            ['What\'s the minimum age?','You must be at least 21 years old. Drivers under 25 may incur a young driver surcharge.'],
            ['Is insurance included?','Yes — all vehicles come with third-party liability. Full coverage upgrades available at checkout.'],
            ['Can I return in a different city?','Yes! One-way rentals available between all 10 cities. A small one-way fee may apply.'],
            ['What payment methods?','Visa, Mastercard, PayPal and bank transfers. Security deposit required at pickup.'],
          ].map(([q,a]) => <FaqItem key={q} q={q} a={a} />)}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding:'80px 24px', background:'linear-gradient(135deg, #e61c1c 0%, #8b0000 100%)', position:'relative', overflow:'hidden' }}>
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:6, repeat:Infinity }}
          style={{ position:'absolute', top:'-30%', right:'-10%', width:500, height:500, background:'rgba(255,255,255,0.05)', borderRadius:'50%', pointerEvents:'none' }} />
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', position:'relative', zIndex:1, maxWidth:600, margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:900, color:'#fff', letterSpacing:'-1px', marginBottom:16 }}>
            Ready to Hit the Road?
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.8)', marginBottom:36, lineHeight:1.6 }}>
            Book your perfect car in under 2 minutes. Pickup anywhere in Spain.
          </p>
          <Link to="/cars">
            <motion.button
              whileHover={{ scale:1.06, y:-3, boxShadow:'0 20px 40px rgba(0,0,0,0.4)' }}
              whileTap={{ scale:0.97 }}
              style={{ padding:'16px 40px', background:'#fff', color:'#e61c1c', border:'none', borderRadius:10, fontSize:16, fontWeight:800, cursor:'pointer' }}
            >
              Browse All Cars →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
