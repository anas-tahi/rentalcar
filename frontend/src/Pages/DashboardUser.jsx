// DashboardAdmin.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import DashboardUsr from "../scenes/dashboard/DashUser";
import Invoices from "../scenes/invoices";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../styles/theme";
import Calendar from "../scenes/calendar/calendar";
import RentCar from "../scenes/dashboard/RentCar";
import "./dash.css";
import { Global, css } from "@emotion/react"; // Import Global and css from @emotion/react
import SidebarUser from "../scenes/global/SidebarUser";
import Settings from "../scenes/Settings/settings";
import HelpAndSupport from "../scenes/Help/HelpAndSupport";
import BookedCar from "./BookedCar";

// Define global styles using css from @emotion/react
const globalStyles = css`
  html {
    font-size: 100%;
    scroll-behavior: smooth;
  }
  * {
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif; /* Global font-family */
  }
`;

const DashboardAdmin = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [newprofilePhoto, setProfilePhoto] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleProfilePhoto = (newPhoto) => {
    setProfilePhoto(newPhoto);
  };
  const handleSelectedItem = (selectedItem) => {
    if (selectedItem) {
      setSelectedItem(selectedItem);
    }
  };
  return (
    <>
      <Global styles={globalStyles} />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ display: "flex", height: "100vh" }}>
            <SidebarUser
              isSidebar={isSidebar}
              setprofilePhoto={newprofilePhoto}
              selectedMenuItem={handleSelectedItem}
            />
            <div style={{ flex: 1, overflowY: "auto" }}>
              <Topbar
                setIsSidebar={setIsSidebar}
                setSelectedMenuItem={selectedItem}
              />
              <main className="content" style={{ padding: "20px" }}>
                <Routes>
                  <Route path="/" element={<DashboardUsr />} />
                  <Route path="/rent-car" element={<RentCar />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/support" element={<HelpAndSupport />} />
                  <Route
                    path="/profile"
                    element={<Settings profilePhoto={handleProfilePhoto} />}
                  />
                  <Route path="/booked" element={<BookedCar />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route
                    path="/settings"
                    element={<Settings profilePhoto={handleProfilePhoto} />}
                  />
                </Routes>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default DashboardAdmin;
