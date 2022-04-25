import type { File, ProductResponse, Resource } from "@moltin/sdk";
import {
  getProductMainImage,
  getProductOtherImageUrls,
  processImageFiles,
} from "../lib/product-util";

describe("product util", () => {
  it("processImageFiles should return only supported images without the main image", () => {
    const files: Partial<File>[] = [
      {
        type: "file",
        id: "123",
        mime_type: "image/jpeg",
      },
      {
        type: "file",
        id: "456",
        mime_type: "image/gif",
      },
      {
        type: "file",
        id: "789",
        mime_type: "image/jpeg",
      },
      {
        type: "file",
        id: "101112",
        mime_type: "image/png",
      },
      {
        type: "file",
        id: "131415",
        mime_type: "image/svg+xml",
      },
      {
        type: "file",
        id: "161718",
        mime_type: "image/webp",
      },
      {
        type: "file",
        id: "192021",
        mime_type: "video/mp4",
      },
      {
        type: "file",
        id: "222324",
        mime_type: "application/pdf",
      },
      {
        type: "file",
        id: "252627",
        mime_type: "application/vnd.ms-excel",
      },
      {
        type: "file",
        id: "282930",
        mime_type: "application/vnd.ms-powerpoint",
      },
      {
        type: "file",
        id: "313233",
        mime_type: "application/msword",
      },
    ];

    const expected: Partial<File>[] = [
      {
        type: "file",
        id: "456",
        mime_type: "image/gif",
      },
      {
        type: "file",
        id: "789",
        mime_type: "image/jpeg",
      },
      {
        type: "file",
        id: "101112",
        mime_type: "image/png",
      },
      {
        type: "file",
        id: "131415",
        mime_type: "image/svg+xml",
      },
      {
        type: "file",
        id: "161718",
        mime_type: "image/webp",
      },
    ];
    expect(processImageFiles(files as File[], "123")).toEqual(expected);
  });

  it("processImageFiles should support an undefined main image id", () => {
    const files: Partial<File>[] = [
      {
        type: "file",
        id: "123",
        mime_type: "image/jpeg",
      },
      {
        type: "file",
        id: "456",
        mime_type: "image/gif",
      },
    ];

    const expected: Partial<File>[] = [
      {
        type: "file",
        id: "123",
        mime_type: "image/jpeg",
      },
      {
        type: "file",
        id: "456",
        mime_type: "image/gif",
      },
    ];
    expect(processImageFiles(files as File[])).toEqual(expected);
  });

  it("getProductOtherImageUrls should return a products images files not including the main image", () => {
    const files: Partial<File>[] = [
      {
        type: "file",
        id: "123",
        mime_type: "image/jpeg",
      },
      {
        type: "file",
        id: "456",
        mime_type: "image/jpeg",
      },
    ];

    const mainImageFile: Partial<File> = {
      type: "file",
      id: "123",
      mime_type: "image/jpeg",
    };

    const productResp: Partial<Resource<ProductResponse>> = {
      included: {
        files: files as File[],
        main_images: [mainImageFile] as File[],
      },
    };

    const expected: Partial<File>[] = [
      {
        type: "file",
        id: "456",
        mime_type: "image/jpeg",
      },
    ];
    expect(
      getProductOtherImageUrls(productResp as Resource<ProductResponse>)
    ).toEqual(expected);
  });

  it("getProductMainImage should return a products main image file", () => {
    const mainImageFile: Partial<File> = {
      type: "file",
      id: "123",
      mime_type: "image/jpeg",
    };

    const productResp: Partial<Resource<ProductResponse>> = {
      included: {
        main_images: [mainImageFile] as File[],
      },
    };

    expect(
      getProductMainImage(productResp as Resource<ProductResponse>)
    ).toEqual(mainImageFile);
  });

  it("getProductMainImage should return null when product does not have main image included", () => {
    const productResp: Partial<Resource<ProductResponse>> = {
      included: {},
    };

    expect(
      getProductMainImage(productResp as Resource<ProductResponse>)
    ).toEqual(null);
  });
});
