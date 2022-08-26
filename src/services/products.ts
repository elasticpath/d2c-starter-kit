import type {
  ProductResponse,
  ResourcePage,
  ShopperCatalogResource,
} from "@moltin/sdk";
import { EPCCAPI, wait300 } from "./helper";

export async function getProductById(
  productId: string
): Promise<ShopperCatalogResource<ProductResponse>> {
  return EPCCAPI.ShopperCatalog.Products.With([
    "main_image",
    "files",
    "component_products",
  ]).Get({
    productId,
  });
}

export function getAllProducts(): Promise<ProductResponse[]> {
  return _getAllProductPages();
}

const _getAllPages =
  <T, I>(
    nextPageRequestFn: (
      limit: number,
      offset: number
    ) => Promise<ResourcePage<T, I>>
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

const _getAllProductPages = _getAllPages((limit = 25, offset = 0) =>
  EPCCAPI.ShopperCatalog.Products.Limit(limit).Offset(offset).All()
);
