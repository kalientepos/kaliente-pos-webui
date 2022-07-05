import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../..';
import { GetPersonnelListResponseDto } from '../../../models/dtos/administration/get-personnel-list.response';
import { GetRolesResponseDto } from '../../../models/dtos/administration/get-roles.response';
import BaseResponse from '../../../models/dtos/base-response';
import { GetAllProductCataloguesResponseDto } from '../../../models/dtos/product-catalogue/get-all-product-catalogues.response';
import { GetProductCatalogueByIdResponseDto } from '../../../models/dtos/product-catalogue/get-product-catalogue-by-id.response';
import { ProductCatalogueAddRequestDto } from '../../../models/dtos/product-catalogue/product-catalogue-add.request';
import { ProductCatalogueAddResponseDto } from '../../../models/dtos/product-catalogue/product-catalogue-add.response';
import { ProductCatalogueUpdateRequestDto } from '../../../models/dtos/product-catalogue/product-catalogue-update.request';
import { ProductCatalogueUpdateResponseDto } from '../../../models/dtos/product-catalogue/product-catalogue-update.response';
import { GetProductByIdResponseDto } from '../../../models/dtos/product/get-product-by-id.response';
import { GetProductsResponseDto } from '../../../models/dtos/product/get-products.response';
import { ProductAddRequestDto } from '../../../models/dtos/product/product-add.request';
import { ProductAddResponseDto } from '../../../models/dtos/product/product-add.response';
import { ProductUpdateRequestDto } from '../../../models/dtos/product/product-update-request';
import { ProductUpdateResponseDto } from '../../../models/dtos/product/product-update-response';

// Api routes.
const apiBaseRoutes = {
  product: 'product',
  productCatalogue: 'product_catalogue',
  auth: 'auth',
  administration: 'administration',
};

// Preparing global request header.
const prepareApiHeaders = (headers: Headers, getState: any) => {
  const { token } = (getState() as RootState).auth;
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', '*');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// Api query mechanism.
export const kalienteApi = createApi({
  reducerPath: 'kalienteApi',
  tagTypes: ['User', 'Role', 'Product', 'ProductCatalogue'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8079/',
    prepareHeaders: (headers, { getState }) =>
      prepareApiHeaders(headers, getState),
  }),
  keepUnusedDataFor: 5,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getPersonnelList: builder.query<
      BaseResponse<GetPersonnelListResponseDto>,
      void
    >({
      query: () => ({
        url: `${apiBaseRoutes.administration}/getPersonnelList`,
        method: 'GET',
      }),
      // invalidatesTags: ['Personnel']
    }),
    getSystemRoles: builder.query<BaseResponse<GetRolesResponseDto>, void>({
      query: () => ({
        url: `${apiBaseRoutes.administration}/getRoles`,
        method: 'GET',
      }),
    }),
    //
    addProduct: builder.mutation<
      BaseResponse<ProductAddResponseDto>,
      ProductAddRequestDto
    >({
      query: (reqBody) => ({
        url: `${apiBaseRoutes.product}/add`,
        method: 'POST',
        body: reqBody,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<
      BaseResponse<ProductUpdateResponseDto>,
      ProductUpdateRequestDto
    >({
      query: (reqBody) => ({
        url: `${apiBaseRoutes.product}/update`,
        method: 'PUT',
        body: reqBody,
      }),
      invalidatesTags: ['Product'],
    }),
    getProductById: builder.query<
      BaseResponse<GetProductByIdResponseDto>,
      string
    >({
      query: (id) => `${apiBaseRoutes.product}/getById/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
      transformResponse: (response: any) => response.payload.foundProduct,
    }),
    getProducts: builder.query<BaseResponse<GetProductsResponseDto>, void>({
      query: () => `${apiBaseRoutes.product}/getAll`,
      providesTags: () => [{ type: 'Product' }],
    }),

    //
    addProductCatalogue: builder.mutation<
      BaseResponse<ProductCatalogueAddResponseDto>,
      ProductCatalogueAddRequestDto
    >({
      query: (reqBody) => ({
        url: `${apiBaseRoutes.productCatalogue}/add`,
        method: 'POST',
        body: reqBody,
      }),
      invalidatesTags: ['ProductCatalogue'],
    }),
    updateProductCatalogue: builder.mutation<
      BaseResponse<ProductCatalogueUpdateResponseDto>,
      ProductCatalogueUpdateRequestDto
    >({
      query: (reqBody) => ({
        url: `${apiBaseRoutes.productCatalogue}/update`,
        method: 'PUT',
        body: reqBody,
      }),
      invalidatesTags: ['ProductCatalogue'],
    }),
    getProductCatalogueById: builder.query<
      BaseResponse<GetProductCatalogueByIdResponseDto>,
      string
    >({
      query: (id) => `${apiBaseRoutes.productCatalogue}/getById/${id}`,
      providesTags: (result, error, id) => [{ type: 'ProductCatalogue', id }],
    }),
    getProductCatalogues: builder.query<
      BaseResponse<GetAllProductCataloguesResponseDto>,
      void
    >({
      query: () => `${apiBaseRoutes.productCatalogue}/getAll`,
      providesTags: () => [{ type: 'ProductCatalogue' }],
    }),

    //
    authenticate: builder.mutation<
      BaseResponse<ProductCatalogueAddResponseDto>,
      ProductCatalogueAddRequestDto
    >({
      query: (reqBody) => ({
        url: `${apiBaseRoutes.auth}/authenticate`,
        method: 'POST',
        body: reqBody,
      }),
    }),
  }),
});

export const {
  useGetSystemRolesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductCataloguesQuery,
  useGetProductCatalogueByIdQuery,
  useAddProductCatalogueMutation,
  useUpdateProductCatalogueMutation,
  useAuthenticateMutation,
} = kalienteApi;
