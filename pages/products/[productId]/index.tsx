import { getProductById, getAllProducts } from "../../../services/products";
import { addToCart } from "../../../services/cart";
import { Container } from "@chakra-ui/react";
import { useCartData } from "../../../context/state";
import type { File, ProductResponse } from "@moltin/sdk";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import ProductDetail from "../../../components/product/Product";

interface IProduct {
  product: ProductResponse;
  main_image: File | null;
}

export const Product: NextPage<IProduct> = ({
  product,
  main_image,
}: IProduct) => {
  const { updateCartItems, setCartQuantity } = useCartData();

  const handleAddToCart = () => {
    // TODO const mcart = localStorage.getItem("mcart") || "";
    return addToCart(product.id, 1)
      .then(() => {
        updateCartItems();

        // updateCartData();
        setCartQuantity(1);
      })
      .finally(() => {});
  };

  return (
    <Container maxW={"7xl"}>
      <ProductDetail
        product={product}
        main_image={main_image}
        handleAddToCart={handleAddToCart}
      />
    </Container>
  );
};

interface ProductRouteParams extends ParsedUrlQuery {
  productId: string;
}

export const getStaticProps: GetStaticProps<
  IProduct,
  ProductRouteParams
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  // alternative use params!.productId; instead of if check
  // non-null assertion operator https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  const product = await getProductById(params.productId);
  // TODO need to handle when product is not found
  //  should getProductById return undefined or a more understandable error response
  return {
    props: {
      product: product.data,
      main_image: product?.included?.main_images?.[0] || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ProductRouteParams> = async () => {
  const products = await getAllProducts();
  return {
    paths: products.data.map((product: ProductResponse) => {
      return {
        params: {
          productId: product.id,
        },
      };
    }),
    fallback: false,
  };
};

export default Product;
