import type { ProductResponse, Resource, ResourceList } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getProductById(
  productId: string
): Promise<Resource<ProductResponse>> {
  return await EPCCAPI.Catalog.Products.With(["main_image", "files"]).Get({
    productId,
  });
}

export async function getProductBySlug(
  productSlug: string
): Promise<Resource<ProductResponse> | undefined> {
  // We treat product slugs as if they are unique so this filter on product slug
  // should only ever return one item arrays
  // TODO should be able to get single product by slug server side?
  return await EPCCAPI.Catalog.Products.Filter({ eq: { slug: productSlug } })
    .All()
    .then((resp) => {
      // Need to perform the getProductById becuase can't include main_image and files on Products queries
      return resp.data.length > 0 ? getProductById(resp.data[0].id) : undefined;
    });
}

export async function getProductBySku(
  productSku: string
): Promise<Resource<ProductResponse> | undefined> {
  // We treat product sku's as if they are unique so this filter on product slug
  // should only ever return one item arrays
  // TODO should be able to get product by sku server side
  return await EPCCAPI.Catalog.Products.Filter({ eq: { sku: productSku } })
    .All()
    .then((resp) => {
      return resp.data.length > 0 ? getProductById(resp.data[0].id) : undefined;
    });
}

export async function getAllProducts(): Promise<ResourceList<ProductResponse>> {
  // TODO handle pagination at the moment increased default limit just to get all product results
  return await EPCCAPI.Catalog.Products.Limit(50).All();
}

export async function getAllBaseProducts(): Promise<
  ResourceList<ProductResponse>
> {
  // TODO server side filtering on base product does not seem to work maybe not supported
  //  eq(base_product,true)
  // TODO handle pagination at the moment increased default limit just to get all product results
  const allProducts = await EPCCAPI.Catalog.Products.Limit(50).All();
  console.log(
    "returned from all products request: ",
    allProducts.data.map((x) => x.id)
  );
  const filtered = {
    ...allProducts,
    data: allProducts.data.filter((prod) => prod.attributes.base_product),
  };
  console.log("returned filtered: ", filtered);
  return filtered;
}
