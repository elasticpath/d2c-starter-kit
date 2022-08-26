import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Heading, Grid, Box, Text, GridItem, Checkbox } from "@chakra-ui/react";
import { useCheckoutForm } from "../../context/checkout";
import PersonalInfo from "../../components/checkout/PersonalInfo";
import ShippingForm from "../../components/checkout/ShippingForm";
import PaymentForm from "../../components/checkout/PaymentForm";
import ShippingInfo from "../../components/checkout/ShippingInfo";
import type { NextPage } from "next";
import { stripeEnv } from "../../lib/resolve-stripe-env";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { ParsedUrlQuery } from "querystring";
import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";
import { getCart } from "../../services/cart";
import { OrderSummary } from "../../components/checkout/OrderSummary";
import { useCart } from "../../context/use-cart-hook";

const stripePromise = loadStripe(stripeEnv);

interface ICheckout {
  cart: ResourceIncluded<Cart, CartIncluded>;
}

export const Checkout: NextPage<ICheckout> = () => {
  const {
    shippingAddress,
    billingAddress,
    isSameAddress,
    setSameAddress,
    isEditShippingForm,
    isEditBillingForm,
  } = useCheckoutForm();
  const { checkout, state } = useCart();

  // TODO replace with form gathered email
  const onPayOrder = async () =>
    checkout("123@test.com", shippingAddress, billingAddress);

  return (
    <Box px={24} py={8}>
      <Heading>Checkout</Heading>
      {state.kind === "present-cart-state" && (
        <Grid
          templateColumns={{ base: "", md: "1.7fr 1fr" }}
          templateRows={{ base: "1fr", md: "" }}
          columnGap="60px"
          mt="16px"
        >
          <GridItem>
            <Box border="1px solid white">
              <Box p={4} bg="brand.primary" color="white">
                <Text casing="uppercase"> personal info</Text>
              </Box>
              <PersonalInfo />
              <Box
                p={4}
                bg="brand.primary"
                borderBottom="4px solid white"
                color="white"
              >
                <Text casing="uppercase"> shipping & billing info</Text>
              </Box>
              <Box p={4}>
                <Box>
                  <Heading pb={4} size="md">
                    Shipping Address
                  </Heading>
                  {isEditShippingForm ? (
                    <ShippingForm type="shipping" />
                  ) : (
                    <ShippingInfo type="shipping" />
                  )}
                  <form>
                    <Box py={4}>
                      <Heading pb={4} size="md">
                        billing Address
                      </Heading>
                      <Checkbox
                        defaultChecked={isSameAddress}
                        // @ts-ignore
                        value={isSameAddress}
                        onChange={(e) => {
                          setSameAddress(e.target.checked);
                        }}
                      >
                        Same as Shipping Address
                      </Checkbox>
                    </Box>
                  </form>
                  {isEditBillingForm
                    ? !isSameAddress && <ShippingForm type="billing" />
                    : !isSameAddress && <ShippingInfo type="billing" />}
                </Box>
              </Box>
              <Box p={4} bg="brand.primary" color="brand.white">
                <Text casing="uppercase"> payment info</Text>
              </Box>
              <Elements stripe={stripePromise}>
                <PaymentForm
                  onPayOrder={onPayOrder}
                  totalPrice={state.totalPrice}
                />
              </Elements>
            </Box>
          </GridItem>
          <GridItem>
            <OrderSummary
              items={[...state.items.regular, ...state.items.custom] ?? []}
              promotionItems={state.items.promotion}
              totalPrice={state.totalPrice}
              subtotal={state.subtotal}
            />
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};
export default Checkout;

interface CheckoutParams extends ParsedUrlQuery {
  cartId: string;
}

export const getServerSideProps = withStoreServerSideProps<
  ICheckout,
  CheckoutParams
>(async ({ params }) => {
  const cartId = params?.cartId;

  if (!cartId) {
    return {
      notFound: true,
    };
  }

  const cart = await getCart(cartId);
  // TODO when cart doesnt exist is it just created every time
  return {
    props: {
      cart,
    },
  };
});
