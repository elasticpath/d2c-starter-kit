import type { IChildProduct } from "../../lib/product-types";
import ModalProductVariations from "./ModalProductVariations";
import ProductContainer from "./ProductContainer";

interface IChildProductDetail {
  childProduct: IChildProduct;
}

const ChildProductDetail = ({
  childProduct,
}: IChildProductDetail): JSX.Element => {
  const { product, baseProduct, variations, variationsMatrix } = childProduct;
  return (
    <ProductContainer productBase={childProduct}>
      {variations && (
        <ModalProductVariations
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
