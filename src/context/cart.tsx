import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { CartAction, CartState } from "./types/cart-reducer-types";
import { groupCartItems } from "../lib/group-cart-items";
import { calculateCartNumbers, cartReducer } from "./cart-reducer";
import { getCookie } from "cookies-next";
import { getCart } from "../services/cart";

export const CartItemsContext = createContext<
  { state: CartState; dispatch: (action: CartAction) => void } | undefined
>(undefined);

interface CartProviderProps {
  cart?: ResourceIncluded<Cart, CartIncluded>;
  children: ReactNode;
}

export function CartProvider({ cart, children }: CartProviderProps) {
  console.log("cart inside reducer: ", cart);
  const [state, dispatch] = useReducer(cartReducer, getInitialState(cart));
  console.log("initial cart state value after reducer: ", state);

  useEffect(() => {
    if (state.kind === "uninitialised-cart-state") {
      console.log("inside use effect initialise cart");
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
  const cartId = getCookie("mcart");
  console.log("initialiseCart cart cookie: ", cartId);

  dispatch({
    type: "initialise-cart",
  });

  if (typeof cartId !== "string") {
    throw Error("Failed to fetch cookie so couldn't initialiseCart cart");
  }

  const resp = await getCart(cartId);
  console.log("get updated cart, ", resp);
  dispatch({
    type: "update-cart",
    payload: {
      id: resp.data.id,
      meta: resp.data.meta,
      items: resp.included?.items ?? [],
    },
  });
}

function getInitialState(
  cart?: ResourceIncluded<Cart, CartIncluded>
): CartState {
  if (!cart) {
    return {
      kind: "uninitialised-cart-state",
      showCartPopup: false,
    };
  }

  if (!cart.included?.items) {
    return {
      kind: "empty-cart-state",
      id: cart.data.id,
      showCartPopup: false,
    };
  }

  const groupedItems = groupCartItems(cart.included.items);
  return {
    kind: "present-cart-state",
    items: groupedItems,
    id: cart.data.id,
    ...calculateCartNumbers(cart.data.meta),
    showCartPopup: false,
  };
}
