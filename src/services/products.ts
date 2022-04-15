import type { ProductResponse, Resource, ResourceList } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getProductById(
  productId: string
): Promise<Resource<ProductResponse>> {
  return await EPCCAPI.Catalog.Products.With("main_image").Get({
    productId,
  });
}

export async function getAllProducts(): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.Catalog.Products.All();
}
