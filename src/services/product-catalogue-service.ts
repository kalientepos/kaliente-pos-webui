import axios from "axios";
import { baseApiUrl } from "../models/constants";

export default class ProductCatalogueService {

    async getProductCatalogueById(id: string) {
        const response = await axios.get(`${baseApiUrl}/product_catalogue/getById/${id}`);
        return response;
    }

    async getProductCatalogues() {
        const response = await axios.get(`${baseApiUrl}/product_catalogue/getAll`);
        return response;
    }

    async addProductCatalogue(catalogueAddDto: any) {
        const response = await axios.get(`${baseApiUrl}/product_catalogue/addNewCatalogue`, catalogueAddDto);
        return response;
    }

    async updateProductCatalogue(catalogueUpdateDto: any) {
        const response = await axios.get(`${baseApiUrl}/product_catalogue/update`, catalogueUpdateDto);
        return response;
    }

    async removeProductCatalogue(id: string) {
        const response = await axios.get(`${baseApiUrl}/product_catalogue/delete/${id}`);
        return response;
    }

}