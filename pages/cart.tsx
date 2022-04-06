import React, { useState, useEffect, useMemo } from "react";
import QuantityHandler from "../components/quantityHandler/QuantityHandler";
import Link from "next/link";
import {
  Heading,
  Grid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  TableContainer,
  useColorModeValue,
  Divider,
  Text,
  VStack
} from "@chakra-ui/react";
import { useCartData } from "../context/state";
import { Promotion } from "../components/promotion/Promotion";
import Image from "next/image";
import { removeCartItem } from "../services/cart";


export default function Cart() {
  const { cartData, updateCartItems, totalPrice, promotionItems } =
    useCartData();
  const [mcart, setMcart] = useState("");
  const [subTotal, SetSubTotal] = useState(0.0);

  useEffect(() => {
    const cart = localStorage.getItem("mcart") || "";
    setMcart(cart);
  });

  useEffect(() => {
    const subtotal = cartData.reduce((pre, item) => {
      return pre + item.unit_price.amount * item.quantity;
    }, 0);
    SetSubTotal(subtotal);
  }, [cartData, totalPrice, promotionItems]);

  const handleRemove = () => {
    removeCartItem(mcart, promotionItems[0].id)
      .then(() => {
        updateCartItems();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Heading p="6">Your Shopping Cart</Heading>
      {cartData && cartData.length > 0 ? (
        <Grid templateColumns="2.5fr 1fr" columnGap="60px" p="12px">
          <TableContainer>
            <Table variant="simple">
              <Thead backgroundColor="gray.100" padding="24px">
                <Tr>
                  <Th py="16px">Product</Th>
                  <Th py="16px">SKU</Th>
                  <Th py="16px" isNumeric>
                    Unit Price
                  </Th>
                  <Th py="16px">Quantity</Th>
                  <Th py="16px" isNumeric>
                    Line Subtotal
                  </Th>
                  <Th py="16px">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartData.map((item, index) => (
                  <Tr>
                    <Td>
                      {item.image && item.image.href && (
                        <Image
                          src={item.image.href}
                          alt="Vercel Logo"
                          width={48}
                          height={48}
                          objectFit="fill"
                        />
                      )}
                    </Td>
                    <Td>{item.sku}</Td>
                    <Td isNumeric>
                      {item.meta.display_price.without_tax.unit.formatted}
                    </Td>
                    <Td>
                      <QuantityHandler item={item} size="sm" />
                    </Td>
                    <Td isNumeric>
                      {item.meta.display_price.without_tax.value.formatted}
                    </Td>
                    <Td>
                      <Button>Remove</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box backgroundColor="gray.100" p="24px">
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>Subtotal</Td>
                  <Td isNumeric>{subTotal}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <VStack alignItems="start">
                      <Text>Discount</Text>
                      {promotionItems && promotionItems.length > 0 && (
                        <Text color="red.600">( {promotionItems[0].sku} )</Text>
                      )}
                    </VStack>
                  </Td>
                  <Td isNumeric>
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
                          onClick={handleRemove}
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
                <Tr fontWeight="semibold">
                  <Td>Order Total</Td>
                  <Td isNumeric>{totalPrice}</Td>
                </Tr>
              </Tbody>
            </Table>

            <Divider my="2" />
            <Promotion updateCartsItems={updateCartItems} />
            <Divider my="2" />
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <Link href={"/"}>
                <Button
                  _hover={{
                    color: "blue.700",
                    boxShadow: "lg",
                  }}
                  colorScheme={useColorModeValue("blue.900", "blue.50")}
                  variant="outline"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Link href={"/checkout"}>
                <Button
                  bg={useColorModeValue("blue.900", "blue.50")}
                  color={useColorModeValue("white", "gray.900")}
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
          <Image src="/icons/empty.svg" width="488px" height="461px" />
        </Box>
      )}
    </div>
  );
}
