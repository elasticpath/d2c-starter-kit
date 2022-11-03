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
      {items.map((item) => (
        <Grid
          key={item.id}
          gap="10"
          color="blackAlpha.700"
          fontWeight="bold"
          mb="5"
          border="1px"
          borderColor="gray.200"
          borderRadius="2"
          p="2"
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
              colSpan={{ sm: 3, lg: 1 }}
              rowSpan={2}
              height={{ lg: "120px" }}
              minWidth="100px"
            >
              {item.image?.href && (
                <Image
                  src={item.image.href}
                  alt={item.name}
                  objectFit="cover"
                  boxSize={{ base: "100px", sm: "100%" }}
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
              {item.meta.display_price.discount &&
              item.meta.display_price.discount.value.amount < 0 ? (
                <div>
                  <Center>
                    <Text
                      color="gray.500"
                      textDecoration="line-through"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {
                        item?.meta?.display_price?.without_discount?.unit
                          .formatted
                      }
                    </Text>
                  </Center>
                  <Center>
                    <Text fontSize="sm" fontWeight="medium">
                      {item.meta.display_price.without_tax.unit.formatted}
                    </Text>
                  </Center>
                </div>
              ) : (
                <Center>
                  <Text fontSize="sm" fontWeight="medium">
                    {item.meta.display_price.without_tax.unit.formatted}
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
      ))}
    </Box>
  );
}
