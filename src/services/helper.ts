import {
  CatalogsProductVariation,
  CustomerBase,
  ProductResponse,
  Moltin as EPCCClient,
} from "@moltin/sdk";
import { OptionDict } from "../lib/product-types";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";

export async function register(
  name: string,
  email: string,
  password: string,
  client?: EPCCClient
): Promise<CustomerBase> {
  const { data } = await (client ?? getEpccImplicitClient()).Customers.Create({
    type: "customer",
    name,
    email,
    password,
  });

  return data;
}

export const getSkuIdFromOptions = (
  options: string[],
  matrix: MatrixObjectEntry | MatrixValue
): string | undefined => {
  if (typeof matrix === "string") {
    return matrix;
  }

  for (const currOption in options) {
    const nestedMatrix = matrix[options[currOption]];
    if (nestedMatrix) {
      return getSkuIdFromOptions(options, nestedMatrix);
    }
  }

  return undefined;
};

export const getOptionsFromSkuId = (
  skuId: string,
  entry: MatrixObjectEntry | MatrixValue,
  options: string[] = []
): string[] | undefined => {
  if (typeof entry === "string") {
    return entry === skuId ? options : undefined;
  }

  let acc: string[] | undefined;
  Object.keys(entry).every((key) => {
    const result = getOptionsFromSkuId(skuId, entry[key], [...options, key]);
    if (result) {
      acc = result;
      return false;
    }
    return true;
  });
  return acc;
};

// TODO refactor
export const mapOptionsToVariation = (
  options: string[],
  variations: CatalogsProductVariation[]
): OptionDict => {
  return variations.reduce(
    (acc: OptionDict, variation: CatalogsProductVariation) => {
      const x = variation.options.find((varOption) =>
        options.some((selectedOption) => varOption.id === selectedOption)
      )?.id;
      return { ...acc, [variation.id]: x ? x : "" };
    },
    {}
  );
};

export function allVariationsHaveSelectedOption(
  optionsDict: OptionDict,
  variations: CatalogsProductVariation[]
): boolean {
  return !variations.some((variation) => !optionsDict[variation.id]);
}

type MatrixValue = string;

export interface MatrixObjectEntry {
  [key: string]: MatrixObjectEntry | MatrixValue;
}

export const isChildProductResource = (product: ProductResponse): boolean =>
  !product.attributes.base_product && !!product.attributes.base_product_id;

export const isSimpleProductResource = (product: ProductResponse): boolean =>
  !product.attributes.base_product && !product.attributes.base_product_id;

/**
 * promise will resolve after 300ms.
 */
export const wait300 = new Promise<void>((resolve) => {
  const wait = setTimeout(() => {
    clearTimeout(wait);
    resolve();
  }, 300);
});
