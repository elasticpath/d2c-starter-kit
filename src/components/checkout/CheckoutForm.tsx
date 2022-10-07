import { Form, Formik } from "formik";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import {
  CheckoutForm as CheckoutFormType,
  checkoutFormSchema,
} from "./form-schema/checkout-form-schema";
import { ConfirmPaymentResponse, Order, PaymentRequestBody } from "@moltin/sdk";
import ShippingForm from "./ShippingForm";
import CustomFormControl from "./CustomFormControl";
import BillingForm from "./BillingForm";
import { useCart } from "../../context/use-cart-hook";
import EpStripePayment from "./payments/ep-stripe-payment/EpStripePayment";
import { makePayment } from "../../services/checkout";
import { useEffect, useState } from "react";

const initialValues: Partial<CheckoutFormType> = {
  personal: {
    email: "",
  },
  sameAsShipping: true,
  shippingAddress: {
    first_name: "",
    last_name: "",
    line_1: "",
    country: "",
    region: "",
    postcode: "",
  },
};

interface ICheckoutForm {
  checkout: ReturnType<typeof useCart>["stripeCheckout"];
  showCompletedOrder: (
    paymentResponse: ConfirmPaymentResponse,
    checkoutForm: CheckoutFormType
  ) => void;
}

export default function CheckoutForm({ checkout }: ICheckoutForm): JSX.Element {
  const { emptyCart } = useCart();
  const [orderResponse, setOrderResponse] = useState<{ data: Order }>();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const initStripe = async () => {
      if (orderResponse?.data.id) {
        const payment: PaymentRequestBody = {
          gateway: "elastic_path_payments_stripe",
          method: "purchase",
          //@ts-ignore : in js-sdk update the "ElasticPathStripePayment" interface
          payment_method_types: ["card"],
        };
        const paymentResponse = await makePayment(
          payment,
          orderResponse.data.id
        );
        setClientSecret(paymentResponse.data.payment_intent.client_secret);
        await emptyCart();
      }
    };
    initStripe();
  }, [orderResponse?.data.id, emptyCart]);

  return (
    <>
      <Formik
        initialValues={initialValues as CheckoutFormType}
        validationSchema={checkoutFormSchema}
        onSubmit={async (validatedValues) => {
          console.warn("here");
          const { personal, shippingAddress, billingAddress, sameAsShipping } =
            validatedValues;

          const orderResponse = await checkout(
            personal.email,
            shippingAddress,
            sameAsShipping,
            billingAddress ?? undefined
          );
          setOrderResponse(orderResponse);
        }}
      >
        {({ handleChange, values, isSubmitting }) => (
          <Form>
            <Grid gridTemplateRows="1fr" gap={10}>
              <Heading as="h2" fontSize="lg" fontWeight="medium">
                Contact Information
              </Heading>
              <GridItem>
                <CustomFormControl
                  id="email"
                  type="email"
                  name="personal.email"
                  autoComplete="email"
                  helperText="required for guest checkout"
                  label="Email"
                  isRequired={true}
                  value="test@test.com"
                />
              </GridItem>
              <Heading as="h2" fontSize="lg" fontWeight="medium">
                Shipping Address
              </Heading>
              <GridItem>
                <ShippingForm />
              </GridItem>
              <Heading as="h2" fontSize="lg" fontWeight="medium">
                Billing Address
              </Heading>
              <GridItem>
                <FormControl>
                  <Checkbox
                    id="same-as-shipping"
                    name="sameAsShipping"
                    onChange={handleChange}
                    isChecked={values.sameAsShipping}
                    colorScheme="blue"
                    mb={4}
                  >
                    Same as shipping address?
                  </Checkbox>
                </FormControl>
                {!values.sameAsShipping && <BillingForm />}
              </GridItem>

              <Button
                justifySelf="right"
                bg="brand.primary"
                color="white"
                _hover={{
                  backgroundColor: "brand.highlight",
                  boxShadow: "md",
                }}
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                spinnerPlacement="end"
                disabled={isSubmitting}
                loadingText="Paying"
              >
                Checkout Now
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      <EpStripePayment clientSecret={clientSecret} />
    </>
  );
}
