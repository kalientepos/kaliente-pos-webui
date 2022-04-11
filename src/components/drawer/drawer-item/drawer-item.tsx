import React, { Children, useState } from "react";
import {Ripple} from "primereact/ripple";
import DrawerItemHeader from "./drawer-item-header/drawer-item-header";
import { CSSTransition } from "react-transition-group";
import AnimateHeight from 'react-animate-height';

import { Button } from "primereact/button";
import './drawer-item.scss';
import DrawerItemBody from "./drawer-item-body/drawer-item-body";
import { useNavigate } from "react-router-dom";

interface SubItemProps {
    title: string;
    icon?: string;
    nav?: string;
}

const DrawerItem: React.FC<SubItemProps> = ({title, nav, icon, children}) => {
    const [shouldDropItems, setShouldDropItems] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        console.log('Toggling dropdown.');
        if(!nav) setShouldDropItems(!shouldDropItems);
    }

    return (
        <div className="drawer-item flex flex-column justify-content-center align-items-center">
            <DrawerItemHeader 
                title={title} icon={icon} onToggle={toggleDropdown}/>
            <DrawerItemBody toggleState={shouldDropItems}>
                {children}
            </DrawerItemBody>
        </div>
    );
};



export default DrawerItem;