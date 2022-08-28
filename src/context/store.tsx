import React from "react";
import { CartProvider } from "./cart-provider";
import { CheckoutProvider } from "./checkout";
import { StoreProviderProps } from "./types/store-context";

const StoreProvider = ({ children, storeContext }: StoreProviderProps) => {
  return (
    <CartProvider
      cart={
        storeContext?.type === "store-context-ssr"
          ? storeContext.cart
          : undefined
      }
    >
      <CheckoutProvider>{children}</CheckoutProvider>
    </CartProvider>
  );
};

export default StoreProvider;
