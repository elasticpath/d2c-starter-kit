import {
  File,
  Resource as _Resource,
  ProductResponse as _ProductResponse,
} from "@moltin/sdk";
declare module "@moltin/sdk" {
  interface Resource extends _Resource {
    included?: {
      main_images?: File[];
      files?: File[];
    };
  }
  interface ProductResponse extends Omit<_ProductResponse, "attributes"> {
    attributes: {
      availability: string;
      test: number;
      base_product: boolean;
      base_product_id: string | undefined;
      commodity_type: string;
      components: string[] | ProductComponents;
      created_at: string;
      description: string;
      dimensions: string;
      manage_stock: boolean;
      name: string;
      price: {
        [key: string]: {
          amount: number;
          includes_tax: boolean;
        };
      };
      product_hash: string;
      sku: string;
      slug: string;
      status: string;
      store_id: string;
      translations: string[];
      updated_at: string;
      weight: string;
      tester: string;
    };
    meta: {
      catalog_id: string;
      catalog_source: string; // should be union type need to know possible sources
      pricebook_id: string;
      display_price?: {
        without_tax: {
          amount: number;
          currency: string; // possible union type?
          formatted: string;
        };
      };
      variation_matrix?: any;
      variations?: Variation[];
    };
  }
  interface Variation {
    id: string;
    name: string;
    options: {
      id: string;
      description: string;
      name: string;
    }[];
  }
}

// Taken from https://stackoverflow.com/questions/55539387/deep-omit-with-typescript

/** Union of primitives to skip with deep omit utilities. */
type Primitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null;

/** Deeply omit members of an interface or type. */
export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP //extra level of indirection needed to trigger homomorhic behavior // distribute over unions
        ? TP extends Primitive
          ? TP // leave primitives and functions alone
          : TP extends any[]
          ? DeepOmitArray<TP, K> // Array special handling
          : DeepOmit<TP, K>
        : never;
    };
