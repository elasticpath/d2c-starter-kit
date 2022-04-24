import { gateway as EPCCGateway, ProductResponse } from "@moltin/sdk";
import { config } from "./config";

export const EPCCParam = {
  host: config.endpointURL,
  client_id: config.clientId,
  client_secret: config.clientSecret,
};

export const EPCCAPI = EPCCGateway(EPCCParam);

export async function register(
  name: string,
  email: string,
  password: string
): Promise<moltin.CustomerBase> {
  const { data } = await EPCCAPI.Customers.Create({
    type: "customer",
    name,
    email,
    password,
  });

  return data;
}

/**
 * Performing a lookup to get the id of the product whos options all match the currently selected options.
 * @param lookupObj
 * @param targetOptions
 */
export function getSkuFromOptions(
  lookupObj: VariationSkuLookup,
  targetOptions: { [key: string]: string }
): string | undefined {
  return Object.keys(lookupObj).find(
    (key) => JSON.stringify(lookupObj[key]) === JSON.stringify(targetOptions)
  );
}

interface VariationSkuDict {
  [key: string]: string[];
}

/**
 * Takes a vartition matrix and restructures it to have all the sku id values be the top level
 * keys pointing to an array of the corresponding options ids
 *
 * @example
 *  const matrixEntry = {
 *  "4252d475-2d0e-4cd2-99d3-19fba34ef211": {
 *       "217883ce-55f1-4c34-8e00-e86c743f4dff": {
 *         "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
 *           "709e6cc6-a40c-4833-9469-b4abd0e7f67f"
 *       }
 *    }
 *  }
 *
 * const lookupOutput = _restructureVariationsMatrix(matrixEntry);
 * // lookupOutput equals
 * {
 *  "709e6cc6-a40c-4833-9469-b4abd0e7f67f": [
 *       "4252d475-2d0e-4cd2-99d3-19fba34ef211",
 *       "217883ce-55f1-4c34-8e00-e86c743f4dff",
 *       "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
 *   ]
 * }
 * @param matrixEntry
 */
export const _restructureVariationsMatrix = (
  matrixEntry: MatrixObjectEntry,
  [parentKeys, lookupObj]: [string[], VariationSkuDict] = [[], {}]
): VariationSkuDict => {
  return Object.keys(matrixEntry).reduce((acc, matrixEntryChildKey) => {
    const matrixChildEntry = matrixEntry[matrixEntryChildKey];
    if (typeof matrixChildEntry === "string") {
      return {
        ...acc,
        [matrixChildEntry]: [...parentKeys, matrixEntryChildKey],
      };
    }
    return {
      ...acc,
      ..._restructureVariationsMatrix(matrixChildEntry, [
        [...parentKeys, matrixEntryChildKey],
        lookupObj,
      ]),
    };
  }, lookupObj);
};

interface OptionVariationDict {
  [key: string]: string;
}

interface VariationEntry {
  id: string;
  name: string;
  options: {
    id: string;
    description: string;
    name: string;
  }[];
}

/**
 * Takes Product Variations and creates a dictionary that can be used to
 * lookup with an option id to find the variations it belongs to.
 *
 * @example
 * const variations = [
 *     {
 *       id: "b250875e-7468-4364-8257-fb8cfcc486c2",
 *       name: "Simple T-Shirt Sleeve Length",
 *       options: [
 *         {
 *           id: "8b6dfc96-11e6-455d-b042-e4137df3f13a",
 *           description: "Simple T-Shirt with short sleeves",
 *           name: "Short",
 *         },
 *       ]
 *     }
 *   ];
 *
 * const output = _flattenVariationsOptions(variations)
 * // output equals - option id "8b6dfc96-11e6-455d-b042-e4137df3f13a"
 * // maps to the id of the variation it belongs to e.g. "b250875e-7468-4364-8257-fb8cfcc486c2"
 *
 * {
 *  "8b6dfc96-11e6-455d-b042-e4137df3f13a": "b250875e-7468-4364-8257-fb8cfcc486c2",
 * }
 *
 * @param entries
 */
export const _flattenVariationsOptions = (
  entries: VariationEntry[]
): OptionVariationDict => {
  return entries.reduce((x, entry) => {
    return entry.options.reduce((y, option) => {
      return {
        ...y,
        [option.id]: entry.id,
      };
    }, x);
  }, {});
};

interface Dict {
  [key: string]: string;
}

export interface VariationSkuLookup {
  [key: string]: { [key: string]: string };
}

/**
 * For each sku id key at the top level of the VariationSkuDict _performMapping will create an
 * object that maps each element of the options array to the variation it belongs to.
 * This is to make front end lookups fast.
 *
 * @example
 * const restructuredVariationMatrixSample = {
 *     "2d864c10-146f-4905-859f-86e63c18abf4": [
 *       "217883ce-55f1-4c34-8e00-e86c743f4dff",
 *       "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
 *     ]
 * }
 *
 * const flatVariationOptionsSample = {
 *      "217883ce-55f1-4c34-8e00-e86c743f4dff": "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
 *      "45e2612f-6bbf-4bc9-8803-80c5cf78ed89": "b250875e-7468-4364-8257-fb8cfcc486c2",
 * }
 *
 * const output = _performMapping(restructuredVariationMatrixSample, flatVariationOptionsSample);
 *
 * // output
 *
 * {
 *     "2d864c10-146f-4905-859f-86e63c18abf4": [
 *       "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89": "217883ce-55f1-4c34-8e00-e86c743f4dff",
 *       "b250875e-7468-4364-8257-fb8cfcc486c2": "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
 *     ]
 * }
 *
 * @param lookupObj
 * @param mappingDict
 */
export const _performMapping = (
  lookupObj: VariationSkuDict,
  mappingDict: OptionVariationDict
): VariationSkuLookup => {
  return Object.keys(lookupObj).reduce((x, skuKey) => {
    return {
      ...x,
      [skuKey]: lookupObj[skuKey].reduce((y: Dict, optionKey) => {
        return {
          ...y,
          [mappingDict[optionKey]]: optionKey,
        };
      }, {}),
    };
  }, {});
};

/**
 * Create a sku look up object VariationSkuLookup from variations and variation matrix.
 *
 * @param matrix
 * @param variations
 */
export const getSkuVariationLookup = (
  matrix: MatrixObjectEntry,
  variations: VariationEntry[]
): VariationSkuLookup => {
  return _performMapping(
    _restructureVariationsMatrix(matrix),
    _flattenVariationsOptions(variations)
  );
};

type MatrixValue = string;

interface MatrixObjectEntry {
  [key: string]: MatrixObjectEntry | MatrixValue;
}

export const isChildProductResource = (product: ProductResponse) =>
  !product.attributes.base_product && !!product.attributes.base_product_id;

export const isSimpleProductResource = (product: ProductResponse) =>
  !product.attributes.base_product && !product.attributes.base_product_id;
