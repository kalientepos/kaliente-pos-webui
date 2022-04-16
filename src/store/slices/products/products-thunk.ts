import { ActionCreatorWithPayload, ActionCreatorWithPreparedPayload, ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProductByIdResponseDto } from "../../../models/dtos/product/get-product-by-id.response";
import { GetProductsResponseDto } from "../../../models/dtos/product/get-products.response";
import { ProductAddRequestDto } from "../../../models/dtos/product/product-add.request";
import { ProductAddResponseDto } from "../../../models/dtos/product/product-add.response";
import { ProductUpdateRequestDto } from "../../../models/dtos/product/product-update-request";
import { ProductUpdateResponseDto } from "../../../models/dtos/product/product-update-response";
import { ProductDto } from "../../../models/dtos/product/product.dto";
import ProductService from "../../../services/product-service";

export interface ProductsPageState {
    products: Array<ProductDto>,
    isLoading: boolean;
    errorMsg: string | null;
}

//#region [Thunks]
export const getAllProducts = createAsyncThunk<GetProductsResponseDto>(
    'products/getAll',
    async() => {
        const apiResponse = await ProductService.getProducts();
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
export const getProductById = createAsyncThunk<GetProductByIdResponseDto, string>(
    'products/getById',
    async(id, thunkAPI) => {
        const apiResponse = await ProductService.getProductById(id);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
export const createProduct = createAsyncThunk<ProductAddResponseDto, ProductAddRequestDto>(
    'products/create',
    async(dto, thunkAPI) => {
        const apiResponse = await ProductService.addProduct(dto);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);
export const updateProduct = createAsyncThunk<ProductUpdateResponseDto, ProductUpdateRequestDto>(
    'products/update',
    async(dto, thunkAPI) => {
        const apiResponse = await ProductService.updateProduct(dto);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);
export const deleteProduct = createAsyncThunk<string, string>(
    'products/update',
    async(id, thunkAPI) => {
        const apiResponse = await ProductService.deleteProduct(id);
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return thunkAPI.rejectWithValue(apiResponse);
    }
);
//#endregion

//#region [Thunk Builder]
const productsThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {
    
    builder.addCase(getAllProducts.pending, (state: ProductsPageState) => {
        console.log('[GetAllProducts] STILL PENDING...');
        state.isLoading = true;
        state.products = [];
        state.errorMsg = null;
    });

    builder.addCase(getAllProducts.fulfilled, (state: ProductsPageState, {payload}) => {
        console.log('[GetAllProducts] FULFILLED...');
        state.isLoading = false;
        state.products = payload.foundProducts;
        state.errorMsg = null;
    });

    builder.addCase(getAllProducts.rejected, (state: ProductsPageState) => {
        console.log('[GetAllProducts] FAILED!');
    });

}
//#endregion

export default productsThunkBuilder;