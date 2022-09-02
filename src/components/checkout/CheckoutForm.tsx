import { Form, Formik } from "formik";
import {
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
import { ConfirmPaymentBody } from "@moltin/sdk";
import ShippingForm from "./ShippingForm";
import CustomFormControl from "./CustomFormControl";
import BillingForm from "./BillingForm";
import BrainTreePayment from "./payments/BraintreePayment";
import { useCart } from "../../context/use-cart-hook";
import { PresentCartState } from "../../context/types/cart-reducer-types";
import { OrderPendingState } from "./types/order-pending-state";

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
  checkout: ReturnType<typeof useCart>["checkout"];
  cartState: PresentCartState;
  setOrderPendingState: (data: OrderPendingState) => void;
}

export default function CheckoutForm({
  checkout,
  cartState,
  setOrderPendingState,
}: ICheckoutForm): JSX.Element {
  return (
    <Formik
      initialValues={initialValues as CheckoutFormType}
      validationSchema={checkoutFormSchema}
      onSubmit={async (validatedValues, actions) => {
        setOrderPendingState({
          status: "processing-order",
          checkoutForm: validatedValues,
          cart: cartState,
        });

        const {
          personal,
          shippingAddress,
          billingAddress,
          sameAsShipping,
          payment,
        } = validatedValues;

        const response = await checkout(
          personal.email,
          shippingAddress,
          payment as ConfirmPaymentBody,
          sameAsShipping,
          billingAddress ?? undefined
        );

        actions.setSubmitting(false);
        setOrderPendingState({
          status: "complete-ordered",
          checkoutForm: validatedValues,
          cart: cartState,
          paymentResponse: response,
        });
      }}
    >
      {({ handleChange, values }) => (
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
            <BrainTreePayment />
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
