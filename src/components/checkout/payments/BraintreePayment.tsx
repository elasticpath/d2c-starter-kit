import { useCallback, useEffect, useState } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import { Button, Grid } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { CheckoutForm } from "../form-schema/checkout-form-schema";
import { BRAINTREE_AUTH_KEY } from "../../../lib/resolve-braintree-env";

export const BrainTreePayment = (): JSX.Element => {
  const {
    isSubmitting: isFormSubmitting,
    values,
    handleSubmit,
    setFieldValue,
  } = useFormikContext<CheckoutForm>();

  const { payment } = values;

  useEffect(() => {
    if (payment) {
      handleSubmit();
      setSubmitting(false);
    }
  }, [payment, handleSubmit]);

  const [braintreeInstance, setBraintreeInstance] = useState<
    Dropin | undefined
  >(undefined);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const initializeBraintree = useCallback(
    async () =>
      setBraintreeInstance(
        await dropin.create({
          authorization: BRAINTREE_AUTH_KEY,
          container: "#braintree-drop-in",
        })
      ),
    []
  );

  async function resolveNonce(): Promise<void> {
    setSubmitting(true);

    if (!braintreeInstance) {
      throw Error(
        "Tried to resolve nonce before braintree instance was initialized"
      );
    }

    const { nonce } = await braintreeInstance.requestPaymentMethod();

    setFieldValue("payment", {
      method: "purchase",
      gateway: "braintree",
      payment: nonce,
      options: {
        // @ts-ignore
        payment_method_nonce: true, // TODO add to js-sdk type def for ConfirmPaymentBody
      },
    });
  }

  useEffect(() => {
    if (braintreeInstance) {
      braintreeInstance.teardown().then(() => {
        initializeBraintree();
      });
    } else {
      initializeBraintree();
    }
  }, [initializeBraintree]);

  return (
    <Grid>
      <div id="braintree-drop-in"></div>
      <Button
        justifySelf="right"
        bg="brand.primary"
        color="white"
        display="block"
        _hover={{
          backgroundColor: "brand.highlight",
          boxShadow: "m",
        }}
        variant="solid"
        _disabled={{ opacity: 50 }}
        type="button"
        onClick={() => resolveNonce()}
        disabled={isFormSubmitting || submitting}
        isLoading={isFormSubmitting || submitting}
        loadingText="Paying"
      >
        Pay Now
      </Button>
    </Grid>
  );
};

export default BrainTreePayment;
