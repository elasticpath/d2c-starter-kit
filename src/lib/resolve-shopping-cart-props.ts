import {
  CartState,
  PresentCartState,
} from "../context/types/cart-reducer-types";
import { ICart } from "../components/cart-items/Cart";

export function resolveShoppingCartProps(
  state: CartState,
  removeCartItem: (itemId: string) => Promise<void>
): ICart | undefined {
  const resolvePresentCartState: PresentCartState | undefined =
    state.kind === "present-cart-state"
      ? state
      : state.kind === "updating-cart-state" &&
        state.previousCart.kind === "present-cart-state"
      ? state.previousCart
      : undefined;

  if (
    resolvePresentCartState &&
    [
      ...resolvePresentCartState.items.regular,
      ...resolvePresentCartState.items.custom,
    ].length > 0
  ) {
    const { id, totalPrice, subtotal, items } = resolvePresentCartState;
    return {
      id,
      totalPrice,
      subtotal,
      items,
      removeCartItem: removeCartItem,
    };
  }
  return undefined;
}
