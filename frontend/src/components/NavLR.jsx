import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo/Untitled-1-01.png";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const NavLr = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 80,
  backgroundColor: "white",
});

const NavLR = () => {
  return (
    <NavLr>
      <Link to="/">
        <Box component="img" src={logo} alt="logo" sx={{
            height:80,
            width:80,
        }}></Box>
      </Link>
    </NavLr>
  );
};

export default NavLR;
