import type {
  ResourceList,
  Node,
  Hierarchy,
  ProductResponse,
} from "@moltin/sdk";
import { CatalogResource } from "@moltin/sdk/src/types/catalog";

import { EPCCAPI } from "./helper";

export async function getHierarchies(): Promise<Hierarchy[]> {
  const result = await EPCCAPI.Catalog.Hierarchies.All();
  const hierarchy = result.data;
  return hierarchy;
}

export async function getNodes(hierarchyId: string): Promise<Node[]> {
  const result = (await EPCCAPI.Catalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  })) as unknown as ResourceList<Node>; // TODO update the js-sdk to use Node instead of Hierarchy
  const nodes = result.data;
  return nodes;
}

export async function getNodesProducts(
  nodeId: string
): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.Catalog.Nodes.GetNodeProducts({ nodeId });
}

export async function getNode(nodeId: string): Promise<CatalogResource<Node>> {
  return await EPCCAPI.Catalog.Nodes.Get({ nodeId });
}
