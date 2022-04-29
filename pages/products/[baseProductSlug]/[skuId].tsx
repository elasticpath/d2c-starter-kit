import { Container } from "@chakra-ui/react";
import type { ProductResponse, Resource } from "@moltin/sdk";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import ChildProductDetail from "../../../components/product/ChildProduct";
import BaseProductDetail from "../../../components/product/BaseProduct";
import { useCartData } from "../../../context/state";
import { addToCart } from "../../../services/cart";
import {
  isChildProductResource,
  isSimpleProductResource,
} from "../../../services/helper";
import { getAllProducts, getProductById } from "../../../services/products";
import SimpleProductDetail from "../../../components/product/SimpleProduct";
import {
  filterBaseProducts,
  findBaseProductSlug,
  getProductMainImage,
  getProductOtherImageUrls,
  productContext,
} from "../../../lib/product-util";
import { useState } from "react";
import { sortAlphabetically } from "../../../lib/shared-util";
import type {
  IBaseProductSku,
  IChildSku,
  ISimpleSku,
  ISku,
} from "../../../lib/product-types";

export const Sku: NextPage<ISku> = (props: ISku) => {
  const { updateCartItems, setCartQuantity } = useCartData();
  const [isChangingSku, setIsChangingSku] = useState(false);

  const handleAddToCart = () => {
    // TODO const mcart = localStorage.getItem("mcart") || "";
    return addToCart(props.product.id, 1)
      .then(() => {
        updateCartItems();

        // updateCartData();
        setCartQuantity(1);
      })
      .finally(() => {});
  };

  return (
    <Container maxW={"7xl"} key={"page_" + props.product.id}>
      <productContext.Provider
        value={{
          isChangingSku,
          setIsChangingSku,
        }}
      >
        {resolveProductDetailComponent(props, handleAddToCart)}
      </productContext.Provider>
    </Container>
  );
};

function resolveProductDetailComponent(
  props: ISku,
  handleAddToCart: () => void
): JSX.Element {
  switch (props.kind) {
    case "base-product":
      return (
        <BaseProductDetail baseSku={props} handleAddToCart={handleAddToCart} />
      );
    case "child-product":
      return (
        <ChildProductDetail
          childSku={props}
          handleAddToCart={handleAddToCart}
        />
      );
    case "simple-product":
      return (
        <SimpleProductDetail
          simpleSku={props}
          handleAddToCart={handleAddToCart}
        />
      );
  }
}

interface SkuRouteParams extends ParsedUrlQuery {
  baseProductSlug: string;
  skuId: string;
}

export const getStaticProps: GetStaticProps<ISku, SkuRouteParams> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  // alternative use params!.productId; instead of if check
  // non-null assertion operator https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  const product = await getProductById(params.skuId);
  // TODO should getProductBySku return undefined or a more understandable error response
  if (!product) {
    return {
      notFound: true,
    };
  }
  const { data: productData } = product;

  const retrievedResults = isSimpleProductResource(productData)
    ? retrieveSimpleProps(product)
    : isChildProductResource(productData)
    ? await retrieveChildProps(params.baseProductSlug, product)
    : await retrieveBaseProps(product);

  // TODO determine the best timeframe to rebuild a requested static page.
  //  set to 5 miuntes (300 seconds) arbitrarily
  return {
    ...retrievedResults,
    // revalidate: 300,
  };
};

const retrieveSimpleProps = (
  productResource: Resource<ProductResponse>
): GetStaticPropsResult<ISimpleSku> => {
  return {
    props: {
      kind: "simple-product",
      product: productResource.data,

      main_image: getProductMainImage(productResource),
      otherImages: getProductOtherImageUrls(productResource),
    },
  };
};

async function retrieveChildProps(
  baseProductSlug: string,
  childProductResource: Resource<ProductResponse>
): Promise<GetStaticPropsResult<IChildSku>> {
  const baseProductId = childProductResource.data.attributes.base_product_id;
  const baseProduct = await getProductById(baseProductId);
  if (!baseProduct || baseProduct.data.attributes.slug !== baseProductSlug) {
    throw Error(
      `Unable to retrieve child props, failed to get the base product for ${baseProductId} or the slug does not match`
    );
  }
  const {
    data: {
      meta: { variation_matrix, variations },
    },
  } = baseProduct;

  if (!variations || !variation_matrix) {
    throw Error(
      `Unable to retrieve child props, failed to get the variations or variation_matrix from base product for ${baseProductSlug}`
    );
  }

  return {
    props: {
      kind: "child-product",
      product: childProductResource.data,
      baseProduct: baseProduct.data,
      main_image: getProductMainImage(childProductResource),
      otherImages: getProductOtherImageUrls(childProductResource),
      variationsMatrix: variation_matrix,
      variations: variations.sort(sortAlphabetically),
    },
  };
}

async function retrieveBaseProps(
  baseProductResource: Resource<ProductResponse>
): Promise<GetStaticPropsResult<IBaseProductSku>> {
  const {
    data: {
      meta: { variations, variation_matrix },
      attributes: { slug },
    },
  } = baseProductResource;

  if (!variations || !variation_matrix) {
    throw Error(
      `Unable to retrieve base product props, failed to get the variations or variation_matrix from base product for ${slug}`
    );
  }

  return {
    props: {
      kind: "base-product",
      product: baseProductResource.data,
      main_image: getProductMainImage(baseProductResource),
      otherImages: getProductOtherImageUrls(baseProductResource),
      variationsMatrix: variation_matrix,
      variations: variations.sort(sortAlphabetically),
    },
  };
}

export const getStaticPaths: GetStaticPaths<SkuRouteParams> = async () => {
  //  TODO need to think of the best way to handle thousands of products
  //  - should they all be generated at once
  //  - should only the most popular.
  const productResponses = await getAllProducts();
  const paths = productResponses.map((resp): { params: SkuRouteParams } => {
    if (isChildProductResource(resp)) {
      return {
        params: {
          baseProductSlug: findBaseProductSlug(
            resp,
            filterBaseProducts(productResponses)
          ),
          skuId: resp.id,
        },
      };
    }
    return {
      params: {
        baseProductSlug: resp.attributes.slug,
        skuId: resp.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Sku;
