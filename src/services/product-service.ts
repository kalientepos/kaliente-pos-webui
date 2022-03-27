import axios from "axios";
import { baseApiUrl } from "../models/constants";
import { ProductAddRequestDto } from "../models/dtos/product/product-add.request";
import { ProductUpdateRequestDto } from "../models/dtos/product/product-update-request";
import getClient from "./clients/http-client";

export default class ProductService {

    async getProductById(id: string) {
        const response = await getClient().get(`${baseApiUrl}/product/getById/${id}`);
        return response;
    }

    async getProducts() {
        const response = await getClient().get(`${baseApiUrl}/product/getAll`);
        return response;
    }

    async addProduct(productAddDto: ProductAddRequestDto) {
        const response = await getClient().post(`${baseApiUrl}/product/addNewProduct`, productAddDto);
        return response;
    }

    async updateProduct(productUpdateDto: ProductUpdateRequestDto) {
        const response = await getClient().put(`${baseApiUrl}/product/update`, productUpdateDto);
        return response;
    }

    async deleteProduct(id: string) {
        const response = await getClient().get(`${baseApiUrl}/product/delete/${id}`);
        return response;
    }
    
}