import * as moltin from "@moltin/sdk";
import { config } from "./config";
import { moltinParam } from "./services";
const MoltinGateway = moltin.gateway;

export async function getCartItems(
  reference: string
): Promise<moltin.CartItemsResponse> {
  const moltin = MoltinGateway(moltinParam);
  const CartItems = await moltin.Cart(reference).Items();

  return CartItems;
}

export async function removeCartItem(
  reference: string,
  itemId: string
): Promise<void> {
  const moltin = MoltinGateway(moltinParam);
  await moltin.Cart(reference).RemoveItem(itemId);
}

export async function removeAllCartItems(reference: string): Promise<void> {
  const moltin = MoltinGateway(moltinParam);
  await moltin.Cart(reference).RemoveAllItems();
}

export async function updateCartItem(
  reference: string,
  productId: string,
  quantity: number
): Promise<void> {
  const moltin = MoltinGateway(moltinParam);
  await moltin.Cart(reference).UpdateItem(productId, quantity);
}

export async function addPromotion(
  reference: string,
  promoCode: string
): Promise<void> {
  const moltin = MoltinGateway(moltinParam);
  await moltin.Cart(reference).AddPromotion(promoCode);
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

export async function getMultiCarts(token: string) {
  const moltin = MoltinGateway(moltinParam);
  const cartsList = await moltin.Cart().GetCartsList(token);
  return cartsList;
}

export async function addToCart(
  productId: string,
  quantity: number
): Promise<any> {
  const cartId: string = getCartId();
  const moltin = MoltinGateway(moltinParam);
  const response = await moltin.Cart(cartId).AddProduct(productId, quantity);

  return response;
}
