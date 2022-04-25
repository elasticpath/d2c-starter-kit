import { Stack, SimpleGrid } from "@chakra-ui/react";
import type { File, ProductResponse } from "@moltin/sdk";
import CartActions from "./CartActions";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductSummary from "./ProductSummary";

interface ISimpleProductDetail {
  product: ProductResponse;
  main_image: File | null;
  otherImages: File[];
  handleAddToCart: () => void;
}

const SimpleProductDetail = ({
  product,
  main_image,
  otherImages,
  handleAddToCart,
}: ISimpleProductDetail): JSX.Element => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      {main_image && (
        <ProductImages main_image={main_image} otherImages={otherImages} />
      )}
      <Stack spacing={{ base: 6, md: 10 }}>
        <ProductSummary product={product} />
        <ProductDetails product={product} />
        <CartActions handleAddToCart={handleAddToCart} />
      </Stack>
    </SimpleGrid>
  );
};

export default SimpleProductDetail;
