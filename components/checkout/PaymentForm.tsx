import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCartData } from "../../context/state";

import { Button } from "@chakra-ui/react";
interface CheckoutParams {
  onPayOrder: (...args: any) => any;
}

export const PaymentForm: React.FC<CheckoutParams> = (props) => {
  const { onPayOrder } = props;
  const { totalPrice } = useCartData();

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const onPayment = async () => {
    let payment;
    setIsLoading(true);
    try {
      if (stripe && elements)
        payment = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "",
          },
        });
      await onPayOrder(payment);
      setIsLoading(false);
    } catch (paymentError) {
      console.error({ paymentError });
      return setIsLoading(false);
    }
  };

  return (
    <div className="checkout">
      <p className="card-title">payment-card</p>
      <form onSubmit={onPayment}>
        <CardElement />

        <Button type="submit">
          {!isLoading ? (
            "pay" + " " + totalPrice
          ) : (
            <span className="circularLoader" aria-label={"loading"} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
