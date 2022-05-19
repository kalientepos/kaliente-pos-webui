import { createSlice } from "@reduxjs/toolkit";
import { ProductCatalogueDto } from "../../../models/dtos/product-catalogue/product-catalogue.dto";
import productCatalogueAddThunkBuilder from "./prod-catalogues-add-thunk";

export interface AddProductCataloguePageState {
    selectedParentCatalogue?: ProductCatalogueDto;
    availableCatalogues: Array<ProductCatalogueDto>;
    productCatalogue: {
        id?: string;
        title: string;
        description: string;
        parentCatalogueId?: string;
    };
    isLoading: boolean;
    errorMsg: string | null;
    removeDialog: {
        isOpen: boolean;
        catalogueIdToRemove: string | null;
    }
}

export const initialState: AddProductCataloguePageState = {
    availableCatalogues: [],
    productCatalogue: {
        title: '',
        description: ''
    },
    isLoading: false, 
    errorMsg: null, 
    removeDialog: { isOpen: false, catalogueIdToRemove: null } 
};

const productCatalogueAddSlice = createSlice({
    name: 'ProductCatalogueAdd',
    initialState,
    reducers: {
        loadCataloguesForParentSelection(state, action) {
            state.availableCatalogues = action.payload;
        },
        loadProductCatalogue(state, action) {
            state.productCatalogue = action.payload;
            state.isLoading = false;
            state.errorMsg = null;
        },
        clearProductCatalogue(state) {
            state.isLoading = false;
            state.errorMsg = null;
        },
        showRemoveDialog(state, action) {
            state.removeDialog = { isOpen: true, catalogueIdToRemove: action.payload };
        },
        hideRemoveDialog(state) {
            state.removeDialog = { isOpen: false, catalogueIdToRemove: null };
        }
    },
    extraReducers: (builder) => productCatalogueAddThunkBuilder(builder)
});

export const { loadProductCatalogue, clearProductCatalogue, showRemoveDialog, hideRemoveDialog, loadCataloguesForParentSelection } = productCatalogueAddSlice.actions;
export default productCatalogueAddSlice.reducer;