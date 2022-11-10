import { CartProvider } from "./cart-provider";
import { StoreProviderProps } from "./types/store-context";
import { PGRProvider } from "./payment-gateway-provider";
import { EventProvider } from "./event-provider";
import { NavProvider } from "./nav-provider";

const StoreProvider = ({ children, storeContext }: StoreProviderProps) => {
  return (
    <EventProvider>
      <NavProvider>
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
      </NavProvider>
    </EventProvider>
  );
};

export default StoreProvider;
