import { CartProvider } from "./cart-provider";
import { StoreProviderProps } from "./types/store-context";
import { PGRProvider } from "./payment-gateway-provider";

const StoreProvider = ({ children, storeContext }: StoreProviderProps) => {
  return (
    <PGRProvider>
      <CartProvider
        cart={
          storeContext?.type === "store-context-ssr"
            ? storeContext.cart
            : undefined
        }
      >
        {children}
      </CartProvider>
    </PGRProvider>
  );
};

export default StoreProvider;
