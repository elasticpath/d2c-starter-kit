import { ProductAction, ProductState } from "./types/product-reducer-types";

export function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case "initialise-product": {
      if (state.kind !== "uninitialised-product-state") {
        return state;
      }
      return {
        kind: "loading-product-state",
      };
    }
    case "changing-product": {
      if (
        state.kind === "simple-product-present-state" ||
        state.kind === "base-product-present-state" ||
        state.kind === "child-product-present-state"
      ) {
        return {
          kind: "changing-product-state",
          previousProduct: state,
        };
      }
      return state;
    }
    case "change-product":
      if (
        state.kind !== "changing-product-state" &&
        state.kind !== "loading-product-state"
      ) {
        return state;
      }
      const { data } = action.payload;

      if (data.kind === "base-product") {
        return {
          ...data,
          kind: "base-product-present-state",
          main_image: data.main_image ?? undefined,
        };
      }

      if (data.kind === "child-product") {
        return {
          ...data,
          kind: "child-product-present-state",
          main_image: data.main_image ?? undefined,
        };
      }

      if (data.kind === "simple-product") {
        return {
          ...data,
          kind: "simple-product-present-state",
          main_image: data.main_image ?? undefined,
        };
      }
      return state;
    default:
      return state;
  }
}
