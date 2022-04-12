import { ProductDto } from "./product.dto";

export interface GetProductsRequestDto {
    foundProducts: Array<ProductDto>;
}