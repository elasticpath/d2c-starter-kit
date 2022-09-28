import { createContext, ReactNode, useEffect, useReducer } from "react";
import {
  ProductAction,
  ProductPresentState,
  ProductState,
} from "./types/product-reducer-types";
import { productReducer } from "./product-reducer";
import { resolveProduct } from "../lib/resolve-product";

export const ProductContext = createContext<
  { state: ProductState; dispatch: (action: ProductAction) => void } | undefined
>(undefined);

interface ProductProviderProps {
  product: ProductPresentState | string;
  children: ReactNode;
}

export function ProductProvider({ product, children }: ProductProviderProps) {
  const [state, dispatch] = useReducer(
    productReducer,
    typeof product === "string"
      ? { kind: "uninitialised-product-state" }
      : product
  );

  useEffect(() => {
    if (typeof product === "string") {
      _initialiseProduct(product, dispatch);
    }
  }, [state, dispatch]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

async function _initialiseProduct(
  productId: string,
  dispatch: (action: ProductAction) => void
) {
  dispatch({
    type: "initialise-product",
  });

  const result = await resolveProduct(productId);

  dispatch({
    type: "change-product",
    payload: {
      id: result.product.id,
      data: result,
    },
  });
}
