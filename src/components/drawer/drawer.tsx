import { Button } from "primereact/button";
import React from "react";
import {Divider} from "primereact/divider";
import './drawer.scss';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/slices/auth-slice";

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
            <div className="drawer-content flex flex-column justify-content-center align-items-center gap-1rem p-2">
                <Button className="w-full" title="Dashboard" label="Dashboard" name="Dashboard" onClick={() => navigate('')}/>
                <Button className="w-full" title="AddProductCatalogue" label="Add Product Catalogue" name="AddProductCatalogue" onClick={() => navigate('/product-catalogue/add')}/>
                <Button className="w-full" title="Product Catalogues" label="Product Catalogues" name="Product Catalogues" onClick={() => navigate('/product-catalogue')}/>
                <Button className="w-full" title="Add Product" label="Add Product" name="AddProduct" onClick={() => navigate('/product/add')}/>
                <Button className="w-full" title="Products" label="Products" name="Products" onClick={() => navigate('/product')}/>
                <Button className="w-full" title="Add Personnel" label="Add Personnel" name="AddPersonnel" onClick={() => navigate('/administration/personnel/add')}/>
                <Button className="w-full" title="Personnel List" label="Personnel List" name="PersonnelList" onClick={() => navigate('/administration/personnel')}/>
                <Button className="p-button-danger w-full" title="Login" label="Logout" name="Login" onClick={() => dispatch(logout())}/>
            </div>
        </div>
    );
}

export default Drawer;