import React from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { STRIPE_PUBLISHABLE_KEY } from "../../../../lib/resolve-ep-stripe-env";
import { STRIPE_ACCOUNT_ID } from "../../../../lib/resolve-ep-stripe-env";
import styles from "./EpStripePayment.module.scss";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY, {
  stripeAccount: STRIPE_ACCOUNT_ID,
});

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
