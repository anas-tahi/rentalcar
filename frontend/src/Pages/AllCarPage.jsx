import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../Context/authContext';

const CARS = [
  { id:'1', name:'BMW 5 Series', brand:'BMW', category:'Sedan', price:89, location:'Madrid', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80', badge:'Popular', available:true },
  { id:'2', name:'Mercedes GLE', brand:'Mercedes', category:'SUV', price:145, location:'Barcelona', seats:7, transmission:'Automatic', fuel:'Hybrid', year:2024, image:'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=700&q=80', badge:'New', available:true },
  { id:'3', name:'Porsche 911', brand:'Porsche', category:'Sports', price:320, location:'Marbella', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80', badge:'Premium', available:true },
  { id:'4', name:'Range Rover Sport', brand:'Land Rover', category:'SUV', price:185, location:'Valencia', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80', badge:'', available:true },
  { id:'5', name:'Audi A4', brand:'Audi', category:'Sedan', price:75, location:'Seville', seats:5, transmission:'Automatic', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=700&q=80', badge:'', available:true },
  { id:'6', name:'Tesla Model 3', brand:'Tesla', category:'Electric', price:95, location:'Madrid', seats:5, transmission:'Automatic', fuel:'Electric', year:2024, image:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=700&q=80', badge:'Eco', available:true },
  { id:'7', name:'Ferrari F8 Spider', brand:'Ferrari', category:'Convertible', price:850, location:'Marbella', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=700&q=80', badge:'Exotic', available:true },
  { id:'8', name:'VW Golf', brand:'Volkswagen', category:'Economy', price:45, location:'Barcelona', seats:5, transmission:'Manual', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=700&q=80', badge:'Best Value', available:true },
  { id:'9', name:'Lamborghini Huracán', brand:'Lamborghini', category:'Sports', price:1200, location:'Barcelona', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80', badge:'Exotic', available:true },
  { id:'10', name:'Jeep Wrangler', brand:'Jeep', category:'SUV', price:98, location:'Granada', seats:5, transmission:'Manual', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80', badge:'', available:true },
  { id:'11', name:'Mercedes C-Class', brand:'Mercedes', category:'Sedan', price:110, location:'Bilbao', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&q=80', badge:'', available:true },
  { id:'12', name:'Toyota Camry Hybrid', brand:'Toyota', category:'Economy', price:55, location:'Valencia', seats:5, transmission:'Automatic', fuel:'Hybrid', year:2023, image:'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&q=80', badge:'', available:true },
];

const CATEGORIES = ['All','Economy','Sedan','SUV','Sports','Convertible','Electric'];
const SPAIN_CITIES = ['All Cities','Madrid','Barcelona','Valencia','Seville','Bilbao','Granada','Marbella','Málaga','Ibiza','Palma de Mallorca'];

export default function AllCarPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const params = new URLSearchParams(location.search);

  const [category, setCategory] = useState('All');
  const [city, setCity] = useState(params.get('city') || 'All Cities');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState('name');
  const [hovered, setHovered] = useState(null);

  const filtered = CARS
    .filter(c => category === 'All' || c.category === category)
    .filter(c => city === 'All Cities' || c.location === city)
    .filter(c => c.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const handleBook = (car) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate(`/rent-car/${car.id}`, { state: { car } });
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#fff' }}>
      <Navbar />

      {/* Header */}
      <section style={{ paddingTop: 110, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>
            Our Fleet
          </motion.h1>
          <p style={{ color: '#555', fontSize: 14 }}>{filtered.length} vehicles available</p>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32, alignItems: 'start' }}>

        {/* Filters sidebar */}
        <motion.aside initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, position: 'sticky', top: 88 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#fff' }}>🔍 Filters</h3>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 10 }}>Category</label>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', borderRadius: 8, border: 'none', background: category === cat ? 'rgba(230,28,28,0.15)' : 'transparent', color: category === cat ? '#fff' : '#555', fontSize: 14, fontWeight: category === cat ? 700 : 400, cursor: 'pointer', marginBottom: 4, transition: 'all .2s' }}>
                {cat === 'All' ? '🚗 ' : ''}{cat}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 10 }}>City</label>
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px', color: '#ccc', fontSize: 14, outline: 'none' }}>
              {SPAIN_CITIES.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 10 }}>
              Max Price: <span style={{ color: '#e61c1c' }}>€{maxPrice}/day</span>
            </label>
            <input type="range" min={40} max={1500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#e61c1c' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#444', marginTop: 4 }}>
              <span>€40</span><span>€1500</span>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 10 }}>Sort By</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px', color: '#ccc', fontSize: 14, outline: 'none' }}>
              <option value="name">Name A–Z</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          <button onClick={() => { setCategory('All'); setCity('All Cities'); setMaxPrice(1500); setSortBy('name'); }}
            style={{ width: '100%', marginTop: 20, padding: '10px', background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#555', fontSize: 13, cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => e.target.style.borderColor = '#e61c1c'}
            onMouseLeave={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}>
            Reset Filters
          </button>
        </motion.aside>

        {/* Cars grid */}
        <div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#444' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: '1.4rem', color: '#666', marginBottom: 8 }}>No cars found</h3>
              <p style={{ fontSize: 14 }}>Try adjusting your filters</p>
            </div>
          ) : (
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
              <AnimatePresence>
                {filtered.map((car, i) => (
                  <motion.div key={car.id}
                    initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.9 }}
                    transition={{ duration:0.4, delay: i * 0.05 }}
                    onHoverStart={() => setHovered(car.id)} onHoverEnd={() => setHovered(null)}
                    whileHover={{ y:-6 }}
                    style={{ background: '#111', border: `1px solid ${hovered === car.id ? 'rgba(230,28,28,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .3s', boxShadow: hovered === car.id ? '0 20px 50px rgba(0,0,0,0.5)' : 'none' }}>
                    <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                      <motion.img src={car.image} alt={car.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        animate={{ scale: hovered === car.id ? 1.06 : 1 }} transition={{ duration: 0.4 }}
                        loading="lazy" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)' }} />
                      {car.badge && <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(230,28,28,0.9)', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{car.badge}</div>}
                      <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: '#aaa', padding: '3px 8px', borderRadius: 4, fontSize: 11 }}>📍 {car.location}</div>
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{car.name}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                        {[`🪑 ${car.seats}`, `⚙️ ${car.transmission}`, `⛽ ${car.fuel}`, `📅 ${car.year}`].map(v => (
                          <span key={v} style={{ fontSize: 11, color: '#555' }}>{v}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                        <div>
                          <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#e61c1c' }}>€{car.price}</span>
                          <span style={{ fontSize: 11, color: '#444' }}>/day</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(230,28,28,0.5)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBook(car)}
                          style={{ padding: '8px 16px', background: '#e61c1c', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                          {currentUser ? 'Book Now →' : 'Login to Book'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
