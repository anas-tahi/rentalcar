import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "./InfiniteScroll.css";

// Import images
import img1 from "../images/BrandCar/pngimg.com - car_logo_PNG1667.png";
import img2 from "../images/BrandCar/pngimg.com - car_logo_PNG1658.png";
import img3 from "../images/BrandCar/pngimg.com - car_logo_PNG1659.png";
import img4 from "../images/BrandCar/pngimg.com - car_logo_PNG1660.png";
import img5 from "../images/BrandCar/pngimg.com - car_logo_PNG1661.png";
import img6 from "../images/BrandCar/pngimg.com - car_logo_PNG1655.png";
import img7 from "../images/BrandCar/pngimg.com - car_logo_PNG1648.png";
import img8 from "../images/BrandCar/pngimg.com - car_logo_PNG1666.png";
import img9 from "../images/BrandCar/pngimg.com - car_logo_PNG1664.png";
import img10 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1636.png";
import img11 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1637.png";
import img12 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1640.png";
import img13 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1641.png";
import img14 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1643.png";
import img15 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1645.png";
import img16 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1652.png";
import img17 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1653.png";
import img18 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1654.png";
import img19 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1662.png";
import img20 from "../images/BrandCar/new/pngimg.com - car_logo_PNG1668.png";
import { Typography } from "@mui/material";


const AppWrapper = ({ children }) => {
  return <div className="app-wrapper">{children}</div>;
};

const InfiniteScroll = () => {
  const controls = useAnimation();
  function startAnimation() {
    controls.start({
      x: "-100%",
      transition: {
        ease: "linear",
        duration: 30, // Adjust the duration to control the scroll speed
        repeat: Infinity,
      },
    });
  }
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startAnimation();
    }
  }, [controls]);

  const handleClick = (event) => {
    event.target.classList.toggle("paused");
    if (event.target.classList.contains("paused")) {
      controls.stop();
    } else {
      startAnimation();
    }
  };

  const images = [
    { src: img1, link: "/brand1" },
    { src: img2, link: "/brand2" },
    { src: img3, link: "/brand3" },
    { src: img4, link: "/brand4" },
    { src: img5, link: "/brand5" },
    { src: img6, link: "/brand6" },
    { src: img7, link: "/brand7" },
    { src: img8, link: "/brand8" },
    { src: img9, link: "/brand9" },
    { src: img10, link: "/brand10" },
    { src: img11, link: "/brand11" },
    { src: img12, link: "/brand12" },
    { src: img13, link: "/brand13" },
    { src: img14, link: "/brand14" },
    { src: img15, link: "/brand15" },
    { src: img16, link: "/brand16" },
    { src: img17, link: "/brand17" },
    { src: img18, link: "/brand18" },
    { src: img19, link: "/brand19" },
    { src: img20, link: "/brand20" },
  ];

  return (
    <AppWrapper>
      <Typography
        fontSize={36}
        fontWeight={600}
        fontFamily={"Poppins,sans serif"}
        color={"#309bff"}
        align="center"
      >
        OUR BRANDS
      </Typography>
      <div className="scroller" onClick={handleClick}>
        <motion.div
          className="scroller__inner"
          animate={controls}
          initial={{ x: "0%" }}
        >
          {images.map((image, index) => (
            <Link
              to={image.link}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <img
                src={image.src}
                alt={`Brand Logo ${index + 1}`}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "contain",
                  margin: "0 30px",
                }}
              />
            </Link>
          ))}
        </motion.div>
        <motion.div
          className="scroller__inner"
          animate={controls}
          initial={{ x: "0%" }}
        >
          {images.map((image, index) => (
            <Link
              to={image.link}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <img
                src={image.src}
                alt={`Brand Logo ${index + 1}`}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "contain",
                  margin: "0 30px",
                }}
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </AppWrapper>
  );
};

export default InfiniteScroll;
