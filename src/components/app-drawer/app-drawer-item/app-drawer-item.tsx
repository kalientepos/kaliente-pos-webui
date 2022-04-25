import React, { Children, useState } from "react";
import './app-drawer-item.scss';
import { useNavigate } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface SubItemProps {
    title: string;
    icon?: string;
    nav?: string;
}

const AppDrawerItem: React.FC<SubItemProps> = ({title, nav, icon = null, children}) => {
    const navigate = useNavigate();

    return (
        <ListItem button onClick={() => navigate(nav!)}>
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItem>
    );
};



export default AppDrawerItem;