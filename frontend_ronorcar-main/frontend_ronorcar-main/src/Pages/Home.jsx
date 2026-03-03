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
import { CarOutlined, UserOutlined, CalendarOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const { currentUser, logout } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {}, [currentUser]);

  // If user is NOT logged in, show normal home page
  if (!currentUser) {
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

  // If user is logged in, show dashboard with options
  return (
    <>
      <Navbar />
      <div style={{ 
        padding: "100px 20px", 
        textAlign: "center", 
        background: "var(--black-gradient)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "var(--text-primary)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ 
            fontSize: "3.5rem", 
            background: "var(--gold-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "20px",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "2px",
            animation: "glow 2s ease-in-out infinite alternate"
          }}>
            Welcome Back, {currentUser.firstName || currentUser.username}! 🎉
          </h1>
          
          <p style={{
            fontSize: "1.4rem",
            color: "var(--text-primary)",
            marginBottom: "50px",
            lineHeight: "1.6",
            fontWeight: "300",
            opacity: 0.9
          }}>
            Ready to embark on your next journey? Your premium car rental experience awaits!
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            marginTop: "60px"
          }}>
            <div 
              onClick={() => handleNavigateTo('/dashboard/user/rent-car')}
              style={{
                background: "rgba(255, 215, 0, 0.1)",
                border: "2px solid var(--accent-yellow)",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "var(--shadow-gold)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 15px 40px rgba(255, 215, 0, 0.6)";
                e.target.style.borderColor = "var(--bright-yellow)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "var(--shadow-gold)";
                e.target.style.borderColor = "var(--accent-yellow)";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "var(--gold-gradient)",
                transform: "translateX(-100%)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
              }} />
              <h3 style={{
                color: "var(--accent-yellow)",
                marginBottom: "15px",
                fontSize: "1.4rem",
                fontWeight: "700",
                position: "relative",
                zIndex: 1
              }}>
                🚗 Rent a Car
              </h3>
              <p style={{
                color: "var(--text-primary)",
                lineHeight: "1.6",
                fontSize: "1rem"
              }}>
                Explore our premium fleet and find your perfect ride.
              </p>
            </div>

            <div 
              onClick={() => handleNavigateTo('/dashboard/user/reservations')}
              style={{
                background: "rgba(255, 215, 0, 0.1)",
                border: "2px solid var(--accent-yellow)",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "var(--shadow-gold)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 15px 40px rgba(255, 215, 0, 0.6)";
                e.target.style.borderColor = "var(--bright-yellow)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "var(--shadow-gold)";
                e.target.style.borderColor = "var(--accent-yellow)";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "var(--gold-gradient)",
                transform: "translateX(-100%)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
              }} />
              <h3 style={{
                color: "var(--accent-yellow)",
                marginBottom: "15px",
                fontSize: "1.4rem",
                fontWeight: "700",
                position: "relative",
                zIndex: 1
              }}>
                📋 My Reservations
              </h3>
              <p style={{
                color: "var(--text-primary)",
                lineHeight: "1.6",
                fontSize: "1rem"
              }}>
                Manage your bookings and track your rental history.
              </p>
            </div>

            <div 
              onClick={() => handleNavigateTo('/dashboard/user/calendar')}
              style={{
                background: "rgba(255, 215, 0, 0.1)",
                border: "2px solid var(--accent-yellow)",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "var(--shadow-gold)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 15px 40px rgba(255, 215, 0, 0.6)";
                e.target.style.borderColor = "var(--bright-yellow)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "var(--shadow-gold)";
                e.target.style.borderColor = "var(--accent-yellow)";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "var(--gold-gradient)",
                transform: "translateX(-100%)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
              }} />
              <h3 style={{
                color: "var(--accent-yellow)",
                marginBottom: "15px",
                fontSize: "1.4rem",
                fontWeight: "700",
                position: "relative",
                zIndex: 1
              }}>
                📅 Calendar
              </h3>
              <p style={{
                color: "var(--text-primary)",
                lineHeight: "1.6",
                fontSize: "1rem"
              }}>
                Stay organized with your rental schedule and trips.
              </p>
            </div>

            <div 
              onClick={() => handleNavigateTo('/dashboard/user/profile')}
              style={{
                background: "rgba(255, 215, 0, 0.1)",
                border: "2px solid var(--accent-yellow)",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "var(--shadow-gold)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 15px 40px rgba(255, 215, 0, 0.6)";
                e.target.style.borderColor = "var(--bright-yellow)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "var(--shadow-gold)";
                e.target.style.borderColor = "var(--accent-yellow)";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "var(--gold-gradient)",
                transform: "translateX(-100%)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
              }} />
              <h3 style={{
                color: "var(--accent-yellow)",
                marginBottom: "15px",
                fontSize: "1.4rem",
                fontWeight: "700",
                position: "relative",
                zIndex: 1
              }}>
                ⚙️ Settings
              </h3>
              <p style={{
                color: "var(--text-primary)",
                lineHeight: "1.6",
                fontSize: "1rem"
              }}>
                Customize your profile and preferences.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}>
            <Button
              onClick={() => handleNavigateTo('/dashboard/user/rent-car')}
              style={{
                background: "var(--gold-gradient)",
                border: "none",
                padding: "20px 50px",
                borderRadius: "50px",
                fontSize: "1.3rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "var(--shadow-gold)",
                color: "var(--primary-black)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                height: "60px"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 15px 40px rgba(255, 215, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "var(--shadow-gold)";
              }}
            >
              <CarOutlined style={{ marginRight: "10px" }} /> Rent a Car 🚗
            </Button>
            
            <Button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "2px solid var(--accent-yellow)",
                padding: "20px 40px",
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                color: "var(--accent-yellow)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginLeft: "20px",
                height: "60px"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--accent-yellow)";
                e.target.style.color = "var(--primary-black)";
                e.target.style.transform = "translateY(-3px) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "var(--accent-yellow)";
                e.target.style.transform = "translateY(0) scale(1)";
              }}
            >
              <LogoutOutlined style={{ marginRight: "8px" }} /> Logout
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
        }
      `}</style>

      <Footer />
    </>
  );
}

export default Home;
