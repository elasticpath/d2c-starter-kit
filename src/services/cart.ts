import type { CartItemsResponse } from "@moltin/sdk";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getCartItems(
  reference: string
): Promise<CartItemsResponse> {
  return EPCCAPI.Cart(reference).Items();
}

export async function removeCartItem(
  reference: string,
  itemId: string
): Promise<void> {
  await EPCCAPI.Cart(reference).RemoveItem(itemId);
}

export async function removeAllCartItems(reference: string): Promise<void> {
  await EPCCAPI.Cart(reference).RemoveAllItems();
}

export async function updateCartItem(
  reference: string,
  productId: string,
  quantity: number
): Promise<void> {
  await EPCCAPI.Cart(reference).UpdateItem(productId, quantity);
}

export async function addPromotion(
  reference: string,
  promoCode: string
): Promise<void> {
  await EPCCAPI.Cart(reference).AddPromotion(promoCode);
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

export async function getCart(
  cartId: string
): Promise<ResourceIncluded<Cart, CartIncluded>> {
  return EPCCAPI.Cart(cartId).With("items").Get();
}
