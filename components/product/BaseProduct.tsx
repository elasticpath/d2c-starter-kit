import { Stack, SimpleGrid } from "@chakra-ui/react";
import type { File, ProductResponse, Variation } from "@moltin/sdk";
import { VariationSkuLookup } from "../../services/helper";
import CartActions from "./CartActions";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductSummary from "./ProductSummary";
import ProductVariations from "./ProductVariations";

interface IBaseProductDetail {
  product: ProductResponse;
  main_image: File | null;
  otherImages: File[];
  handleAddToCart: () => void;
  variations: Variation[];
  skuLookup: VariationSkuLookup;
}

const BaseProductDetail = ({
  product,
  main_image,
  otherImages,
  handleAddToCart,
  variations,
  skuLookup,
}: IBaseProductDetail): JSX.Element => {
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
        {variations && (
          <ProductVariations
            variations={variations}
            skuLookup={skuLookup}
            baseProductSlug={product.attributes.slug}
          />
        )}
        <CartActions handleAddToCart={handleAddToCart} />
      </Stack>
    </SimpleGrid>
  );
};

export default BaseProductDetail;
