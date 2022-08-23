import {
  Text,
  Button,
  useColorModeValue,
  Image,
  Divider,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useCartItems } from "../../context/cart";
import { removeCartItem } from "../../services/cart";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

export default function ModalCartItems(): JSX.Element {
  const { cartData, mcart, updateCartItems } = useCartItems();

  const handleRemove = (id: string) => {
    removeCartItem(mcart, id)
      .then(() => {
        updateCartItems();
      })
      .catch((error) => {
        console.error(error.errors);
      });
  };

  return (
    <>
      {cartData && cartData.length > 0 ? (
        <>
          {cartData.map((item) => (
            <div key={item.id}>
              <Flex my="4" gap={1} position="relative">
                <Box alignSelf="center">
                  {item.image && item.image.href && (
                    <Box overflow="hidden" borderRadius={6}>
                      <Image
                        src={item.image.href}
                        alt="Vercel Logo"
                        width="64px"
                        height="64px"
                        objectFit="cover"
                      />
                    </Box>
                  )}
                </Box>
                <Box ml={3}>
                  <Text size="xs" mb="4px">
                    {item.name}
                  </Text>
                  <Text mb="4px">
                    {item.meta.display_price.without_tax.value.formatted}
                  </Text>
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
                    onClick={() => {
                      handleRemove(item.id);
                    }}
                  />
                </Box>
              </Flex>
              <Divider />
            </div>
          ))}
        </>
      ) : (
        <Flex
          flexDirection="column"
          gap={4}
          justifyContent="center"
          height="100%"
        >
          <Text textAlign="center">You have no items in your cart!</Text>
          <Link href={"/"} passHref>
            <Button
              _hover={{
                color: "blue.700",
                boxShadow: "lg",
              }}
              width="100%"
              colorScheme="blue.900"
              variant="outline"
            >
              Start Shopping
            </Button>
          </Link>
        </Flex>
      )}
    </>
  );
}
