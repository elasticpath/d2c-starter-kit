import * as EPCC from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getProductById(
  productId: string
): Promise<EPCC.ProductResponse> {
  const result = await EPCCAPI.Catalog.Products.With("main_image").Get({
    productId,
  });
  const product = result;
  return product;
}

export async function getAllPCMProducts(): Promise<EPCC.PcmProduct[]> {
  const result = await EPCCAPI.Catalog.Products.All();
  const product = result.data;
  return product;
}
