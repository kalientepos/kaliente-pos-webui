import { createSlice } from "@reduxjs/toolkit";
import productsThunkBuilder from "./products-thunk";

const initialState = { products: [], isLoading: false, errorMsg: null };

const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        loadProducts(state, action) {

        },
        loadProductsByPage(state, action) {

        },
        clearProducts(state) {
            state.products = [];
        }
    },
    extraReducers: (builder) => productsThunkBuilder(builder)
});

export const {loadProducts, loadProductsByPage, clearProducts} = productsSlice.actions;
export default productsSlice.reducer;