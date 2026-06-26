import React, { useState } from "react";
import { Layout, Button } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  LockOutlined,
  MailOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Profile from "./sections/Profile";
import AccountInfo from "./sections/AccountInfo";
import PaymentInfo from "./sections/PaymentInfo";
import PasswordInfo from "./sections/PasswordInfo";
import MyDetails from "./sections/MyDetails";
import { useTheme } from "@mui/material/styles";

const { Content } = Layout;

const Settings = ({ profilePhoto }) => {
  const [currentView, setCurrentView] = useState("details");
  const theme = useTheme();
  const mode = theme.palette.mode;

  const handleButtonClick = (view) => {
    setCurrentView(view);
  };

  // Example user details (in a real application, this would come from state or props)
  const userDetails = {
    firstName: "John",
    lastName: "Doe",
    email: "example@gmail.com",
    phoneNumber: "+212 17*******",
    dob: "1990-01-01",
    gender: "Male",
    address: "123 Main St, City, Country",
  };

  const [paymentDetails, setPaymentDetails] = useState({
    method: "Credit Card",
  });

  const handleUpdatePaymentMethod = (newMethod) => {
    setPaymentDetails((prevDetails) => ({ ...prevDetails, method: newMethod }));
    console.log("Updated payment method:", newMethod);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        color: mode === "dark" ? "#001529" : "#fff",
        backgroundColor: mode === "dark" ? "#001529" : "#fff",
      }}
    >
      <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button
          type={currentView === "details" ? "primary" : "default"}
          icon={<UserOutlined />}
          onClick={() => handleButtonClick("details")}
        >
          My Details
        </Button>
        <Button
          type={currentView === "profile" ? "primary" : "default"}
          icon={<ProfileOutlined />}
          onClick={() => handleButtonClick("profile")}
        >
          Profile
        </Button>
        <Button
          type={currentView === "password" ? "primary" : "default"}
          icon={<LockOutlined />}
          onClick={() => handleButtonClick("password")}
        >
          Password
        </Button>
        <Button
          type={currentView === "email" ? "primary" : "default"}
          icon={<MailOutlined />}
          onClick={() => handleButtonClick("email")}
        >
          Account Info
        </Button>
        <Button
          type={currentView === "payment" ? "primary" : "default"}
          icon={<BellOutlined />}
          onClick={() => handleButtonClick("payment")}
        >
          Payment Info
        </Button>
      </div>

      <Content
        style={{ margin: "16px", color: mode === "dark" ? "#fff" : "#001529" }}
      >
        {currentView === "details" && (
          <div>
            <h1>My Details View</h1>
            <MyDetails userDetails={userDetails} />
          </div>
        )}
        {currentView === "profile" && (
          <div>
            <h1>Profile View</h1>
            <Profile onPhotoChange={(photo) => profilePhoto(photo)} />
          </div>
        )}
        {currentView === "password" && (
          <div>
            <h1>Password View</h1>
            <PasswordInfo />
          </div>
        )}
        {currentView === "email" && (
          <div>
            <h1>Account Info View</h1>
            <AccountInfo />
          </div>
        )}
        {currentView === "payment" && (
          <div>
            <h1>Payment Info View</h1>
            <PaymentInfo
              paymentDetails={paymentDetails}
              onUpdatePaymentMethod={handleUpdatePaymentMethod}
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Settings;
