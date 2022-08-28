import {
  Text,
  Button,
  Flex,
  Box,
  IconButton,
  Spinner,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCart } from "../../context/use-cart-hook";
import {
  CartState,
  CustomCartItem,
  RefinedCartItem,
  RegularCartItem,
} from "../../context/types/cart-reducer-types";
import NextImage from "next/future/image";
import { toBase64 } from "../../lib/to-base-64";
import { shimmer } from "../shimmer";
import NextLink from "next/link";
import { getPresentCartState } from "../../lib/get-present-cart-state";
import { ReadonlyNonEmptyArray } from "../../lib/types/read-only-non-empty-array";

function resolveStateCartItems(
  state: CartState
): ReadonlyNonEmptyArray<RefinedCartItem> | undefined {
  const presentCartState = getPresentCartState(state);
  return presentCartState && presentCartState.items;
}

function ModalCartItem({
  item,
  handleRemove,
}: {
  item: CustomCartItem | RegularCartItem;
  handleRemove: (itemId: string) => void;
}): JSX.Element {
  const [removing, setRemoving] = useState(false);

  return (
    <Grid gap={4} position="relative" gridTemplateColumns="auto 1fr auto">
      <Box>
        {item.image && item.image.href && (
          <Box overflow="hidden" borderRadius={6} w="64px" h="64px">
            <NextLink href={`/products/${item.product_id}`} passHref>
              <Link>
                <NextImage
                  src={item.image.href}
                  alt={item.name}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(128, 128)
                  )}`}
                  width={128}
                  height={128}
                  style={{ objectFit: "cover", width: "64px", height: "64px" }}
                />
              </Link>
            </NextLink>
          </Box>
        )}
      </Box>
      <Grid gridTemplateRows="max-content auto">
        <NextLink href={`/products/${item.product_id}`} passHref>
          <Link fontSize="sm" fontWeight="semibold" noOfLines={2}>
            {item.name}
          </Link>
        </NextLink>
        <Text fontSize="sm" fontWeight="semibold">
          {item.meta.display_price.without_tax.value.formatted}
        </Text>
        <Text fontSize="xs">Qty {item.quantity}</Text>
      </Grid>
      <GridItem>
        {removing ? (
          <Spinner
            position="absolute"
            m={2}
            w={2}
            h={2}
            color="brand.primary"
            right={0}
            top={0}
            size="xs"
          />
        ) : (
          <IconButton
            aria-label="Remove"
            color="gray.500"
            icon={<CloseIcon w={2} h={2} />}
            variant="text"
            position="absolute"
            right={0}
            top={0}
            _hover={{ color: "gray.700" }}
            size="xs"
            onClick={async () => {
              setRemoving(true);
              await handleRemove(item.id);
              setRemoving(false);
            }}
          />
        )}
      </GridItem>
    </Grid>
  );
}

export default function ModalCartItems(): JSX.Element {
  const { state, removeCartItem } = useCart();

  const stateItems = resolveStateCartItems(state);

  if (stateItems) {
    return (
      <Grid gap={4}>
        {stateItems.map((item) => (
          <Box
            key={item.id}
            borderBottomWidth="1px"
            pb={4}
            _last={{ borderBottomWidth: 0 }}
          >
            <ModalCartItem
              key={item.id}
              handleRemove={removeCartItem}
              item={item}
            />
          </Box>
        ))}
      </Grid>
    );
  }

  if (
    state.kind === "uninitialised-cart-state" ||
    state.kind === "loading-cart-state"
  ) {
    return (
      <Flex alignItems="center" justifyContent="center" h="full">
        <Spinner color="brand.primary" size="xl" />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" gap={4} justifyContent="center" height="100%">
      <Text textAlign="center">You have no items in your cart!</Text>
      <NextLink href="/" passHref>
        <Button
          _hover={{
            color: "brand.primary",
            boxShadow: "sm",
          }}
          width="100%"
          colorScheme="brand.primary"
          variant="outline"
        >
          Start Shopping
        </Button>
      </NextLink>
    </Flex>
  );
}
