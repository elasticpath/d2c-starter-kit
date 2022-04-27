import { HTMLChakraProps } from "@chakra-ui/react";
import type { File, ProductResponse, Resource } from "@moltin/sdk";
import type { IdentifiableBaseProduct } from "./types";

export function processImageFiles(files: File[], mainImageId?: string) {
  // filters out main image and keeps server order
  const supportedMimeTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];
  return files.filter(
    (fileEntry) =>
      fileEntry.id !== mainImageId &&
      supportedMimeTypes.some((type) => fileEntry.mime_type === type)
  );
}

export function getProductOtherImageUrls(
  productResp: Resource<ProductResponse>
): File[] {
  const files = productResp?.included?.files;
  return files
    ? processImageFiles(files, productResp?.included?.main_images?.[0].id)
    : [];
}

export function getProductMainImage(
  productResp: Resource<ProductResponse>
): File | null {
  return productResp?.included?.main_images?.[0] || null;
}

export const changingSkuStyle: HTMLChakraProps<"div"> = {
  opacity: "20%",
  cursor: "default",
};

/**
 * All value of a differing values of b
 * e.g. a = { value1: '123', value2: '456, value3: '789'} and b = { value1: '367', value2: '423, value4: '891'}
 * output = { value1: '123', value2: '456, value3: '789', value4: '891'}
 * @param a
 * @param b
 */
export function mergeMeta(
  a: ProductResponse,
  b: ProductResponse
): ProductResponse {
  return {
    ...a,
    meta: {
      ...b.meta,
      ...a.meta,
    },
  };
}

export const filterBaseProducts = (
  products: ProductResponse[]
): IdentifiableBaseProduct[] =>
  products.filter(
    (product): product is IdentifiableBaseProduct =>
      product.attributes.base_product
  );

export function findBaseProductSlug(
  product: ProductResponse,
  baseProducts: IdentifiableBaseProduct[]
): string {
  const result = baseProducts.find(
    (baseProduct) => baseProduct.id === product.attributes.base_product_id
  );
  if (!result) {
    throw new Error("Failed to find base product slug.");
  }
  return result.attributes.slug;
}
