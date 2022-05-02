import type { ProductResponse, Resource, ResourcePage } from "@moltin/sdk";
import { excludeChildProducts } from "../lib/product-util";
import { EPCCAPI, wait300 } from "./helper";

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

export function getAllProducts(): Promise<ProductResponse[]> {
  return _getAllProductPages();
}

const _getAllPages =
  <T>(
    nextPageRequestFn: (
      limit: number,
      offset: number
    ) => Promise<ResourcePage<T>>
  ) =>
  async (
    offset: number = 0,
    limit: number = 25,
    accdata: T[] = []
  ): Promise<T[]> => {
    const requestResp = await nextPageRequestFn(limit, offset);
    const {
      meta: {
        page: newPage,
        results: { total },
      },
      data: newData,
    } = requestResp;

    const updatedOffset = offset + newPage.total;
    const combinedData = [...accdata, ...newData];
    if (updatedOffset < total) {
      return wait300.then(() =>
        _getAllPages(nextPageRequestFn)(updatedOffset, limit, combinedData)
      );
    }
    return Promise.resolve(combinedData);
  };

const _getNextPage =
  <T>(
    nextPageRequestFn: (
      limit: number,
      offset: number
    ) => Promise<ResourcePage<T>>
  ) =>
  async (
    totalRecords: number,
    offset: number = 0,
    limit: number = 25
  ): Promise<ResourcePage<T>> => {
    const updatedOffset =
      offset + limit > totalRecords
        ? offset + (totalRecords - limit)
        : offset + limit;
    return nextPageRequestFn(limit, updatedOffset);
  };

const _getAllProductPages = _getAllPages(
  (limit = 25, offset = 0) =>
    EPCCAPI.Catalog.Products.Limit(limit).Offset(offset).All() as Promise<
      ResourcePage<ProductResponse>
    >
);

export async function getAllBaseProducts(): Promise<ProductResponse[]> {
  // TODO issue: https://gitlab.elasticpath.com/commerce-cloud/ncl-projects/catalog-view.svc/-/issues/193
  //  Set a 100 limit to avoid the above pagination issue. If products in d2c store
  //  instance exced 100 the bug will surface.
  const allProducts = await _getAllProductPages(0, 100);
  return excludeChildProducts(allProducts);
}
