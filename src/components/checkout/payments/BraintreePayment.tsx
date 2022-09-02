import { useCallback, useEffect, useState } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import { Box } from "@chakra-ui/react";
import { BRAINTREE_AUTH_KEY } from "../../../lib/resolve-braintree-env";
import { usePaymentGateway } from "../../../context/use-payment-gateway";
import { ConfirmPaymentBody } from "@moltin/sdk";

export const BrainTreePayment = (): JSX.Element => {
  const { registerGateway } = usePaymentGateway();

  const [braintreeInstance, setBraintreeInstance] = useState<
    Dropin | undefined
  >(undefined);

  const initializeBraintree = useCallback(async () => {
    const braintreeInstanceTemp = await dropin.create({
      authorization: BRAINTREE_AUTH_KEY,
      container: "#braintree-drop-in",
    });
    setBraintreeInstance(braintreeInstanceTemp);

    const resolveNonce = async function (): Promise<ConfirmPaymentBody> {
      if (!braintreeInstanceTemp) {
        throw Error(
          "Tried to resolve nonce before braintree instance was initialized"
        );
      }

      try {
        const { nonce } = await braintreeInstanceTemp.requestPaymentMethod();

        return {
          method: "purchase",
          gateway: "braintree",
          payment: nonce,
          options: {
            // @ts-ignore
            payment_method_nonce: true, // TODO add to js-sdk type def for ConfirmPaymentBody
          },
        };
      } catch (err) {
        console.error("error braintree: ", err);
        throw err;
      }
    };

    registerGateway(resolveNonce, "braintree");
  }, [registerGateway]);

  // TODO is broken then you try checkout back to back tries to reuse the same nonce.
  useEffect(() => {
    if (!braintreeInstance) {
      initializeBraintree();
    }
  }, [initializeBraintree, braintreeInstance]);

  return <Box id="braintree-drop-in"></Box>;
};

export default BrainTreePayment;
