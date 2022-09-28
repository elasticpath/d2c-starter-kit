import { Container } from "@chakra-ui/react";
import type { GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ChildProductDetail from "../../components/product/ChildProduct";
import BaseProductDetail from "../../components/product/BaseProduct";
import { getAllProducts } from "../../services/products";
import SimpleProductDetail from "../../components/product/SimpleProduct";
import { useCallback } from "react";
import type { IProduct } from "../../lib/product-types";

import { withStoreStaticProps } from "../../lib/store-wrapper-ssg";
import { useCart } from "../../context/use-cart-hook";
import { ProductProvider } from "../../context/product-provider";
import { ProductPresentState } from "../../context/types/product-reducer-types";
import { resolveProduct } from "../../lib/resolve-product";

export const Product: NextPage<IProduct> = (props: IProduct) => {
  const { addProductToCart } = useCart();

  const { product } = props;

  const handleAddToCart = useCallback(async () => {
    return addProductToCart(product.id, 1);
  }, [product, addProductToCart]);

  const initialProduct = temp(props);

  return (
    <Container maxW="7xl" key={"page_" + product.id}>
      {initialProduct && (
        <ProductProvider product={initialProduct}>
          {resolveProductDetailComponent(props, handleAddToCart)}
        </ProductProvider>
      )}
    </Container>
  );
};

function temp(props: IProduct): ProductPresentState | undefined {
  if (props.kind === "base-product") {
    return {
      ...props,
      kind: "base-product-present-state",
      main_image: props.main_image ?? undefined,
    };
  }

  if (props.kind === "child-product") {
    return {
      ...props,
      kind: "child-product-present-state",
      main_image: props.main_image ?? undefined,
    };
  }

  if (props.kind === "simple-product") {
    return {
      ...props,
      kind: "simple-product-present-state",
      main_image: props.main_image ?? undefined,
    };
  }
  return;
}

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

interface ProductRouteParams extends ParsedUrlQuery {
  productId: string;
}

export const getStaticProps = withStoreStaticProps<
  IProduct,
  ProductRouteParams
>(async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const retrievedResults = await resolveProduct(params.productId);

  return {
    props: {
      ...retrievedResults,
    },
  };
});

export const getStaticPaths: GetStaticPaths<ProductRouteParams> = async () => {
  const productResponses = await getAllProducts();
  return {
    paths: [
      ...productResponses.map((resp) => ({ params: { productId: resp.id } })),
    ],
    fallback: false,
  };
};

export default Product;
