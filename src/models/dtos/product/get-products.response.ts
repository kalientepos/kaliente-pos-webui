import { ProductDto } from "./product.dto";

export interface GetProductsResponseDto {
    foundProducts: Array<ProductDto>;
}