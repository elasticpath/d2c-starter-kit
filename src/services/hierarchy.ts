import type {
  ResourceList,
  Node,
  Hierarchy,
  ProductResponse,
  CatalogResourceList,
} from "@moltin/sdk";

import { EPCCAPI } from "./helper";

export async function getHierarchies(): Promise<Hierarchy[]> {
  const result = await EPCCAPI.Catalog.Hierarchies.All();
  const hierarchy = result.data;
  return hierarchy;
}

export async function getHierarchyChildren(
  hierarchyId: string
): Promise<Node[]> {
  const result = (await EPCCAPI.Catalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  })) as unknown as ResourceList<Node>; // TODO update the js-sdk to use Node instead of Hierarchy
  const nodes = result.data;
  return nodes;
}

export async function getNodeChildren(nodeId: string): Promise<Node[]> {
  const result = (await EPCCAPI.Catalog.Nodes.GetNodeChildren({
    nodeId,
  })) as unknown as ResourceList<Node>;
  const nodes = result.data;
  return nodes;
}

export async function getNodesProducts(
  nodeId: string
): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.Catalog.Nodes.GetNodeProducts({ nodeId });
}
