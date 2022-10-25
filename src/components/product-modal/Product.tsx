import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { ProductModalContext } from "../../lib/product-util";
import { useCallback, useEffect, useState } from "react";
import type { IProduct } from "../../lib/product-types";
import { useCart } from "../../context/use-cart-hook";
import { resolveProductDetailComponent } from "../../pages/products/[productId]";

interface ModalProductProps {
  onSkuIdChange?: (id: string) => void;
}

export const Product: NextPage<IProduct & ModalProductProps> = (
  props: IProduct & ModalProductProps
) => {
  const { addProductToCart } = useCart();
  const [isChangingSku, setIsChangingSku] = useState(false);
  const [changedSkuId, setChangedSkuId] = useState("");

  const { product } = props;

  const handleAddToCart = useCallback(async () => {
    return addProductToCart(product.id, 1);
  }, [product, addProductToCart]);

  useEffect(() => {
    if (changedSkuId && props.onSkuIdChange) {
      props.onSkuIdChange(changedSkuId);
    }
  }, [changedSkuId]);

  return (
    <Container maxW="7xl" key={"page_" + product.id}>
      <ProductModalContext.Provider
        value={{
          isChangingSku,
          setIsChangingSku,
          changedSkuId,
          setChangedSkuId,
        }}
      >
        {resolveProductDetailComponent(props, handleAddToCart)}
      </ProductModalContext.Provider>
    </Container>
  );
};

export default Product;
