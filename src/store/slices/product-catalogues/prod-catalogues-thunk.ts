import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import BaseResponse from "../../../models/dtos/base-response";
import { GetAllProductCataloguesResponseDto } from "../../../models/dtos/product-catalogue/get-all-product-catalogues.response";
import { GetProductCatalogueByIdResponseDto } from "../../../models/dtos/product-catalogue/get-product-catalogue-by-id.response";
import { ProductCatalogueAddRequestDto } from "../../../models/dtos/product-catalogue/product-catalogue-add.request";
import { ProductCatalogueAddResponseDto } from "../../../models/dtos/product-catalogue/product-catalogue-add.response";
import { ProductCatalogueUpdateRequestDto } from "../../../models/dtos/product-catalogue/product-catalogue-update.request";
import { ProductCatalogueUpdateResponseDto } from "../../../models/dtos/product-catalogue/product-catalogue-update.response";
import ProductCatalogueService from "../../../services/product-catalogue-service";
import { ProductCataloguePageState } from "./prod-catalogues-slice";

//#region [Thunks]
export const getAllProductCatalogues = createAsyncThunk<GetAllProductCataloguesResponseDto>(
    'product-catalogues/getAll',
    async (thunkAPI) => {
        const apiResponse = await ProductCatalogueService.getProductCatalogues();
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
export const getProductCatalogueById = createAsyncThunk<GetProductCatalogueByIdResponseDto, string>(
    'product-catalogues/getById',
    async(id, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.getProductCatalogueById(id);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
export const createProductCatalogue = createAsyncThunk<ProductCatalogueAddResponseDto, ProductCatalogueAddRequestDto>(
    'product-catalogues/create',
    async(dto, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.addProductCatalogue(dto);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);
export const updateProductCatalogue = createAsyncThunk<ProductCatalogueUpdateResponseDto, ProductCatalogueUpdateRequestDto>(
    'product-catalogues/update',
    async(dto, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.updateProductCatalogue(dto);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);

export const removeProductCatalogue = createAsyncThunk<string, string>(
    'product-catalogues/remove',
    async(id, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.removeProductCatalogue(id);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);
//#endregion

//#region [Thunk Builder]
const productsThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {
    
    builder.addCase(getAllProductCatalogues.pending, (state: ProductCataloguePageState) => {
        console.log('[GetAllProducts] STILL PENDING...');
        state.isLoading = true;
        state.productCatalogues = [];
    });

    builder.addCase(getAllProductCatalogues.fulfilled, (state: ProductCataloguePageState, {payload}) => {
        console.log('[GetAllProducts] FULFILLED...');
        state.isLoading = false;
        state.errorMsg = null;
        state.productCatalogues = payload.productCatalogues;
    });

    builder.addCase(getAllProductCatalogues.rejected, (state: ProductCataloguePageState) => {
        console.log('[GetAllProducts] FAILED!');
        state.isLoading = false;
        state.errorMsg = 'Failed to load product catalogues.';
    });

    builder.addCase(removeProductCatalogue.fulfilled, (state: ProductCataloguePageState, action) => {
        console.log('[DeleteProduct] FULFILLED!');
        const payload = action.payload as any;
        const removedProductCatalogueId = payload;
        const newProductCatalogueList = state.productCatalogues;
        newProductCatalogueList.splice(newProductCatalogueList.findIndex(p => p.id === removedProductCatalogueId), 1);

        state.isLoading = false;
        state.errorMsg = null;
        state.productCatalogues = newProductCatalogueList;
    });
}
//#endregion

export default productsThunkBuilder;