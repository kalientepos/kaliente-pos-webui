import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../../services/product-service";

//#region [Thunks]
export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async(thunkAPI) => {
        const apiResponse = await ProductService.getProducts();
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
//#endregion

//#region [Thunk Builder]
const productsThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {
    
    builder.addCase(getAllProducts.pending, (state: any) => {
        console.log('[GetAllProducts] STILL PENDING...');
    });

    builder.addCase(getAllProducts.fulfilled, (state: any) => {
        console.log('[GetAllProducts] FULFILLED...');
    });

    builder.addCase(getAllProducts.rejected, (state: any) => {
        console.log('[GetAllProducts] FAILED!');
    });

}
//#endregion

export default productsThunkBuilder;