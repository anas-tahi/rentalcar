import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react"; // Import Global and css from @emotion/react
import LoginForm from "../components/LoginForm";
// import SocialAuth from "../components/SocialAuth";
import Logo from "../components/Logo";
import { motion } from "framer-motion";
import NavLR from "../components/NavLR";
import PropTypes from 'prop-types';

//////////////////////////////////
// Define global styles using css from @emotion/react
const globalStyles = css`
  html {
    font-size: 17px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif; /* Global font-family */
  }

  /* Add any other global styles here */
`;

const RootStyle = styled("div")({
  height: "130vh",
  display: "grid",
  placeItems: "center",
  backgroundColor: "#EDEDED",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 600,
  padding: 40,
  borderRadius: 30,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Login = ({ setAuth }) => {
  return (
    <>
      {/* Apply global styles */}
      <NavLR />
      <Global styles={globalStyles} />

      <RootStyle style={{ fontFamily: "Poppins ,sans serif", fontSize: 55 }}>
        <Container maxWidth="sm">
          <ContentStyle>
            <HeadingStyle component={motion.div} {...fadeInUp}>
            <Typography
                sx={{
                  color: "#ABABAB",
                  fontSize: 40,
                  borderBottom: "1px solid #B5B5B5",
                  fontWeight: 500,
                  mb: 4,
                }}
              >
                Login
              </Typography>
            </HeadingStyle>

            <LoginForm setAuth={setAuth} />

            <Typography
              component={motion.p}
              {...fadeInUp}
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
            >
              Don’t have an account yet?{" "}
              <Link variant="subtitle2" component={RouterLink} to="/signup">
                Sign up
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
        <Logo/>
      </RootStyle>
      
    </>
  );
};
Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};
export default Login;
