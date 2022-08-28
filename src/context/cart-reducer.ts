import { Cart } from "@moltin/sdk";
import {
  CartAction,
  CartState,
  PresentCartState,
} from "./types/cart-reducer-types";
import { groupCartItems } from "../lib/group-cart-items";

export function calculateCartNumbers(
  meta: Cart["meta"]
): Pick<
  PresentCartState,
  "count" | "cartQuantity" | "totalPrice" | "subtotal"
> {
  return {
    totalPrice: meta?.display_price?.with_tax?.formatted || "Unknown",
    // TODO implement these properly
    count: 2,
    cartQuantity: 2,
    subtotal: meta?.display_price?.without_tax?.formatted || "Unknown",
  };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "initialise-cart": {
      if (state.kind !== "uninitialised-cart-state") {
        return state;
      }
      return {
        kind: "loading-cart-state",
      };
    }
    case "updating-cart": {
      if (
        state.kind === "present-cart-state" ||
        state.kind === "empty-cart-state"
      ) {
        return {
          kind: "updating-cart-state",
          previousCart: state,
          updateAction: action.payload.action,
        };
      }
      return state;
    }
    case "update-cart":
      if (
        state.kind !== "updating-cart-state" &&
        state.kind !== "loading-cart-state"
      ) {
        return state;
      }
      const { id, meta, items } = action.payload;

      if (!items || items.length < 1) {
        return {
          kind: "empty-cart-state",
          id,
        };
      }

      const groupedItems = groupCartItems(items);
      return {
        kind: "present-cart-state",
        items: groupedItems,
        id,
        ...calculateCartNumbers(meta),
      };
    default:
      return state;
  }
}
