import axios, { AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import BaseResponse from "../models/dtos/base-response";
import { GetAllProductCataloguesResponseDto } from "../models/dtos/product-catalogue/get-all-product-catalogues.response";
import { GetProductCatalogueByIdResponseDto } from "../models/dtos/product-catalogue/get-product-catalogue-by-id.response";
import { ProductCatalogueAddRequestDto } from "../models/dtos/product-catalogue/product-catalogue-add.request";
import { ProductCatalogueAddResponseDto } from "../models/dtos/product-catalogue/product-catalogue-add.response";
import { ProductCatalogueUpdateRequestDto } from "../models/dtos/product-catalogue/product-catalogue-update.request";
import { ProductCatalogueUpdateResponseDto } from "../models/dtos/product-catalogue/product-catalogue-update.response";
import getClient from "./clients/http-client";


type ApiResponse<T> = AxiosResponse<BaseResponse<T>>;

const ProductCatalogueService = {

    async getProductCatalogueById(id: string): Promise<ApiResponse<GetProductCatalogueByIdResponseDto>> {
        const response = await getClient().get(`${baseApiUrl}/product_catalogue/getById/${id}`);
        console.warn(response)
        return response;
    },

    async getProductCatalogues(): Promise<ApiResponse<GetAllProductCataloguesResponseDto>> {
        const response = await getClient().get(`${baseApiUrl}/product_catalogue/getAll`);
        return response;
    },

    async addProductCatalogue(catalogueAddDto: ProductCatalogueAddRequestDto): Promise<ApiResponse<ProductCatalogueAddResponseDto>> {
        try {
            const response = await getClient().post(`${baseApiUrl}/product_catalogue/add`, catalogueAddDto);
            return response;
        } catch (ex: any) {
            return ex.response;
        }
    },

    async updateProductCatalogue(catalogueUpdateDto: ProductCatalogueUpdateRequestDto): Promise<ApiResponse<ProductCatalogueUpdateResponseDto>> {
        const response = await getClient().put(`${baseApiUrl}/product_catalogue/update`, catalogueUpdateDto);
        return response;
    },

    async removeProductCatalogue(id: string): Promise<ApiResponse<string>> {
        const response = await getClient().delete(`${baseApiUrl}/product_catalogue/delete/${id}`);
        return response;
    },

}

export default ProductCatalogueService;