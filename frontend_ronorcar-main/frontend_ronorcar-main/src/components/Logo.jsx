import React from "react";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      justifyContent="center"
      padding={2}
      sx={{
        position:"absolute"
        ,bottom:0,
        backgroundColor: '#f0f0f0', // Light grey background
        width: '100%',
      }}
    >
      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{
          fontWeight: 'bold',
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          color: '#666',
          textTransform: 'uppercase',
        }}
      >
        © 2024 RonorCar. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Logo;
