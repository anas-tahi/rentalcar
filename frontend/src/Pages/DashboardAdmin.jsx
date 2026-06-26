import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import SidebarAdmin from "../scenes/global/SidebarAdmin";
import DashboardAdm from "../scenes/dashboard/DashAdmin";
import Team from "../scenes/team";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
import Geography from "../scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../styles/theme";
import Calendar from "../scenes/calendar/calendar";
import "./dash.css";
import { Global, css } from "@emotion/react"; // Import Global and css from @emotion/react
import Settings from "../scenes/Settings/settings";
import ReservedCar from "./ReservedCar";
import ManageCars from "./ManageCars";

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

  const handleProfilePhoto = (newPhoto) => {
    setProfilePhoto(newPhoto);
  };
  return (
    <>
      <Global styles={globalStyles} />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ display: "flex", height: "100vh" }}>
            <SidebarAdmin isSidebar={isSidebar} />
            <div style={{ flex: 1, overflowY: "auto" }}>
              <Topbar setIsSidebar={setIsSidebar} />
              <main className="content" style={{ padding: "20px" }}>
                <Routes>
                  <Route path="/" element={<DashboardAdm />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/reserved/Cars" element={<ReservedCar />} />
                  <Route path="/Manage/Cars" element={<ManageCars />} />

                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/Create/NewUser" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route
                    path="/settings"
                    element={<Settings profilePhoto={handleProfilePhoto} />}
                  />
                  <Route path="/geography" element={<Geography />} />
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
