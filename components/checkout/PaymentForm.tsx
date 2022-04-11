import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCartData } from "../../context/state";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { config } from "../../services/config";
import { Formik, Form, FormikValues } from "formik";
import {
  Box,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  Button,
  useToast,
  useToken,
  Alert,
  AlertIcon,
  ScaleFade,
  Center,
  Spinner,
} from "@chakra-ui/react";
interface CheckoutParams {
  onPayOrder: (...args: any) => any;
}

export const PaymentForm: React.FC<CheckoutParams> = (props) => {
  const { onPayOrder } = props;
  const { totalPrice } = useCartData();

  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement(CardElement);
  const createPaymentIntent = async () => {
    const res = await fetch("/api/secret", {
      method: "POST",
      body: JSON.stringify({
        amount: 725.22 * 100,
      }),
    });
    const { clientSecret: clientSecretRes } = await res.json();
    setClientSecret(clientSecretRes);
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const handleSubmit = async (values: FormikValues) => {
    if (!stripe || !elements || cardError || !clientSecret || card) {
      return;
    }
    try {
      const { error: stripeError, paymentIntent } =
        await stripe?.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: values.name,
            },
          },
        });
      console.log(paymentIntent);
      await onPayOrder(paymentIntent);
      setIsLoading(false);
    } catch (paymentError) {
      console.error({ paymentError });
      return setIsLoading(false);
    }
  };

  const onStripeChange = (e: any) => {
    e.complete ? setIsComplete(true) : setIsComplete(false);
    e.error ? setErrorMsg(e.error.message) : setErrorMsg("");
  };

  return (
    <Box p={4} width="50%">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Stack pb="3" spacing={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" />
                <Input
                  value={values.name}
                  onChange={({ target: { value } }) => {
                    setFieldValue("name", value);
                  }}
                  id="name"
                  placeholder="Name on card"
                  name="name"
                  required
                />
              </InputGroup>

              <Box
                rounded="md"
                border="1px solid"
                borderColor="inherit"
                _hover={{ borderColor: "whiteAlpha.400" }}
                display="flex"
                h="10"
              >
                {console.log(stripe)}
                {console.log(elements)}
                {/* {!!stripe && !!elements ? (
                  <CardElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => {
                      setCardError(e.error?.message ?? "");
                    }}
                  />
                ) : (
                  <Center w="100%">
                    <Spinner />
                  </Center>
                )} */}
              </Box>
              <ScaleFade in={!!cardError} unmountOnExit>
                <Alert status="error">
                  <AlertIcon />
                  {cardError}
                </Alert>
              </ScaleFade>
              <Button
                type="submit"
                colorScheme="purple"
                size="md"
                isLoading={isSubmitting}
              >
                Pay {totalPrice}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentForm;
