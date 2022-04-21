import type { ProductResponse, Resource, ResourceList } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getProductById(
  productId: string
): Promise<Resource<ProductResponse>> {
  return await EPCCAPI.Catalog.Products.With("main_image").Get({
    productId,
  });
}

export async function getProductBySlug(
  productSlug: string
): Promise<Resource<ProductResponse> | undefined> {
  // We treat product slugs as if they are unique so this filter on product slug
  // should only ever return one item arrays
  // TODO should be able to get single product by slug server side
  return await EPCCAPI.Catalog.Products.Filter({ eq: { slug: productSlug } })
    .All()
    .then((resp) => {
      return resp.data.length > 0 ? getProductById(resp.data[0].id) : undefined;
    });
}

export async function getAllProducts(): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.Catalog.Products.All();
}

export async function getAllBaseProducts(): Promise<
  ResourceList<ProductResponse>
> {
  // TODO server side filtering on base product does not seem to work maybe not supported
  //  eq(base_product,true)
  const allProducts = await EPCCAPI.Catalog.Products.All();
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

export async function getAllProductsWithVariations(): Promise<
  ResourceList<ProductResponse & {}>
> {
  // @ts-ignore
  // TODO add to js-sdk
  return await EPCCAPI.Catalog.Products.With([
    "main_image",
    "variations",
  ]).All();
}
