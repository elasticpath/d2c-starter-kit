import {
  File,
  Resource as _Resource,
  ProductResponse as _ProductResponse,
} from "@moltin/sdk";
declare module "@moltin/sdk" {
  interface Resource extends _Resource {
    included?: {
      main_image?: File[];
    };
  }
  interface ProductResponse extends _ProductResponse {
    meta: {
      catalog_id: string;
      catalog_source: string; // should be union type need to know possible sources
      pricebook_id: string;
      display_price: {
        without_tax: {
          amount: 1099;
          currency: string; // possible union type?
          formatted: string;
        };
      };
    };
  }
}
