import React, { useState, useEffect } from "react";
import logo1 from "../images/pexels-mikebirdy-244818.jpg";
import logo2 from "../images/pexels-maurice-lustig-1475620-2851336.jpg";
import logo3 from "../images/pexels-ingo-13781.jpg";

const Slider = () => {
  const [active, setActive] = useState(0);
  const items = [logo1, logo2, logo3]; // Array of image sources
  const lengthItems = items.length - 1;

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      next();
    }, 9000);

    return () => clearInterval(refreshInterval);
  }, [active]);

  const next = () => {
    setActive((active) => (active < lengthItems ? active + 1 : 0));
  };

  const prev = () => {
    setActive((active) => (active > 0 ? active - 1 : lengthItems));
  };

  const handleDotClick = (index) => {
    setActive(index);
  };

  return (
    <div className="slider">
      <div className="list" style={{ left: `-${active * 100}%` }}>
        {items.map((item, index) => (
          <div className="item" key={index}>
            <img src={item} alt="" />
          </div>
        ))}
      </div>
      {/* <div className="buttons">
        <button id="prev" onClick={prev}>
          {"<"}
        </button>
        <button id="next" onClick={next}>
          {">"}
        </button>
      </div> */}
      <ul className="dots">
        {items.map((_, index) => (
          <li
            key={index}
            className={active === index ? "active" : ""}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Slider;
