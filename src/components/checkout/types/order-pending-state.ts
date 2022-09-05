import { PresentCartState } from "../../../context/types/cart-reducer-types";
import { CheckoutForm as CheckoutFormType } from "../form-schema/checkout-form-schema";
import { ConfirmPaymentResponse } from "@moltin/sdk";

export type OrderCompleteState = {
  paymentResponse: ConfirmPaymentResponse;
  cart: PresentCartState;
  checkoutForm: CheckoutFormType;
};
