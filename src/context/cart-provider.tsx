import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { CartAction, CartState } from "./types/cart-reducer-types";
import { cartReducer } from "./cart-reducer";
import { getCart } from "../services/cart";
import { getCartCookie } from "../lib/cart-cookie";
import { getInitialState } from "../lib/get-initial-cart-state";
import { StoreEvent } from "./types/event-types";
import { useEventInternal } from "./use-event-internal";

export const CartItemsContext = createContext<
  | {
      state: CartState;
      dispatch: (action: CartAction) => void;
      emit?: (event: StoreEvent) => void;
    }
  | undefined
>(undefined);

interface CartProviderProps {
  cart?: ResourceIncluded<Cart, CartIncluded>;
  emit?: (event: StoreEvent) => void;
  children: ReactNode;
}

export function CartProvider({ cart, children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState(cart));

  const { emit } = useEventInternal();

  useEffect(() => {
    if (state.kind === "uninitialised-cart-state") {
      _initialiseCart(dispatch, emit);
    }
  }, [state, dispatch, emit]);

  return (
    <CartItemsContext.Provider value={{ state, dispatch, emit }}>
      {children}
    </CartItemsContext.Provider>
  );
}

async function _initialiseCart(
  dispatch: (action: CartAction) => void,
  emit: (event: StoreEvent) => void
) {
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

  if (emit) {
    emit({
      type: "success",
      scope: "cart",
      action: "init",
      message: "Initialised cart",
    });
  }
}
