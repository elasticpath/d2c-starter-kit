import {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";
import { CartItem } from "@moltin/sdk";
import { getCartItems } from "../services/cart";
import { ProviderProps } from "./types";

interface CartState {
  cartItems: CartItem[];
  promotionItems: CartItem[];
  totalPrice: string;
  updateCartItems: () => void;
  mcart: string;
}

const CartItemsContext = createContext<CartState | undefined>(undefined);

function CartReducer(): CartState {
  const [mcart, setMcart] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promotionItems, setPromotionItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    const cart = localStorage.getItem("mcart") || "";
    cart && setMcart(cart);
  }, []);

  const updateCartItems = useCallback(() => {
    if (mcart) {
      getCartItems(mcart).then((res) => {
        const cartItems = res.data.length
          ? res.data.filter(
              ({ type }) => type === "cart_item" || type === "custom_item"
            )
          : [];
        setCartItems(cartItems);
        const promotionItems = res.data.length
          ? res.data.filter(({ type }) => type === "promotion_item")
          : [];
        setPromotionItems(promotionItems);
        const totalPrice = res.meta
          ? res.meta.display_price.without_tax.formatted
          : "";
        setTotalPrice(totalPrice);
      });
    }
  }, [mcart]);

  useEffect(() => {
    updateCartItems();
  }, [updateCartItems]);

  return {
    cartItems,
    promotionItems,
    totalPrice,
    updateCartItems,
    mcart,
  };
}

function CartProvider({ children }: ProviderProps) {
  const value = CartReducer();
  return (
    <CartItemsContext.Provider value={value}>
      {children}
    </CartItemsContext.Provider>
  );
}

function useCartItems() {
  const context = useContext(CartItemsContext);
  if (context === undefined) {
    throw new Error("useCartItems must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCartItems };
