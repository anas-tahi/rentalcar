import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import LoginForm from "../components/LoginForm";
import Logo from "../components/Logo";
import { motion } from "framer-motion";
import NavLR from "../components/NavLR";
import PropTypes from 'prop-types';
import {
  CarOutlined,
  ShieldCheckOutlined,
  StarOutlined,
  CheckCircleOutlined,
  LockOutlined,
  UserOutlined,
  ThunderboltOutlined,
  CrownOutlined
} from '@ant-design/icons';

// Define global styles
const globalStyles = css`
  html {
    font-size: 17px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    min-height: 100vh;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 215, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #FFD700, #FFA500);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #FFA500, #FFD700);
  }
`;

const RootStyle = styled("div")({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
  position: "relative",
  overflow: "hidden",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 1
  }
});

const BackgroundElements = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  zIndex: 0
});

const FloatingCar = styled(motion.div)({
  position: "absolute",
  fontSize: "200px",
  color: "rgba(255, 215, 0, 0.03)",
  top: "10%",
  right: "5%",
  animation: "float 6s ease-in-out infinite"
});

const FloatingCar2 = styled(motion.div)({
  position: "absolute",
  fontSize: "150px",
  color: "rgba(255, 215, 0, 0.02)",
  bottom: "15%",
  left: "8%",
  animation: "float 8s ease-in-out infinite reverse"
});

const LoginContainer = styled(Box)({
  position: "relative",
  zIndex: 10,
  maxWidth: 500,
  width: "100%",
  margin: "0 auto",
  padding: 3
});

const GlassCard = styled(Box)({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 215, 0, 0.2)",
  borderRadius: "24px",
  padding: "48px",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 100px rgba(255, 215, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
    animation: "shimmer 2s linear infinite"
  }
});

const PremiumBadge = styled(Box)({
  position: "absolute",
  top: "-15px",
  right: "-15px",
  background: "linear-gradient(135deg, #FFD700, #FFA500)",
  color: "#000",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)"
});

const FeatureHighlight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px",
  background: "rgba(255, 215, 0, 0.05)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 215, 0, 0.1)",
  margin: "16px 0"
});

let easing = [0.6, -0.05, 0.01, 0.99];

const Login = ({ setAuth }) => {
  return (
    <>
      <NavLR />
      <Global styles={globalStyles} />
      
      <RootStyle>
        <BackgroundElements>
          <FloatingCar
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CarOutlined />
          </FloatingCar>
          
          <FloatingCar2
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CrownOutlined />
          </FloatingCar2>
        </BackgroundElements>

        <LoginContainer>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing }}
          >
            <GlassCard>
              {/* Premium Badge */}
              <PremiumBadge>
                <CrownOutlined />
                Premium Access
              </PremiumBadge>

              {/* Welcome Section */}
              <Box textAlign="center" mb={4}>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "32px",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #FFD700, #FFA500)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      mb: 2,
                      letterSpacing: "1px"
                    }}
                  >
                    Welcome Back
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "16px",
                      mb: 4
                    }}
                  >
                    Access your premium vehicle rental dashboard
                  </Typography>
                </motion.div>
              </Box>

              {/* Security Features */}
              <FeatureHighlight>
                <ShieldCheckOutlined sx={{ color: "#FFD700", fontSize: "20px" }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "#fff", fontWeight: "600" }}>
                    Secure Login
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    256-bit encryption protection
                  </Typography>
                </Box>
              </FeatureHighlight>

              <FeatureHighlight>
                <ThunderboltOutlined sx={{ color: "#FFD700", fontSize: "20px" }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "#fff", fontWeight: "600" }}>
                    Instant Access
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    No waiting time
                  </Typography>
                </Box>
              </FeatureHighlight>

              {/* Login Form */}
              <Box mt={4}>
                <LoginForm setAuth={setAuth} />
              </Box>

              {/* Additional Features */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleOutlined sx={{ color: "#4CAF50", fontSize: "16px" }} />
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Trusted by 10,000+ users
                  </Typography>
                </Box>
                
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    color: "#FFD700",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#FFA500",
                      transform: "translateX(2px)"
                    }
                  }}
                >
                  <LockOutlined />
                  Forgot Password?
                </Link>
              </Box>

              {/* Sign Up Link */}
              <Box textAlign="center" mt={6}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    sx={{
                      color: "#FFD700",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#FFA500",
                        transform: "scale(1.05)"
                      }
                    }}
                  >
                    <StarOutlined />
                    Create Premium Account
                  </Link>
                </Typography>
              </Box>
            </GlassCard>
          </motion.div>
        </LoginContainer>
        
        <Logo />
      </RootStyle>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0px) translateX(20px);
          }
          75% {
            transform: translateY(15px) translateX(10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Login;
