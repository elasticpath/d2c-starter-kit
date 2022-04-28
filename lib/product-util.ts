import { HTMLChakraProps } from "@chakra-ui/react";
import type { File, ProductResponse, Resource, Variation } from "@moltin/sdk";
import { createContext } from "react";
import type {
  IdentifiableBaseProduct,
  OptionDict,
  ProductContext,
} from "./product-types";

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
  console.log(
    "findBaseProductSlug: ",
    product.attributes.base_product_id,
    result?.id
  );
  if (!result) {
    throw new Error("Failed to find base product slug.");
  }
  return result.attributes.slug;
}

export const createEmptyOptionDict = (variations: Variation[]): OptionDict =>
  variations.reduce((acc, c) => ({ ...acc, [c.id]: undefined }), {});

export const productContext = createContext<ProductContext | null>(null);
