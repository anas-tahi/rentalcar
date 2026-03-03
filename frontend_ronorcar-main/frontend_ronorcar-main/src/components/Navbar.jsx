import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo/Untitled-1-01.png";
import { useContext, useRef, useState, useEffect } from "react";
import MenuItems from "./MenuItems";
import { AuthContext } from "../Context/authContext";
import logo from "../images/Default/DefaultAvatar.jpg";
import { Space, Button, Dropdown, Badge } from "antd";
import { useTranslation } from "react-i18next";
import {
  FundOutlined,
  SettingOutlined,
  ProfileOutlined,
  DownCircleOutlined,
  LogoutOutlined,
  GlobalOutlined,
  CarOutlined,
  UserOutlined,
  BellOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  MailOutlined
} from "@ant-design/icons";
import { getMenuItemsData, getMenuItemsDataLogin } from "./menuItemsData";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [nav, setNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const { currentUser, logout } = useContext(AuthContext);

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    window.location.reload();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black bg-opacity-95 backdrop-blur-md shadow-lg border-b border-yellow-400' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:from-yellow-500 group-hover:to-yellow-700">
                  <img src={Logo} alt="CAR Rental" className="w-8 h-8" />
                </div>
                <div className="hidden md:block">
                  <h2 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    CAR Rental
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Premium Vehicle Services
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                {menuItemsData.map((menu, index) => (
                  <MenuItems
                    items={menu}
                    key={index}
                    depthLevel={depthLevel}
                    icon={menu.icon}
                  />
                ))}
              </div>

              {/* User Actions */}
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <Dropdown 
                    menu={{
                      items: [
                        {
                          key: '0',
                          label: (
                            <div className="flex items-center space-x-2">
                              <BellOutlined className="text-yellow-400" />
                              <span>Notifications</span>
                              <Badge count={3} className="ml-2" />
                            </div>
                          ),
                        },
                        {
                          key: '1',
                          label: (
                            <div className="flex items-center space-x-2">
                              <HeartOutlined className="text-yellow-400" />
                              <span>Favorites</span>
                            </div>
                          ),
                        }
                      ]
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button 
                      icon={<BellOutlined className="text-yellow-400" />}
                      type="text"
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    />
                  </Dropdown>

                  {/* User Profile Dropdown */}
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Space className="text-gray-300 hover:text-yellow-400 transition-colors">
                      <Button
                        icon={
                          <img
                            src={currentUser && currentUser.avatar ? currentUser.avatar : logo}
                            alt="User Profile"
                            className="w-8 h-8 rounded-full object-cover border-2 border-yellow-400"
                          />
                        }
                        type="text"
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        {t("My Profile")}{" "}
                        <DownCircleOutlined className="text-yellow-400" />
                      </Button>
                    </Space>
                  </Dropdown>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-3">
                    <Button 
                      icon={<ShoppingCartOutlined className="text-yellow-400" />}
                      type="text"
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      Cart
                    </Button>
                    
                    <Button 
                      icon={<PhoneOutlined className="text-yellow-400" />}
                      type="text"
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => window.location.href = '/login'}
                    className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    <UserOutlined className="mr-2" />
                    {t("Login")}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/signup'}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 hover:shadow-lg hover:shadow-yellow-400 transition-all duration-300"
                  >
                    {t("Sign Up")}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setNav(!nav)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors p-2"
              >
                {nav ? (
                  <i className="fas fa-times text-2xl"></i>
                ) : (
                  <i className="fas fa-bars text-2xl"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          nav ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="fixed inset-0 z-50">
            <div className="flex items-center justify-between p-4 bg-black bg-opacity-95 backdrop-blur-md border-b border-yellow-400">
              <div className="flex items-center space-x-3">
                <Link to="/" onClick={() => setNav(false)} className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors p-2">
                  <img src={Logo} alt="CAR Rental" className="w-8 h-8" />
                  <div>
                    <h2 className="text-xl font-bold text-yellow-400">CAR Rental</h2>
                    <p className="text-gray-400 text-sm">Premium Vehicle Services</p>
                  </div>
                </Link>
              </div>
              
              <button
                onClick={() => setNav(false)}
                className="text-gray-300 hover:text-yellow-400 transition-colors p-2"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="px-4 py-6 space-y-2">
              {menuItemsData.map((menu, index) => (
                <Link
                  key={index}
                  to={menu.to}
                  onClick={() => setNav(false)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors p-3 rounded-lg hover:bg-black hover:bg-opacity-10"
                >
                  {menu.icon && <span className="text-yellow-400 mr-3">{menu.icon}</span>}
                  <span>{menu.label}</span>
                </Link>
              ))}

              {/* User Actions for Mobile */}
              {currentUser ? (
                <div className="pt-6 border-t border-gray-700 space-y-2">
                  <Link
                    to="/dashboard/user"
                    onClick={() => setNav(false)}
                    className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors p-3"
                  >
                    <UserOutlined className="text-yellow-400" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/user/profile"
                    onClick={() => setNav(false)}
                    className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors p-3"
                  >
                    <ProfileOutlined className="text-yellow-400" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors p-3"
                  >
                    <LogoutOutlined />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-6 border-t border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setNav(false)}
                    className="flex items-center justify-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors p-3"
                  >
                    <UserOutlined />
                    <span>{t("Login")}</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setNav(false)}
                    className="flex items-center justify-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors p-3"
                  >
                    <span>{t("Create Account")}</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
          {!currentUser ? (
            <div className="mobile-hamb" onClick={() => setNav(!nav)}>
              <i className="fa-solid fa-bars" style={{ color: "var(--accent-yellow)" }}></i>
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
