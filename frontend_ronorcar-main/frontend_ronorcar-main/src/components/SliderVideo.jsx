import video1 from "../Videos/car1.mp4";
import video2 from "../Videos/car2.mp4";
import video3 from "../Videos/car3.mp4";
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";

const videos = [
  { src: video1, title: "Car 1" },
  { src: video2, title: "Car 2" },
  { src: video3, title: "Car 3" }
];

const VideoItem = ({ src }) => (
  <LazyLoad height={200}>
    <div className="item">
      <video autoPlay muted loop preload="auto">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </LazyLoad>
);

VideoItem.propTypes = {
  src: PropTypes.string.isRequired
};

const VideoSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lengthVideos = videos.length - 1;

  const next = useCallback(() => {
    setActiveIndex((activeIndex) => (activeIndex < lengthVideos ? activeIndex + 1 : 0));
  }, [lengthVideos]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      next();
    }, 20000);

    return () => clearInterval(refreshInterval);
  }, [next, activeIndex]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="slider">
      <div className="list" style={{ left: `-${activeIndex * 100}%` }}>
        {videos.map((video, index) => (
          <VideoItem key={index} src={video.src} />
        ))}
      </div>
      {videos.length > 1 && (
        <ul className="dots">
          {videos.map((_, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoSlider;
