import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page";
import ProductCatalogueService from "../../services/product-catalogue-service";

function ProductCatalogueList() {
    const productCatalogueService = new ProductCatalogueService();
    const [isLoadingCatalogues, setLoadingCatalogues] = useState(false);
    const [productCatalogues, setProductCatalogues] = useState([]);
    const navigate = useNavigate();

    const operationsBody = (rowData: any) => (
        <div>
            <Button className="mr-1 p-button-primary" title='Edit' label="Edit" onClick={() => navigate(`./update/${rowData.id}`)}/>
            <Button className="mr-1 p-button-info" title='Details' label="Details" />
            <Button className="p-button-danger" title='Delete' label="Delete"  />
        </div>
    );

    const fetchCatalogues = useCallback(async () => {
        const response = await productCatalogueService.getProductCatalogues();
        console.log(response.data);
        setProductCatalogues(response.data);
    }, []);

    useEffect(() => {
        fetchCatalogues();
    }, []);


    return (
        <Page>
            <p className="mt-3 mb-3 text-strong">Product Catalogues</p>
            <Button className="mb-3 p-button-success" label="Create New Catalogue" onClick={() => navigate('./add')} />
            <DataTable value={productCatalogues} rows={productCatalogues.length} responsiveLayout="scroll">
                <Column field="title" header="Title"/>
                <Column field="description" header="Description"/>
                <Column body={operationsBody} header="Operations" className="text-center"/>
            </DataTable>
        </Page>
    )
};

export default ProductCatalogueList;