import React from "react";
import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import "@fortawesome/fontawesome-free/css/all.css";

const MenuItems = ({ items, depthLevel, icon }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}
            style={{ display: "flex", alignItems: "center" }} // Flex properties for centering
          >
            {/* Place FontAwesome icon rendering here */}
            {icon && <i className={`fa-solid ${icon}`} style={{ marginRight: "0.5rem" }}></i>}
            <Link to={items.url}>{items.title}</Link>
            {depthLevel > 0 ? <i className="fa-solid fa-angle-right" style={{ marginLeft: "0.5rem" }}></i> : <i className="fa-solid fa-angle-down" style={{ marginLeft: "0.5rem" }}></i>}
          </button>
          {/* Wrap Dropdown component with motion.div */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} // Initial animation properties
            animate={{ opacity: dropdown ? 1 : 0, y: dropdown ? 0 : -10 }} // Animation on dropdown state change
            transition={{ duration: 0.2 }} // Animation transition duration
          >
            <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
          </motion.div>
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            style={{ display: "flex", alignItems: "center" }} // Flex properties for centering
          >
            {/* Place FontAwesome icon rendering here */}
            {icon && <i className={`fa-solid ${icon}`} style={{ marginRight: "0.5rem" }}></i>}
            <span>{items.title}</span>
            {depthLevel > 0 ? <i className="fa-solid fa-angle-right" style={{ marginLeft: "0.5rem" }}></i> : <i className="fa-solid fa-angle-right" style={{ marginLeft: "0.5rem" }}></i>}
          </button>
          {/* Wrap Dropdown component with motion.div */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} // Initial animation properties
            animate={{ opacity: dropdown ? 1 : 0, y: dropdown ? 0 : -10 }} // Animation on dropdown state change
            transition={{ duration: 0.2 }} // Animation transition duration
          >
            <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
          </motion.div>
        </>
      ) : (
        <Link to={items.url} className="menu-link" style={{ display: "flex", alignItems: "center" }}>
          {/* Place FontAwesome icon rendering here */}
          {icon && <i className={`fa-solid ${icon}`} style={{ marginRight: "0.5rem" }}></i>}
          <span>{items.title}</span>
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
