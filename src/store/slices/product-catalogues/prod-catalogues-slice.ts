import { createSlice } from '@reduxjs/toolkit';
import { ProductCatalogueDto } from '../../../models/dtos/product-catalogue/product-catalogue.dto';
import productCataloguesThunkBuilder from './prod-catalogues-thunk';

export interface ProductCataloguesPageState {
  productCatalogues: Array<ProductCatalogueDto>;
  isLoading: boolean;
  errorMsg: string | null;
  removeDialog: {
    isOpen: boolean;
    catalogueIdToRemove: string | null;
  };
}

const initialState: ProductCataloguesPageState = {
  productCatalogues: [],
  isLoading: false,
  errorMsg: null,
  removeDialog: { isOpen: false, catalogueIdToRemove: null },
};

const productCataloguesSlice = createSlice({
  name: 'ProductCatalogues',
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
      console.log('CLEARED');
      state.productCatalogues = [];
      state.isLoading = false;
      state.errorMsg = null;
    },
    showRemoveDialog(state, action) {
      state.removeDialog = {
        isOpen: true,
        catalogueIdToRemove: action.payload,
      };
    },
    hideRemoveDialog(state) {
      state.removeDialog = { isOpen: false, catalogueIdToRemove: null };
    },
  },
  extraReducers: (builder) => productCataloguesThunkBuilder(builder),
});

export const {
  loadProductCatalogues,
  loadProductCataloguesByPage,
  clearProductCatalogues,
  showRemoveDialog,
  hideRemoveDialog,
} = productCataloguesSlice.actions;
export default productCataloguesSlice.reducer;
