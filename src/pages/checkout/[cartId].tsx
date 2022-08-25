import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Heading,
  Grid,
  Box,
  useColorModeValue,
  Text,
  GridItem,
  Checkbox,
} from "@chakra-ui/react";
import { useCartItems } from "../../context/cart";
import { useCheckoutForm } from "../../context/checkout";
import { checkout, payment, removeAllCartItems } from "../../services/checkout";
import PersonalInfo from "../../components/checkout/PersonalInfo";
import ShippingForm from "../../components/checkout/ShippingForm";
import PaymentForm from "../../components/checkout/PaymentForm";
import ShippingInfo from "../../components/checkout/ShippingInfo";
import type { NextPage } from "next";
import { stripeEnv } from "../../lib/resolve-stripe-env";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { ParsedUrlQuery } from "querystring";
import { withNavServerSideProps } from "../../lib/nav-wrapper-ssr";
import { getCart } from "../../services/cart";
import { OrderSummary } from "../../components/checkout/OrderSummary";

const stripePromise = loadStripe(stripeEnv);

interface ICheckout {
  cart: ResourceIncluded<Cart, CartIncluded>;
}

export const Checkout: NextPage<ICheckout> = ({ cart }) => {
  const {
    shippingAddress,
    billingAddress,
    isSameAddress,
    setSameAddress,
    isEditShippingForm,
    isEditBillingForm,
  } = useCheckoutForm();
  const { promotionItems, updateCartItems } = useCartItems();

  const onPayOrder = async () => {
    try {
      const mcart = localStorage.getItem("mcart") || "";
      const billing = isSameAddress ? shippingAddress : billingAddress;
      const shipping = shippingAddress;
      const name = `${billingAddress.first_name} ${billingAddress.last_name}`;
      const customerData = { name: name, email: billingAddress.email };
      const orderRes = await checkout(mcart, customerData, billing, shipping);
      const paymentParams = {
        gateway: "stripe_connect",
        method: "purchase",
        payment: "pm_card_visa",
      };
      await payment(paymentParams, orderRes.data.id);
      await removeAllCartItems(mcart);
      updateCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  console.log("cart page cart: ", cart);

  return (
    <Box px={24} py={8}>
      <Heading>Checkout</Heading>
      <Grid
        templateColumns={{ base: "", md: "1.7fr 1fr" }}
        templateRows={{ base: "1fr", md: "" }}
        columnGap="60px"
        mt="16px"
      >
        <GridItem>
          <Box border="1px solid white">
            <Box
              p={4}
              bg={useColorModeValue("blue.900", "blue.50")}
              color={useColorModeValue("white", "gray.900")}
            >
              <Text casing="uppercase"> personal info</Text>
            </Box>
            <PersonalInfo />
            <Box
              p={4}
              bg={useColorModeValue("blue.900", "blue.50")}
              borderBottom="4px solid white"
              color={useColorModeValue("white", "gray.900")}
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
            <Box
              p={4}
              bg={useColorModeValue("blue.900", "blue.50")}
              color={useColorModeValue("white", "gray.900")}
            >
              <Text casing="uppercase"> payment info</Text>
            </Box>
            <Elements stripe={stripePromise}>
              <PaymentForm onPayOrder={onPayOrder} />
            </Elements>
          </Box>
        </GridItem>
        <GridItem>
          <OrderSummary
            items={cart.included?.items ?? []}
            promotionItems={promotionItems}
            totalPrice={
              cart.data.meta?.display_price?.with_tax?.formatted ?? "unknown"
            }
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default Checkout;

interface CheckoutParams extends ParsedUrlQuery {
  cartId: string;
}

export const getServerSideProps = withNavServerSideProps<
  ICheckout,
  CheckoutParams
>(async ({ params }) => {
  const cartId = params?.cartId;
  console.log("cart id: ", cartId);

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
