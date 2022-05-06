import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppHeader from "../app-header/app-header";
import AppDrawer from "../app-drawer/app-drawer";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Alert, AlertTitle } from '@mui/lab';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import './page.scss';
import { useAppDispatch } from "../../store";


const AppPage: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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