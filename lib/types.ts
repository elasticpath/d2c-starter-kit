import type { ProductResponse } from "@moltin/sdk";

export type IdentifiableBaseProduct = ProductResponse & {
  id: string;
  attributes: { slug: string; sku: string; base_product: true };
};

export type IdentifiableChildProduct = ProductResponse & {
  id: string;
  attributes: { base_product: false; base_product_id: string };
};
