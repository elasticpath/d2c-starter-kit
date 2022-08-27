import { getCookie } from "cookies-next";
import { CART_COOKIE_KEY } from "./resolve-cart-env";
import type { OptionsType } from "cookies-next/lib/types";

export function getCartCookie(options?: OptionsType): string {
  const cartId = getCookie(CART_COOKIE_KEY, options);
  if (typeof cartId !== "string") {
    throw Error("Failed to fetch cart cookie!");
  }
  return cartId;
}
