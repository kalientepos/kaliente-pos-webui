import React from "react";
import Page from "../../components/page/page";
import ProductService from "../../services/product-service";

function ProductAdd() {

    const productService = new ProductService();

    return (
        <Page showDrawer>
            <div>Add Product</div>
        </Page>
    )
};

export default ProductAdd;