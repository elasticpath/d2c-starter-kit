import type { CartItemsResponse } from "@moltin/sdk";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function removeCartItem(
  id: string,
  itemId: string
): Promise<CartItemsResponse> {
  return EPCCAPI.Cart(id).RemoveItem(itemId);
}

export async function removeAllCartItems(
  id: string
): Promise<CartItemsResponse> {
  return EPCCAPI.Cart(id).RemoveAllItems();
}

export async function updateCartItem(
  id: string,
  productId: string,
  quantity: number
): Promise<CartItemsResponse> {
  return EPCCAPI.Cart(id).UpdateItem(productId, quantity);
}

export async function addPromotion(
  id: string,
  promoCode: string
): Promise<CartItemsResponse> {
  return EPCCAPI.Cart(id).AddPromotion(promoCode);
}

const createCartIdentifier = () => {
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
};

function setCartId() {
  localStorage.setItem("mcart", createCartIdentifier());
}

export const getCartId = (): string => {
  let cartId = localStorage.getItem("mcart");

  if (!cartId) {
    setCartId();
    cartId = localStorage.getItem("mcart");
  }

  return cartId || "";
};

export async function addToCart(
  productId: string,
  quantity: number
): Promise<any> {
  const cartId: string = getCartId();

  return EPCCAPI.Cart(cartId).AddProduct(productId, quantity);
}

export async function addProductToCart(
  cartId: string,
  productId: string,
  quantity: number
): Promise<CartItemsResponse> {
  return EPCCAPI.Cart(cartId).AddProduct(productId, quantity);
}

export async function getCart(
  cartId: string
): Promise<ResourceIncluded<Cart, CartIncluded>> {
  return EPCCAPI.Cart(cartId).With("items").Get();
}
