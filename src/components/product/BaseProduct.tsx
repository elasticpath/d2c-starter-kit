import { IBaseProduct } from "../../lib/product-types";
import ProductVariations from "./ProductVariations";
import ProductContainer from "./ProductContainer";

interface IBaseProductDetail {
  baseProduct: IBaseProduct;
  handleAddToCart: () => void;
}

const BaseProductDetail = ({
  baseProduct,
  handleAddToCart,
}: IBaseProductDetail): JSX.Element => {
  const {
    product: { attributes, id },
    variations,
    variationsMatrix,
  } = baseProduct;
  return (
    <ProductContainer
      handleAddToCart={handleAddToCart}
      productBase={baseProduct}
    >
      {variations && (
        <ProductVariations
          variations={variations}
          variationsMatrix={variationsMatrix}
          baseProductSlug={attributes.slug}
          currentSkuId={id}
        />
      )}
    </ProductContainer>
  );
};

export default BaseProductDetail;
