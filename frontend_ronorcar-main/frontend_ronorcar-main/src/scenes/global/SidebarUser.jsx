import React, { useContext, useState } from "react";
import { Layout, Menu, Typography, message } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  CarOutlined,
  CheckCircleFilled,
  CalendarOutlined,
  BellOutlined,
  HeartOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Default/DefaultAvatar.jpg";
import { useTheme } from "@mui/material/styles";
import apiRequest from "../../Api/apiRequest";
import "./Sidebar.css"; // Import your CSS file
import { AuthContext } from "../../Context/authContext";
const { Sider } = Layout;
const { SubMenu } = Menu;

const sidebarMenuItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    title: "Dashboard",
    link: "/dashboard/User",
  },
  {
    key: "rent-car",
    icon: <CarOutlined />,
    title: "Rent Car",
    link: "/dashboard/User/rent-car",
  },
  {
    key: "manage",
    icon: <TeamOutlined />,
    title: "Manage Cars",
    items: [
      {
        key: "cars",
        icon: <CarOutlined />,
        title: "My Cars",
        link: "/dashboard/User/cars",
      },
      {
        key: "booked",
        icon: <CheckCircleFilled />,
        title: "My Reservations",
        link: "/dashboard/User/booked",
      },
    ],
  },
  {
    key: "calendar",
    icon: <CalendarOutlined />,
    title: "Calendar",
    link: "/dashboard/User/calendar",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    title: "Settings",
    link: "/dashboard/User/settings",
  },
  {
    key: "support",
    icon: <CustomerServiceOutlined />,
    title: "Help & Support",
    link: "/dashboard/User/support",
  },
];

const SidebarUser = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { currentUser ,logout} = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    console.log('Sidebar logout clicked');
    if (currentUser) {
      logout();
      // Immediate visual feedback
      message.success('Logging out...');
    }
  };
  return (
    <div
      className="containerSliderbar"
      style={{
        position: "relative",
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
        background: mode === "dark" ? "#001529" : "#fff",
        height: collapsed ? "100hv" : "100hv",
        width: collapsed ? 82 : 249,
        //   borderRight:
        //     mode === "dark" ? "0.6px solid #f0f0f0" : "1px solid #D3D3D3",
      }}
    >
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme={mode}
        breakpoint="lg" // set breakpoint for responsiveness
        width={248}
      >
        <div
          style={{
            height: "100px",
            width: collapsed ? 80 : 248,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: mode === "dark" ? "#001529" : "#fff",
            borderTop:
              mode === "dark"
                ? "0.5px solid #fff"
                : "1px solid rgba(0, 0, 0, 0.2)",
            borderBottom:
              mode === "dark"
                ? "0.5px solid #fff"
                : "1px solid rgba(0, 0, 0, 0.2)",
            gap: 6,
          }}
        >
          <Link to="/dashboard/User/settings" className="img-profile">
            <img
              src={
                currentUser && currentUser.avatar ? currentUser.avatar : logo
              }
              alt="profile-user"
              style={{
                width: collapsed ? "60px" : "80px",
                height: collapsed ? "60px" : "80px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Link>
          <div
            className="profile-descrip"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!collapsed && currentUser && currentUser.username ? (
              <Typography
                level={1}
                style={{
                  fontFamily: "Poppins ,sans serif",
                  color: mode === "dark" ? "#fff" : "#001529",
                }}
              >
                {" "}
                {currentUser.username}
              </Typography>
            ) : (
              ""
            )}
          </div>
        </div>
        {!collapsed ? (
          <div
            className="header-id"
            style={{
              padding: 4,
              display: "flex",
              justifyContent: "center",
              borderBottom:
                mode === "dark"
                  ? "1px solid #fff"
                  : "0.2px solid rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              level={1}
              style={{
                fontFamily: "Poppins ,sans serif",
                color: mode === "dark" ? "#fff" : "#001529",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins ,sans serif",
                  color: mode === "dark" ? "#A4E4FF" : "#ACB400",
                }}
              >
                Full name :
              </span>{" "}
              <span
                style={{
                  fontFamily: "Poppins ,sans serif",
                  color: mode === "dark" ? "#ECF9FF" : "#001529",
                }}
              >
                {currentUser && currentUser.firstName}{" "}
                {currentUser && currentUser.lastName}
              </span>
            </Typography>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-end",
            width: collapsed ? 80 : 248,
            height: "60px",
            zIndex: 1000,
            background: mode === "dark" ? "#001529" : "#fff",
          }}
        >
          <button
            onClick={toggleCollapsed}
            className="foldUnfold"
            style={{
              marginRight: collapsed ? 0 : 12,
              border: "none",
              color: mode === "dark" ? "#fff" : "#001529",
              background: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <div className="itemMenu">
          <Menu
            theme={mode}
            defaultSelectedKeys={[selectedKey]}
            mode="inline"
            onSelect={({ key }) => setSelectedKey(key)}
          >
            {sidebarMenuItems.map((menuItem) => {
              if (menuItem.items) {
                return (
                  <SubMenu
                    key={menuItem.key}
                    icon={menuItem.icon}
                    title={menuItem.title}
                  >
                    {menuItem.items.map((subMenuItem) => (
                      <Menu.Item key={subMenuItem.key} icon={subMenuItem.icon}>
                        <Link to={subMenuItem.link} className="sidebar-link">
                          {subMenuItem.title}
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                    <Link to={menuItem.link} className="sidebar-link">
                      {menuItem.title}
                    </Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>

        <div
          style={{
            background: mode === "dark" ? "#001529" : "#fff",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            // margin:
          }}
        >
          <Tooltip placement="right" title={"Logout"}>
            <button
              className={
                mode === "dark" ? "logout-button-dark" : "logout-button-light"
              }
              style={{
                width: collapsed ? "30px" : "91%",
                padding: collapsed ? "6px" : "10px 20px",
                border: "1px solid",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onClick={handleLogout}
            >
              <LogoutOutlined />
              {!collapsed && "Logout"}
            </button>
          </Tooltip>
        </div>
      </Sider>
    </div>
  );
};

export default SidebarUser;
