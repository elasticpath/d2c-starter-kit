import {
  Button,
  Popover,
  Box,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Tag,
  TagLabel,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useCartItems } from "../../context/cart";
import ModalCartItems from "./ModalCartItem";
import { Icon } from "@chakra-ui/icons";

export default function CartMenu(): JSX.Element {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { cartData } = useCartItems();
  const numCartItems = cartData.reduce((pre, current) => {
    return pre + current.quantity;
  }, 0);

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
          {numCartItems > 0 && (
            <Tag
              display="flex"
              justifyContent="center"
              borderRadius="full"
              bgColor="brand.primary"
              variant="solid"
              position="absolute"
              size="sm"
              top="0px"
              right="2px"
              padding="0px"
              width="20px"
              height="20px"
            >
              <TagLabel fontSize="10px" fontWeight="500">
                {numCartItems}
              </TagLabel>
            </Tag>
          )}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent borderRadius={8} mt={4} boxShadow="2xl" p={4}>
          <PopoverBody
            height={cartData && cartData.length ? "350px" : "250px"}
            overflow="scroll"
          >
            <ModalCartItems />
          </PopoverBody>
          <PopoverFooter>
            <Box>
              <Link href="/checkout" passHref>
                <Button
                  disabled={cartData.length === 0}
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
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
