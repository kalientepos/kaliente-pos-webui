import {
  ActionCreatorWithPayload,
  ActionCreatorWithPreparedPayload,
  ActionReducerMapBuilder,
  createAsyncThunk,
  current,
} from '@reduxjs/toolkit';
import { GetProductByIdResponseDto } from '../../../models/dtos/product/get-product-by-id.response';
import { GetProductsResponseDto } from '../../../models/dtos/product/get-products.response';
import { ProductAddRequestDto } from '../../../models/dtos/product/product-add.request';
import { ProductAddResponseDto } from '../../../models/dtos/product/product-add.response';
import { ProductUpdateRequestDto } from '../../../models/dtos/product/product-update-request';
import { ProductUpdateResponseDto } from '../../../models/dtos/product/product-update-response';
import { ProductDto } from '../../../models/dtos/product/product.dto';
import ProductService from '../../../services/product-service';
import { ProductSliceState } from './products-slice';

// #region [Thunks]
export const getAllProducts = createAsyncThunk<GetProductsResponseDto>(
  'products/getAll',
  async () => {
    const apiResponse = await ProductService.getProducts();
    if (apiResponse) {
      return apiResponse.data.payload;
    }
    return apiResponse;
  }
);
export const getProductById = createAsyncThunk<
  GetProductByIdResponseDto,
  string
>('products/getById', async (id, thunkAPI) => {
  const apiResponse = await ProductService.getProductById(id);
  const { payload } = apiResponse.data;
  if (apiResponse && payload.foundProduct !== null) {
    return apiResponse.data.payload;
  }
  return thunkAPI.rejectWithValue(apiResponse);
});
export const createProduct = createAsyncThunk<
  ProductAddResponseDto,
  ProductAddRequestDto
>('products/create', async (dto, thunkAPI) => {
  const apiResponse = await ProductService.addProduct(dto);
  console.log(apiResponse);
  if (apiResponse) {
    return apiResponse.data.payload;
  }
  return thunkAPI.rejectWithValue(apiResponse);
});
export const updateProduct = createAsyncThunk<
  ProductUpdateResponseDto,
  ProductUpdateRequestDto
>('products/update', async (dto, thunkAPI) => {
  const apiResponse = await ProductService.updateProduct(dto);
  console.log(apiResponse);
  if (apiResponse) {
    return apiResponse.data.payload;
  }
  return thunkAPI.rejectWithValue(apiResponse);
});
export const removeProduct = createAsyncThunk<string, string>(
  'products/remove',
  async (id, thunkAPI) => {
    const apiResponse = await ProductService.deleteProduct(id);
    console.log(apiResponse);
    if (apiResponse) {
      return apiResponse.data.payload;
    }
    return thunkAPI.rejectWithValue(apiResponse);
  }
);
// #endregion

// #region [Thunk Builder]
const productsThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getAllProducts.pending, (state: ProductSliceState) => {
    console.log('[GetAllProducts] STILL PENDING...');
    state.isLoading = true;
    state.products = [];
    state.errorMsg = null;
  });

  builder.addCase(
    getAllProducts.fulfilled,
    (state: ProductSliceState, { payload }) => {
      console.log('[GetAllProducts] FULFILLED...');
      state.isLoading = false;
      state.products = payload.products;
      state.errorMsg = null;
    }
  );

  builder.addCase(getAllProducts.rejected, (state: ProductSliceState) => {
    console.log('[GetAllProducts] FAILED!');
    state.isLoading = false;
    state.errorMsg = null;
    state.products = [];
  });

  builder.addCase(
    removeProduct.fulfilled,
    (state: ProductSliceState, action) => {
      console.log('[DeleteProduct] FULFILLED!');
      const payload = action.payload as any;
      const removedProductId = payload.deletedProductId;
      const newProductList = state.products;
      newProductList.splice(
        newProductList.findIndex((p) => p.id === removedProductId),
        1
      );

      state.products = newProductList;
    }
  );
};
// #endregion

export default productsThunkBuilder;
