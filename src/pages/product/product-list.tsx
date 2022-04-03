import React from "react";
import Page from "../../components/page/page";
import ProductService from "../../services/product-service";

function ProductList() {
    const productService = new ProductService();
    return (
        <Page showDrawer>
            <p>Product List</p>
        </Page>
    )
};

export default ProductList;