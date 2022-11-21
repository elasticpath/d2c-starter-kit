import { RefinedCartItem } from "../../context/types/cart-reducer-types";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import QuantityHandler from "../quantity-handler/QuantityHandler";
import { CloseIcon } from "@chakra-ui/icons";
import { NonEmptyArray } from "../../lib/types/non-empty-array";
import { ReadonlyNonEmptyArray } from "../../lib/types/read-only-non-empty-array";
import NextLink from "next/link";
import { ChakraNextImage } from "../ChakraNextImage";

export function CartItemList({
  items,
  handleRemoveItem,
}: {
  items:
    | RefinedCartItem[]
    | NonEmptyArray<RefinedCartItem>
    | ReadonlyNonEmptyArray<RefinedCartItem>;
  handleRemoveItem: (itemId: string) => Promise<void>;
}): JSX.Element {
  return (
    <Box>
      {items.map((item) => {
        const {
          display_price: { discount, without_discount, without_tax },
        } = item.meta;
        return (
          <Grid
            key={item.id}
            gap="10"
            fontWeight="bold"
            mb="5"
            borderBottom="1px solid"
            borderColor="gray.200"
            borderRadius="2"
            pb="6"
          >
            <Box>
              <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                <NextLink href={`/products/${item.product_id}`} passHref>
                  {item.name}
                </NextLink>
              </Text>
            </Box>
            <Grid
              gridTemplateRows={{ base: "repeat(auto, 1fr)" }}
              gridTemplateColumns={{
                base: "",
                sm: "repeat(3, 1fr)",
                lg: "repeat(7, 1fr)",
              }}
              gap={{ base: 4 }}
              mt={-30}
            >
              <GridItem
                colSpan={{ sm: 3, lg: 1, "2xl": 1 }}
                rowSpan={2}
                minWidth="100px"
              >
                {item.image?.href && (
                  <ChakraNextImage
                    src={item.image.href}
                    alt={item.name}
                    width={169}
                    height={125} /*4:3 ratio*/
                    overflow="hidden"
                    rounded="lg"
                  />
                )}
              </GridItem>
              <GridItem colSpan={{ sm: 3, lg: 3, "2xl": 3 }}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  noOfLines={[1, 2, 3, 4, 5]}
                >
                  {item.description}
                </Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Center>
                  <Text fontSize="md" fontWeight="bold">
                    Each
                  </Text>
                </Center>
                {discount && without_discount && discount.value.amount < 0 ? (
                  <div>
                    <Center>
                      <Text
                        color="gray.500"
                        textDecoration="line-through"
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        {without_discount.unit.formatted}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="sm" fontWeight="medium">
                        {without_tax.unit.formatted}
                      </Text>
                    </Center>
                  </div>
                ) : (
                  <Center>
                    <Text fontSize="sm" fontWeight="medium">
                      {without_tax.unit.formatted}
                    </Text>
                  </Center>
                )}
              </GridItem>
              <GridItem colSpan={1}>
                <Center>
                  <Text fontSize="md" fontWeight="bold" mb="2">
                    Quantity
                  </Text>
                </Center>
                <Center>
                  <QuantityHandler item={item} />
                </Center>
                <Center>
                  <Button
                    size="xs"
                    aria-label="Remove"
                    mt={6}
                    colorScheme="gray"
                    variant="ghost"
                    leftIcon={<CloseIcon />}
                    _hover={{ color: "red" }}
                    onClick={() => {
                      handleRemoveItem(item.id);
                    }}
                  >
                    Remove
                  </Button>
                </Center>
              </GridItem>
              <GridItem colSpan={1}>
                <Center>
                  <Text fontSize="md" fontWeight="bold" mt={1}>
                    Total
                  </Text>
                </Center>
                <Center>
                  <Text fontSize="sm" fontWeight="bold">
                    {item.meta.display_price.without_tax.value.formatted}
                  </Text>
                </Center>
              </GridItem>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
