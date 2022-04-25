
import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page/page";
import ProductCatalogueService from "../../services/product-catalogue-service";
import { useAppSelector } from "../../store";
import { clearProductCatalogues } from "../../store/slices/product-catalogues/prod-catalogues-slice";
import { getAllProductCatalogues, removeProductCatalogue } from "../../store/slices/product-catalogues/prod-catalogues-thunk";

function ProductCatalogueList() {
    const productCatalogueState = useAppSelector(state => state.productCatalogue);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const operationsBody = (rowData: any) => (
        <div>
            <Button onClick={() => navigate(`./update/${rowData.id}`)}/>
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button onClick={() => dispatch(removeProductCatalogue(rowData.id))}  />
        </div>
    );

    

    useEffect(() => {
        dispatch(getAllProductCatalogues());

        return () => { dispatch(clearProductCatalogues()); }

    }, []);


    return (
        <div>
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Product Catalogues</p>
            <Button onClick={() => navigate('./add')} />
        </div>
    )
};

export default ProductCatalogueList;