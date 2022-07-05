export interface ProductCatalogueUpdateRequestDto {
  id: string;
  title: string;
  description?: string;
  parentCatalogueId?: string;
}
