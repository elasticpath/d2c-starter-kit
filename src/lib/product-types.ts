import type {
  ProductResponse,
  CatalogsProductVariation,
  File,
} from "@moltin/sdk";
import type { Dispatch, SetStateAction } from "react";
import type { MatrixObjectEntry } from "../services/helper";

export type IdentifiableBaseProduct = ProductResponse & {
  id: string;
  attributes: { slug: string; sku: string; base_product: true };
};

export type IdentifiableChildProduct = ProductResponse & {
  id: string;
  attributes: { base_product: false; base_product_id: string };
};

export interface IBaseSku {
  product: ProductResponse;
  main_image: File | null;
  otherImages: File[];
}

export interface IBaseProductSku extends IBaseSku {
  kind: "base-product";
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
}

export interface IChildSku extends IBaseSku {
  kind: "child-product";
  baseProduct: ProductResponse;
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
}

export interface ISimpleSku extends IBaseSku {
  kind: "simple-product";
}

export type ISku = IBaseProductSku | IChildSku | ISimpleSku;

export interface ProductContext {
  isChangingSku: boolean;
  setIsChangingSku: Dispatch<SetStateAction<boolean>>;
}

export interface OptionDict {
  [key: string]: string;
}
