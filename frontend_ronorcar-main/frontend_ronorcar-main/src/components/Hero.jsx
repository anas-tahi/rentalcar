import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.css";
import SliderVideo from "./SliderVideo";
import Slider from "./Slider";
import logoProfile from '../images/logo/LOGOCAR.png';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();
  const [goUp, setGoUp] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);
  const [openChatbot, setOpenChatbot] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bookBtn = () => {
    document.querySelector("#booking-section").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      setGoUp(window.scrollY > 5000);
      setShowChatbot(window.scrollY < 1000);
      if (window.scrollY >= 0) {
        setOpenChatbot(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  const handleChatbotClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenChatbot(!openChatbot);
  };

  return (
    <>
      <section id="home" className="hero-section">
        <div className="sliderBox">
          <SliderVideo />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-content__text">
              <h4>{t("Plan your trip now")}</h4>
              <h1>
                {t("Save")} <span>{t("big")}</span> {t("with our car rental")}
              </h1>
              <p>
                {t("Rent the car of your dreams. Unbeatable prices, unlimited miles, flexible pick-up options and much more.")}
              </p>
              <div className="hero-content__text__btns">
                <Link
                  onClick={bookBtn}
                  className="hero-content__text__btns__book-ride"
                  to="/"
                >
                  {t("Pick Your Car")} &nbsp;{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </Link>
                <Link className="hero-content__text__btns__learn-more" to="/">
                  {t("Learn More")} &nbsp; <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: goUp ? 1 : 0, y: goUp ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-angle-up"></i>
        </motion.div>

        {/* Chatbot Toggle Button */}
        <motion.div
          onClick={handleChatbotClick}
          className={`Chat-bot ${showChatbot ? "show-chatbot" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showChatbot ? 1 : 0, y: showChatbot ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fa-solid fa-headset"></i>
        </motion.div>

        {/* Chatbot Content */}
        <AnimatePresence>
          {openChatbot && (
            <motion.div
              className="BoxChat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="BoxChat__content">
                <div className="HeaderChat">
                  <img src={logoProfile} alt="BotProfile" />
                  <h1>{t("BotChat")}</h1>
                  <div>
                    <p>{t("Setting")}</p>
                  </div>
                </div>
                <div className="Zone-Chat">
                  <p>
                  ChatBotRcar
                  </p>
                </div>
                <div className="Chat-space">
                  <input type="text" />
                  <i className="fa-solid fa-arrow-right"></i>{" "}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default Hero;
