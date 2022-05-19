import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import BaseResponse from "../../../models/dtos/base-response";
import { GetAllProductCataloguesResponseDto } from "../../../models/dtos/product-catalogue/get-all-product-catalogues.response";
import { GetProductCatalogueByIdResponseDto } from "../../../models/dtos/product-catalogue/get-product-catalogue-by-id.response";
import { ProductCatalogueAddRequestDto } from "../../../models/dtos/product-catalogue/product-catalogue-add.request";
import { ProductCatalogueAddResponseDto } from "../../../models/dtos/product-catalogue/product-catalogue-add.response";
import { ProductCatalogueUpdateRequestDto } from "../../../models/dtos/product-catalogue/product-catalogue-update.request";
import { ProductCatalogueUpdateResponseDto } from "../../../models/dtos/product-catalogue/product-catalogue-update.response";
import ProductCatalogueService from "../../../services/product-catalogue-service";
import { AddProductCataloguePageState, initialState } from "./prod-catalogues-add-slice";

//#region [Thunks]
export const getAllProductCatalogues = createAsyncThunk<GetAllProductCataloguesResponseDto>(
    'product-catalogues-add/getAll',
    async (thunkAPI) => {
        const apiResponse = await ProductCatalogueService.getProductCatalogues();
        console.log(apiResponse);
        if (apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
export const getProductCatalogueById = createAsyncThunk<GetProductCatalogueByIdResponseDto, string>(
    'product-catalogues-add/getById',
    async (id, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.getProductCatalogueById(id);
        console.log(apiResponse);
        if (apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);
export const createProductCatalogue = createAsyncThunk<ProductCatalogueAddResponseDto, ProductCatalogueAddRequestDto>(
    'product-catalogues-add/create',
    async (dto, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.addProductCatalogue(dto);
        console.log(apiResponse.status);
        console.log(apiResponse);
        if (apiResponse && apiResponse.status != 400)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse.data.message);
    }
);
export const updateProductCatalogue = createAsyncThunk<ProductCatalogueUpdateResponseDto, ProductCatalogueUpdateRequestDto>(
    'product-catalogues-add/update',
    async (dto, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.updateProductCatalogue(dto);
        console.log(apiResponse.status);
        if (apiResponse && apiResponse.status !== 400)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse.data.message);
    }
);

export const removeProductCatalogue = createAsyncThunk<string, string>(
    'product-catalogues-add/remove',
    async (id, thunkAPI) => {
        const apiResponse = await ProductCatalogueService.removeProductCatalogue(id);
        console.log(apiResponse);
        if (apiResponse && apiResponse.status != 400)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse.data.message);
    }
);
//#endregion

//#region [Thunk Builder]
const productCatalogueAddThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {

    builder.addCase(getAllProductCatalogues.pending, (state: AddProductCataloguePageState) => {
        console.log('[GetAllProductCatalogues] STILL PENDING...');
    });

    builder.addCase(getAllProductCatalogues.fulfilled, (state: AddProductCataloguePageState, {payload}) => {
        console.log('[GetAllProductCatalogues] FULLFILLED...');
        state.isLoading = true;
        state.productCatalogue = initialState.productCatalogue;
        state.availableCatalogues = payload.productCatalogues;
    });

    builder.addCase(getProductCatalogueById.pending, (state: AddProductCataloguePageState) => {
        console.log('[GetCatalogueById] STILL PENDING...');
        state.isLoading = true;
        state.productCatalogue = initialState.productCatalogue;
    });

    builder.addCase(getProductCatalogueById.fulfilled, (state: AddProductCataloguePageState, { payload }) => {
        console.log('[GetCatalogueById] FULFILLED...');
        state.isLoading = false;
        state.errorMsg = null;
        state.productCatalogue = { ...payload.productCatalogue, title: payload.productCatalogue.title!, description: payload.productCatalogue.description!, parentCatalogueId: payload.productCatalogue.parentCatalogueId! };
    });

    builder.addCase(getProductCatalogueById.rejected, (state: AddProductCataloguePageState) => {
        console.log('[GetCatalogueById] FAILED!');
        state.isLoading = false;
        state.errorMsg = 'Failed to load product catalogues.';
        state.productCatalogue = initialState.productCatalogue;
    });

    builder.addCase(removeProductCatalogue.fulfilled, (state: AddProductCataloguePageState, action) => {
        console.log('[DeleteProduct] FULFILLED!');
        const payload = action.payload as any;
        const removedProductCatalogueId = payload;
        const newProductCatalogueList = state.productCatalogue;
        // newProductCatalogueList.splice(newProductCatalogueList.findIndex(p => p.id === removedProductCatalogueId), 1);

        state.isLoading = false;
        state.errorMsg = null;
        state.productCatalogue = initialState.productCatalogue;
    });
}
//#endregion

export default productCatalogueAddThunkBuilder;