import { Container } from "@chakra-ui/react";
import type { GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ChildProductDetail from "../../components/product/ChildProduct";
import BaseProductDetail from "../../components/product/BaseProduct";
import { useCartItems } from "../../context/cart";
import { addToCart } from "../../services/cart";
import {
  isChildProductResource,
  isSimpleProductResource,
} from "../../services/helper";
import { getAllProducts, getProductById } from "../../services/products";
import SimpleProductDetail from "../../components/product/SimpleProduct";
import { ProductContext } from "../../lib/product-util";
import { useCallback, useState } from "react";
import type { IProduct } from "../../lib/product-types";

import { withNavStaticProps } from "../../lib/nav-wrapper-ssg";
import {
  retrieveBaseProps,
  retrieveChildProps,
  retrieveSimpleProps,
} from "../../lib/retrieve-product-props";

export const Product: NextPage<IProduct> = (props: IProduct) => {
  const { updateCartItems } = useCartItems();
  const [isChangingSku, setIsChangingSku] = useState(false);

  const { product } = props;

  const handleAddToCart = useCallback(async () => {
    await addToCart(product.id, 1);
    updateCartItems();
  }, [product, updateCartItems]);

  return (
    <Container maxW="7xl" key={"page_" + product.id}>
      <ProductContext.Provider
        value={{
          isChangingSku,
          setIsChangingSku,
        }}
      >
        {resolveProductDetailComponent(props, handleAddToCart)}
      </ProductContext.Provider>
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

interface ProductRouteParams extends ParsedUrlQuery {
  productId: string;
}

export const getStaticProps = withNavStaticProps<IProduct, ProductRouteParams>(
  async ({ params }) => {
    if (!params) {
      return {
        notFound: true,
      };
    }

    const product = await getProductById(params.productId);

    if (!product) {
      return {
        notFound: true,
      };
    }

    const productData = product.data;

    const retrievedResults = isSimpleProductResource(productData)
      ? retrieveSimpleProps(product)
      : isChildProductResource(productData)
      ? await retrieveChildProps(product)
      : await retrieveBaseProps(product);

    return {
      ...retrievedResults,
    };
  }
);

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
