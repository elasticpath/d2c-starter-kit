import type { File, ProductResponse, Resource } from "@moltin/sdk";
import {
  getProductMainImage,
  getProductOtherImageUrls,
  mergeMeta,
  processImageFiles,
} from "../lib/product-util";

describe("product util", () => {
  describe("unit tests", () => {
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

    it("mergeMeta should merge the meta data of two ProductResources keeping all of a and adding extra values of b", () => {
      const productA: Partial<ProductResponse> = {
        meta: {
          catalog_id: "e4c2d061-3712-408d-bc2c-cfebd0bd104f",
          catalog_source: "pim",
          pricebook_id: "8be0a3d5-b656-4f45-970d-7714d55a3d6c",
          display_price: {
            without_tax: {
              amount: 1600,
              currency: "USD",
              formatted: "$16.00",
            },
          },
        },
      };

      const productB: Partial<ProductResponse> = {
        meta: {
          catalog_id: "e4c2d061-3712-408d-bc2c-cfebd0bd104f",
          catalog_source: "pim",
          pricebook_id: "8be0a3d5-b656-4f45-970d-7714d55a3d6c",
          display_price: {
            without_tax: {
              amount: 1500,
              currency: "USD",
              formatted: "$15.00",
            },
          },
          variation_matrix: {
            "4252d475-2d0e-4cd2-99d3-19fba34ef211": {
              "217883ce-55f1-4c34-8e00-e86c743f4dff": {
                "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
                  "709e6cc6-a40c-4833-9469-b4abd0e7f67f",
                "8b6dfc96-11e6-455d-b042-e4137df3f13a":
                  "c05839f5-3eac-48f2-9d36-1bc2a481a213",
              },
            },
          },
          variations: [],
        },
      };
      expect(
        mergeMeta(productA as ProductResponse, productB as ProductResponse)
      ).toEqual({
        meta: {
          catalog_id: "e4c2d061-3712-408d-bc2c-cfebd0bd104f",
          catalog_source: "pim",
          pricebook_id: "8be0a3d5-b656-4f45-970d-7714d55a3d6c",
          display_price: {
            without_tax: {
              amount: 1600,
              currency: "USD",
              formatted: "$16.00",
            },
          },
          variation_matrix: {
            "4252d475-2d0e-4cd2-99d3-19fba34ef211": {
              "217883ce-55f1-4c34-8e00-e86c743f4dff": {
                "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
                  "709e6cc6-a40c-4833-9469-b4abd0e7f67f",
                "8b6dfc96-11e6-455d-b042-e4137df3f13a":
                  "c05839f5-3eac-48f2-9d36-1bc2a481a213",
              },
            },
          },
          variations: [],
        },
      });
    });
  });
});
