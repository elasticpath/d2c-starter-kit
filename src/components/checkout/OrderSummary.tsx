import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  PromotionCartItem,
  RefinedCartItem,
} from "../../context/types/cart-reducer-types";
import { NonEmptyArray } from "../../lib/types/non-empty-array";
import { ReadonlyNonEmptyArray } from "../../lib/types/read-only-non-empty-array";

interface IOrderSummary {
  items:
    | RefinedCartItem[]
    | NonEmptyArray<RefinedCartItem>
    | ReadonlyNonEmptyArray<RefinedCartItem>;
  promotionItems: PromotionCartItem[];
  totalPrice: string;
  subtotal: string;
}

export function OrderSummary({
  items,
  promotionItems,
  totalPrice,
  subtotal,
}: IOrderSummary): JSX.Element {
  return (
    <Box backgroundColor="gray.50" p={8} borderRadius={6}>
      <Text fontSize="lg" fontWeight={500}>
        Order Summary
      </Text>
      {items.map((item) => (
        <Box key={item.id}>
          <Grid my="4" templateColumns="1fr 3fr" gap={1}>
            <GridItem alignSelf="center">
              {item.image && item.image.href && (
                <Image
                  src={item.image.href}
                  alt={item.name}
                  width={56}
                  height={56}
                  objectFit="fill"
                />
              )}
            </GridItem>
            <GridItem>
              <Heading size="xs" mb="4px">
                {item.name}
              </Heading>
              <Text mb="4px">
                {item.meta.display_price.without_tax.value.formatted}
              </Text>
              <Flex gap={8}>Quantity: {item.quantity}</Flex>
            </GridItem>
          </Grid>
        </Box>
      ))}
      <Divider />
      <Table variant="simple">
        <Tbody>
          <Tr fontSize={14}>
            <Td color="gray.600" pl={0}>
              Subtotal
            </Td>
            <Td isNumeric>{subtotal}</Td>
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
                      promotionItems[0].meta.display_price.without_tax.unit
                        .formatted
                    }
                  </Text>
                  <Button
                    mt={["0rem !important"]}
                    p="0"
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
    </Box>
  );
}
