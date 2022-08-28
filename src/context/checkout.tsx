import { createContext, useContext, useState } from "react";
import { ProviderProps } from "./types/store-context";

export interface Address {
  email?: string;
  first_name?: string;
  last_name?: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  county?: string;
  country?: string;
  postcode?: string;
  phone_number?: string;
  instructions?: string;
}

interface CheckoutFormState {
  shippingAddress: Address;
  setShippingAddress: (address: Address) => void;
  setShippingFormValues: (values: Address) => void;
  billingAddress: Address;
  setBillingAddress: (address: Address) => void;
  setBillingFormValues: (address: Address) => void;
  isSameAddress: boolean;
  setSameAddress: (val: boolean) => void;
  isEditShippingForm: boolean;
  setEditShippingForm: (val: boolean) => void;
  isEditBillingForm: boolean;
  setEditBillingForm: (val: boolean) => void;
}

const CheckoutFormContext = createContext<CheckoutFormState | undefined>(
  undefined
);

function CheckoutReducer() {
  const [shippingAddress, setShippingAddress] = useState<Address>({});
  const [billingAddress, setBillingAddress] = useState<Address>({});
  const [isSameAddress, setSameAddress] = useState(true);
  const [isEditShippingForm, setEditShippingForm] = useState(true);
  const [isEditBillingForm, setEditBillingForm] = useState(true);

  const setShippingFormValues = (values: Address) => {
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

function CheckoutProvider({ children }: ProviderProps) {
  const value = CheckoutReducer();
  return (
    <CheckoutFormContext.Provider value={value}>
      {children}
    </CheckoutFormContext.Provider>
  );
}

function useCheckoutForm() {
  const context = useContext(CheckoutFormContext);
  if (context === undefined) {
    throw new Error("useCartItems must be used within a CartProvider");
  }
  return context;
}

export { CheckoutProvider, useCheckoutForm };
