import type { Resource, ShopperCatalogReleaseBase } from "@moltin/sdk";
import { epccServerClient } from "../lib/epcc-server-client";
import { Moltin as EPCCClient } from "@moltin/sdk";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";

/**
 * Get a catalog release by id
 */
export async function getCatalogReleaseById(
  catalogId: string,
  releaseId: string,
  client?: EPCCClient
): Promise<Resource<ShopperCatalogReleaseBase>> {
  return (client ?? getEpccImplicitClient()).Catalogs.Releases.Get({
    catalogId,
    releaseId,
  });
}
