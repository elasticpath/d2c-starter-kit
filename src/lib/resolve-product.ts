import { IProduct } from "./product-types";
import { getProductById } from "../services/products";
import {
  isChildProductResource,
  isSimpleProductResource,
} from "../services/helper";
import {
  retrieveBaseProps,
  retrieveChildProps,
  retrieveSimpleProps,
} from "./retrieve-product-props";

export async function resolveProduct(productId: string): Promise<IProduct> {
  const result = await getProductById(productId);
  return isSimpleProductResource(result.data)
    ? retrieveSimpleProps(result)
    : isChildProductResource(result.data)
    ? await retrieveChildProps(result)
    : await retrieveBaseProps(result);
}
