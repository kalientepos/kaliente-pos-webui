import { createSlice } from "@reduxjs/toolkit";
import { ProductDto } from "../../../models/dtos/product/product.dto";
import productsThunkBuilder from "./products-thunk";

export interface ProductsPageState {
    products: Array<ProductDto>,
}

export interface ProductSliceState {
    products: Array<ProductDto>,
    isLoading: boolean;
    errorMsg: string | null;
    removeDialog: {
        isOpen: boolean;
        productIdToRemove: string | null;
    }
}

const initialState: ProductSliceState = { 
    products: [], 
    isLoading: false, 
    errorMsg: null, 
    removeDialog: {
        isOpen: false,
        productIdToRemove: null
    }
};

const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        clearProducts(state) {
            state.isLoading = false;
            state.products = [];
            state.errorMsg = null;
        },
        showRemoveDialog(state, action) {
            state.removeDialog = { isOpen: true, productIdToRemove: action.payload };
        },
        hideRemoveDialog(state) {
            state.removeDialog = { isOpen: false, productIdToRemove: null };
        }
    },
    extraReducers: (builder) => productsThunkBuilder(builder)
});

export const {clearProducts, showRemoveDialog, hideRemoveDialog } = productsSlice.actions;
export default productsSlice.reducer;