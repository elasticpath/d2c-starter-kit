import type {
  ResourceList,
  Node,
  Hierarchy,
  ProductResponse,
} from "@moltin/sdk";

import { EPCCAPI } from "./helper";
import { ShopperCatalogResourcePage } from "@moltin/sdk";

export async function getHierarchies(): Promise<Hierarchy[]> {
  const result = await EPCCAPI.ShopperCatalog.Hierarchies.All();
  return result.data;
}

export async function getNodes(hierarchyId: string): Promise<Node[]> {
  const result = await EPCCAPI.ShopperCatalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  });
  return result.data;
}

export async function getNodesProducts(
  nodeId: string
): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.ShopperCatalog.Nodes.GetNodeProducts({ nodeId });
}

export async function getProductsByNode(
  nodeId: string
): Promise<ShopperCatalogResourcePage<ProductResponse>> {
  return await EPCCAPI.ShopperCatalog.Products.With([
    "main_image",
    "files",
  ]).GetProductsByNode({ nodeId });
}
