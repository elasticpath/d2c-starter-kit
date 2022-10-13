import type { Resource, ShopperCatalogReleaseBase } from "@moltin/sdk";
import { epccServerClient } from "../lib/epcc-server-client";

/**
 * Get a catalog release by id
 */
export async function getCatalogReleaseById(
  catalogId: string,
  releaseId: string
): Promise<Resource<ShopperCatalogReleaseBase>> {
  return await epccServerClient.Catalogs.Releases.Get({
    catalogId,
    releaseId,
  });
}
