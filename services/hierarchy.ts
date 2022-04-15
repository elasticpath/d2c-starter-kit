import type {
  ResourceList,
  PcmProduct,
  Node,
  Hierarchy,
  ResourcePage,
} from "@moltin/sdk";

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
): Promise<ResourcePage<PcmProduct>> {
  // @ts-ignore TODO remove this and handle issue
  const productsList = await EPCCAPI.Catalog.Nodes.GetNodeProducts({ nodeId });
  return productsList;
}
