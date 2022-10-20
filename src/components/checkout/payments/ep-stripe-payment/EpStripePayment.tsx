import React from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import styles from "./EpStripePayment.module.scss";

const stripePromise = loadStripe(
  "pk_test_1iMhjY7f5CoIcsNSBiu2xVCS57L28F5sz9JtZrl3hbpY1V70hOngn2qBq21YECVHpo1z6YAR6lBPGCHBkCitEj1wT00S8h3VRdE"
);

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
