import type { IChildProduct } from "../../lib/product-types";
import ProductVariations from "./ProductVariations";
import ProductContainer from "./ProductContainer";

interface IChildProductDetail {
  childProduct: IChildProduct;
  handleAddToCart: () => void;
}

const ChildProductDetail = ({
  childProduct,
  handleAddToCart,
}: IChildProductDetail): JSX.Element => {
  const { product, baseProduct, variations, variationsMatrix } = childProduct;
  return (
    <ProductContainer
      handleAddToCart={handleAddToCart}
      productBase={childProduct}
    >
      {variations && (
        <ProductVariations
          variations={variations}
          variationsMatrix={variationsMatrix}
          baseProductSlug={baseProduct.attributes.slug}
          currentSkuId={product.id}
        />
      )}
    </ProductContainer>
  );
};

export default ChildProductDetail;
