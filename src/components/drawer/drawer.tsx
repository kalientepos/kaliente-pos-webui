import { Button } from "primereact/button";
import React from "react";
import {Divider} from "primereact/divider";
import {Accordion, AccordionTab} from "primereact/accordion";
import './drawer.scss';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/slices/auth/auth-slice";
import DrawerItem from "./drawer-item/drawer-item";

interface DrawerProps {
    className?: string;
    title?: string;
}

const Drawer: React.FC<DrawerProps> = ({className = '', title = null}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className={`drawer ${className} shadow-4`}>
            <div className="drawer-title text-center">
                <h2 className="p-4 text-bold text-primary">{title}</h2>
            </div>
            <div className="drawer-content flex flex-column justify-content-center align-items-center p-2 ">
                
                <DrawerItem title="Administration" icon="pi pi-user">
                    <Button className="p-button-rounded w-full" label="Personnel List" onClick={() => navigate('/administration')}/>
                </DrawerItem>

                <DrawerItem title="Inventory" icon="pi pi-database">
                    <Button className="p-button-rounded w-full" label="Products" onClick={() => navigate('/product')}/>
                    <Button className="p-button-rounded w-full" label="Product Catalogues" onClick={() => navigate('/product-catalogue')}/>
                </DrawerItem>

                <Button className="p-button-rounded p-button-danger w-full" title="Login" label="Logout" name="Login" onClick={() => dispatch(logout())}/>

            </div>
        </div>
    );
}

export default Drawer;