import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page/page";
import ProductCatalogueService from "../../services/product-catalogue-service";
import { useAppSelector } from "../../store";
import { clearProductCatalogues } from "../../store/slices/product-catalogues/prod-catalogues-slice";
import { getAllProductCatalogues } from "../../store/slices/product-catalogues/prod-catalogues-thunk";

function ProductCatalogueList() {
    const productCatalogues = useAppSelector(state => state.productCatalogue.productCatalogues);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const operationsBody = (rowData: any) => (
        <div>
            <Button className="mr-1 p-button-primary" title='Edit' label="Edit" onClick={() => navigate(`./update/${rowData.id}`)}/>
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button className="p-button-danger" title='Delete' label="Delete"  />
        </div>
    );

    

    useEffect(() => {
        dispatch(getAllProductCatalogues());

        return () => { dispatch(clearProductCatalogues()); }

    }, []);


    return (
        <Page showDrawer contentClasses="align-items-stretch justify-content-center ml-3 mr-3">
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Product Catalogues</p>
            <Button className="mb-3 p-button-success w-full" label="Create New Catalogue" onClick={() => navigate('./add')} />
            <DataTable value={productCatalogues} rows={productCatalogues.length} responsiveLayout="scroll">
                <Column field="title" header="Title"/>
                <Column field="description" header="Description"/>
                <Column body={operationsBody} header="Operations" className="text-center"/>
            </DataTable>
        </Page>
    )
};

export default ProductCatalogueList;