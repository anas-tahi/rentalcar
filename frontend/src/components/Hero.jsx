import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SliderVideo from "./SliderVideo";
import { useTranslation } from "react-i18next";
import {
  CarOutlined, ArrowRightOutlined, ArrowUpOutlined,
  CustomerServiceOutlined, MessageOutlined,
  SettingOutlined
} from "@ant-design/icons";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }
});

function Hero() {
  const { t } = useTranslation();
  const [goUp, setGoUp] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const fn = () => {
      setGoUp(window.scrollY > 5000);
      setShowChat(window.scrollY < 1000);
      if (window.scrollY > 0) setOpenChat(false);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToBook = () => {
    document.querySelector("#booking-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="home" className="hero-section">
        <div className="sliderBox">
          <SliderVideo />
        </div>

        <div className="container hero-content">
          <div className="hero-content__text">
            <motion.div {...fadeUp(0.1)} className="hero-tag">
              <span></span>
              Premium Car Rental Service
            </motion.div>

            <motion.h4 {...fadeUp(0.2)}>{t("Plan your trip now")}</motion.h4>

            <motion.h1 {...fadeUp(0.3)}>
              {t("Save")} <span>{t("big")}</span><br />
              {t("with our car rental")}
            </motion.h1>

            <motion.p {...fadeUp(0.4)}>
              {t("Rent the car of your dreams. Unbeatable prices, unlimited miles, flexible pick-up options and much more.")}
            </motion.p>

            <motion.div {...fadeUp(0.5)} className="hero-features">
              {["Best Price Guarantee", "24/7 Support", "Free Cancellation"].map(f => (
                <div key={f} className="hero-feature">
                  <span className="hero-feature-dot"></span>
                  {f}
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.6)} className="hero-content__text__btns">
              <button onClick={scrollToBook} className="hero-content__text__btns__book-ride">
                <CarOutlined /> {t("Pick Your Car")}
              </button>
              <Link to="/about" className="hero-content__text__btns__learn-more">
                {t("Learn More")} <ArrowRightOutlined />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats">
          {[
            { num: "15K", label: "Happy Customers" },
            { num: "500", label: "Vehicles Available" },
            { num: "50", label: "Cities Covered" },
            { num: "10+", label: "Years Experience" },
          ].map((s, i) => (
            <motion.div key={i} className="hero-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}>
              <div className="hero-stat__num">{s.num.replace(/\d+/, m => `<span>${m}</span>`)}</div>
              <div className="hero-stat__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}>
        <ArrowUpOutlined />
      </button>

      {/* Chat button */}
      <button onClick={() => setOpenChat(!openChat)}
        className={`Chat-bot ${showChat ? "show-chatbot" : ""}`}>
        <CustomerServiceOutlined />
      </button>

      {openChat && (
        <motion.div className="BoxChat"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}>
          <div className="HeaderChat">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <MessageOutlined style={{ fontSize: 18 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Support</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpenChat(false)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18 }}>
              ✕
            </button>
          </div>
          <div className="Zone-Chat">
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, background: "#e61c1c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageOutlined style={{ color: "#fff", fontSize: 14 }} />
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "0 12px 12px 12px", padding: "10px 14px", fontSize: 14, color: "#ccc" }}>
                Welcome! How can we help you find the perfect car? 🚗
              </div>
            </div>
          </div>
          <div className="Chat-space">
            <input type="text" placeholder="Type a message..." />
            <button><ArrowRightOutlined /></button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Hero;
