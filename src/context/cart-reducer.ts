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
  console.log("inside cart reducer");
  switch (action.type) {
    case "updating-cart": {
      if (
        state.kind === "present-cart-state" ||
        state.kind === "empty-cart-state"
      ) {
        return {
          showCartPopup: state.showCartPopup,
          kind: "updating-cart-state",
          previousCart: state,
          updateAction: action.payload.action,
        };
      }
      return state;
    }
    case "show-cart-popup":
      return {
        ...state,
        showCartPopup: true,
      };
    case "update-cart":
      console.log("update cart inside  cart reducer: ", action);

      if (
        state.kind !== "updating-cart-state" &&
        state.kind !== "uninitialised-cart-state"
      ) {
        return state;
      }
      const { id, meta, items } = action.payload;
      console.log("updating card");

      if (!items || items.length < 1) {
        return {
          kind: "empty-cart-state",
          id,
          showCartPopup: state.showCartPopup,
        };
      }

      const groupedItems = groupCartItems(items);
      return {
        kind: "present-cart-state",
        items: groupedItems,
        id,
        ...calculateCartNumbers(meta),
        showCartPopup: state.showCartPopup,
      };
    case "update-cart-quantity":
      if (state.kind !== "present-cart-state") {
        return state;
      }
      return {
        ...state,
        cartQuantity: action.payload.quantity,
      };
    default:
      return state;
  }
}
