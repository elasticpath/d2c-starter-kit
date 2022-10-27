import { IBaseProduct } from "../../lib/product-types";
import ModalProductVariations from "./ModalProductVariations";
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
        <ModalProductVariations
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
