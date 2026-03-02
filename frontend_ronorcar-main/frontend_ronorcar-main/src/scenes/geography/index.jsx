import React from "react";
import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/Dash/GeographyChart";
import Header from "../../components/Dash/Header";
import { tokens } from "../../styles/theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart  height={"600px"}/>
      </Box>
    </Box>
  );
};

export default Geography;
