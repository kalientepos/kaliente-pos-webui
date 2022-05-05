
import { Button } from "@mui/material";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/page/page";
import ProductService from "../../services/product-service";
import { useAppSelector } from "../../store";
import { clearProducts } from "../../store/slices/products/products-slice";
import { removeProduct, getAllProducts } from "../../store/slices/products/products-thunk";

function ProductList() {
    const productPageState = useAppSelector(state => state.product.productsPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const operationsBody = (rowData: any) => (
        <div>
            <Button onClick={() => navigate(`./update/${rowData.id}`)}/>
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button onClick={() => dispatch(removeProduct(rowData.id))}  />
        </div>
    );

    useEffect(() => {
        dispatch(getAllProducts());

        return () => { dispatch(clearProducts()); }

    }, []);

    return (
        <div>
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Products</p>
            <Button onClick={() => navigate('./add')}>Add</Button>
        </div>
    )
};

export default ProductList;