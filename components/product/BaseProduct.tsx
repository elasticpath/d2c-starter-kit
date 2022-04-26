import { Stack, SimpleGrid } from "@chakra-ui/react";
import type { File, ProductResponse, Variation } from "@moltin/sdk";
import { VariationSkuLookup } from "../../services/helper";
import CartActions from "./CartActions";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
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
  product;

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
        {variations && (
          <ProductVariations
            variations={variations}
            skuLookup={skuLookup}
            baseProductSlug={product.attributes.slug}
            currentSkuId={product.id}
          />
        )}
        <CartActions handleAddToCart={handleAddToCart} />
      </Stack>
    </SimpleGrid>
  );
};

export default BaseProductDetail;
