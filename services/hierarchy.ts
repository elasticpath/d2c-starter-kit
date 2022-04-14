import * as EPCC from "@moltin/sdk";
import { PcmProduct } from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function getHierarchies(): Promise<EPCC.Hierarchy[]> {
  const result = await EPCCAPI.Catalog.Hierarchies.All();
  const hierarchy = result.data;
  return hierarchy;
}

export async function getNodes(hierarchyId: string): Promise<EPCC.Node[]> {
  const result = (await EPCCAPI.Catalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  })) as unknown as EPCC.ResourceList<EPCC.Node>; // TODO update the js-sdk to use Node instead of Hierarchy
  const nodes = result.data;
  return nodes;
}

export async function getNodesProducts(
  nodeId: string
): Promise<EPCC.ResourcePage<PcmProduct>> {
  // @ts-ignore TODO remove this and handle issue
  const productsList = await EPCCAPI.Catalog.Nodes.GetNodeProducts({ nodeId });
  return productsList;
}
