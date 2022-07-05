import axios, { AxiosResponse } from 'axios';
import { baseApiUrl } from '../models/constants';
import BaseResponse from '../models/dtos/base-response';
import { GetProductByIdResponseDto } from '../models/dtos/product/get-product-by-id.response';
import { GetProductsResponseDto } from '../models/dtos/product/get-products.response';
import { ProductAddRequestDto } from '../models/dtos/product/product-add.request';
import { ProductAddResponseDto } from '../models/dtos/product/product-add.response';
import { ProductUpdateRequestDto } from '../models/dtos/product/product-update-request';
import { ProductUpdateResponseDto } from '../models/dtos/product/product-update-response';
import getClient from './clients/http-client';

type ApiResponse<T> = AxiosResponse<BaseResponse<T>>;

const ProductService = {
  async getProductById(
    id: string
  ): Promise<ApiResponse<GetProductByIdResponseDto>> {
    const response: ApiResponse<GetProductByIdResponseDto> =
      await getClient().get(`${baseApiUrl}/product/getById/${id}`);
    console.error(response);
    return response;
  },

  async getProducts(): Promise<ApiResponse<GetProductsResponseDto>> {
    const response = await getClient().get(`${baseApiUrl}/product/getAll`);
    return response;
  },

  async addProduct(
    productAddDto: ProductAddRequestDto
  ): Promise<ApiResponse<ProductAddResponseDto>> {
    const response = await getClient().post(
      `${baseApiUrl}/product/add`,
      productAddDto
    );
    return response;
  },

  async updateProduct(
    productUpdateDto: ProductUpdateRequestDto
  ): Promise<ApiResponse<ProductUpdateResponseDto>> {
    const response = await getClient().put(
      `${baseApiUrl}/product/update`,
      productUpdateDto
    );
    return response;
  },

  async deleteProduct(id: string): Promise<ApiResponse<string>> {
    const response = await getClient().delete(
      `${baseApiUrl}/product/delete/${id}`
    );
    return response;
  },
};

export default ProductService;
