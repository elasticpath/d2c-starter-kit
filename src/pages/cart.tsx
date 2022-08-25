import React, { useState, useEffect } from "react";
import QuantityHandler from "../components/quantity-handler/QuantityHandler";
import Link from "next/link";
import {
  Heading,
  Grid,
  Button,
  Table,
  Flex,
  Tbody,
  Tr,
  Td,
  Box,
  useColorModeValue,
  Text,
  VStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useCartItems } from "../context/cart";
import { Promotion } from "../components/promotion/Promotion";
import { removeCartItem } from "../services/cart";
import type { NextPage } from "next";
import { withNavServerSideProps } from "../lib/nav-wrapper-ssr";
import { CloseIcon } from "@chakra-ui/icons";

export const Cart: NextPage<{}> = () => {
  const { cartData, updateCartItems, totalPrice, promotionItems, mcart } =
    useCartItems();
  const [subTotal, setSubTotal] = useState(0.0);

  useEffect(() => {
    const subtotal = cartData.reduce((pre, item) => {
      return pre + item.unit_price.amount * item.quantity;
    }, 0);
    setSubTotal(subtotal);
  }, [cartData, totalPrice, promotionItems]);

  const handleRemovePromotion = () => {
    removeCartItem(mcart, promotionItems[0].id)
      .then(() => {
        updateCartItems();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveItem = (id: string) => {
    removeCartItem(mcart, id)
      .then(() => {
        updateCartItems();
      })
      .catch((error) => {
        console.error(error.errors);
      });
  };
  const colorBlue = useColorModeValue("blue.900", "blue.50");
  const colorWhite = useColorModeValue("white", "gray.900");

  return (
    <Box px={{ base: 6, md: 20 }} py={6}>
      <Heading p={6} pl={0}>
        Your Shopping Cart
      </Heading>
      {cartData && cartData.length > 0 ? (
        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1.5fr" }}
          columnGap="50px"
        >
          <Box>
            {cartData.map((item) => (
              <Box
                key={item.id}
                display="flex"
                paddingY={10}
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Box flexShrink={0}>
                  {item.image && item.image.href && (
                    <Box overflow="hidden" borderRadius={6}>
                      <Image
                        src={item.image.href}
                        alt="Vercel Logo"
                        width={{ base: "96px", sm: "192px" }}
                        height={{ base: "96px", sm: "192px" }}
                        objectFit="cover"
                      />
                    </Box>
                  )}
                </Box>

                <Grid
                  gridTemplateColumns={{ base: "auto", sm: "1fr 1fr" }}
                  marginLeft={6}
                  columnGap={6}
                  width="100%"
                  position="relative"
                >
                  <Box>
                    <Box maxWidth="90%">{item.sku}</Box>
                    <Box mt={2}>
                      {item.meta.display_price.without_tax.unit.formatted}
                    </Box>
                  </Box>
                  <Flex paddingRight={9}>
                    <QuantityHandler item={item} size="sm" />
                    <IconButton
                      aria-label="Remove"
                      color="gray.500"
                      icon={<CloseIcon w={3} h={3} />}
                      variant="text"
                      position="absolute"
                      right={0}
                      top={0}
                      _hover={{ color: "gray.700" }}
                      size="sm"
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    />
                  </Flex>
                </Grid>
              </Box>
            ))}
          </Box>
          <Box backgroundColor="#F9FAFB" p={8} borderRadius={6}>
            <Text fontSize="lg" fontWeight={500}>
              Order Summary
            </Text>
            <Table variant="simple">
              <Tbody>
                <Tr fontSize={14}>
                  <Td color="gray.600" pl={0}>
                    Subtotal
                  </Td>
                  <Td isNumeric>{subTotal}</Td>
                </Tr>
                <Tr fontSize={14}>
                  <Td color="gray.600" pl={0}>
                    <VStack alignItems="start">
                      <Text>Discount</Text>
                      {promotionItems && promotionItems.length > 0 && (
                        <Text color="red.600">( {promotionItems[0].sku} )</Text>
                      )}
                    </VStack>
                  </Td>
                  <Td isNumeric fontSize={14}>
                    {promotionItems && promotionItems.length > 0 ? (
                      <VStack alignItems="end">
                        <Text>
                          {
                            promotionItems[0].meta.display_price.without_tax
                              .unit.formatted
                          }
                        </Text>
                        <Button
                          mt={["0rem !important"]}
                          p="0"
                          onClick={handleRemovePromotion}
                          _hover={{
                            bgColor: "none",
                            color: "red.600",
                          }}
                        >
                          Remove
                        </Button>
                      </VStack>
                    ) : (
                      "$0.00"
                    )}
                  </Td>
                </Tr>
                <Tr fontWeight={500}>
                  <Td pl={0}>Order Total</Td>
                  <Td isNumeric>{totalPrice}</Td>
                </Tr>
              </Tbody>
            </Table>

            <Box mt={5}>
              <Promotion />
            </Box>
            <Grid
              gridTemplateColumns={{
                sm: "repeat(2, 1fr)",
                lg: "auto",
                xl: "repeat(2, 1fr)",
              }}
              gap={2}
              mt={5}
            >
              <Link href="/" passHref>
                <Button
                  _hover={{
                    color: "blue.700",
                    boxShadow: "lg",
                  }}
                  colorScheme={colorBlue}
                  variant="outline"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/checkout" passHref>
                <Button
                  bg={colorBlue}
                  color={colorWhite}
                  _hover={{
                    backgroundColor: "blue.700",
                    boxShadow: "m",
                  }}
                  variant="solid"
                >
                  Checkout
                </Button>
              </Link>
            </Grid>
          </Box>
        </Grid>
      ) : (
        <Box p="16">
          <Image alt="" src="/icons/empty.svg" width="488px" height="461px" />
        </Box>
      )}
    </Box>
  );
};
export default Cart;

export const getServerSideProps = withNavServerSideProps();
