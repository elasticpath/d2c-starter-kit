import { useState, useEffect } from "react";
import constate from "constate";
import * as EPCC from "@moltin/sdk";
import { getCartItems } from "../services/cart";
import { Address } from "./types";

function useCartItemsState() {
  const [cartData, setCartData] = useState<EPCC.CartItem[]>([]);
  const [promotionItems, setPromotionItems] = useState<EPCC.CartItem[]>([]);
  const [count, setCount] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [cartRes, setCartRes] = useState<EPCC.CartItemsResponse>();
  const [mcart, setMcart] = useState("");

  const [addedtItem, setAddedItem] = useState("");

  useEffect(() => {
    const cart = localStorage.getItem("mcart") || "";
    setMcart(cart);
  });

  useEffect(() => {
    if (mcart) {
      getCartItems(mcart).then((res) => {
        setCartRes(res);
        setCartData(
          res.data.filter(
            ({ type }) => type === "cart_item" || type === "custom_item"
          )
        );
        setPromotionItems(
          res.data.filter(({ type }) => type === "promotion_item")
        );
        setCount(res.data.reduce((sum, { quantity }) => sum + quantity, 0));
        setTotalPrice(res.meta.display_price.without_tax.formatted);
      });
    }
  }, [mcart]);

  const updateCartItems = () => {
    const mcart = localStorage.getItem("mcart") || "";
    getCartItems(mcart).then((res) => {
      const cartData = res.data.length
        ? res.data.filter(
            ({ type }) => type === "cart_item" || type === "custom_item"
          )
        : [];
      setCartData(cartData);
      const promotionItems = res.data.length
        ? res.data.filter(({ type }) => type === "promotion_item")
        : [];
      setPromotionItems(promotionItems);
      const itemQuantity = res.data.length
        ? res.data.reduce((sum, { quantity }) => sum + quantity, 0)
        : 0;
      setCount(itemQuantity);
      const totalPrice = res.meta
        ? res.meta.display_price.without_tax.formatted
        : "";
      setTotalPrice(totalPrice);
    });
  };

  const handleShowCartPopup = () => {
    if (!showCartPopup) {
      setShowCartPopup(true);
      setTimeout(() => {
        setShowCartPopup(false);
      }, 3200);
    }
  };

  return {
    cartData,
    cartRes,
    promotionItems,
    count,
    cartQuantity,
    setCartQuantity,
    showCartPopup,
    handleShowCartPopup,
    totalPrice,
    updateCartItems,
    addedtItem,
    setAddedItem,
    mcart,
  };
}

function useCheckoutFormState() {
  const [shippingAddress, setShippingAddress] = useState<Address>({});
  const [billingAddress, setBillingAddress] = useState<Address>({});
  const [isSameAddress, setSameAddress] = useState(true);
  const [isEditShippingForm, setEditShippingForm] = useState(true);
  const [isEditBillingForm, setEditBillingForm] = useState(true);

  const setShippingFormValues = (values: Address & { email: string }) => {
    setShippingAddress((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const setBillingFormValues = (values: Address) => {
    setBillingAddress((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return {
    shippingAddress,
    setShippingAddress,
    setShippingFormValues,
    billingAddress,
    setBillingAddress,
    setBillingFormValues,
    isSameAddress,
    setSameAddress,
    isEditShippingForm,
    setEditShippingForm,
    setEditBillingForm,
    isEditBillingForm,
  };
}

function useGlobalState() {
  const cartData = useCartItemsState();
  const checkoutForm = useCheckoutFormState();
  return {
    cartData,
    checkoutForm,
  };
}

export const [AppStateProvider, useCartData, useCheckoutForm] = constate(
  useGlobalState,
  (value) => value.cartData,
  (value) => value.checkoutForm
);
