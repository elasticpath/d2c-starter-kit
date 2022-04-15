import { getProductById, getAllProducts } from "../../services/products";
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
import type { File, ProductResponse } from "@moltin/sdk";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";

interface IProduct {
  product: ProductResponse;
  main_image: File | null;
}

export const Product: NextPage<IProduct> = ({ product, main_image }) => {
  const { updateCartItems, setCartQuantity } = useCartData();

  const handleAddToCart = () => {
    // TODO const mcart = localStorage.getItem("mcart") || "";
    return addToCart(product.id, 1)
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
              {product.attributes.name}
            </Heading>
            <Tag marginTop={4}> {product.attributes.sku}</Tag>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              marginTop={"15px"}
              fontSize={"xl"}
            >
              {product.meta.display_price.without_tax.formatted}{" "}
              {product.meta.display_price.without_tax.currency}
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
              <Text>{product.attributes.description}</Text>
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
};

interface ProductRouteParams extends ParsedUrlQuery {
  productId: string;
}

export const getStaticProps: GetStaticProps<
  IProduct,
  ProductRouteParams
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  // alternative use params!.productId; instead of if check
  // non-null assertion operator https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  const product = await getProductById(params.productId);
  // TODO need to handle when product is not found
  //  should getProductById return undefined or a more understandable error response
  return {
    props: {
      product: product.data,
      main_image: product?.included?.main_images?.[0] || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ProductRouteParams> = async () => {
  const products = await getAllProducts();
  return {
    paths: products.data.map((product: ProductResponse) => {
      return {
        params: {
          productId: product.id,
        },
      };
    }),
    fallback: false,
  };
};

export default Product;
