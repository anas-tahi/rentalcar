import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchCarType from "../components/SearchCarType";
import ChooseUs from "../components/ChooseUs";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import BlogsPart from "../components/BlogsPart";
import Footer from "../components/Footer";
import CarListPage from "../components/CarLisrPage";
import TopRecommendCar from "../components/TopRecommendCar";
import InfiniteScroll from "../components/InfiniteScroll";
import Navbar from "../components/Navbar";
import "../dist/styles.css";
import { AuthContext } from "../Context/authContext";
import { Button } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  useEffect(() => {},[currentUser]);

  // If user is logged in, show welcome message
  if (currentUser) {
    return (
      <>
        <Navbar />
        <div style={{ 
          padding: "80px 20px", 
          textAlign: "center", 
          background: "linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #0ea5e9 100%)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <h1 style={{ 
              fontSize: "3.5rem", 
              color: "#0ea5e9", 
              marginBottom: "20px",
              fontWeight: "800"
            }}>
              Welcome Back, {currentUser.firstName || currentUser.username}! 🎉
            </h1>
            <p style={{ 
              fontSize: "1.4rem", 
              color: "#1f2937", 
              marginBottom: "40px",
              lineHeight: "1.6",
              fontWeight: "300"
            }}>
              Ready to embark on your next journey? Your premium car rental experience awaits!
            </p>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "25px",
              marginTop: "50px"
            }}>
              <div style={{
                backgroundColor: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px rgba(14, 165, 233, 0.2)",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden"
              }}>
                <h3 style={{ 
                  color: "#0ea5e9", 
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  position: "relative",
                  zIndex: 1
                }}>🚗 Rent a Car</h3>
                <p style={{ 
                  color: "#1f2937", 
                  lineHeight: "1.6",
                  position: "relative",
                  zIndex: 1
                }}>
                  Explore our premium fleet and find your perfect ride.
                </p>
              </div>
              
              <div style={{
                backgroundColor: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px rgba(14, 165, 233, 0.2)",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden"
              }}>
                <h3 style={{ 
                  color: "#0ea5e9", 
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  position: "relative",
                  zIndex: 1
                }}>📋 My Reservations</h3>
                <p style={{ 
                  color: "#1f2937", 
                  lineHeight: "1.6",
                  position: "relative",
                  zIndex: 1
                }}>
                  Manage your bookings and track your rental history.
                </p>
              </div>
              
              <div style={{
                backgroundColor: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px rgba(14, 165, 233, 0.2)",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden"
              }}>
                <h3 style={{ 
                  color: "#0ea5e9", 
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  position: "relative",
                  zIndex: 1
                }}>📅 Calendar</h3>
                <p style={{ 
                  color: "#1f2937", 
                  lineHeight: "1.6",
                  position: "relative",
                  zIndex: 1
                }}>
                  Stay organized with your rental schedule and trips.
                </p>
              </div>
              
              <div style={{
                backgroundColor: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px rgba(14, 165, 233, 0.2)",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden"
              }}>
                <h3 style={{ 
                  color: "#0ea5e9", 
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  position: "relative",
                  zIndex: 1
                }}>⚙️ Settings</h3>
                <p style={{ 
                  color: "#1f2937", 
                  lineHeight: "1.6",
                  position: "relative",
                  zIndex: 1
                }}>
                  Customize your profile and preferences.
                </p>
              </div>
            </div>
            
            <div style={{ marginTop: "60px" }}>
              <Button
                onClick={() => navigate('/dashboard/user/rent-car')}
                style={{
                  background: "#0ea5e9",
                  color: "white",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  boxShadow: "0 10px 30px rgba(14, 165, 233, 0.4)",
                  marginRight: "20px",
                  position: "relative",
                  overflow: "hidden",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px) scale(1.05)";
                  e.target.style.boxShadow = "0 15px 40px rgba(14, 165, 233, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 10px 30px rgba(14, 165, 233, 0.4)";
                }}
              >
                <CarOutlined /> Rent a Car 🚗
              </Button>
              <button
                onClick={() => navigate('/dashboard/user/rent-car')}
                style={{
                  background: "#0284c7",
                  color: "white",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  boxShadow: "0 10px 30px rgba(2, 132, 199, 0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px) scale(1.05)";
                  e.target.style.boxShadow = "0 15px 40px rgba(2, 132, 199, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 10px 30px rgba(2, 132, 199, 0.4)";
                }}
              >
                Advanced Booking 📋
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </>
    );
  }

  // If user is not logged in, show regular home page
  return (
    <>
      <Navbar />
      <Hero />
      <SearchCarType onSearch={handleSearch} />
      <CarListPage searchParams={searchParams} />
      <TopRecommendCar />
      <InfiniteScroll />
      <ChooseUs />
      <Testimonials />
      <Faq />
      <BlogsPart />
      <Footer />
    </>
  );
}

export default Home;
