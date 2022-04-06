import { getProductById, getAllPCMProducts } from "../../services/products";
import { addToCart } from "../../services/cart";
import {
  Box,
  Tag,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCartData } from "../../context/state";
import { PcmProduct } from "@moltin/sdk";

export default function Product({ products, main_image }) {
  const { updateCartItems, setCartQuantity } = useCartData();

  const handleAddToCart = () => {
    const mcart = localStorage.getItem("mcart") || "";
    return addToCart(products.id, 1)
      .then(() => {
        updateCartItems();

        // updateCartData();
        setCartQuantity(1);
      })
      .finally(() => {});
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          {main_image && (
            <Image
              rounded={"md"}
              alt={"product image"}
              src={main_image.link.href}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          )}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "xl", sm: "3xl", lg: "4xl" }}
            >
              {products.attributes.name}
            </Heading>
            <Tag marginTop={4}> {products.attributes.sku}</Tag>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              marginTop={"15px"}
              fontSize={"xl"}
            >
              {products.meta.display_price.without_tax.formatted}{" "}
              {products.meta.display_price.without_tax.currency}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("blue.500", "blue.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>
              <Text>{products.attributes.description}</Text>
            </Box>
          </Stack>
          <Flex gap={10}>
            <Button
              rounded={"md"}
              w={"full"}
              mt={4}
              py={"7"}
              bg={useColorModeValue("blue.900", "blue.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </Button>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const products = await getProductById(params.productId);
  return {
    props: {
      products: products.data,
      main_image: products?.included?.main_images[0] || null,
    },
  };
}

export async function getStaticPaths() {
  const products = await getAllPCMProducts();
  return {
    paths: products.map((product: PcmProduct) => {
      return {
        params: {
          productId: [product.id],
        },
      };
    }),
    fallback: false,
  };
}
