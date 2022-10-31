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
  CartItemsResponse,
} from "@moltin/sdk";
import { getCartCookie } from "../lib/cart-cookie";
import { StoreCartAction, StoreEvent } from "./types/event-types";
import { StoreError } from "./types/error-types";

export function useCart() {
  const context = useContext(CartItemsContext);

  if (context === undefined) {
    throw new Error("useCartItems must be used within a CartProvider");
  }

  const { state, dispatch, emit } = context;

  return {
    addProductToCart: _addProductToCart(dispatch, emit),
    removeCartItem: _removeCartItem(dispatch, emit),
    emptyCart: _emptyCart(dispatch, state, emit),
    addPromotionToCart: _addPromotionToCart(dispatch, emit),
    updateCartItem: _updateCartItem(dispatch, emit),
    checkout: _checkout(dispatch),
    addCustomItemToCart: _addCustomItemToCart(dispatch, emit),
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

function _updateCartItem(
  dispatch: (action: CartAction) => void,
  eventEmitter?: (event: StoreEvent) => void
) {
  return async (itemId: string, quantity: number): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "update" },
    });

    try {
      const response = await updateCartItem(cartId, itemId, quantity);

      dispatch({
        type: "update-cart",
        payload: { id: cartId, meta: response.meta, items: response.data },
      });
      attemptEmitSuccess("update-cart", "Updated cart item", eventEmitter);
    } catch (err) {
      dispatch({
        type: "failed-cart-update",
      });
      attemptEmitError(
        err,
        "update-cart",
        "Failed to update product in cart",
        eventEmitter
      );
      throw err;
    }
  };
}

function _addProductToCart(
  dispatch: (action: CartAction) => void,
  eventEmitter?: (event: StoreEvent) => void
) {
  return async (productId: string, quantity: number): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    try {
      const response = await addProductToCart(cartId, productId, quantity);

      dispatch({
        type: "update-cart",
        payload: { id: cartId, meta: response.meta, items: response.data },
      });
      attemptEmitSuccess(
        "add-to-cart",
        `Added "${resolveProductName(response, productId)}" to cart`,
        eventEmitter
      );
    } catch (err) {
      dispatch({
        type: "failed-cart-update",
      });
      attemptEmitError(
        err,
        "add-to-cart",
        "Failed to add product to cart",
        eventEmitter
      );
      throw err;
    }
  };
}

function resolveProductName(
  cartItems: CartItemsResponse,
  productId: string
): string {
  const maybeProduct = cartItems.data.find((i) => i.product_id === productId);
  if (maybeProduct) {
    return maybeProduct.name;
  }
  return "Unknown";
}

function _addCustomItemToCart(
  dispatch: (action: CartAction) => void,
  eventEmitter?: (event: StoreEvent) => void
) {
  return async (customItem: CustomItemRequest): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    try {
      const response = await addCustomItemToCart(cartId, customItem);
      dispatch({
        type: "update-cart",
        payload: { id: cartId, meta: response.meta, items: response.data },
      });
      attemptEmitSuccess(
        "add-to-cart",
        `Added ${customItem.name} to cart`,
        eventEmitter
      );
    } catch (err) {
      dispatch({
        type: "failed-cart-update",
      });
      attemptEmitError(
        err,
        "add-to-cart",
        "Failed to add custom item to cart",
        eventEmitter
      );
      throw err;
    }
  };
}

function _addPromotionToCart(
  dispatch: (action: CartAction) => void,
  eventEmitter?: (event: StoreEvent) => void
) {
  return async (promoCode: string): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "add" },
    });

    try {
      const response = await addPromotion(cartId, promoCode);
      dispatch({
        type: "update-cart",
        payload: { id: cartId, meta: response.meta, items: response.data },
      });
      attemptEmitSuccess(
        "add-to-cart",
        "Added promotion to cart",
        eventEmitter
      );
    } catch (err) {
      dispatch({
        type: "failed-cart-update",
      });
      attemptEmitError(
        err,
        "add-to-cart",
        "Failed to add promotion to cart",
        eventEmitter
      );
      throw err;
    }
  };
}

function _removeCartItem(
  dispatch: (action: CartAction) => void,
  eventEmitter?: (event: StoreEvent) => void
) {
  return async (itemId: string): Promise<void> => {
    const cartId = getCartCookie();

    dispatch({
      type: "updating-cart",
      payload: { action: "remove" },
    });

    try {
      const response = await removeCartItem(cartId, itemId);

      dispatch({
        type: "update-cart",
        payload: { id: cartId, meta: response.meta, items: response.data },
      });
      attemptEmitSuccess(
        "remove-from-cart",
        `Removed item from cart`,
        eventEmitter
      );
    } catch (err) {
      dispatch({
        type: "failed-cart-update",
      });
      attemptEmitError(
        err,
        "remove-from-cart",
        "Failed to remove product from cart",
        eventEmitter
      );
      throw err;
    }
  };
}

function _emptyCart(
  dispatch: (action: CartAction) => void,
  state: CartState,
  eventEmitter?: (event: StoreEvent) => void
) {
  return async (): Promise<void> => {
    const cartId = getCartCookie();

    if (state.kind === "present-cart-state") {
      dispatch({
        type: "updating-cart",
        payload: { action: "empty" },
      });

      try {
        const response = await removeAllCartItems(cartId);

        dispatch({
          type: "update-cart",
          payload: { id: cartId, meta: response.meta, items: response.data },
        });

        attemptEmitSuccess("empty-cart", "Emptied cart", eventEmitter);
      } catch (err) {
        dispatch({
          type: "failed-cart-update",
        });
        attemptEmitError(
          err,
          "empty-cart",
          "Failed to empty cart",
          eventEmitter
        );
        throw err;
      }
    }
  };
}

function createError(err: unknown, msg: string): StoreError {
  if (err instanceof Error) {
    return {
      type: "cart-store-error",
      cause: new Error(msg, { cause: err }),
    };
  }

  return {
    type: "cart-store-error",
    cause: new Error(`${msg} - The cause of the error is unknown`),
  };
}

function attemptEmitError(
  err: unknown,
  action: StoreCartAction,
  msg: string,
  emitter?: (event: StoreEvent) => void
): void {
  if (emitter) {
    emitter({
      type: "error",
      scope: "cart",
      message: msg,
      action,
      cause: createError(err, msg),
    });
  }
}

function attemptEmitSuccess(
  action: StoreCartAction,
  msg: string,
  emitter?: (event: StoreEvent) => void
): void {
  if (emitter) {
    emitter({
      type: "success",
      scope: "cart",
      message: msg,
      action,
    });
  }
}
