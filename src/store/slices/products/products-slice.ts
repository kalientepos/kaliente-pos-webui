import { createSlice } from "@reduxjs/toolkit";
import productsThunkBuilder, { ProductsPageState } from "./products-thunk";

export interface ProductSliceState {
    productsPage: ProductsPageState;
    removeDialog: {
        isOpen: boolean;
        catalogueIdToRemove: string | null;
    }
}

const initialState: ProductSliceState = { 
    productsPage: { products: [], isLoading: false, errorMsg: null }, 
    removeDialog: {
        isOpen: false,
        catalogueIdToRemove: null
    }
};

const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        clearProducts(state) {
            state.productsPage.isLoading = false;
            state.productsPage.products = [];
            state.productsPage.errorMsg = null;
        },
        showRemoveDialog(state, action) {
            state.removeDialog = { isOpen: true, catalogueIdToRemove: action.payload };
        },
        hideRemoveDialog(state) {
            state.removeDialog = { isOpen: false, catalogueIdToRemove: null };
        }
    },
    extraReducers: (builder) => productsThunkBuilder(builder)
});

export const {clearProducts, showRemoveDialog, hideRemoveDialog } = productsSlice.actions;
export default productsSlice.reducer;