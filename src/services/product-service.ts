import axios from "axios";
import { baseApiUrl } from "../models/constants";
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

    async addProduct(productAddDto: any) {
        const response = await getClient().get(`${baseApiUrl}/product/addNewProduct`, productAddDto);
        return response;
    }

    async updateProduct(productUpdateDto: any) {
        const response = await getClient().get(`${baseApiUrl}/product/update`, productUpdateDto);
        return response;
    }

    async deleteProduct(id: string) {
        const response = await getClient().get(`${baseApiUrl}/product/delete/${id}`);
        return response;
    }
    
}