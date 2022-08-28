import { Cart, CartItem } from "@moltin/sdk";

/**
 * Cart State
 */

interface CartStateBase {}

export type CartItemsType = "cart_item" | "promotion_item" | "custom_item";

export type PromotionCartItem = CartItem & { type: "promotion_item" };
export type CustomCartItem = CartItem & { type: "custom_item" };
export type RegularCartItem = CartItem & { type: "cart_item" };

export interface LoadingCartState extends CartStateBase {
  kind: "loading-cart-state";
}

export interface GroupedCartItems {
  regular: RegularCartItem[];
  promotion: PromotionCartItem[];
  custom: CustomCartItem[];
}

export interface EmptyCartState extends CartStateBase {
  kind: "empty-cart-state";
  id: string;
}

export interface UninitialisedCartState extends CartStateBase {
  kind: "uninitialised-cart-state";
}

export interface PresentCartState extends CartStateBase {
  kind: "present-cart-state";
  id: string;
  items: GroupedCartItems;
  count: number;
  cartQuantity: number;
  totalPrice: string;
  subtotal: string;
}

type UpdatingAction = "add" | "remove" | "update" | "empty";

export interface UpdatingCartState extends CartStateBase {
  kind: "updating-cart-state";
  previousCart: PresentCartState | EmptyCartState;
  updateAction: UpdatingAction;
}

export type CartState =
  | PresentCartState
  | LoadingCartState
  | UpdatingCartState
  | EmptyCartState
  | UninitialisedCartState;

/**
 * Cart Actions
 */

export interface UpdateCartAction {
  type: "update-cart";
  payload: {
    id: string;
    meta: Cart["meta"];
    items?: CartItem[];
  };
}

export interface UpdatingCartAction {
  type: "updating-cart";
  payload: {
    action: UpdatingAction;
  };
}

export interface InitialiseCartAction {
  type: "initialise-cart";
}

export type CartAction =
  | UpdateCartAction
  | UpdatingCartAction
  | InitialiseCartAction;
