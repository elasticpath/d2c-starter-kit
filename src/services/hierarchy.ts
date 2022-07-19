import type {
  ResourceList,
  Node,
  Hierarchy,
  ProductResponse,
} from "@moltin/sdk";

import { EPCCAPI } from "./helper";
import { config } from "./config";

export const EPCCParam = {
  EpContextTag: config.EpContextTag,
  EpChannel: config.EpChannel,
};
export async function getHierarchies(): Promise<Hierarchy[]> {
  const result = await EPCCAPI.ShopperCatalog.Hierarchies.All({
    token: "",
    additionalHeaders: {
      "EP-Context-Tag": EPCCParam.EpContextTag,
      "EP-Channel": EPCCParam.EpChannel,
    },
  });
  return result.data;
}

export async function getNodes(hierarchyId: string): Promise<Node[]> {
  const result = (await EPCCAPI.ShopperCatalog.Hierarchies.GetHierarchyChildren(
    {
      hierarchyId,
    }
  )) as unknown as ResourceList<Node>; // TODO update the js-sdk to use Node instead of Hierarchy
  return result.data;
}

export async function getNodesProducts(
  nodeId: string
): Promise<ResourceList<ProductResponse>> {
  return await EPCCAPI.ShopperCatalog.Nodes.GetNodeProducts({ nodeId });
}
