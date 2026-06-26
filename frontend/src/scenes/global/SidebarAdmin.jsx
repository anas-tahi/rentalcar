import React, { useContext, useState } from "react";
import { Layout, Menu, Typography, Tooltip, message } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  UserOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  GlobalOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import logo from "../../images/Default/DefaultAvatar.jpg";
import { useTheme } from "@mui/material/styles";

import "./Sidebar.css"; // Import your CSS file
import { AuthContext } from "../../Context/authContext";

const { Sider } = Layout;

const sidebarMenuItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    title: "Dashboard",
    link: "/dashboard/Admin",
  },
  {
    key: "management",
    icon: <TeamOutlined />,
    title: "Management",
    items: [
      {
        key: "cars",
        icon: <CarOutlined />,
        title: "Manage Cars",
        link: "/dashboard/Admin/Manage/Cars",
      },
      {
        key: "reserved",
        icon: <ShoppingCartOutlined />,
        title: "Reserved Cars",
        link: "/dashboard/Admin/reserved/Cars",
      },
      {
        key: "contacts",
        icon: <ContactsOutlined />,
        title: "Customer Contacts",
        link: "/dashboard/Admin/contacts",
      },
      {
        key: "invoices",
        icon: <FileDoneOutlined />,
        title: "Invoices",
        link: "/dashboard/Admin/invoices",
      },
      {
        key: "users",
        icon: <UserOutlined />,
        title: "User Management",
        link: "/dashboard/Admin/users",
      },
    ],
  },
  {
    key: "resources",
    icon: <UserOutlined />,
    title: "Resources",
    items: [
      {
        key: "Create",
        icon: <UserOutlined />,
        title: "Create New User",
        link: "/dashboard/Admin/profile",
      },
      {
        key: "calendar",
        icon: <CalendarOutlined />,
        title: "Calendar",
        link: "/dashboard/Admin/calendar",
      },
      {
        key: "faq",
        icon: <QuestionCircleOutlined />,
        title: "FAQ",
        link: "/dashboard/Admin/faq",
      },
      {
        key: "notifications",
        icon: <BellOutlined />,
        title: "Notifications",
        link: "/dashboard/Admin/notifications",
      },
    ],
  },
  {
    key: "analytics",
    icon: <BarChartOutlined />,
    title: "Analytics",
    items: [
      // {
      //   key: "data-analysis",
      //   icon: <BarChartOutlined />,
      //   title: "Data Analysis",
      //   link: "/dashboard/Admin/analysis",
      // },
      {
        key: "pie-chart",
        icon: <PieChartOutlined />,
        title: "Pie Chart",
        link: "/dashboard/Admin/pie",
      },
      {
        key: "line-chart",
        icon: <LineChartOutlined />,
        title: "Line Chart",
        link: "/dashboard/Admin/line",
      },
      {
        key: "geography-chart",
        icon: <GlobalOutlined />,
        title: "Geography Chart",
        link: "/dashboard/Admin/geography",
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    title: "Settings",
    link: "/dashboard/Admin/settings",
  },
  {
    key: "support",
    icon: <CustomerServiceOutlined />,
    title: "Help & Support",
    items: [
      {
        key: "chatbot",
        icon: <MessageOutlined />,
        title: "Chatbot",
        link: "/dashboard/Admin/chatbot",
      },
      {
        key: "support",
        icon: <CustomerServiceOutlined />,
        title: "Support Center",
        link: "/dashboard/Admin/support",
      },
    ],
  },
];

const mapMenuItems = (items) => {
  return items.map((item) => {
    if (item.items) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.title,
        children: mapMenuItems(item.items),
      };
    } else {
      return {
        key: item.key,
        icon: item.icon,
        label: (
          <Link to={item.link} className="sidebar-link">
            {item.title}
          </Link>
        ),
      };
    }
  });
};

const SidebarAdmin = ({ setProfilePhoto }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const { currentUser, logout } = useContext(AuthContext);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
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
        height: "100vh",
        width: collapsed ? 82 : 249,
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
                ? "0.2px solid #fff"
                : "0.2px solid rgba(0, 0, 0, 0.2)",
            borderBottom:
              mode === "dark"
                ? "0.2px solid #fff"
                : "0.2px solid rgba(0, 0, 0, 0.2)",
            gap: 6,
          }}
        >
          <Link to="/dashboard/Admin/form" className="img-profile">
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
                  ? "0.2px solid #fff"
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
            items={mapMenuItems(sidebarMenuItems)}
          />
        </div>

        <div
          style={{
            background: mode === "dark" ? "#001529" : "#fff",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            alignSelf: "flex-end",
            justifySelf: "flex-end",
          }}
        >
          <Tooltip placement="right" title={"Logout"}>
            <button
              onClick={() => {
                console.log('Admin logout clicked');
                logout();
                message.success('Logging out...');
              }}
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

export default SidebarAdmin;
