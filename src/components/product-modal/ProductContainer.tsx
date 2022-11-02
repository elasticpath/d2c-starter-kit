import { Box, Button, Center, SimpleGrid, Stack } from "@chakra-ui/react";
import ProductSummary from "./ProductSummary";
import CartActions from "../product/CartActions";
import { IBase } from "../../lib/product-types";
import { ReactElement } from "react";
import Link from "next/link";
import { ViewOffIcon } from "@chakra-ui/icons";
import ProductDetails from "../product/ProductDetails";
import { ChakraNextImage } from "../ChakraNextImage";

interface IProductContainer {
  productBase: IBase;
  children?: ReactElement;
}

export default function ProductContainer({
  productBase: { product, main_image },
  children,
}: IProductContainer): JSX.Element {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 8 }}
    >
      {main_image ? (
        <ChakraNextImage
          src={main_image.link.href}
          alt={product.attributes.name}
          width={800}
          height={800}
          objectFit="cover"
          objectPosition="center"
          rounded="lg"
          overflow="hidden"
          maxH={{ base: "md", md: "xl" }}
        />
      ) : (
        <Center
          w="100%"
          h="100%"
          bg="gray.200"
          color="white"
          rounded="lg"
          overflow="hidden"
          maxH={{ base: "md", md: "xl" }}
          minH={{ base: "md" }}
        >
          <ViewOffIcon w="10" h="10" />
        </Center>
      )}
      <Stack spacing="6">
        <ProductSummary product={product} />
        <ProductDetails product={product} />
        {children}
        <Box>
          <CartActions productId={product.id} />
          <Link href={`/products/${product.id}`} passHref>
            <Button
              _hover={{
                color: "brand.primary",
              }}
              m="0.625rem auto"
              display="block"
              variant="text"
            >
              View full details
            </Button>
          </Link>
        </Box>
      </Stack>
    </SimpleGrid>
  );
}
