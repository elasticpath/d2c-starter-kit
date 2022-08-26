import { Box, Heading, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withStoreServerSideProps } from "../lib/store-wrapper-ssr";
import { useCart } from "../context/use-cart-hook";
import Cart from "../components/cart-items/Cart";
import { resolveShoppingCartProps } from "../lib/resolve-shopping-cart-props";

export const CartPage: NextPage = () => {
  const { removeCartItem, state } = useCart();

  const shoppingCartProps = resolveShoppingCartProps(state, removeCartItem);

  return (
    <Box px={{ base: 6, md: 20 }} py={6}>
      <Heading p={6} pl={0}>
        Your Shopping Cart
      </Heading>
      {shoppingCartProps && <Cart {...shoppingCartProps} />}
      {state.kind === "empty-cart-state" ? (
        <Box p="16">
          <Image alt="" src="/icons/empty.svg" width="488px" height="461px" />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default CartPage;

export const getServerSideProps = withStoreServerSideProps();
