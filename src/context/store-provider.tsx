import { CartProvider } from "./cart-provider";
import { StoreProviderProps } from "./types/store-context";
import { PGRProvider } from "./payment-gateway-provider";
import { EventProvider } from "./event-provider";

const StoreProvider = ({ children, storeContext }: StoreProviderProps) => {
  return (
    <EventProvider>
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
    </EventProvider>
  );
};

export default StoreProvider;
