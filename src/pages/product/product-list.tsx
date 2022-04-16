import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page/page";
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
            <Button className="mr-1 p-button-primary" title='Edit' label="Edit" onClick={() => navigate(`./update/${rowData.id}`)}/>
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button className="p-button-danger" title='Delete' label="Delete" onClick={() => dispatch(removeProduct(rowData.id))}  />
        </div>
    );

    useEffect(() => {
        dispatch(getAllProducts());

        return () => { dispatch(clearProducts()); }

    }, []);

    return (
        <Page showDrawer contentClasses="align-items-stretch justify-content-center ml-3 mr-3">
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Products</p>
            <Button className="mb-3 p-button-success w-full" label="Create New Product" onClick={() => navigate('./add')} />
            <DataTable value={productPageState.products} rows={productPageState.products.length} responsiveLayout="scroll">
                <Column field="title" header="Title"/>
                <Column field="description" header="Description"/>
                <Column field="price" header="Price"/>
                <Column body={operationsBody} header="Operations" className="text-center"/>
            </DataTable>
        </Page>
    )
};

export default ProductList;