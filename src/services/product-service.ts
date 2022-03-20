import axios from "axios";
import { baseApiUrl } from "../models/constants";

export default class ProductService {

    async getProductById(id: string) {
        const response = await axios.get(`${baseApiUrl}/product/getById/${id}`);
        return response;
    }

    async getProducts() {
        const response = await axios.get(`${baseApiUrl}/product/getAll`);
        return response;
    }

    async addProduct(productAddDto: any) {
        const response = await axios.get(`${baseApiUrl}/product/addNewProduct`, productAddDto);
        return response;
    }

    async updateProduct(productUpdateDto: any) {
        const response = await axios.get(`${baseApiUrl}/product/update`, productUpdateDto);
        return response;
    }

    async deleteProduct(id: string) {
        const response = await axios.get(`${baseApiUrl}/product/delete/${id}`);
        return response;
    }
    
}