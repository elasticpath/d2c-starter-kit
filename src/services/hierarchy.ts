import type {
  ResourceList,
  Node,
  Hierarchy,
  ProductResponse,
} from "@moltin/sdk";

import { EPCCAPI } from "./helper";

export async function getHierarchies(): Promise<Hierarchy[]> {
  const result = await EPCCAPI.ShopperCatalog.Hierarchies.All();
  const hierarchy = result.data;
  return hierarchy;
}

export async function getNodes(hierarchyId: string): Promise<Node[]> {
  const result = (await EPCCAPI.ShopperCatalog.Hierarchies.GetHierarchyChildren(
    {
      hierarchyId,
    }
  )) as unknown as ResourceList<Node>;
  const nodes = result.data;
  return nodes;
}

export async function getNodeChildren(nodeId: string): Promise<Node[]> {
  const result = (await EPCCAPI.ShopperCatalog.Nodes.GetNodeChildren({
    nodeId,
  })) as unknown as ResourceList<Node>;
  const nodes = result.data;
  return nodes;
}

export async function getNodesProducts(
  nodeId: string
): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.ShopperCatalog.Nodes.GetNodeProducts({ nodeId });
}
