import React from "react";
import ProductCatalogueService from "../../services/product-catalogue-service";

function ProductCatalogueList() {
    const productCatalogueService = new ProductCatalogueService();
    return (
        <div>Product Catalogues</div>
    )
};

export default ProductCatalogueList;