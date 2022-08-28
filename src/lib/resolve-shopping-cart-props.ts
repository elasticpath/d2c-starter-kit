import {
  CartState,
  PresentCartState,
} from "../context/types/cart-reducer-types";
import { ICart } from "../components/cart/Cart";
import { getPresentCartState } from "./get-present-cart-state";

export function resolveShoppingCartProps(
  state: CartState,
  removeCartItem: (itemId: string) => Promise<void>
): ICart | undefined {
  /**
   * Checking if the current cart state is a present cart or updating with a previous state of present cart
   * as in both cases we want to show cart items
   */
  const resolvePresentCartState: PresentCartState | undefined =
    getPresentCartState(state);

  if (resolvePresentCartState) {
    const { id, withTax, withoutTax, groupedItems, items } =
      resolvePresentCartState;
    return {
      id,
      totalPrice: withTax,
      subtotal: withoutTax,
      items,
      groupedItems: groupedItems,
      removeCartItem: removeCartItem,
    };
  }
  return;
}
