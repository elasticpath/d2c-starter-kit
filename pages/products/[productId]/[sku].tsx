import { Container } from "@chakra-ui/react";
import type { ProductResponse, File, ResourceList } from "@moltin/sdk";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ProductDetail from "../../../components/product/Product";
import { useCartData } from "../../../context/state";
import { addToCart } from "../../../services/cart";
import {
  getAllProducts,
  getAllProductsWithVariations,
  getProductById,
  getProductBySlug,
} from "../../../services/products";

interface ISku {
  product: ProductResponse;
  main_image: File | null;
}

export const Sku: NextPage<ISku> = ({ product, main_image }: ISku) => {
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

interface SkuRouteParams extends ParsedUrlQuery {
  productId: string;
  sku: string;
}

export const getStaticProps: GetStaticProps<ISku, SkuRouteParams> = async ({
  params,
}) => {
  console.log("params: ", params);
  if (!params) {
    return {
      notFound: true,
    };
  }
  // alternative use params!.productId; instead of if check
  // non-null assertion operator https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  const product = await getProductBySlug(params.productId);
  if (!product) {
    return {
      notFound: true,
    };
  }
  // TODO need to handle when product is not found
  //  should getProductById return undefined or a more understandable error response
  return {
    props: {
      product: product.data,
      main_image: product?.included?.main_images?.[0] || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths<SkuRouteParams> = async () => {
  // TODO this is only handling the first page of data response
  //  need to think of the best way to handle thousands of products
  //  - should they all be generated at once
  //  - should only the most popular.
  //  - option for static generation delayed until first time it's hit
  const products = await getAllProducts();
  const paths = products.data.map(
    (x): { params: { productId: string; sku: string } } => {
      if (x.attributes.base_product === false) {
        return {
          params: {
            productId: findBaseProductSlug(
              x,
              filterBaseProducts(products.data)
            ),
            sku: x.attributes.sku,
          },
        };
      }
      return {
        params: {
          productId: x.attributes.slug,
          sku: x.attributes.sku,
        },
      };
    }
  );
  console.log("paths: ", paths);
  return {
    paths,
    fallback: false,
  };
};

type IdentifiableBaseProduct = ProductResponse & {
  id: string;
  attributes: { slug: string; sku: string; base_product: true };
};

type IdentifiableChildProduct = ProductResponse & {
  id: string;
  attributes: { base_product: false; base_product_id: string };
};

type Sku = string;
type Slug = string;

const filterBaseProducts = (
  products: ProductResponse[]
): IdentifiableBaseProduct[] =>
  products.filter(
    (product): product is IdentifiableBaseProduct =>
      product.attributes.base_product
  );

function findBaseProductSlug(
  product: ProductResponse,
  baseProducts: IdentifiableBaseProduct[]
): Slug {
  const result = baseProducts.find(
    (baseProduct) => baseProduct.id === product.attributes.base_product_id
  );
  if (!result) {
    throw new Error("Failed to find base product slug.");
  }
  return result.attributes.slug;
}

export default Sku;
