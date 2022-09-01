import { PresentCartState } from "../../../context/types/cart-reducer-types";
import { CheckoutForm as CheckoutFormType } from "../form-schema/checkout-form-schema";
import { ConfirmPaymentResponse } from "@moltin/sdk";

export type OrderPendingState =
  | {
      status: "processing-order";
      cart: PresentCartState;
      checkoutForm: CheckoutFormType;
    }
  | {
      status: "complete-ordered";
      paymentResponse: ConfirmPaymentResponse;
      cart: PresentCartState;
      checkoutForm: CheckoutFormType;
    };
