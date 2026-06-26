import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo/Untitled-1-01.png";
import "./NavbarN.css"; // Import the CSS file
import { AuthContext } from "../Context/authContext";
import { Dropdown, Space, Button, Typography, message } from "antd";
import {
  FundOutlined,
  DownOutlined,
  SettingOutlined,
  ProfileOutlined,
  DownCircleOutlined,
  LogoutOutlined,
  CarOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import defaultlogo from "../images/Default/DefaultAvatar.jpg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked');
    if (currentUser) {
      logout();
      // Immediate visual feedback
      message.success('Logging out...');
    }
  };

  const items = [
    {
      label: (
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#1a1a1a" }}
        >
          <HomeOutlined /> Home
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          to="/dashboard/user/rent-car"
          style={{ textDecoration: "none", color: "#1a1a1a" }}
        >
          <CarOutlined /> Rent Car
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          to="/dashboard/user/booked"
          style={{ textDecoration: "none", color: "#1a1a1a" }}
        >
          <CheckCircleFilled /> My Reservations
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link
          to="/dashboard/user/calendar"
          style={{ textDecoration: "none", color: "#1a1a1a" }}
        >
          <CalendarOutlined /> Calendar
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link
          to="/dashboard/user/settings"
          style={{ textDecoration: "none", color: "#1a1a1a" }}
        >
          <SettingOutlined /> Settings
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          to="/dashboard/user/support"
          style={{ textDecoration: "none", color: "#1a1a1a" }}
        >
          <CustomerServiceOutlined /> Support
        </Link>
      ),
      key: "5",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          onClick={handleLogout}
          style={{ 
            background: "none", 
            border: "none", 
            color: "#dc3545", 
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            textAlign: "left"
          }}
        >
          <LogoutOutlined /> Logout
        </button>
      ),
      key: "6",
    },
  ];
  return (
    <div className="navbar-container">
      {/* mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={() => setNav(!nav)} className="mobile-navbar__close">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <ul className="mobile-navbar__links">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/About"}>About</Link>
          </li>
          <li>
            <Link to={"/Contact"}>Contact</Link>
          </li>
          <li>
            <Link to={"/team"}>Team</Link>
          </li>
        </ul>
      </div>

      {/* Logo */}
      <Link to="/" onClick={() => window.location.reload()}>
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>

      {/* Left side buttons */}
      {!currentUser ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            to="/login"
            className="nav-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#0056b3";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-sign-in-alt"></i>
            <Typography style={{ fontFamily: "Poppins,sans serif", fontSize: 15, color: "white" }}>
              Login
            </Typography>
          </Link>
          <Link
            to="/signup"
            className="nav-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#218838";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#28a745";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-user-plus"></i>
            <Typography style={{ fontFamily: "Poppins,sans serif", fontSize: 15, color: "white" }}>
              Register
            </Typography>
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Rent a Car Button */}
          <Link
            to="/dashboard/user/rent-car"
            className="nav-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#ff6b35",
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(255, 107, 53, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e55a2b";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ff6b35";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <CarOutlined />
            <Typography style={{ fontFamily: "Poppins,sans serif", fontSize: 15, color: "white" }}>
              Rent a Car
            </Typography>
          </Link>

          {/* User Profile Dropdown */}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            fontSize={19}
          >
            <Dropdown
              arrow
              placement="bottomRight"
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: "#1a1a1a", fontSize: 15 }}>
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#1a1a1a",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#e9ecef";
                      e.target.style.borderColor = "#adb5bd";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#f8f9fa";
                      e.target.style.borderColor = "#dee2e6";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {" "}
                    My Profile{" "}
                    <DownCircleOutlined
                      style={{ color: "#1a1a1a", fontSize: 15 }}
                    />
                  </Button>
                </Space>
              </a>
            </Dropdown>
            <img
              src={
                currentUser && currentUser.avatar
                  ? currentUser.avatar
                  : defaultlogo
              }
              alt="logo profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </div>
      )}

      {/* mobile */}
      <div className="mobile-hamb" onClick={() => setNav(!nav)}>
        <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
      </div>
    </div>
  );
};

export default Navbar;
