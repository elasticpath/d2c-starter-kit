import { GroupedCartItems } from "../../context/types/cart-reducer-types";
import { Box, Flex, Grid, IconButton, Image } from "@chakra-ui/react";
import QuantityHandler from "../quantity-handler/QuantityHandler";
import { CloseIcon } from "@chakra-ui/icons";

export function CartItemList({
  items: { regular, custom },
  handleRemoveItem,
}: {
  items: GroupedCartItems;
  handleRemoveItem: (itemId: string) => Promise<void>;
}): JSX.Element {
  return (
    <Box>
      {[...regular, ...custom].map((item) => (
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
              <QuantityHandler item={item} />
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
  );
}
