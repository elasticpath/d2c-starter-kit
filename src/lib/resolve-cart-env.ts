export const CART_COOKIE_KEY = cartEnv();

function cartEnv(): string {
  const cartCookieKey = process.env.NEXT_PUBLIC_CART_COOKIE_KEY;
  if (!cartCookieKey) {
    throw new Error(
      `Failed to get cart cookie key environment variables cartCookieKey id: ${cartCookieKey}\n Make sure you have set NEXT_PUBLIC_CART_COOKIE_KEY`
    );
  }
  return cartCookieKey;
}
