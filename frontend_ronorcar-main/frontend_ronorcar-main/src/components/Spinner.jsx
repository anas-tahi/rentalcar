import React from "react";
import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={{
        marginTop: 10, // Set margin top
        marginBottom: 15, // Set margin bottom
      }}
    >
      {" "}
      <BeatLoader  color="#087fff"/>
    </Box>
  );
};

export default Spinner;
