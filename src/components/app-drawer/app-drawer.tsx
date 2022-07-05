import React from 'react';
import './app-drawer.scss';
import { useNavigate } from 'react-router-dom';
import {
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { logout } from '../../store/slices/auth/auth-slice';

interface DrawerProps {
  className?: string;
  title?: string;
}

const drawerWidth = 240;

const AppDrawer: React.FC<DrawerProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        zIndex: 1,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <ListItem
        button
        key="Administration"
        onClick={() => navigate('./administration')}
      >
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Administration" />
      </ListItem>

      <ListItem button key="Product" onClick={() => navigate('./product')}>
        <ListItemIcon>
          <ProductionQuantityLimitsIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
      </ListItem>

      <ListItem
        button
        key="Product Catalogue"
        onClick={() => navigate('./product-catalogue')}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Product Catalogue" />
      </ListItem>

      <ListItem button key="Logout" onClick={() => dispatch(logout())}>
        <ListItemIcon>
          <NotInterestedIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Drawer>
  );
};

export default AppDrawer;
