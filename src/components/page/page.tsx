import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppHeader from "../app-header/app-header";
import AppDrawer from "../app-drawer/app-drawer";
import './page.scss';


const AppPage: React.FC = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader/>
      <AppDrawer/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  );
};

export default AppPage;