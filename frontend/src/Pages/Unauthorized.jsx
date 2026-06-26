// src/Pages/Unauthorized.js
import React, { useContext } from "react";
import { Result, Button } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo/Untitled-1-01.png"; // Import your logo file
import { AuthContext } from "../Context/authContext";
import { Box, Typography } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleBackHome = () => {
    if (currentUser && currentUser.isNormalUser) {
      navigate("/dashboard/User");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          icon={
            <FrownOutlined style={{ fontSize: "68px", color: "#ff4d4f" }} />
          }
          title="Unauthorized Access"
          subTitle="You do not have permission to view this page."
          extra={[
            <div key="login-message" style={{ paddingBottom: 20 }}>
              {currentUser && currentUser.isNormalUser ? (
                "You can't access this page."
              ) : (
                <>
                  You need to <Link to="/login">log in</Link> to access this
                  page.
                </>
              )}
            </div>,
            <Button type="primary" onClick={handleBackHome} key="back-home">
              {currentUser && currentUser.isNormalUser
                ? "Back to dashboard"
                : "Back Home"}
            </Button>,
          ]}
        />
      </div>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        padding={2}
        width="100%"
        gap={1}
        sx={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            height: "40px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.2rem",
            letterSpacing: "0.05em",
            color: "#666",
            textTransform: "uppercase",
          }}
        >
          © 2024 RonorCar. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Unauthorized;
