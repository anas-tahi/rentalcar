import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../styles/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { AuthContext } from "../../Context/authContext";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // Using useNavigate hook
  const { currentUser } = useContext(AuthContext);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Tooltip placement="bottom" title={"Dark mode"}>
              <DarkModeOutlinedIcon />
            </Tooltip>
          ) : (
            <Tooltip placement="bottom" title={"Light mode"}>
              <LightModeOutlinedIcon />
            </Tooltip>
          )}
        </IconButton>
        <Tooltip placement="bottom" title={"Notifications"}>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip placement="bottom" title={"Setting"}>
          <IconButton
            onClick={() => {
              currentUser.isAdmin
                ? navigate(`/dashboard/admin/settings`)
                : navigate(`/dashboard/user/settings`);
            }}
          >
            <SettingsOutlinedIcon />
          </IconButton>{" "}
        </Tooltip>
        <Tooltip placement="bottom" title={"Profile"}>
          <IconButton
            onClick={() => {
              currentUser.isAdmin
                ? navigate(`/dashboard/admin/settings`)
                : navigate(`/dashboard/user/settings`);
            }}
          >
            <PersonOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
