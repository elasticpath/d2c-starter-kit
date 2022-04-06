import * as moltin from "@moltin/sdk";
import { PcmProduct } from "@moltin/sdk";
import { config } from "./config";

const MoltinGateway = moltin.gateway;
export async function getHierarchies(): Promise<moltin.Hierarchy[]> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const result = await moltin.Catalog.Hierarchies.All();
  const hierarchy = result.data;
  return hierarchy;
}

export async function getNodes(hierarchyId: string): Promise<moltin.Node[]> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const result = await moltin.Catalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  });
  const nodes = result.data;
  return nodes;
}

export async function getNodesProducts(
  nodeId: string
): Promise<moltin.ResourcePage<PcmProduct>> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const productsList = await moltin.Catalog.Nodes.GetNodeProducts({ nodeId });
  return productsList;
}
