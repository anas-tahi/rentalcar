import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Link,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react"; // Import Global and css from @emotion/react
// import SocialAuth from "../components/SocialAuth";
import SignupForm from "../components/SignupForm";
import Logo from "../components/Logo";
import { motion } from "framer-motion";
import NavLR from "../components/NavLR";

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
//////////////////////////////////
const RootStyle = styled("div")({
  height: "185vh",
  display: "grid",
  placeItems: "center",
  backgroundColor: "#EDEDED",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 650,
  borderRadius: 30,
  padding: 45,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
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

const Signup = ({ setAuth }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <NavLR />
      <RootStyle style={{ fontFamily: "Poppins ,sans serif" }}>
        <Container>
          <ContentStyle>
            <HeadingStyle component={motion.div} {...fadeInUp}>
              {/* <Logo /> */}
              <Typography
                sx={{
                  color: "#ABABAB",
                  fontSize: 40,
                  borderBottom: "1px solid #B5B5B5",
                  fontWeight: 500,
                  mb: 4,
                }}
              >
                Register now
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Enter Your Details Below
              </Typography>
            </HeadingStyle>

            <SignupForm setAuth={setAuth} />

            <Typography
              component={motion.p}
              {...fadeInUp}
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
            >
              Already have an account?{" "}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Log in here
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Logo />
    </>
  );
};

export default Signup;
