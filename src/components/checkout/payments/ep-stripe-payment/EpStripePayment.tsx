import React from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import styles from "./EpStripePayment.module.scss";
import { STRIPE_PUBLISHABLE_KEY } from "../../../../lib/resolve-ep-stripe-env";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function EpStripePayment({
  clientSecret,
  showCompletedOrder,
}: {
  clientSecret: string;
  showCompletedOrder: () => void;
}) {
  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.stripe}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm showCompletedOrder={showCompletedOrder} />
        </Elements>
      )}
    </div>
  );
}
