import { ProductCatalogueDto } from "./product-catalogue.dto";

export interface GetAllProductCataloguesResponseDto {
    productCatalogues: Array<ProductCatalogueDto>;
}