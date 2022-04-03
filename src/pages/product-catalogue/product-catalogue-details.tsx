import React from "react";
import Page from "../../components/page/page";
import ProductCatalogueService from "../../services/product-catalogue-service";

function ProductCatalogueDetails() {
    const productCatalogueService = new ProductCatalogueService();
    return (
        <Page showDrawer>
            <p>Product Catalogue Details</p>
        </Page>
    )
};

export default ProductCatalogueDetails;