import { useContext } from "react";
import { ProductContext } from "./product-provider";
import {
  ProductAction,
  ProductPresentState,
  ProductState,
} from "./types/product-reducer-types";
import { resolveProduct } from "../lib/resolve-product";

export function useProduct() {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  const { state, dispatch } = context;

  return {
    changeProduct: _changeProduct(dispatch),
    routeToProduct: _routeToProduct(dispatch),
    isProductPresent,
    state,
  };
}

function isProductPresent(state: ProductState): state is ProductPresentState {
  return (
    state.kind === "base-product-present-state" ||
    state.kind === "simple-product-present-state" ||
    state.kind === "child-product-present-state"
  );
}

function _changeProduct(dispatch: (action: ProductAction) => void) {
  return async (productId: string): Promise<void> => {
    dispatch({
      type: "changing-product",
    });

    const result = await resolveProduct(productId);
    dispatch({
      type: "change-product",
      payload: { id: result.product.id, data: result },
    });
  };
}

function _routeToProduct(dispatch: (action: ProductAction) => void) {
  return async (
    productId: string,
    routeToProduct: (id: string) => Promise<void>
  ): Promise<void> => {
    dispatch({
      type: "changing-product",
    });

    await routeToProduct(productId);
  };
}
