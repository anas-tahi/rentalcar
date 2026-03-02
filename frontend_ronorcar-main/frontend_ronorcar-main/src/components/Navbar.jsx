import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo/Untitled-1-01.png";
import { useContext, useRef, useState } from "react";
import MenuItems from "./MenuItems";
import { AuthContext } from "../Context/authContext";
import logo from "../images/Default/DefaultAvatar.jpg";
import { Space, Button, Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import {
  FundOutlined,
  SettingOutlined,
  ProfileOutlined,
  DownCircleOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { getMenuItemsData, getMenuItemsDataLogin } from "./menuItemsData";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [nav, setNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navbarRef = useRef(null);
  const { currentUser, logout } = useContext(AuthContext);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    if (currentUser) {
      logout();
      window.location.reload();
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload(); // Reload the page
  };
  

  const menuItemsData = getMenuItemsData(t);
  const menuItemsDataLogin = getMenuItemsDataLogin(t);

  const depthLevel = 0;

  const items = [
    {
      label: (
        <Link
          to={
            currentUser && currentUser.isAdmin
              ? "/dashboard/admin"
              : "/dashboard/user"
          }
          style={{ textDecoration: "none" }}
        >
          <FundOutlined /> {t("Dashboard")}
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          to={
            currentUser && currentUser.isAdmin
              ? "/dashboard/admin/profile"
              : "/dashboard/user/profile"
          }
          style={{ textDecoration: "none" }}
        >
          <ProfileOutlined /> {t("Profile")}
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          to={
            currentUser && currentUser.isAdmin
              ? "/dashboard/admin/setting"
              : "/dashboard/User/setting"
          }
          style={{ textDecoration: "none" }}
        >
          <SettingOutlined /> {t("Setting")}
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link onClick={handleLogout} to="/" style={{ textDecoration: "none" }}>
          <LogoutOutlined style={{ color: "black" }} /> {t("Logout")}
        </Link>
      ),
      key: "3",
    },
  ];

  const languageItems = [
    {
      label: (
        <Button type="text" onClick={() => changeLanguage("en")}>
          English
        </Button>
      ),
      key: "0",
    },
    {
      label: (
        <Button type="text" onClick={() => changeLanguage("fr")}>
          Français
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <nav
        ref={navbarRef}
        className={darkMode ? "dark-mode navHome" : "light-mode navHome"}
      >
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={() => setNav(!nav)} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link to={"/"}>{t("Home")}</Link>
            </li>
            <li>
              <Link to={"/About"}>{t("About")}</Link>
            </li>
            <li>
              <Link to={"/Contact"}>{t("Contact")}</Link>
            </li>
            <li>
              <Link to={"/team"}>{t("Team")}</Link>
            </li>
          </ul>
        </div>

        {/* desktop */}
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <div className="desktop-nav">
            <div className="navMenus">
              {menuItemsData.map((menu, index) => (
                <MenuItems
                  items={menu}
                  key={index}
                  depthLevel={depthLevel}
                  icon={menu.icon}
                />
              ))}
              {currentUser ? (
                <div className="navMenus">
                  {menuItemsDataLogin.map((menu, index) => (
                    <MenuItems
                      items={menu}
                      key={index}
                      depthLevel={depthLevel}
                      icon={menu.icon}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {!currentUser ? (
            <>
              <div className="navbar__buttons">
                <Link className="navbar__buttons__sign-in" to="/Login">
                  {t("Login")}
                </Link>
                <Link className="navbar__buttons__register" to="/signup">
                  {t("Signup")}
                </Link>
              </div>
              {/* signup-login */}
              <div className="signup-login">
                <Link to="/signup">
                  <i className="fa fa-user-plus"></i>
                </Link>
                <Link to="/Login">
                  <i className="fas fa-sign-in-alt"></i>
                </Link>
              </div>
            </>
          ) : (
            <Space align="center" style={{ gap: "10px" }}>
              <Dropdown
                arrow
                placement="bottomRight"
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ color: "white", fontSize: 15 }}>
                    <Button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        backgroundColor: "rgb(0,0,0,0.2)",
                      }}
                    >
                      {t("My Profile")}{" "}
                      <DownCircleOutlined
                        style={{ color: "white", fontSize: 15 }}
                      />
                    </Button>
                  </Space>
                </a>
              </Dropdown>
              <img
                src={
                  currentUser && currentUser.avatar ? currentUser.avatar : logo
                }
                alt="logo profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
            </Space>
          )}

          {/* Language switcher */}
          <Dropdown menu={{ items: languageItems }} placement="bottomLeft">
            <Button
              shape="circle"
              icon={
                <GlobalOutlined style={{ fontSize: "20px", color: "white" }} />
              }
              style={{ backgroundColor: "transparent", border: "none" }}
            />
          </Dropdown>

          {/* mobile */}
          {!currentUser ? (
            <div className="mobile-hamb" onClick={() => setNav(!nav)}>
              <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
