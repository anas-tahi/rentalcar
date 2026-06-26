import React, { useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../Context/authContext';

const CARS = [
  { id:'1', name:'BMW 5 Series', brand:'BMW', category:'Sedan', price:89, location:'Madrid', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', description:'Elegant executive sedan with premium comfort, advanced technology and smooth performance. Perfect for business travel or exploring Spain in style.' },
  { id:'2', name:'Mercedes GLE', brand:'Mercedes', category:'SUV', price:145, location:'Barcelona', seats:7, transmission:'Automatic', fuel:'Hybrid', year:2024, image:'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80', description:'Luxurious 7-seat SUV combining comfort, style and hybrid efficiency. Ideal for families or groups exploring Spain.' },
  { id:'3', name:'Porsche 911', brand:'Porsche', category:'Sports', price:320, location:'Marbella', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', description:'Iconic sports car delivering pure driving pleasure on Spanish roads. An unforgettable experience along the Costa del Sol.' },
  { id:'4', name:'Range Rover Sport', brand:'Land Rover', category:'SUV', price:185, location:'Valencia', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80', description:'The ultimate luxury SUV — refined, powerful and capable on any terrain across Spain.' },
  { id:'5', name:'Audi A4', brand:'Audi', category:'Sedan', price:75, location:'Seville', seats:5, transmission:'Automatic', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80', description:'Premium compact sedan with quattro AWD and Audi Virtual Cockpit. Sporty, comfortable and efficient.' },
  { id:'6', name:'Tesla Model 3', brand:'Tesla', category:'Electric', price:95, location:'Madrid', seats:5, transmission:'Automatic', fuel:'Electric', year:2024, image:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80', description:'Zero emission driving with 500km range and Autopilot. The future of car rental in Spain.' },
  { id:'7', name:'Ferrari F8 Spider', brand:'Ferrari', category:'Convertible', price:850, location:'Marbella', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80', description:'720 HP of pure Italian passion with a retractable roof. The most exhilarating drive on the Costa del Sol.' },
  { id:'8', name:'VW Golf', brand:'Volkswagen', category:'Economy', price:45, location:'Barcelona', seats:5, transmission:'Manual', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', description:'Europe\'s most popular car — practical, reliable and fun to drive through Spanish cities.' },
  { id:'9', name:'Lamborghini Huracán', brand:'Lamborghini', category:'Sports', price:1200, location:'Barcelona', seats:2, transmission:'Automatic', fuel:'Petrol', year:2024, image:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80', description:'640 HP mid-engine supercar. The definition of Italian performance on Spanish roads.' },
  { id:'10', name:'Jeep Wrangler', brand:'Jeep', category:'SUV', price:98, location:'Granada', seats:5, transmission:'Manual', fuel:'Petrol', year:2023, image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80', description:'The legendary off-roader — perfect for Sierra Nevada mountain adventures near Granada.' },
  { id:'11', name:'Mercedes C-Class', brand:'Mercedes', category:'Sedan', price:110, location:'Bilbao', seats:5, transmission:'Automatic', fuel:'Diesel', year:2024, image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', description:'The new benchmark for compact luxury sedans. Advanced MBUX system and Burmester sound.' },
  { id:'12', name:'Toyota Camry Hybrid', brand:'Toyota', category:'Economy', price:55, location:'Valencia', seats:5, transmission:'Automatic', fuel:'Hybrid', year:2023, image:'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80', description:'Comfortable hybrid sedan perfect for long road trips across Spain. Excellent fuel economy.' },
];

const SPAIN_CITIES = ['Madrid','Barcelona','Valencia','Seville','Bilbao','Granada','Marbella','Málaga','Ibiza','Palma de Mallorca'];
const STEPS = ['Car Details','Booking Info','Confirmation'];

export default function RentCarPage() {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const car = location.state?.car || CARS.find(c => c.id === carId) || CARS[0];
  const [step, setStep] = useState(0);
  const [pickupCity, setPickupCity] = useState(car.location);
  const [pickDate, setPickDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const days = pickDate && returnDate ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickDate)) / 86400000)) : 0;
  const total = days * car.price;

  const handleConfirm = () => {
    setBooked(true);
  };

  if (booked) {
    return (
      <div style={{ background:'#080808', minHeight:'100vh', fontFamily:'Inter, system-ui, sans-serif', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ type:'spring', damping:15 }}
          style={{ textAlign:'center', maxWidth:500, padding:40 }}>
          <motion.div animate={{ rotate:[0,10,-10,10,0], scale:[1,1.3,1] }} transition={{ duration:0.8 }}
            style={{ fontSize:72, marginBottom:24 }}>🎉</motion.div>
          <h2 style={{ fontSize:'2.5rem', fontWeight:900, marginBottom:12 }}>Booking Confirmed!</h2>
          <p style={{ color:'#666', fontSize:16, lineHeight:1.7, marginBottom:8 }}>
            Your <strong style={{ color:'#fff' }}>{car.name}</strong> is reserved in <strong style={{ color:'#e61c1c' }}>{pickupCity}</strong>
          </p>
          <p style={{ color:'#555', fontSize:14, marginBottom:32 }}>
            {pickDate} → {returnDate} · {days} days · <strong style={{ color:'#e61c1c' }}>€{total}</strong> total
          </p>
          <p style={{ color:'#444', fontSize:13, marginBottom:32 }}>A confirmation has been sent to <strong style={{ color:'#888' }}>{currentUser?.email}</strong></p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} onClick={() => navigate('/cars')}
              style={{ padding:'12px 24px', background:'#e61c1c', border:'none', borderRadius:8, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer' }}>
              Browse More Cars
            </motion.button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} onClick={() => navigate('/')}
              style={{ padding:'12px 24px', background:'none', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'#888', fontSize:14, cursor:'pointer' }}>
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background:'#080808', minHeight:'100vh', fontFamily:'Inter, system-ui, sans-serif', color:'#fff' }}>
      <Navbar />

      <div style={{ paddingTop:90, maxWidth:1100, margin:'0 auto', padding:'90px 24px 60px' }}>
        {/* Step indicators */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, marginBottom:48 }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <motion.div animate={{ background: i <= step ? '#e61c1c' : '#1a1a1a', borderColor: i <= step ? '#e61c1c' : '#333' }}
                  style={{ width:36, height:36, borderRadius:'50%', border:'2px solid', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color: i <= step ? '#fff':'#444' }}>
                  {i < step ? '✓' : i+1}
                </motion.div>
                <span style={{ fontSize:11, color: i <= step ? '#e61c1c':'#444', fontWeight: i === step ? 700:400 }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex:1, height:2, background: i < step ? '#e61c1c':'#1a1a1a', margin:'0 8px', marginBottom:20 }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:32, alignItems:'start' }}>
          {/* Left - steps */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, overflow:'hidden' }}>
                <img src={car.image} alt={car.name} style={{ width:'100%', height:280, objectFit:'cover', display:'block' }} />
                <div style={{ padding:28 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <span style={{ background:'rgba(230,28,28,0.15)', color:'#e61c1c', padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:700 }}>{car.category}</span>
                    <span style={{ color:'#555', fontSize:12 }}>📍 Based in {car.location}</span>
                  </div>
                  <h1 style={{ fontSize:'2rem', fontWeight:900, letterSpacing:'-0.5px', marginBottom:12 }}>{car.name}</h1>
                  <p style={{ fontSize:15, color:'#666', lineHeight:1.7, marginBottom:24 }}>{car.description}</p>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
                    {[
                      ['🪑 Seats', car.seats],['⚙️ Transmission', car.transmission],
                      ['⛽ Fuel', car.fuel],['📅 Year', car.year],
                    ].map(([label, val]) => (
                      <div key={label} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'14px 16px' }}>
                        <div style={{ fontSize:12, color:'#444', marginBottom:4 }}>{label}</div>
                        <div style={{ fontSize:14, fontWeight:600, color:'#ccc' }}>{val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background:'rgba(230,28,28,0.06)', border:'1px solid rgba(230,28,28,0.2)', borderRadius:10, padding:16, marginBottom:24 }}>
                    <h4 style={{ fontSize:13, fontWeight:700, color:'#e61c1c', marginBottom:8 }}>✅ What's Included</h4>
                    {['Third-party liability insurance','Unlimited mileage','24/7 roadside assistance','Airport/hotel delivery','Free cancellation (48h)'].map(item => (
                      <div key={item} style={{ fontSize:13, color:'#888', marginBottom:4 }}>• {item}</div>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale:1.02, boxShadow:'0 0 30px rgba(230,28,28,0.4)' }} whileTap={{ scale:0.98 }}
                    onClick={() => setStep(1)}
                    style={{ width:'100%', padding:14, background:'linear-gradient(135deg,#e61c1c,#c91515)', border:'none', borderRadius:8, color:'#fff', fontSize:15, fontWeight:800, cursor:'pointer' }}>
                    Continue to Booking →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:28 }}>
                <h2 style={{ fontSize:'1.6rem', fontWeight:800, marginBottom:24 }}>Booking Details</h2>

                <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  <div>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:8 }}>📍 Pick-up City</label>
                    <select value={pickupCity} onChange={e => setPickupCity(e.target.value)}
                      style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'12px 14px', color:'#ccc', fontSize:14, outline:'none' }}>
                      {SPAIN_CITIES.map(c => <option key={c} value={c} style={{ background:'#111' }}>{c}</option>)}
                    </select>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div>
                      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:8 }}>📅 Pick-up Date</label>
                      <input type="date" value={pickDate} onChange={e => setPickDate(e.target.value)} min={today} required
                        style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'12px 14px', color:'#ccc', fontSize:14, outline:'none', boxSizing:'border-box' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                    <div>
                      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:8 }}>📅 Return Date</label>
                      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={pickDate || today} required
                        style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'12px 14px', color:'#ccc', fontSize:14, outline:'none', boxSizing:'border-box' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(230,28,28,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  </div>

                  {days > 0 && (
                    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                      style={{ background:'rgba(230,28,28,0.08)', border:'1px solid rgba(230,28,28,0.2)', borderRadius:10, padding:16 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#888', marginBottom:6 }}>
                        <span>€{car.price}/day × {days} days</span>
                        <span style={{ color:'#e61c1c', fontWeight:700 }}>€{total}</span>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#888', marginBottom:6 }}>
                        <span>Insurance & taxes</span><span>Included</span>
                      </div>
                      <div style={{ borderTop:'1px solid rgba(230,28,28,0.2)', paddingTop:10, marginTop:6, display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:800 }}>
                        <span>Total</span><span style={{ color:'#e61c1c' }}>€{total}</span>
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:1.5, marginBottom:8 }}>Special Requests (Optional)</label>
                    <textarea rows={3} placeholder="Child seat, GPS, any special request..." value={notes} onChange={e => setNotes(e.target.value)}
                      style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit' }} />
                  </div>
                </div>

                <div style={{ display:'flex', gap:12, marginTop:24 }}>
                  <button onClick={() => setStep(0)}
                    style={{ padding:'12px 20px', background:'none', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'#666', fontSize:14, cursor:'pointer' }}>
                    ← Back
                  </button>
                  <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                    onClick={() => { if (pickDate && returnDate) setStep(2); }}
                    disabled={!pickDate || !returnDate}
                    style={{ flex:1, padding:'12px', background: !pickDate || !returnDate ? '#222':'linear-gradient(135deg,#e61c1c,#c91515)', border:'none', borderRadius:8, color: !pickDate || !returnDate ? '#444':'#fff', fontSize:15, fontWeight:800, cursor: !pickDate || !returnDate ? 'not-allowed':'pointer' }}>
                    Review Booking →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:28 }}>
                <h2 style={{ fontSize:'1.6rem', fontWeight:800, marginBottom:6 }}>Confirm Your Booking</h2>
                <p style={{ color:'#555', fontSize:14, marginBottom:28 }}>Review the details before confirming</p>

                <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:24, background:'rgba(255,255,255,0.03)', borderRadius:10, padding:16 }}>
                  <img src={car.image} alt={car.name} style={{ width:80, height:60, objectFit:'cover', borderRadius:8 }} />
                  <div>
                    <div style={{ fontSize:16, fontWeight:700 }}>{car.name}</div>
                    <div style={{ fontSize:13, color:'#555' }}>{car.category} · {car.year}</div>
                  </div>
                </div>

                {[
                  ['📍 Pick-up Location', pickupCity],
                  ['📅 Pick-up Date', pickDate],
                  ['📅 Return Date', returnDate],
                  ['🕐 Duration', `${days} day${days !== 1 ? 's' : ''}`],
                  ['👤 Driver', `${currentUser?.firstName} ${currentUser?.lastName}`],
                  ['📧 Email', currentUser?.email],
                  ...(notes ? [['📝 Notes', notes]] : []),
                ].map(([label, val]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:14 }}>
                    <span style={{ color:'#555' }}>{label}</span>
                    <span style={{ color:'#ccc', fontWeight:500, textAlign:'right', maxWidth:'60%' }}>{val}</span>
                  </div>
                ))}

                <div style={{ background:'rgba(230,28,28,0.1)', border:'1px solid rgba(230,28,28,0.3)', borderRadius:10, padding:16, margin:'20px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:15, fontWeight:600 }}>Total Amount</span>
                  <span style={{ fontSize:'2rem', fontWeight:900, color:'#e61c1c' }}>€{total}</span>
                </div>

                <p style={{ fontSize:12, color:'#444', marginBottom:20, lineHeight:1.6 }}>
                  By confirming, you agree to our terms. Free cancellation up to 48 hours before pickup. Payment collected at pickup.
                </p>

                <div style={{ display:'flex', gap:12 }}>
                  <button onClick={() => setStep(1)}
                    style={{ padding:'12px 20px', background:'none', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'#666', fontSize:14, cursor:'pointer' }}>
                    ← Back
                  </button>
                  <motion.button whileHover={{ scale:1.02, boxShadow:'0 0 30px rgba(230,28,28,0.5)' }} whileTap={{ scale:0.97 }}
                    onClick={handleConfirm}
                    style={{ flex:1, padding:'14px', background:'linear-gradient(135deg,#e61c1c,#c91515)', border:'none', borderRadius:8, color:'#fff', fontSize:15, fontWeight:800, cursor:'pointer' }}>
                    🔑 Confirm Booking
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right - car summary card */}
          <div style={{ position:'sticky', top:88 }}>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
              <img src={car.image} alt={car.name} style={{ width:'100%', height:160, objectFit:'cover', display:'block' }} />
              <div style={{ padding:20 }}>
                <div style={{ fontSize:17, fontWeight:700, marginBottom:4 }}>{car.name}</div>
                <div style={{ fontSize:12, color:'#555', marginBottom:16 }}>📍 {car.location}</div>

                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
                  {[`🪑 ${car.seats} seats`, `⚙️ ${car.transmission}`, `⛽ ${car.fuel}`].map(v => (
                    <span key={v} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', padding:'4px 10px', borderRadius:20, fontSize:11, color:'#666' }}>{v}</span>
                  ))}
                </div>

                <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13, color:'#555' }}>
                    <span>Daily rate</span><span style={{ color:'#e61c1c', fontWeight:700 }}>€{car.price}</span>
                  </div>
                  {days > 0 && (
                    <>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13, color:'#555' }}>
                        <span>Duration</span><span style={{ color:'#ccc' }}>{days} day{days !== 1 ? 's' : ''}</span>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:800, borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:12, marginTop:8 }}>
                        <span>Total</span><span style={{ color:'#e61c1c' }}>€{total}</span>
                      </div>
                    </>
                  )}
                  {!days && <p style={{ fontSize:12, color:'#444', marginTop:4 }}>Select dates to see total price</p>}
                </div>

                <div style={{ marginTop:16, background:'rgba(0,200,100,0.06)', border:'1px solid rgba(0,200,100,0.2)', borderRadius:8, padding:10, fontSize:12, color:'#4ade80' }}>
                  ✅ Available · Free cancellation (48h)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
