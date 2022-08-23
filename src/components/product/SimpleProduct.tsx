import { ISimpleProduct } from "../../lib/product-types";
import ProductComponents from "./ProductComponents";
import ProductContainer from "./ProductContainer";

interface ISimpleProductDetail {
  simpleProduct: ISimpleProduct;
  handleAddToCart: () => void;
}

const SimpleProductDetail = ({
  simpleProduct,
  handleAddToCart,
}: ISimpleProductDetail): JSX.Element => {
  const { product, component_products } = simpleProduct;
  return (
    <ProductContainer
      handleAddToCart={handleAddToCart}
      productBase={simpleProduct}
    >
      {component_products && (
        <ProductComponents product={product} components={component_products} />
      )}
    </ProductContainer>
  );
};

export default SimpleProductDetail;
