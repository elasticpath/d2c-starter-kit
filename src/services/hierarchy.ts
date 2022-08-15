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

export async function getHierarchyChildren(
  hierarchyId: string
): Promise<Node[]> {
  const result = await EPCCAPI.ShopperCatalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  });
  return result.data;
}

export async function getHierarchyNodes(hierarchyId: string): Promise<Node[]> {
  const result = await EPCCAPI.ShopperCatalog.Hierarchies.GetHierarchyNodes({
    hierarchyId,
  });

  return result.data;
}

export async function getNodeChildren(nodeId: string): Promise<Node[]> {
  const result = (await EPCCAPI.ShopperCatalog.Nodes.GetNodeChildren({
    nodeId,
  })) as unknown as ResourceList<Node>;
  const nodes = result.data;
  return nodes;
}

export async function getNodeProducts(
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
