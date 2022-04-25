
import React from "react";
import './app-drawer.scss';
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/auth/auth-slice";
import DrawerItem from "./app-drawer-item/app-drawer-item";
import { Box, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import AppDrawerItem from "./app-drawer-item/app-drawer-item";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

interface DrawerProps {
    className?: string;
    title?: string;
    items: Array<any>;
}


const drawerWidth = 240;

const AppDrawer: React.FC<DrawerProps> = ({items}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem button key={'Administration'} onClick={() => navigate('./administration')}>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Administration'} />
                </ListItem>

                <ListItem button key={'Product'} onClick={() => navigate('./product')}>
                    <ListItemIcon>
                        <ProductionQuantityLimitsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Product'} />
                </ListItem>

                <ListItem button key={'Product Catalogue'} onClick={() => navigate('./product-catalogue')}>
                    <ListItemIcon>
                        <CategoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Product Catalogue'} />
                </ListItem>

                <ListItem button key={'Logout'} onClick={() => dispatch(logout())}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
            </List>
            <Divider />
            </Box>
      </Drawer>
    );
}

export default AppDrawer;