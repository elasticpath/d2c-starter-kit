import { useContext } from "react";
import {
  addCustomItemToCart,
  addProductToCart,
  addPromotion,
  CustomItemRequest,
  removeAllCartItems,
  removeCartItem,
  updateCartItem,
} from "../services/cart";
import { checkout } from "../services/checkout";
import { CartItemsContext } from "./cart-provider";
import { CartAction, CartState } from "./types/cart-reducer-types";
import { makePayment } from "../services/checkout";
import {
  PaymentRequestBody,
  ConfirmPaymentResponse,
  OrderBillingAddress,
  OrderShippingAddress,
} from "@moltin/sdk";
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
    addCustomItemToCart: _addCustomItemToCart(dispatch),
    isUpdatingCart: state.kind === "updating-cart-state",
    state,
  };
}

function _checkout(dispatch: (action: CartAction) => void) {
  return async (
    email: string,
    shippingAddress: Partial<OrderShippingAddress>,
    payment: PaymentRequestBody,
    sameAsShipping?: boolean,
    billingAddress?: Partial<OrderBillingAddress>
  ): Promise<ConfirmPaymentResponse> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "checkout" },
    });

    const customer = `${shippingAddress.first_name} ${shippingAddress.last_name}`;
    const orderResponse = await checkout(
      cartId,
      {
        email,
        name: customer,
      },
      billingAddress && !sameAsShipping ? billingAddress : shippingAddress,
      shippingAddress
    );

    const paymentResponse = await makePayment(payment, orderResponse.data.id);

    const response = await removeAllCartItems(cartId);

    dispatch({
      type: "update-cart",
      payload: { id: cartId, meta: response.meta, items: response.data },
    });

    return paymentResponse;
  };
}

function _updateCartItem(dispatch: (action: CartAction) => void) {
  return async (itemId: string, quantity: number): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "update" },
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

function _addCustomItemToCart(dispatch: (action: CartAction) => void) {
  return async (customItem: CustomItemRequest): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    const response = await addCustomItemToCart(cartId, customItem);

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
