import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.css";
import SliderVideo from "./SliderVideo";
import Slider from "./Slider";
import logoProfile from '../images/logo/LOGOCAR.png';
import { useTranslation } from 'react-i18next';
import {
  CarOutlined,
  CheckCircleOutlined,
  StarOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  RightOutlined,
  HeadsetOutlined,
  MessageOutlined,
  SettingOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';

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
      <section id="home" className="hero-section relative">
        {/* Background Video Slider */}
        <div className="sliderBox absolute inset-0 z-0">
          <SliderVideo />
        </div>
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50 z-10" />
        
        {/* Hero Content */}
        <div className="container relative z-20">
          <div className="hero-content">
            <div className="hero-content__text">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
              >
                <CrownOutlined />
                <span>Premium Car Rental Service</span>
                <StarOutlined />
              </motion.div>
              
              {/* Main Heading */}
              <motion.h4
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-yellow-400 text-xl font-semibold mb-4 uppercase tracking-wider"
              >
                {t("Plan your trip now")}
              </motion.h4>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                {t("Save")} <span className="text-yellow-400">{t("big")}</span> {t("with our car rental")}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
              >
                {t("Rent the car of your dreams. Unbeatable prices, unlimited miles, flexible pick-up options and much more.")}
              </motion.p>
              
              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircleOutlined className="text-green-400" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircleOutlined className="text-green-400" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <CheckCircleOutlined className="text-green-400" />
                  <span>Free Cancellation</span>
                </div>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hero-content__text__btns flex flex-col sm:flex-row gap-4"
              >
                <Link
                  onClick={bookBtn}
                  className="hero-content__text__btns__book-ride group"
                  to="/"
                >
                  <CarOutlined className="mr-2" />
                  {t("Pick Your Car")}
                  <ThunderboltOutlined className="ml-2 group-hover:animate-pulse" />
                </Link>
                <Link className="hero-content__text__btns__learn-more group" to="/">
                  {t("Learn More")}
                  <RightOutlined className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: goUp ? 1 : 0, y: goUp ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
        >
          <ArrowUpOutlined />
        </motion.button>

        {/* Enhanced Chatbot Toggle Button */}
        <motion.button
          onClick={handleChatbotClick}
          className={`Chat-bot ${showChatbot ? "show-chatbot" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showChatbot ? 1 : 0, y: showChatbot ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          aria-label="Chat with assistant"
        >
          <HeadsetOutlined />
        </motion.button>

        {/* Enhanced Chatbot Content */}
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
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <MessageOutlined className="text-black" />
                    </div>
                    <div>
                      <h1 className="text-white font-semibold">{t("BotChat")}</h1>
                      <p className="text-green-400 text-xs">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <SettingOutlined />
                    </button>
                    <button 
                      onClick={() => setOpenChatbot(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                
                <div className="Zone-Chat">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageOutlined className="text-black text-sm" />
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                        <p className="text-white text-sm">
                          Welcome to CAR Rental! I'm here to help you find the perfect vehicle for your journey.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 justify-end">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg p-3 max-w-xs">
                        <p className="text-sm font-medium">
                          Hi! I need help choosing a car for my vacation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageOutlined className="text-black text-sm" />
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                        <p className="text-white text-sm">
                          I'd be happy to help! What type of vehicle are you looking for? We have luxury sedans, SUVs, sports cars, and more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="Chat-space">
                  <input 
                    type="text" 
                    placeholder="Type your message..."
                    className="flex-1 bg-black/30 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg px-4 py-2 ml-2 hover:from-yellow-500 hover:to-yellow-700 transition-all">
                    <RightOutlined />
                  </button>
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
