import { createSlice } from "@reduxjs/toolkit";
import productCataloguesThunkBuilder from "./prod-catalogues-thunk";

const initialState = { productCatalogues: [], isLoading: false, errorMsg: null };

const productCataloguesSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        loadProductCatalogues(state, action) {
            state.productCatalogues = action.payload;
            state.isLoading = false;
            state.errorMsg = null;
        },
        loadProductCataloguesByPage(state, action) {
            state.productCatalogues = action.payload;
            state.isLoading = false;
            state.errorMsg = null;
        },
        clearProductCatalogues(state) {
            state.productCatalogues = [];
            state.isLoading = false;
            state.errorMsg = null;
        }
    },
    extraReducers: (builder) => productCataloguesThunkBuilder(builder)
});

export const {loadProductCatalogues, loadProductCataloguesByPage, clearProductCatalogues} = productCataloguesSlice.actions;
export default productCataloguesSlice.reducer;