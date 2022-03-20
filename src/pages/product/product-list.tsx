import React from "react";
import ProductService from "../../services/product-service";

function ProductList() {
    const productService = new ProductService();
    return (
        <div>Products</div>
    )
};

export default ProductList;