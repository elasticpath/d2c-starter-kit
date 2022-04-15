import * as EPCC from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getProductById(
  productId: string
): Promise<EPCC.Resource<EPCC.ProductResponse>> {
  return await EPCCAPI.Catalog.Products.With("main_image").Get({
    productId,
  });
}

export async function getAllProducts(): Promise<
  EPCC.ResourceList<EPCC.ProductResponse>
> {
  return await EPCCAPI.Catalog.Products.All();
}
