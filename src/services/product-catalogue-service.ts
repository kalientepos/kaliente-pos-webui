import axios from "axios";
import { baseApiUrl } from "../models/constants";
import { ProductCatalogueAddRequestDto } from "../models/dtos/product-catalogue/product-catalogue-add.request";
import { ProductCatalogueUpdateRequestDto } from "../models/dtos/product-catalogue/product-catalogue-update.request";
import getClient from "./clients/http-client";

export default class ProductCatalogueService {

    async getProductCatalogueById(id: string) {
        const response = await getClient().get(`${baseApiUrl}/product_catalogue/getById/${id}`);
        return response;
    }

    async getProductCatalogues() {
        const response = await getClient().get(`${baseApiUrl}/product_catalogue/getAll`);
        return response;
    }

    async addProductCatalogue(catalogueAddDto: ProductCatalogueAddRequestDto) {
        try {
            const response = await getClient().post(`${baseApiUrl}/product_catalogue/add`, catalogueAddDto);
            return response;
        } catch (ex: any) {
            return ex.response;
        }
    }

    async updateProductCatalogue(catalogueUpdateDto: ProductCatalogueUpdateRequestDto) {
        const response = await getClient().put(`${baseApiUrl}/product_catalogue/update`, catalogueUpdateDto);
        return response;
    }

    async removeProductCatalogue(id: string) {
        const response = await getClient().delete(`${baseApiUrl}/product_catalogue/delete/${id}`);
        return response;
    }

}