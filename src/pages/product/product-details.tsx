import React from "react";
import Page from "../../components/page/page";
import ProductService from "../../services/product-service";

function ProductDetails() {
    const productService = new ProductService();
    return (
        <Page showDrawer>
            <p>Product Details</p>
        </Page>
    )
};

export default ProductDetails;