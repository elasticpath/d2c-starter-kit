import { useContext } from "react";
import {
  addProductToCart,
  addPromotion,
  removeAllCartItems,
  removeCartItem,
  updateCartItem,
} from "../services/cart";
import { checkout } from "../services/checkout";
import { CartItemsContext } from "./cart";
import { CartAction, CartState } from "./types/cart-reducer-types";
import { payment } from "../services/checkout";
import { Address } from "@moltin/sdk";
import { getCartCookie } from "../lib/cart-cookie";

export function useCart() {
  const context = useContext(CartItemsContext);

  if (context === undefined) {
    throw new Error("useCartItems must be used within a CartProvider");
  }

  const { state, dispatch } = context;

  return {
    addProductToCart: _addProductToCart(dispatch),
    removeCartItem: _removeCartItem(dispatch),
    emptyCart: _emptyCart(dispatch, state),
    addPromotionToCart: _addPromotionToCart(dispatch),
    updateCartItem: _updateCartItem(dispatch),
    checkout: _checkout(dispatch),
    // TODO addCustomItemToCart
    state,
  };
}

function _checkout(dispatch: (action: CartAction) => void) {
  return async (
    email: string,
    shippingAddress: Partial<Address>,
    billingAddress?: Partial<Address>
  ): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    const customer = `${shippingAddress.first_name} ${shippingAddress.last_name}`;
    const orderResponse = await checkout(
      cartId,
      {
        email,
        name: customer,
      },
      billingAddress ?? shippingAddress,
      shippingAddress
    );

    const paymentParams = {
      gateway: "stripe_connect",
      method: "purchase",
      payment: "pm_card_visa",
    };

    await payment(paymentParams, orderResponse.data.id);

    const response = await removeAllCartItems(cartId);

    dispatch({
      type: "update-cart",
      payload: { id: cartId, meta: response.meta, items: response.data },
    });
  };
}

function _updateCartItem(dispatch: (action: CartAction) => void) {
  return async (itemId: string, quantity: number): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    const response = await updateCartItem(cartId, itemId, quantity);

    dispatch({
      type: "update-cart",
      payload: { id: cartId, meta: response.meta, items: response.data },
    });
  };
}

function _addProductToCart(dispatch: (action: CartAction) => void) {
  return async (productId: string, quantity: number): Promise<void> => {
    const cartId = getCartCookie();
    console.log("add to cart cookie: ", cartId);

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    const response = await addProductToCart(cartId, productId, quantity);

    dispatch({
      type: "update-cart",
      payload: { id: cartId, meta: response.meta, items: response.data },
    });
  };
}

function _addPromotionToCart(dispatch: (action: CartAction) => void) {
  return async (promoCode: string): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    const response = await addPromotion(cartId, promoCode);

    // TODO handle when the promo code is invalid

    dispatch({
      type: "update-cart",
      payload: { id: cartId, meta: response.meta, items: response.data },
    });
  };
}

function _removeCartItem(dispatch: (action: CartAction) => void) {
  return async (itemId: string): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "remove" },
    });

    const response = await removeCartItem(cartId, itemId);

    dispatch({
      type: "update-cart",
      payload: { id: cartId, meta: response.meta, items: response.data },
    });
  };
}

function _emptyCart(dispatch: (action: CartAction) => void, state: CartState) {
  return async (): Promise<void> => {
    const cartId = getCartCookie();

    if (state.kind === "present-cart-state") {
      dispatch({
        type: "updating-cart",
        payload: { action: "empty" },
      });

      const response = await removeAllCartItems(cartId);

      dispatch({
        type: "update-cart",
        payload: { id: cartId, meta: response.meta, items: response.data },
      });
    }
  };
}
