import ProductCarousel from "../product/carousel/ProductCarousel";
import { Box, Button, SimpleGrid, Stack } from "@chakra-ui/react";
import ProductSummary from "../product/ProductSummary";
import ProductExtensions from "../product/ProductExtensions";
import CartActions from "../product/CartActions";
import { IBase } from "../../lib/product-types";
import { ReactElement } from "react";
import Link from "next/link";

interface IProductContainer {
  productBase: IBase;
  children?: ReactElement;
}

export default function ProductContainer({
  productBase: { product, main_image, otherImages },
  children,
}: IProductContainer): JSX.Element {
  const { extensions } = product.attributes;
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 8 }}
    >
      {main_image && (
        <ProductCarousel images={otherImages} mainImage={main_image} />
      )}
      <Stack spacing={{ base: 6, md: 10 }}>
        <ProductSummary product={product} />
        {extensions && <ProductExtensions extensions={extensions} />}
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
