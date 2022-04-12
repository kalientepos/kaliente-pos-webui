import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import ProductCatalogueService from "../../../services/product-catalogue-service";

//#region [Thunks]
export const getAllProductCatalogues = createAsyncThunk(
    'products/getAll',
    async(thunkAPI) => {
        const apiResponse = await ProductCatalogueService.getProductCatalogues();
        console.log(apiResponse);
        if(apiResponse)
            return apiResponse.data.payload;
        else return apiResponse;
    }
);
//#endregion

//#region [Thunk Builder]
const productsThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {
    
    builder.addCase(getAllProductCatalogues.pending, (state: any) => {
        console.log('[GetAllProducts] STILL PENDING...');
    });

    builder.addCase(getAllProductCatalogues.fulfilled, (state: any) => {
        console.log('[GetAllProducts] FULFILLED...');
    });

    builder.addCase(getAllProductCatalogues.rejected, (state: any) => {
        console.log('[GetAllProducts] FAILED!');
    });

}
//#endregion

export default productsThunkBuilder;