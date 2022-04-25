import React from "react";
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppHeader from "../app-header/app-header";
import AppDrawer from "../app-drawer/app-drawer";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import './page.scss';

export interface PageProps {

}

const drawerItems = [
    {
        title: 'Administration',
        nav: '/administration',
        icon: <AccountBoxIcon/>
    }
];

const Page: React.FC<PageProps> = () => {
    return (
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader/>
      <AppDrawer items={drawerItems}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
    );
};

export default Page;