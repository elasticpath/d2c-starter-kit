import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { ProductModalContext } from "../../lib/product-util";
import { useCallback, useEffect, useState } from "react";
import type { IProduct } from "../../lib/product-types";
import { useCart } from "../../context/use-cart-hook";
import BaseProductDetail from "./BaseProduct";
import ChildProductDetail from "./ChildProduct";
import SimpleProductDetail from "./SimpleProduct";

interface ModalProductProps {
  onSkuIdChange: (id: string) => void;
  onCloseModal: () => void;
}

export const Product: NextPage<IProduct & ModalProductProps> = (
  props: IProduct & ModalProductProps
) => {
  const { addProductToCart } = useCart();
  const [isChangingSku, setIsChangingSku] = useState(false);
  const [changedSkuId, setChangedSkuId] = useState("");

  const { product } = props;

  const handleAddToCart = useCallback(async () => {
    props.onCloseModal();
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

function resolveProductDetailComponent(
  props: IProduct,
  handleAddToCart: () => void
): JSX.Element {
  switch (props.kind) {
    case "base-product":
      return (
        <BaseProductDetail
          baseProduct={props}
          handleAddToCart={handleAddToCart}
        />
      );
    case "child-product":
      return (
        <ChildProductDetail
          childProduct={props}
          handleAddToCart={handleAddToCart}
        />
      );
    case "simple-product":
      return (
        <SimpleProductDetail
          simpleProduct={props}
          handleAddToCart={handleAddToCart}
        />
      );
  }
}

export default Product;
