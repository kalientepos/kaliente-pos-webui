import { createSlice } from "@reduxjs/toolkit";
import { ProductCatalogueDto } from "../../../models/dtos/product-catalogue/product-catalogue.dto";
import productCataloguesThunkBuilder from "./prod-catalogues-thunk";

export interface ProductCataloguePageState {
    productCatalogues: Array<ProductCatalogueDto>;
    isLoading: boolean;
    errorMsg: string | null;
}

const initialState: ProductCataloguePageState = { productCatalogues: [], isLoading: false, errorMsg: null };

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
            console.log('CLEARED')
            state.productCatalogues = [];
            state.isLoading = false;
            state.errorMsg = null;
        }
    },
    extraReducers: (builder) => productCataloguesThunkBuilder(builder)
});

export const {loadProductCatalogues, loadProductCataloguesByPage, clearProductCatalogues} = productCataloguesSlice.actions;
export default productCataloguesSlice.reducer;