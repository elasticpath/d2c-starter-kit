import { Container } from "@chakra-ui/react";
import type { ProductResponse, File, Resource, Variation } from "@moltin/sdk";
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
  VariationSkuLookup,
  getSkuVariationLookup,
  isChildProductResource,
  isSimpleProductResource,
} from "../../../services/helper";
import {
  getAllProducts,
  getProductBySku,
  getProductBySlug,
} from "../../../services/products";
import SimpleProductDetail from "../../../components/product/SimpleProduct";
import {
  getProductMainImage,
  getProductOtherImageUrls,
} from "../../../lib/product-util";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IBaseSku {
  product: ProductResponse;
  main_image: File | null;
  otherImages: File[];
}

interface IBaseProductSku extends IBaseSku {
  kind: "base-product";
  variations: Variation[];
  skuLookUp: VariationSkuLookup;
}

interface IChildSku extends IBaseSku {
  kind: "child-product";
  baseProduct: ProductResponse;
  skuLookUp: VariationSkuLookup;
  variations: Variation[];
}

interface ISimpleSku extends IBaseSku {
  kind: "simple-product";
}

type ISku = IBaseProductSku | IChildSku | ISimpleSku;

interface ProductContext {
  isChangingSku: boolean;
  setIsChangingSku: Dispatch<SetStateAction<boolean>>;
}

export const productContext = createContext<ProductContext | null>(null);

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

  useEffect(() => {
    console.log("isChangingSku: ", isChangingSku);
  }, [isChangingSku]);

  return (
    <Container maxW={"7xl"}>
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
  const { product, main_image, otherImages } = props;
  switch (props.kind) {
    case "base-product":
      return (
        <BaseProductDetail
          product={product}
          main_image={main_image}
          otherImages={otherImages}
          handleAddToCart={handleAddToCart}
          skuLookup={props.skuLookUp}
          variations={props.variations}
        />
      );
    case "child-product":
      return (
        <ChildProductDetail
          product={product}
          baseProduct={props.baseProduct}
          main_image={main_image}
          otherImages={otherImages}
          handleAddToCart={handleAddToCart}
          optionLookupObj={props.skuLookUp[props.product.id]}
          skuLookup={props.skuLookUp}
          variations={props.variations}
        />
      );
    case "simple-product":
      return (
        <SimpleProductDetail
          product={product}
          main_image={main_image}
          otherImages={otherImages}
          handleAddToCart={handleAddToCart}
        />
      );
  }
}

interface SkuRouteParams extends ParsedUrlQuery {
  baseProductSlug: string;
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
  const product = await getProductBySku(params.sku);
  // TODO need to handle when product is not found
  //  should getProductBySku return undefined or a more understandable error response
  if (!product) {
    return {
      notFound: true,
    };
  }
  const { data: productData } = product;

  return isSimpleProductResource(productData)
    ? retrieveSimpleProps(product)
    : isChildProductResource(productData)
    ? retrieveChildProps(params.baseProductSlug, product)
    : retrieveBaseProps(product);
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

const sortProductVariationsAlphabetically = (
  a: { name: string },
  b: { name: string }
): number => a.name.localeCompare(b.name);

async function retrieveChildProps(
  baseProductSlug: string,
  childProductResource: Resource<ProductResponse>
): Promise<GetStaticPropsResult<IChildSku>> {
  const baseProduct = await getProductBySlug(baseProductSlug);
  if (!baseProduct) {
    throw Error(
      `Unable to retrieve child props, failed to get the base product for ${baseProductSlug}`
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

  // Merging the child products meta data onto the base product
  // overriding everything that matters but still keeping variations and variation_matrix
  const mergedProduct = mergeMeta(childProductResource.data, baseProduct.data);

  return {
    props: {
      kind: "child-product",
      product: mergedProduct,
      baseProduct: baseProduct.data,
      main_image: getProductMainImage(childProductResource),
      otherImages: getProductOtherImageUrls(childProductResource),
      skuLookUp: getSkuVariationLookup(variation_matrix, variations),
      variations: variations.sort(sortProductVariationsAlphabetically),
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
      skuLookUp: getSkuVariationLookup(variation_matrix, variations),
      variations: variations.sort(sortProductVariationsAlphabetically),
    },
  };
}

/**
 * All value of a differing values of b
 * e.g. a = { value1: '123', value2: '456, value3: '789'} and b = { value1: '367', value2: '423, value4: '891'}
 * output = { value1: '123', value2: '456, value3: '789', value4: '891'}
 * @param a
 * @param b
 */
function mergeMeta(a: ProductResponse, b: ProductResponse): ProductResponse {
  return {
    ...a,
    meta: {
      ...b.meta,
      ...a,
    },
  };
}

export const getStaticPaths: GetStaticPaths<SkuRouteParams> = async () => {
  // TODO this is only handling the first page of data response
  //  need to think of the best way to handle thousands of products
  //  - should they all be generated at once
  //  - should only the most popular.
  //  - option for static generation delayed until first time it's hit
  const products = await getAllProducts();
  const paths = products.data.map((x): { params: SkuRouteParams } => {
    if (isChildProductResource(x)) {
      return {
        params: {
          baseProductSlug: findBaseProductSlug(
            x,
            filterBaseProducts(products.data)
          ),
          sku: x.attributes.sku,
        },
      };
    }
    return {
      params: {
        baseProductSlug: x.attributes.slug,
        sku: x.attributes.sku,
      },
    };
  });
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
