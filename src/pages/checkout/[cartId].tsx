import {
  Heading,
  Grid,
  Box,
  GridItem,
  Spinner,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Cart, CartIncluded, ResourceIncluded } from "@moltin/sdk";
import { ParsedUrlQuery } from "querystring";
import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";
import { getCart } from "../../services/cart";
import { OrderSummary } from "../../components/checkout/OrderSummary";
import { useCart } from "../../context/use-cart-hook";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { globalBaseWidth } from "../../styles/theme";
import { useState } from "react";
import { OrderPendingState } from "../../components/checkout/types/order-pending-state";
import { toBase64 } from "../../lib/to-base-64";
import { shimmer } from "../../components/shimmer";
import NextImage from "next/future/image";

interface ICheckout {
  cart: ResourceIncluded<Cart, CartIncluded>;
}

export const Checkout: NextPage<ICheckout> = () => {
  const { state, checkout } = useCart();
  const [orderPendingState, setOrderPendingState] = useState<
    OrderPendingState | undefined
  >(undefined);

  return (
    <Box
      maxW={globalBaseWidth}
      m="0 auto"
      w="full"
      px={{ base: 8, "2xl": 0 }}
      py={8}
    >
      {orderPendingState ? (
        <OrderPending state={orderPendingState} />
      ) : (
        <>
          <Heading>Checkout</Heading>
          {state.kind === "present-cart-state" && (
            <Grid
              templateColumns={{ base: "", md: "1.7fr 1fr" }}
              templateRows={{ base: "1fr", md: "" }}
              columnGap="60px"
              mt="16px"
            >
              <GridItem>
                <CheckoutForm
                  checkout={checkout}
                  cartState={state}
                  setOrderPendingState={setOrderPendingState}
                />
              </GridItem>
              <GridItem>
                <OrderSummary
                  items={state.items}
                  promotionItems={state.groupedItems.promotion}
                  totalPrice={state.withTax}
                  subtotal={state.withoutTax}
                />
              </GridItem>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};
export default Checkout;

interface CheckoutParams extends ParsedUrlQuery {
  cartId: string;
}

interface IOrderPending {
  state: OrderPendingState;
}
function OrderPending({ state }: IOrderPending): JSX.Element {
  return state.status === "processing-order" ? (
    <Grid gap={6} h="lg" alignContent="center" justifyItems="center">
      <Heading as="h3" fontSize="lg">
        Processing Order
      </Heading>
      <GridItem>
        <Spinner
          display="flex"
          justifyContent="center"
          alignContent="center"
          variant="solid"
          color="brand.primary"
          padding="0px"
          size="xl"
        />
      </GridItem>
    </Grid>
  ) : (
    <Grid gap={1}>
      <Heading as="h3" fontSize="md">
        Thank you for your order!
      </Heading>
      <Heading as="h2" fontSize="3xl">
        Order Complete
      </Heading>
      <Text fontSize="md">
        Your order number: {state.paymentResponse.data.id}
      </Text>
      <Divider my={8} />
      <Grid gap={8}>
        {state.cart.items.map((item) => {
          return (
            <Grid
              key={item.id}
              gap={4}
              gridTemplateColumns="auto 1fr"
              borderBottomWidth="1px"
              pb={8}
              _last={{ borderBottomWidth: 0 }}
            >
              <GridItem overflow="hidden" borderRadius={6}>
                <NextImage
                  src={item.image.href}
                  alt={item.name}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(264, 264)
                  )}`}
                  width={264}
                  height={264}
                  style={{
                    objectFit: "cover",
                    width: "160px",
                    height: "160px",
                  }}
                />
              </GridItem>
              <Grid gap={1} gridTemplateRows="auto 1fr auto">
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="sm" fontWeight="light" noOfLines={5}>
                  {item.description}
                </Text>
                <Flex gap={4} fontSize="sm">
                  <Text fontWeight="medium">{`Quantity ${item.quantity}`}</Text>
                  <Divider orientation="vertical" />
                  <Text fontWeight="medium">
                    {`Price ${item.meta.display_price.with_tax.value.formatted}`}
                  </Text>
                </Flex>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Divider my={8} />
      <Grid
        gap={4}
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
        fontSize="sm"
      >
        <GridItem fontSize="sm">
          <Text fontWeight="medium" pb={2}>
            Shipping Address
          </Text>
          <Text>{`${state.checkoutForm.shippingAddress.first_name} ${state.checkoutForm.shippingAddress.last_name}`}</Text>
          <Text>{state.checkoutForm.shippingAddress.line_1}</Text>
          <Text>{state.checkoutForm.shippingAddress.line_2}</Text>
          <Text>{state.checkoutForm.shippingAddress.postcode}</Text>
          <Text>{state.checkoutForm.shippingAddress.region}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium" pb={2}>
            Billing Address
          </Text>
          <Text>{`${state.checkoutForm.shippingAddress.first_name} ${state.checkoutForm.shippingAddress.last_name}`}</Text>
          <Text>{state.checkoutForm.shippingAddress.line_1}</Text>
          <Text>{state.checkoutForm.shippingAddress.line_2}</Text>
          <Text>{state.checkoutForm.shippingAddress.postcode}</Text>
          <Text>{state.checkoutForm.shippingAddress.region}</Text>
        </GridItem>
      </Grid>
      <Divider my={8} />
      <Grid gridTemplateRows="1fr">
        <GridItem>
          <Text></Text>
        </GridItem>
      </Grid>
    </Grid>
  );
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

  if (!cart.included || cart.included.items.length < 1) {
    return {
      redirect: {
        destination: "/cart",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cart,
    },
  };
});
