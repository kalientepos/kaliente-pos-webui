import { createSlice } from "@reduxjs/toolkit";
import productsThunkBuilder, { ProductsPageState } from "./products-thunk";

export interface ProductSliceState {
    productsPage: ProductsPageState;
}

const initialState: ProductSliceState = { 
    productsPage: { products: [], isLoading: false, errorMsg: null }
};

const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        clearProducts(state) {
            state.productsPage.isLoading = false;
            state.productsPage.products = [];
            state.productsPage.errorMsg = null;
        }
    },
    extraReducers: (builder) => productsThunkBuilder(builder)
});

export const {clearProducts} = productsSlice.actions;
export default productsSlice.reducer;