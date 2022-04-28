import { Stack, SimpleGrid } from "@chakra-ui/react";
import { ISimpleSku } from "../../lib/product-types";
import CartActions from "./CartActions";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
import ProductSummary from "./ProductSummary";

interface ISimpleProductDetail {
  simpleSku: ISimpleSku;
  handleAddToCart: () => void;
}

const SimpleProductDetail = ({
  simpleSku: { product, main_image, otherImages },
  handleAddToCart,
}: ISimpleProductDetail): JSX.Element => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      {main_image && (
        <ProductCarousel mainImage={main_image} images={otherImages} />
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
