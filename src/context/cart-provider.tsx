import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { CartAction, CartState } from "./types/cart-reducer-types";
import { cartReducer } from "./cart-reducer";
import { getCart } from "../services/cart";
import { getCartCookie } from "../lib/cart-cookie";
import { getInitialState } from "../lib/get-initial-cart-state";

export const CartItemsContext = createContext<
  { state: CartState; dispatch: (action: CartAction) => void } | undefined
>(undefined);

interface CartProviderProps {
  cart?: ResourceIncluded<Cart, CartIncluded>;
  children: ReactNode;
}

export function CartProvider({ cart, children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState(cart));

  useEffect(() => {
    if (state.kind === "uninitialised-cart-state") {
      _initialiseCart(dispatch);
    }
  }, [state, dispatch]);

  return (
    <CartItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </CartItemsContext.Provider>
  );
}

async function _initialiseCart(dispatch: (action: CartAction) => void) {
  const cartId = getCartCookie();

  dispatch({
    type: "initialise-cart",
  });

  const resp = await getCart(cartId);

  dispatch({
    type: "update-cart",
    payload: {
      id: resp.data.id,
      meta: resp.data.meta,
      items: resp.included?.items ?? [],
    },
  });
}
