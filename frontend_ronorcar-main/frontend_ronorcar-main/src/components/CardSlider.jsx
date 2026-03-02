import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/bundle";
import "./CardSlide.css";
import img1 from "../images/profileImg/profile1.jpg";
import img2 from "../images/profileImg/profile2.jpg";
import img3 from "../images/profileImg/profile3.jpg";
import img4 from "../images/profileImg/profile4.jpg";
import img5 from "../images/profileImg/profile5.jpg";
import img6 from "../images/profileImg/profile6.jpg";
import img7 from "../images/profileImg/profile7.jpg";
import img8 from "../images/profileImg/profile8.jpg";
import img9 from "../images/profileImg/profile9.jpg";
import img10 from "../images/profileImg/profile10.jpg";

const cardsData = [
  {
    imagePath: img1,
    name: "Alice Johnson",
    description:
      "Very professional and knowledgeable. Provided excellent service and helped me understand every step of the car rental process.",
    stars: 5,
  },
  {
    imagePath: img2,
    name: "Michael Thompson",
    description:
      "Extremely satisfied with the car rental service. Went above and beyond to meet my needs. Highly recommend!",
    stars: 4,
  },
  {
    imagePath: img3,
    name: "Daniel Brown",
    description:
      "Prompt and efficient car rental service. Addressed all my concerns and delivered a high-quality vehicle.",
    stars: 5,
  },
  {
    imagePath: img4,
    name: "Matthew Garcia",
    description:
      "Exceptional car rental service! Helped me navigate through the rental process with ease. Will definitely use again in the future.",
    stars: 5,
  },
  {
    imagePath: img5,
    name: "William Lee",
    description:
      "Very satisfied with the car rental service. The team was responsive and delivered exactly what was promised.",
    stars: 4,
  },
  {
    imagePath: img6,
    name: "Ava Perez",
    description:
      "Overall, a positive experience with the car rental service. Good but there were some minor issues along the way.",
    stars: 4,
  },
  {
    imagePath: img7,
    name: "James Scott",
    description:
      "Excellent car rental service and communication throughout the process. Would definitely recommend to others.",
    stars: 5,
  },
  {
    imagePath: img8,
    name: "William Lee",
    description:
      "Experience seamless car rental service that exceeds expectations. Our dedicated team ensures prompt responses.",
    stars: 4,
  },
  {
    imagePath: img9,
    name: "Ava Perez",
    description:
      "Discover the epitome of convenience with our car rental service. From navigating through the rental process.",
    stars: 4,
  },
  {
    imagePath: img10,
    name: "James Scott",
    description:
      "Embark on your next adventure with confidence, knowing that our car rental service has your back.",
    stars: 5,
  },
];

const CardSlider = () => {
  useEffect(() => {
    const swiper = new Swiper(".slide-content", {
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      centerSlide: true,
      fade: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  }, []);

  return (
    <div className="slide-container swiper">
      <div className="slide-content">
        <div className="card-wrapper swiper-wrapper">
          {cardsData.map((card, index) => (
            <div className="card swiper-slide" key={index}>
              <div className="image-content">
                <span className="overlay"></span>
                <div className="card-image">
                  <img src={card.imagePath} alt="" className="card-img" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="name">{card.name}</h2>
                <p className="description">{card.description}</p>
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fa${
                        index < card.stars ? "s" : "r"
                      } fa-star star text-2xl text-yellow-500`}
                    ></i>
                  ))}
                </div>
                <button className="button">View More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-button-next swiper-navBtn"></div>
      <div className="swiper-button-prev swiper-navBtn"></div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default CardSlider;
