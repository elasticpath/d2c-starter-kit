import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import ModalCartItems from "./ModalCartItem";
import { Icon } from "@chakra-ui/icons";
import { useMemo } from "react";
import { useCart } from "../../context/use-cart-hook";
import CartUpdatingSpinner from "./CartUpdatingSpinner";
import CartItemNumTag from "./CartItemNumTag";
import { CartState } from "../../context/types/cart-reducer-types";

export default function CartMenu(): JSX.Element {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { state, emptyCart } = useCart();

  const hasCartItems: boolean = useMemo(
    (): boolean =>
      state.kind === "present-cart-state" &&
      (state.items.regular.length > 0 || state.items.custom.length > 0),
    [state]
  );

  return (
    <Popover
      placement="top-end"
      onClose={onClose}
      isOpen={isOpen}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <Button variant="ghost" _focus={{ border: "none" }}>
          <Icon
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            h={6}
            w={6}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </Icon>
          {state.kind === "updating-cart-state" && <CartUpdatingSpinner />}
          {state.kind === "present-cart-state" && (
            <CartItemNumTag state={state} />
          )}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent borderRadius={8} mt={4} boxShadow="2xl" p={4}>
          <PopoverBody
            height={hasCartItems ? "350px" : "250px"}
            overflow="scroll"
          >
            <Button onClick={() => emptyCart()}>Empty Cart</Button>
            <ModalCartItems />
          </PopoverBody>
          <PopoverFooter>
            <CartPopoverFooter
              state={state}
              onClose={onClose}
              hasCartItems={hasCartItems}
            />
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

function CartPopoverFooter({
  state,
  onClose,
  hasCartItems,
}: {
  state: CartState;
  onClose: () => void;
  hasCartItems: boolean;
}): JSX.Element {
  const checkoutHref =
    state.kind === "present-cart-state" ? `/checkout/${state.id}` : "#";
  return (
    <Box>
      <Link href={checkoutHref} passHref>
        <Button
          disabled={!hasCartItems}
          onClick={onClose}
          bg={useColorModeValue("blue.900", "blue.50")}
          color={useColorModeValue("white", "gray.900")}
          w="100%"
          display="block"
          _hover={{
            backgroundColor: "blue.700",
            boxShadow: "m",
          }}
          variant="solid"
        >
          Checkout
        </Button>
      </Link>
      <Link href="/cart" passHref>
        <Button
          onClick={onClose}
          _hover={{
            color: "blue.700",
          }}
          m="10px auto auto"
          display="block"
          colorScheme={useColorModeValue("blue.900", "blue.50")}
          variant="text"
        >
          View cart
        </Button>
      </Link>
    </Box>
  );
}
