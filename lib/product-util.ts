import type { File, ProductResponse, Resource } from "@moltin/sdk";

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
