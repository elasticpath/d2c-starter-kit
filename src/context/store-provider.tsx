import { CartProvider } from "./cart-provider";
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
      {children}
    </CartProvider>
  );
};

export default StoreProvider;
